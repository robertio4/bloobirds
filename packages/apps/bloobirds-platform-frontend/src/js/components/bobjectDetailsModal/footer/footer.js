import React from 'react';
import { Button } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';
import { bobjectUrl, companyUrl, opportunityUrl } from '../../../app/_constants/routes';
import { useBobjectPermissions } from '../../userPermissions/hooks';
import {
  getRelatedBobject,
  getValueFromLogicRole,
  isCompany,
  isLead,
  isOpportunity,
} from '../../../utils/bobjects.utils';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../constants/opportunity';
import { useBobjectDetails, useRouter, useBobjectFormVisibility } from '../../../hooks';
import styles from './footer.module.css';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';

const getPath = (bobject, hasSalesEnabled) => {
  let pathUrl = companyUrl(bobject);

  if (isOpportunity(bobject)) {
    const companyIdValue = getValueFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY);
    const companyId = companyIdValue?.split('/')[2];
    pathUrl = hasSalesEnabled
      ? opportunityUrl(undefined, bobject?.id.objectId)
      : companyId && opportunityUrl(companyId, bobject?.id.objectId);
  } else if (isLead(bobject)) {
    return bobjectUrl(bobject);
  }

  return pathUrl;
};

const Footer = ({ bobject }) => {
  const { closeBobjectDetails, config } = useBobjectDetails();
  const { openEditModal } = useBobjectFormVisibility();
  const { history } = useRouter();
  const { checkPermissions } = useBobjectPermissions();
  const hasSalesEnabled = useFullSalesEnabled();
  const bobjectTypeName = bobject?.id?.typeName;
  const path = getPath(bobject, hasSalesEnabled);
  const referencedCompany =
    !isCompany(bobject) && getRelatedBobject(bobject, BOBJECT_TYPES.COMPANY);
  const hasPermissionFromSelfbobject = checkPermissions(bobject);
  const hasPermission =
    hasPermissionFromSelfbobject ||
    (referencedCompany ? checkPermissions(referencedCompany) : false);
  return (
    <div
      className={classNames(styles._container, {
        [styles.justifyCenter]: !config?.showContactButton,
      })}
    >
      <div className={styles.editBtn}>
        <Button
          expand
          disabled={!hasPermission}
          variant="secondary"
          dataTest="modalEditButton"
          onClick={() => openEditModal({ bobject })}
        >
          Edit {bobjectTypeName}
        </Button>
      </div>
      {config?.showContactButton && (
        <div className={styles.contactBtn}>
          <Button
            expand
            disabled={!hasPermission}
            dataTest="modalContactButton"
            onClick={e => {
              history.push(path, { event: e });
              closeBobjectDetails();
            }}
          >
            {`Contact ${bobjectTypeName}`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Footer;
