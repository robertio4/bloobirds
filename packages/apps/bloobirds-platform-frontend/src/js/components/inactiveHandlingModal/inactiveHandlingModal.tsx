import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
  Skeleton,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import styles from './inactiveHandlingModal.module.css';
import { useInactiveHandlingModal } from './useInactiveHandlingModal';
import { ActionSelector } from './components/ActionSelector';
import { InformationPanel } from './components/InformationPanel';
import { INACTIVE_HANDLING_OPTIONS } from './inactiveHandling.constant';
import { MainBobjectTypes } from '../../typings/bobjects';
import { useOpportunity } from '../../hooks';
import { checkIsSalesBobject } from '../../utils/bobjects.utils';
import { useGlobalPicklistValues } from '../../hooks/usePicklistValues';
import { GLOBAL_PICKLISTS } from '../../constants/globalPicklists';

export interface InactiveHandlingModalDataInterface {
  type: INACTIVE_HANDLING_OPTIONS;
  data: any;
}

function getIsMissingInfo({
  selectedOptionData: { type, data },
  cadenceInfo: { bobjectCadence, defaultCadence },
  hasNeededNurturingInfo,
  hasOnHoldReasons,
  isSalesBobject,
}: {
  selectedOptionData: InactiveHandlingModalDataInterface;
  cadenceInfo: { bobjectCadence: string; defaultCadence: string };
  hasNeededNurturingInfo: boolean;
  hasOnHoldReasons: boolean;
  isSalesBobject: boolean;
}) {
  const noCadenceData = !bobjectCadence && !defaultCadence && !data?.cadenceId;

  switch (type) {
    case INACTIVE_HANDLING_OPTIONS.DISCARD:
      return !data?.discardedValue;
    case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
      return isSalesBobject || hasOnHoldReasons ? false : !data?.onHoldedValue;
    case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
      return !data?.title;
    case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
      return noCadenceData;
    case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
      return noCadenceData || !hasNeededNurturingInfo;
    default:
      return false;
  }
}

const loadActionForm = () => {
  return import('./components/ActionForm');
};

const ActionForm = React.lazy(async () => await loadActionForm());

export const InactiveHandlingModal = () => {
  const [selectedOptionData, setSelectedOptionData] = useState<InactiveHandlingModalDataInterface>({
    type: INACTIVE_HANDLING_OPTIONS.NEXT_STEP,
    data: {},
  });
  const {
    modalState: { visible, bobject },
    setModalState,
    handleSubmit,
    cadenceInfo,
  } = useInactiveHandlingModal(selectedOptionData);

  const { oppNurturingValues } = useOpportunity('inactive');
  const isSalesBobject = checkIsSalesBobject(bobject);
  const hasOnHoldReasons =
    useGlobalPicklistValues({
      logicRole: GLOBAL_PICKLISTS.ON_HOLD_REASONS,
    })?.filter(reason => reason.enabled)?.length !== 0;

  const isMissingInfo = getIsMissingInfo({
    selectedOptionData,
    cadenceInfo,
    hasNeededNurturingInfo:
      bobject?.id?.typeName !== 'Opportunity' ||
      (oppNurturingValues?.length > 0 ? selectedOptionData?.data?.nurturingStage : true),
    hasOnHoldReasons,
    isSalesBobject,
  });

  return (
    <Modal width={680} open={visible} onClose={() => setModalState({ visible: false })}>
      <ModalHeader className={styles._modal_header}>
        <ModalTitle color="peanut" icon="company" size="small">
          This {bobject?.id?.typeName.toLowerCase()} will become inactive
        </ModalTitle>
        <ModalCloseIcon
          color="peanut"
          size="small"
          onClick={() => setModalState({ visible: false })}
        />
      </ModalHeader>
      <ModalContent className={styles._modal_content}>
        <ModalSection
          size="m"
          title="👉 Here are some suggestions to avoid this!"
          data-text={'ModalSection-Cadence'}
        >
          <>
            <div className={styles._sections_container} onMouseEnter={loadActionForm}>
              <ActionSelector
                selectedOptionHandler={[selectedOptionData, setSelectedOptionData]}
                bobjectType={bobject?.id?.typeName as MainBobjectTypes}
              />
              <InformationPanel selectedOption={selectedOptionData} />
            </div>
            <React.Suspense fallback={<Skeleton key={'actionForm'} />}>
              <ActionForm
                selectedOptionHandler={[selectedOptionData, setSelectedOptionData]}
                bobject={bobject}
                isSalesBobject={isSalesBobject}
              />
            </React.Suspense>
          </>
        </ModalSection>
      </ModalContent>
      <ModalFooter className={styles._modal_footer}>
        <div>
          <Button variant="clear" onClick={() => setModalState({ visible: false })} uppercase>
            cancel
          </Button>
        </div>
        <Tooltip title={isMissingInfo ? 'Required info missing' : ''} position="top">
          <Button onClick={handleSubmit} disabled={isMissingInfo} uppercase>
            confirm
          </Button>
        </Tooltip>
      </ModalFooter>
    </Modal>
  );
};
