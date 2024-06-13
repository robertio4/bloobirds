import {
  Button,
  Checkbox,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { useWorkflow } from './context/workflowsContext';
import styles from './workflowEditionPage.module.css';

export const WorkflowSettingsModal = ({ onSave, onClose }: { onSave: any; onClose: any }) => {
  const {
    updateRunOnlyOnce,
    updateAnyoneCanEdit,
    state: { runOnlyOnce, anyoneCanEdit },
  } = useWorkflow();

  const handleSave = ({ enable }: { enable: boolean }) => {
    onSave({ enable });
    onClose();
  };

  return (
    <Modal open={true} width={700} onClose={onClose} variant="primary">
      <ModalHeader color="verySoftPurple">
        <ModalTitle>Save settings</ModalTitle>
        <ModalCloseIcon color="purple" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalSection title="Workflow trigger settings" icon="refresh">
          <div className={styles._section_container}>
            <Text size="m" weight="bold">
              Do you want to trigger only once every object in this workflow?
            </Text>
            <Text size="xs" color="softPeanut">
              This trigger will only fire once for each object that matches the trigger criteria.
            </Text>
            <Checkbox
              color="purple"
              size="small"
              onClick={() => updateRunOnlyOnce(!runOnlyOnce)}
              checked={runOnlyOnce}
            >
              Trigger only once per object
            </Checkbox>
          </div>
        </ModalSection>
        <ModalSection
          title="Workflow edit permission settings"
          icon="personAdd"
          className={styles._edit_permission_section}
        >
          <div className={styles._section_container}>
            <Text size="m" weight="bold">
              Do you want to allow other users to edit this workflow?
            </Text>
            <Text size="xs" color="softPeanut">
              Workflow edition will become available to all users.
            </Text>
            <Checkbox
              color="purple"
              size="small"
              onClick={() => updateAnyoneCanEdit(!anyoneCanEdit)}
              checked={anyoneCanEdit}
            >
              Allow other users to edit the workflow
            </Checkbox>
          </div>
        </ModalSection>
      </ModalContent>
      <ModalFooter className={styles._settings_modal_buttons}>
        <Button variant="secondary" color="purple" onClick={() => handleSave({ enable: true })}>
          Save and enable
        </Button>
        <Button color="purple" onClick={() => handleSave({ enable: false })}>
          Save settings
        </Button>
      </ModalFooter>
    </Modal>
  );
};
