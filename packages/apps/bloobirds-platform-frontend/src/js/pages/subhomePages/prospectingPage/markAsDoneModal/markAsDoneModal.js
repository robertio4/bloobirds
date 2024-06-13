import React from 'react';
import { Button, Modal, ModalContent, ModalFooter, Text } from '@bloobirds-it/flamingo-ui';
import { useTaskDone } from '../../../../hooks';
import styles from './markAsDoneModal.module.css';
import useMarkAsDone from '../../../../hooks/useMarkAsDone';
import { useParams } from 'react-router';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import mixpanel from 'mixpanel-browser';

const MarkAsDoneModal = ({ onSave = () => {} }) => {
  const { taskId, closeMarkAsDoneModal } = useMarkAsDone();
  const { showToast } = useTaskDone();
  const { slug } = useParams();

  let completableTasks = taskId.filter(item => !item.disabled);
  if ('disabled' in taskId) completableTasks = taskId;
  const completableTasksIds = completableTasks.map(task => task.id.objectId);
  const handleOnSave = () => {
    showToast(true, completableTasksIds);
    onSave();
  };
  return (
    <Modal width={600} title={'Confirm Mark as done'} open onClose={closeMarkAsDoneModal}>
      <ModalContent>
        {completableTasks.length !== 0 ? (
          <div className={styles._message_wrapper}>
            <Text size="m">
              This action will mark as done <b>{completableTasks?.length}</b> tasks.
              <>
                <br />
                {completableTasks.length !== taskId.length && (
                  <Text size="m">
                    {taskId.length - completableTasks.length} tasks will be excluded from the action
                    because an attempt before completing the task is required.
                  </Text>
                )}
                <br />
                <b>Do you want continue?</b>
              </>
            </Text>
          </div>
        ) : (
          <div className={styles._message_wrapper}>
            <Text size="m">
              None of the selected actions can be completed, an attempt is required before
              completing a task.
            </Text>
          </div>
        )}
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          <Button variant="clear" color="tomato" onClick={closeMarkAsDoneModal}>
            Cancel
          </Button>
          <Button
            disabled={completableTasks.length === 0}
            dataTest="Form-Save"
            onClick={() => {
              mixpanel.track(
                `${MIXPANEL_EVENTS.MARK_AS_DONE_BULK_ACTION_CONFIRMED_ON_ + slug}_TAB`,
              );
              handleOnSave();
              closeMarkAsDoneModal();
            }}
          >
            Accept
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default MarkAsDoneModal;
