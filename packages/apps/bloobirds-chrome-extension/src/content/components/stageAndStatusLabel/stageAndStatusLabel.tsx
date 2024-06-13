import { useTranslation } from 'react-i18next';

import { Label, Tooltip, useToasts } from '@bloobirds-it/flamingo-ui';
import {
  useFullSalesEnabled,
  useIsNoStatusPlanAccount,
  useObjectCreationSettings,
} from '@bloobirds-it/hooks';
import { ExtensionBobject, MessagesEvents } from '@bloobirds-it/types';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';

import { useExtensionContext } from '../context';
import { StatusLabel } from '../statusLabel/statusLabel';
import { useStatusModalInfo } from './useStatusModalInfo';

function getStatusLabelProps(status, isNoStatusPlanAccount) {
  if (!status) {
    return null;
  }
  if (isNoStatusPlanAccount) {
    return {
      backgroundColor: status?.backgroundColor,
      color: status?.textColor,
      borderColor: status?.backgroundColor,
      text: status?.salesforceLabel,
    };
  }
  return {
    backgroundColor: status?.backgroundColor,
    color: status?.textColor,
    borderColor: '',
    text: status?.name,
  };
}

export const StageAndStatusLabel = ({
  bobject,
  className,
}: {
  bobject: ExtensionBobject;
  className?: string;
}) => {
  const { useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const hasSalesEnabled = useFullSalesEnabled(dataModel.getAccountId());
  //TODO this is a candidate to load on hover
  const statusInfo = bobject && useStatusModalInfo(bobject);
  const { bobjectType, status, isSalesStage, salesforceStatus } = statusInfo || {};
  const isOpportunity = bobjectType === 'Opportunity';
  const { createToast } = useToasts();
  const { t } = useTranslation();
  const { openWizard, resetWizardProperties } = useWizardContext();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const { enabledChangeStatus } = useObjectCreationSettings();

  const usableStatus = isNoStatusPlanAccount ? salesforceStatus : status;
  function handleClose() {
    resetWizardProperties(WIZARD_MODALS.CHANGE_STATUS);
  }
  function handleOnSave() {
    handleClose();

    if (!isNoStatusPlanAccount) {
      createToast({
        message: t('sidePeek.stageAndStatusLabel.statusUpdatedSuccessfully'),
        type: 'success',
      });
    }

    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: { type: bobjectType },
      }),
    );
  }

  const statusLabelProps = getStatusLabelProps(
    isNoStatusPlanAccount ? salesforceStatus : status,
    isNoStatusPlanAccount,
  );

  return (
    <>
      {hasSalesEnabled && !isOpportunity && !isNoStatusPlanAccount ? (
        <Tooltip
          title={`${t('common.stage')}: ${
            isSalesStage ? t('common.sales') : t('common.prospecting')
          }`}
          position="top"
        >
          <Label
            size={'small'}
            uppercase={false}
            color={isSalesStage ? 'peanut' : 'verySoftGrape'}
            textColor={isSalesStage ? 'white' : 'peanut'}
            overrideStyle={{
              ...{
                paddingLeft: '3px',
                paddingRight: '3px',
                paddingTop: className ? 0 : '2px',
                paddingBottom: className ? 0 : '2px',
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
              },
            }}
          >
            {isSalesStage ? t('common.salesAbr') : t('common.prospectingAbr')}
          </Label>
        </Tooltip>
      ) : (
        <></>
      )}
      {usableStatus && statusLabelProps && (
        <StatusLabel
          size="small"
          onClick={() => {
            if (enabledChangeStatus === undefined || enabledChangeStatus) {
              openWizard(WIZARD_MODALS.CHANGE_STATUS, bobject, {
                referenceBobject: bobject,
                handleClose: handleClose,
                handleOnSave: handleOnSave,
                statusInfo: statusInfo,
                dataModel: dataModel,
              });
            }
          }}
          {...statusLabelProps}
          {...(className ? { className } : {})}
        />
      )}
    </>
  );
};
