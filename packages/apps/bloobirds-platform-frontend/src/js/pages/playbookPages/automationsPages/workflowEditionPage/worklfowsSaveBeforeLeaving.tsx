import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { APP_PLAYBOOK_MESSAGING_WORKFLOWS } from '../../../../app/_constants/routes';
import { useQueryParam } from '../../../../hooks/useQueryParams';
import { useSidebar } from '../../../../hooks/useSidebar';
import styles from './workflowEditionPage.module.css';
import { useRouter } from '../../../../hooks';

export const WorklfowsSaveBeforeLeaving = ({ handleClose }: { handleClose: () => void }) => {
  const fromUrl = useQueryParam('from');
  const { toggle } = useSidebar();
  const { history } = useRouter();

  const handleBack = () => {
    history.push(fromUrl || APP_PLAYBOOK_MESSAGING_WORKFLOWS);
    toggle();
  };

  return (
    <Modal open={true} width={700} onClose={() => {}} variant="primary">
      <ModalHeader color="verySoftPurple">
        <ModalTitle>Unsaved changes</ModalTitle>
        <ModalCloseIcon color="purple" onClick={handleClose} />
      </ModalHeader>
      <ModalContent>
        <div className={styles._section_container}>
          <Text size="m">
            You have changes in the workflow that are not saved yet. If you leave now they will be
            disarded. This action cannot be undone. Are you sure you want to continue?
          </Text>
        </div>
      </ModalContent>
      <ModalFooter className={styles._handle_unsaved_changes}>
        <Button variant="clear" color="tomato" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="purple" onClick={handleBack}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};
