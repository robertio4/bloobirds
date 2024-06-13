import { useTranslation } from 'react-i18next';

import { Button, Icon, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useActiveUserId } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';

import { getFieldByLogicRole, getTextFromLogicRole } from '../../../../../../utils/bobjects.utils';
import { useContactViewContext } from '../../../context/contactViewContext';
import styles from '../miniCard.module.css';

export function MiniCardActivityButtons({ activity, setOpenedModal }) {
  const isMeeting =
    getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE) === ACTIVITY_TYPES.MEETING;

  const { actionsDisabled } = useContactViewContext();
  const lead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const leadAssignee = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.value;
  const opportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const opportunityAssignee = getFieldByLogicRole(
    opportunity,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  )?.value;

  const activeUserId = useActiveUserId();
  const { t } = useTranslation('translation', { keyPrefix: 'extension.card' });
  const { t: bobjectT } = useTranslation('translation', { keyPrefix: 'bobjectTypes' });

  const assignedToActiveUser =
    leadAssignee === activeUserId || opportunityAssignee === activeUserId;

  if (isMeeting)
    return (
      <Tooltip
        title={
          actionsDisabled &&
          !assignedToActiveUser &&
          t('noPermissions', { bobject: bobjectT('activity') })
        }
        position="top"
      >
        <Button
          dataTest={styles.iconButton}
          size="small"
          onClick={() => {
            setOpenedModal('meeting');
          }}
          disabled={actionsDisabled && !assignedToActiveUser}
        >
          <Icon size={11} color="white" name="thumbsUp" />
        </Button>
      </Tooltip>
    );
  return <></>;
}
