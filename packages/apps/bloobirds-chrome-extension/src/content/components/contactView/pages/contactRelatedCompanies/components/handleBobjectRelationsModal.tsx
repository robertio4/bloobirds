import { Trans } from 'react-i18next';

import { Modal, ModalCloseIcon, ModalHeader, ModalTitle } from '@bloobirds-it/flamingo-ui';
import { useMachine } from '@xstate/react';

import styles from '../contactRelatedCompanies.module.css';
import {
  AddRelatedBobjectBody,
  ConfirmationBody,
  DeleteParent,
  InitialModalBody,
} from './modalBodies';
import { STATES, stepsMachine } from './relatedBobject.machine';

function getTitle(step) {
  switch (step) {
    default:
      return <Trans i18nKey="sidePeek.contactRelatedCompanies.addRelatedCompany" />;
    case STATES.PARENT:
      return <Trans i18nKey="sidePeek.contactRelatedCompanies.addParentCompany" />;
    case STATES.CHILD:
      return <Trans i18nKey="sidePeek.contactRelatedCompanies.addChildCompany" />;
  }
}
const ModalBody = ({ step, ...props }: { step: STATES; context: any }) => {
  switch (step) {
    default:
      return <InitialModalBody {...props} />;
    case STATES.PARENT:
    case STATES.CHILD:
      return <AddRelatedBobjectBody type={step} {...props} />;
    case STATES.CONFIRM:
      return <ConfirmationBody {...props} />;
    case STATES.DELETE_PARENT:
      return <DeleteParent {...props} />;
  }
};

export const HandleBobjectRelationsModal = ({ initialStep, data, handleCloseModal }) => {
  const [{ value: step, context }, send] = useMachine(stepsMachine(initialStep), {
    context: {
      ...data,
      handleClose: handleCloseModal,
    },
  });
  const companyName = data.company?.name;
  const title = getTitle(step);

  return (
    <Modal width="472px" open onClose={handleCloseModal}>
      <ModalHeader className={styles._modal_header}>
        <ModalTitle color="peanut" icon="company" size="small">
          {title}
        </ModalTitle>
        <ModalCloseIcon color="peanut" size="small" onClick={handleCloseModal} />
      </ModalHeader>
      <ModalBody step={step} context={context} send={send} companyName={companyName} />
    </Modal>
  );
};
