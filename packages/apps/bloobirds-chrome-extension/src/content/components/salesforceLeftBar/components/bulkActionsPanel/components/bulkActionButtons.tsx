import { useTranslation } from 'react-i18next';

import { Button, Tooltip } from '@bloobirds-it/flamingo-ui';
import { SalesforceTabs } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { useSubhomeContext } from '../../../../extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout';
import styles from '../bulkActionsPanel.module.css';
import { availableActionType, BulkActionButtonsTypes } from '../typings/bulkActionsPanel.typings';

const BulkActionButtons = ({
  tab,
  availableActions,
}: {
  tab: SalesforceTabs;
  availableActions: availableActionType[];
}) => {
  const { selectedItems, setOpenedModalInfo } = useSubhomeContext();

  const renderAction = (actionObject: availableActionType) => {
    const { action, disabled } = actionObject;
    const { t } = useTranslation();

    switch (action) {
      case BulkActionButtonsTypes.StartCadence:
        return (
          <div className={styles.buttonWrapper}>
            <Tooltip
              position="top"
              title={
                disabled
                  ? t('leftBar.bulk.actionDisabled', { action: t('leftBar.bulk.setCadence') })
                  : t('leftBar.bulk.setCadence')
              }
            >
              <Button
                variant="secondary"
                iconLeft="calendar"
                size="small"
                uppercase={false}
                disabled={disabled}
                onClick={() => {
                  mixpanel.track(`BULK_ACTION_SET_CADENCE_${tab?.toUpperCase()}_TAB`);
                  setOpenedModalInfo({ openedModal: 'cadence', bobject: selectedItems });
                }}
              />
            </Tooltip>
          </div>
        );
      case BulkActionButtonsTypes.StopCadence:
        return (
          <div className={styles.buttonWrapper}>
            <Tooltip
              position="top"
              title={
                disabled
                  ? t('leftBar.bulk.actionDisabled', { action: t('leftBar.bulk.stopCadence') })
                  : t('leftBar.bulk.stopCadence')
              }
            >
              <Button
                variant="secondary"
                size="small"
                iconLeft="slash"
                uppercase={false}
                disabled={disabled}
                onClick={() => {
                  mixpanel.track(`BULK_ACTION_STOP_CADENCE_${tab?.toUpperCase()}_TAB`);
                  setOpenedModalInfo({ openedModal: 'stopCadence', bobject: selectedItems });
                }}
              />
            </Tooltip>
          </div>
        );
      case BulkActionButtonsTypes.Reschedule:
        return (
          <div className={styles.buttonWrapper}>
            <Tooltip
              position="top"
              title={
                disabled
                  ? t('leftBar.bulk.actionDisabled', { action: t('leftBar.bulk.reschedule') })
                  : t('leftBar.bulk.reschedule')
              }
            >
              <Button
                variant="secondary"
                size="small"
                iconLeft="clock"
                uppercase={false}
                disabled={disabled}
                onClick={() => {
                  mixpanel.track(`BULK_ACTION_RESCHEDULE_${tab?.toUpperCase()}_TAB`);
                  setOpenedModalInfo({ openedModal: 'reschedule', bobject: selectedItems });
                }}
              />
            </Tooltip>
          </div>
        );
      case BulkActionButtonsTypes.Reassign:
        return (
          <div className={styles.buttonWrapper}>
            <Tooltip position="top" title="Reassign">
              <Button
                variant="secondary"
                iconLeft="personAdd"
                size="small"
                uppercase={false}
                onClick={() => {
                  mixpanel.track(`BULK_ACTION_REASSIGN_${tab?.toUpperCase()}_TAB`);
                  setOpenedModalInfo({ openedModal: 'assignUser', bobject: selectedItems });
                }}
              />
            </Tooltip>
          </div>
        );
    }
  };

  return (
    <div className={styles.buttonsGroupWrapper}>
      {availableActions?.map(actionObject => {
        return <div key={actionObject.action}>{renderAction(actionObject)}</div>;
      })}
    </div>
  );
};

export default BulkActionButtons;
