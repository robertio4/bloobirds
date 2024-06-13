import React from 'react';
import {
  Button,
  Icon,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import styles from './deleteCadenceStepModal.module.css';
import { useQueryParam } from '../../../../hooks/useQueryParams';
import useDeleteCadenceStepModal from '../../../../hooks/useDeleteCadenceStepModal';
import { useCadenceSteps } from '@bloobirds-it/cadence';

const DeleteCadenceStepModal = ({
  onClose,
  refreshCadences,
}: {
  onClose: () => void;
  refreshCadences: () => void;
}) => {
  const cadenceId = useQueryParam('cadence', true);
  const { deleteStep, loading } = useCadenceSteps(cadenceId);
  const { stepId, closeModal } = useDeleteCadenceStepModal();
  const { createToast } = useToasts();

  return (
    <Modal width={640} open onClose={onClose}>
      <ModalHeader color="veryLightBloobirds" variant="primary" size="small">
        <ModalTitle variant="primary" color="peanut" size="small">
          <div className={styles.title}>
            <Icon name="trashFull" color="softBloobirds" />
            Delete step
          </div>
        </ModalTitle>
        <ModalCloseIcon variant="primary" color="bloobirds" size="small" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <div className={styles.content}>
          <Text size="m" weight="bold">
            Are you sure you want to delete step?{' '}
          </Text>
          <Text size="s">
            👉 Changes to delete steps{' '}
            <b>will only apply to started cadences after saving your changes</b>.
          </Text>
          <Text size="s">
            Already enrolled leads, companies or opportunities, will need to be unenrolled then
            re-enrolled to go through the updated cadence steps.
          </Text>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className={styles.buttons}>
          <Button variant="secondary" key="backButton" onClick={onClose}>
            Back
          </Button>
          <Button
            variant="primary"
            key="deleteButton"
            color="tomato"
            onClick={() => {
              deleteStep(stepId).then(() => {
                refreshCadences();
                createToast({ message: 'Step deleted successfully!', type: 'success' });
                closeModal();
              });
            }}
          >
            {loading ? <Spinner size={16} color="white" name="loadingCircle" /> : 'Delete'}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteCadenceStepModal;
