import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserId } from '@bloobirds-it/hooks';
import {
  Bobject,
  COMPANY_FIELDS_LOGIC_ROLE,
  DataModelResponse,
  MainBobjectTypes,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  getBobjectFromLogicRole,
  recoverScrollOfBox,
  removeScrollOfBox,
} from '@bloobirds-it/utils';

import {
  INACTIVE_HANDLING_OPTIONS,
  InactiveHandlingModalDataInterface,
} from '../constants/inactiveHandling.constant';
import { useInactiveHandlingModalData } from '../hooks';
import ActionForm from './ActionForm';
import { ActionSelector } from './ActionSelector';
import { InformationPanel } from './InformationPanel';
import styles from './inactiveHandlingModal.module.css';

const withProvider = Component => ({ dataModel, ...props }) => {
  return (
    <InactiveHandlingModalProvider dataModel={dataModel} {...props}>
      <Component {...props} />
    </InactiveHandlingModalProvider>
  );
};

const InactiveHandlingModalContext = createContext(null);

type ProviderType = {
  dataModel: DataModelResponse;
  bobject?: Bobject;
  handleClose?: () => void;
  children: React.ReactElement;
};
function getFieldValues(dataModel, logicRole) {
  const dataModelFields = dataModel?.getFieldsByBobjectType(getBobjectFromLogicRole(logicRole));
  return dataModelFields?.find(datamodelField => datamodelField.logicRole === logicRole)?.values;
}
const InactiveHandlingModalProvider = ({ children, dataModel, ...props }: ProviderType) => {
  const activeUserId = useActiveUserId();
  const accountId = dataModel?.getAccountId();
  const discardedReasons = getFieldValues(dataModel, COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS);
  const closedLostReason = getFieldValues(
    dataModel,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON,
  );
  const onHoldReasons = getFieldValues(dataModel, COMPANY_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS);
  const users = getFieldValues(dataModel, COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO).filter(
    user => !user.name.includes('Deleted'),
  );

  return (
    <InactiveHandlingModalContext.Provider
      value={{
        ...props,
        activeUserId,
        accountId,
        fields: { users, discardedReasons, closedLostReason, onHoldReasons },
      }}
    >
      {children}
    </InactiveHandlingModalContext.Provider>
  );
};

export const useInactiveHandlingModal = () => {
  const context = useContext(InactiveHandlingModalContext);

  if (context === undefined) {
    throw new Error('useInactiveHandlingModal must be used within the modal provider');
  }

  return context;
};

const InactiveHandlingModal = props => {
  const [selectedOptionData, setSelectedOptionData] = useState<InactiveHandlingModalDataInterface>({
    type: INACTIVE_HANDLING_OPTIONS.NEXT_STEP,
    data: {},
  });
  const { bobject, handleClose } = props;

  const {
    handleSubmit,
    getIsMissingInfo,
    isInSalesStage,
    isSubmitting,
  } = useInactiveHandlingModalData(selectedOptionData);
  /*const hasOnHoldReasons =
    useGlobalPicklistValues({
      logicRole: GLOBAL_PICKLISTS.ON_HOLD_REASONS,
    })?.filter(reason => reason.enabled)?.length !== 0;*/

  const isMissingInfo = getIsMissingInfo({
    selectedOptionData,
    hasNeededNurturingInfo: true,
    hasOnHoldReasons: bobject?.id?.typeName !== 'Opportunity',
  });

  useEffect(() => {
    removeScrollOfBox();
    return recoverScrollOfBox;
  }, []);

  return (
    <>
      <Modal width={680} open onClose={handleClose}>
        <div className={styles._modal_wrapper}>
          <ModalHeader className={styles._modal_header}>
            <ModalTitle color="peanut" icon="rewind" size="small">
              This {bobject?.id?.typeName.toLowerCase()} will become inactive
            </ModalTitle>
            <ModalCloseIcon color="peanut" size="small" onClick={handleClose} />
          </ModalHeader>
          <ModalContent className={styles._modal_content}>
            <div className={styles._sections_container}>
              <ActionSelector
                selectedOptionHandler={[selectedOptionData, setSelectedOptionData]}
                bobjectType={bobject?.id?.typeName as MainBobjectTypes}
                isInSalesStage={isInSalesStage}
              />
              <InformationPanel selectedOption={selectedOptionData} bobject={bobject} />
            </div>
            <ActionForm
              selectedOptionHandler={[selectedOptionData, setSelectedOptionData]}
              bobject={bobject}
              isSalesBobject={isInSalesStage}
            />
          </ModalContent>
          <ModalFooter className={styles._modal_footer}>
            <div>
              <Button variant="clear" onClick={handleClose} uppercase>
                cancel
              </Button>
            </div>
            <Tooltip title={isMissingInfo ? 'Required info missing' : ''} position="top">
              <Button onClick={handleSubmit} disabled={isMissingInfo || isSubmitting} uppercase>
                confirm
              </Button>
            </Tooltip>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
};

export const InactiveModal = withProvider(InactiveHandlingModal);
