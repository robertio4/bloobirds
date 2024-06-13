import { useTranslation } from 'react-i18next';

import {
  IconButton,
  Modal,
  ModalCloseIcon,
  ModalHeader,
  ModalTitle,
} from '@bloobirds-it/flamingo-ui';

import { useTaskForm } from '../hooks/useTaskForm';
import { TaskForm } from '../taskForm/taskForm';
import styles from './taskStaticModal.module.css';

export const TaskStaticModal = ({ id }: { id: string }) => {
  const taskFormHookValues = useTaskForm(id);
  const { isEditionModal, handleMinimize, handleClose } = taskFormHookValues || {};
  const { t } = useTranslation();

  return (
    <Modal open={true} onClose={handleClose} width={460}>
      <ModalHeader size="small">
        <ModalTitle size="small" icon="checkDouble">
          {isEditionModal ? t('common.edit') : t('common.create')} {t('bobjectTypes.task')}
        </ModalTitle>
        <div>
          <IconButton
            name="minus"
            size={24}
            onClick={() => {
              // @ts-ignore
              handleMinimize();
            }}
          />
          <ModalCloseIcon onClick={handleClose} size="small" />
        </div>
      </ModalHeader>
      <div className={styles.container}>
        <TaskForm isWebapp modalId={id} {...taskFormHookValues} />
      </div>
    </Modal>
  );
};
