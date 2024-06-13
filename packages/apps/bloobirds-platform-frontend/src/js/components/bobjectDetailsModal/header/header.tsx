import React from 'react';

import { Icon, IconButton, Skeleton } from '@bloobirds-it/flamingo-ui';
import { useCrmStatus, useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import { Bobject, BOBJECT_TYPES, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getSobjectTypeFromBobject } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { companyUrl, leadUrl } from '../../../app/_constants/routes';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { useBobjectDetailsVisibility, useHover } from '../../../hooks';
import {
  getFieldByLogicRole,
  getRelatedBobject,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isCompany,
  isLead,
  isOpportunity,
} from '../../../utils/bobjects.utils';
import { toSentenceCase } from '../../../utils/strings.utils';
import CopyToClipboard from '../../CopyToClipboard';
import {
  AttemptsBobjectField,
  LastAttemptBobjectField,
  LastTouchBobjectField,
  TouchesBobjectField,
} from '../../bobjectFields/bobjectFields';
import BusinessAssetBadge from '../../bussinesAssetBadge/businessAssetBadge';
import { BobjectField } from '../../filter/field/field';
import { BobjectFieldPill } from '../../filter/field/pill';
import { StatusLabel } from '../../statusLabel/statusLabel';
import styles from './header.module.css';
import { LeadsOverview } from './leadsOverview/leadsOverview';

const FIELDS_TO_SHOW = [
  COMPANY_FIELDS_LOGIC_ROLE.WEBSITE,
  COMPANY_FIELDS_LOGIC_ROLE.LINKEDIN_URL,
  COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  COMPANY_FIELDS_LOGIC_ROLE.COUNTRY,
  COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_COUNT,
  COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  COMPANY_FIELDS_LOGIC_ROLE.TOUCHES_COUNT,
  COMPANY_FIELDS_LOGIC_ROLE.TOUCHES_LAST_DAY,
];

const pills = {
  [COMPANY_FIELDS_LOGIC_ROLE.WEBSITE]: BobjectField,
  [COMPANY_FIELDS_LOGIC_ROLE.LINKEDIN_URL]: BobjectField,
  [COMPANY_FIELDS_LOGIC_ROLE.SOURCE]: BobjectField,
  [COMPANY_FIELDS_LOGIC_ROLE.COUNTRY]: BobjectField,
  [COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_COUNT]: AttemptsBobjectField,
  [COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY]: LastAttemptBobjectField,
  [COMPANY_FIELDS_LOGIC_ROLE.TOUCHES_COUNT]: TouchesBobjectField,
  [COMPANY_FIELDS_LOGIC_ROLE.TOUCHES_LAST_DAY]: LastTouchBobjectField,
};

const SalesforceStatusLabel = ({ bobject }: { bobject: Bobject }) => {
  const bobjectType = bobject.id.typeName;
  const sobjectType = getSobjectTypeFromBobject(bobject);
  const { crmStatusList } = useCrmStatus(bobject.id.accountId, [sobjectType], 'SALESFORCE', true);

  const salesForceStatus = getTextFromLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType][`SALESFORCE_${bobjectType.toUpperCase()}_STATUS`],
  );
  const activeStatus =
    crmStatusList?.[0] &&
    crmStatusList[0].crmStatusMappingList?.find(
      ({ crmStatusLabel }) => crmStatusLabel === salesForceStatus,
    );
  if (!activeStatus) return <Skeleton variant="text" width="120px" height="26px" />;
  return (
    <div style={{ width: '120px', height: '26px', margin: 0 }}>
      <StatusLabel name={activeStatus.crmStatusLabel} {...activeStatus} />{' '}
    </div>
  );
};

