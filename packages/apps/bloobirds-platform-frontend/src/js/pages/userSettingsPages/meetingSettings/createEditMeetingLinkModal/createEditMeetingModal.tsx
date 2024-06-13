import React, { useEffect } from 'react';
import {
  Button,
  Checkbox,
  Icon,
  Input,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import styles from './createEditModal.modules.css';
import { useMeetingLink } from '../../../../hooks/useMeetingLinks';
import { useForm, useController } from 'react-hook-form';
import { MeetingLink } from '../../../../typings/messaging';
import { isUrl } from '../../../../misc/utils';

//This SHOULDN'T be necessary
const defaultState: {
  title: string;
  url: string;
  defaultLink: boolean;
} = {
  title: undefined,
  url: undefined,
  defaultLink: false,
};
interface CreateEditMeetingModalProps {
  isOpen: boolean;
  openDelete: () => void;
  closeModals: () => void;
  modalInfo: { entity: MeetingLink; openedModal: string };
}

export const CreateEditMeetingModal = ({
  isOpen,
  openDelete,
  closeModals,
  modalInfo,
}: CreateEditMeetingModalProps) => {
  const meeting = modalInfo?.entity;
  const { control, handleSubmit, errors, reset } = useForm<Partial<MeetingLink>>({
    defaultValues: meeting || defaultState,
  });
  const { create, update } = useMeetingLink();
  const isEdit = !!meeting;

  function handleClose() {
    reset(defaultState);
    closeModals();
  }

  function handleDelete() {
    reset(defaultState);
    openDelete();
  }

  useEffect(() => {
    if (isEdit && meeting) {
      reset(meeting);
    }
  }, [isEdit]);

  function handleSave(data: MeetingLink) {
    isEdit
      ? update({ ...modalInfo.entity, ...data }).then(handleClose)
      : create(data).then(handleClose);
  }

  const { field: titleField } = useController({
    control,
    defaultValue: meeting?.title,
    name: 'title',
    rules: {
      required: true,
    },
  });

  const { field: meetingLinkField } = useController({
    control,
    defaultValue: meeting?.url,
    name: 'url',
    rules: {
      required: true,
      validate: data => {
        if (!isUrl(data)) {
          return 'The url format is not valid';
        }
        return true;
      },
    },
  });

  const {
    field: { onChange },
  } = useController({
    control,
    defaultValue: false,
    name: 'defaultLink',
  });
  const hasMissingFields = [meetingLinkField.value, titleField.value].some(value => !value);

  return (
    <Modal width="745px" open={isOpen} onClose={handleClose}>
      <ModalHeader className={styles._modal_header}>
        <ModalTitle color="peanut" size="small">
          {isEdit ? 'Edit' : 'Create'} new Meeting Link
        </ModalTitle>
        <ModalCloseIcon color="peanut" size="small" onClick={handleClose} />
      </ModalHeader>
      <ModalContent className={styles._modal_content}>
        <form>
          <div className={styles._banner}>
            <div className={styles.line} style={{ color: 'var(--verySoftPeanut)' }} />
            <div className={styles.badge}>
              <Icon name="calendar" color="softPeanut" size={48} />
            </div>
          </div>
          <div className={styles._modal_content_text}>
            <Text size="m" weight="bold">
              Choose when your meetings can be booked 🗓
            </Text>
            <Text size="m" color="softPeanut">
              Set a title and link an external schedule, so your clients will know exactly when you
              can schedule a meeting with them.
            </Text>
            <div className={styles._inputs_container}>
              <Input width="578px" placeholder="Title *" {...titleField} />
              <Input
                width="578px"
                placeholder="Meeting Link *"
                {...meetingLinkField}
                error={errors?.url?.message}
              />
            </div>
          </div>
        </form>
      </ModalContent>
      <ModalFooter className={styles._modal_buttons}>
        <div>
          <Button uppercase variant="clear" onClick={handleClose}>
            Cancel
          </Button>
          {isEdit && (
            <Button uppercase variant="clear" color="tomato" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
        <div className={styles._end_buttons}>
          <div className={styles._check_input}>
            <Checkbox size="small" defaultChecked={false} onClick={onChange}>
              Set as default
            </Checkbox>
          </div>
          <Button
            uppercase
            className={styles._save_button}
            disabled={hasMissingFields}
            onClick={handleSubmit(handleSave)}
          >
            {isEdit ? 'Save changes' : 'Create'}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
