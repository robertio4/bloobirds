import React, { MutableRefObject } from "react";

import { IconButton, Tooltip } from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import classNames from 'clsx';
import PropTypes from 'prop-types';

import { bobjectUrl } from '../../app/_constants/routes';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../constants/lead';
import {
  useBobjectDetails,
  useBobjectFormVisibility,
  useEntity,
  useHover,
  useRouter,
} from '../../hooks';
import { useBobjectTypes } from '../../hooks/useBobjectTypes';
import { useSelectedLead } from '../../hooks/useSelectedLead';
import { useSelectedOpportunity } from '../../hooks/useSelectedOpportunity';
import { getValueFromLogicRole, hasRequiredMissing } from '../../utils/bobjects.utils';
import { ellipsis } from '../../utils/strings.utils';
import { useUserSettings } from '../userPermissions/hooks';
import styles from './bobjectName.module.css';

const BobjectNameView = ({
  field,
  bobject,
  canEdit,
  type,
  isLead = type === BOBJECT_TYPES.LEAD,
  isCompany = type === BOBJECT_TYPES.COMPANY,
  ellipsisChar,
  toggleDropdown = () => {},
}: any) => {
  const { openEditModal } = useBobjectFormVisibility();
  const [ref, isHover] = useHover() as [MutableRefObject<any>, boolean];
  const { history } = useRouter();
  const { openBobjectDetails } = useBobjectDetails();
  const textValue = field.value
    ? field.value
    : getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true) || `Untitled ${type}`;
  const config = useUserSettings();
  const meetingFieldsRequiredEnabled = config?.settings.meetingFieldsRequiredEnabled;
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const bobjectConditionalFields = useEntity('bobjectConditionalFields');
  const hasRequiredMissingInformation = hasRequiredMissing({
    bobjectType: type,
    bobjectTypes,
    bobjectFields,
    bobject,
    bobjectConditionalFields,
  });
  const { updateSelectedOpportunity } = useSelectedOpportunity();
  const { updateSelectedLead } = useSelectedLead();

  return (
    <Tooltip title={field.value} position="top" trigger="hover">
      <div data-test="nameContainer" className={styles._container} ref={ref}>
        <span
          data-test={`Dropdown-Name-${field.value}`}
          className={classNames(styles._name__text, {
            [styles._nameLead]: isLead,
            [styles._nameCompany]: isCompany,
          })}
          onClick={e => {
            e.stopPropagation();
            if ([BOBJECT_TYPES.LEAD, BOBJECT_TYPES.OPPORTUNITY].includes(type)) {
              history.push(bobjectUrl(bobject));
              if (type === BOBJECT_TYPES.OPPORTUNITY) {
                updateSelectedOpportunity(bobject);
              } else {
                updateSelectedLead(bobject);
              }
            } else {
              openBobjectDetails({ id: bobject?.id.value });
            }
            toggleDropdown();
          }}
        >
          {ellipsisChar ? ellipsis(textValue, ellipsisChar) : textValue}
        </span>
        {meetingFieldsRequiredEnabled && hasRequiredMissingInformation && (
          <span className={styles._warning__dot} />
        )}
        {isHover && canEdit && (
          <IconButton
            name="edit"
            size={16}
            onClick={e => {
              e.stopPropagation();
              openEditModal({ bobject });
              toggleDropdown();
            }}
          />
        )}
      </div>
    </Tooltip>
  );
};

BobjectNameView.propTypes = {
  bobject: PropTypes.any,
  ellipsisChar: PropTypes.number,
  field: PropTypes.any,
  isCompany: PropTypes.bool,
  isLead: PropTypes.bool,
  type: PropTypes.string,
};
BobjectNameView.defaultProps = {
  bobject: {},
  canEdit: true,
  ellipsisChar: 0,
  field: {},
  isCompany: false,
  isLead: false,
  type: '',
};

export default BobjectNameView;