const Header = ({ bobject }: { bobject: Bobject }) => {
  const { closeBobjectDetailsModal } = useBobjectDetailsVisibility();
  const bobjectType = bobject.id.typeName;
  const isNoStatusAccount = useIsNoStatusPlanAccount();

  const [hoverRef, isHovered] = useHover();
  const isLeadBobject = isLead(bobject);
  const isCompanyBobject = isCompany(bobject);

  const nameLogicRole = isLeadBobject
    ? `${bobjectType.toUpperCase()}__FULL_NAME`
    : `${bobjectType.toUpperCase()}__NAME`;

  const secondary = isLeadBobject
    ? `${bobjectType.toUpperCase()}__EMAIL`
    : isCompanyBobject
    ? `${bobjectType.toUpperCase()}__WEBSITE`
    : null;

  const businessAssetEntityClass = isLeadBobject ? 'idealCustomerProfiles' : 'targetMarkets';

  const businessAssetLogicRole = isLeadBobject
    ? `${bobjectType.toUpperCase()}__ICP`
    : COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET;

  const name =
    getTextFromLogicRole(bobject, nameLogicRole) || getTextFromLogicRole(bobject, secondary);
  const companyMrRating = getFieldByLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.MR_RATING);
  const stage = getFieldByLogicRole(bobject, `${bobjectType.toUpperCase()}__STAGE`);
  const status =
    stage?.valueLogicRole === `${bobjectType.toUpperCase()}__STAGE__SALES`
      ? getFieldByLogicRole(bobject, `${bobjectType.toUpperCase()}__SALES_STATUS`)
      : getFieldByLogicRole(bobject, `${bobjectType.toUpperCase()}__STATUS`);
  const isOptOut =
    getFieldByLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType].OPT_OUT)?.text === 'Yes';
  let link = `${window.location.origin}${companyUrl(bobject)}`;
  let businessAssetEntityId = getValueFromLogicRole(bobject, businessAssetLogicRole);
  if (isLeadBobject) {
    const companyBobject = undefined;
    link = `${window.location.origin}${leadUrl(bobject, companyBobject)}`;
  }

  if (isOpportunity(bobject)) {
    const opportunityCompany = getRelatedBobject(bobject, BOBJECT_TYPES.COMPANY);
    link = opportunityCompany ? `${window.location.origin}${companyUrl(opportunityCompany)}` : null;
    businessAssetEntityId =
      opportunityCompany &&
      getValueFromLogicRole(opportunityCompany, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET);
  }

  return (
    <div className={styles._container}>
      <div className={styles._bussines_asset}>
        <BusinessAssetBadge
          entityType={businessAssetEntityClass}
          entityId={businessAssetEntityId}
        />
      </div>
      <div className={styles._title} ref={hoverRef}>
        <span className={styles._opt_out_sign}>
          {isOptOut && <Icon name="slash" color="tomato" />}
        </span>
        <span
          data-test={`Modal-${bobjectType}-${name}`}
          className={styles._title_text}
          title={name}
        >
          {name || `Untitled ${toSentenceCase(bobjectType)}`}
        </span>
        {link && (
          <div
            className={clsx(styles._links, {
              [styles._links_visible]: isHovered,
            })}
          >
            <CopyToClipboard dataToCopy={link}>
              <div className={styles._link_icon}>
                <Icon name="link" />
              </div>
            </CopyToClipboard>
            <div onClick={() => window.open(link)} className={styles._link_icon}>
              <Icon name="externalLink" />
            </div>
          </div>
        )}
      </div>

      <div className={styles._status}>
        {isNoStatusAccount ? (
          <SalesforceStatusLabel bobject={bobject} />
        ) : (
          <StatusLabel
            backgroundColor={status?.valueBackgroundColor}
            textColor={status?.valueTextColor}
            name={status?.text}
          />
        )}
        {companyMrRating && <BobjectFieldPill field={companyMrRating} />}
      </div>
      {isCompanyBobject && (
        <>
          <LeadsOverview companyId={bobject?.id.value} />
          <div className={styles._fields_wrapper}>
            {FIELDS_TO_SHOW.map(logicRole => {
              const Component = pills[logicRole];
              const field = getFieldByLogicRole(bobject, logicRole);
              return (
                <div key={`${logicRole}`} className={styles._field_element}>
                  <Component field={field} />
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className={styles._close_button}>
        <IconButton name="cross" size={36} color="softPeanut" onClick={closeBobjectDetailsModal} />
      </div>
      <div className={styles._container_before}></div>
    </div>
  );
};

export default Header;
