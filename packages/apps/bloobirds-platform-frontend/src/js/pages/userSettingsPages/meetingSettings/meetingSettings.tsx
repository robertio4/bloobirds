import React from 'react';

import { Button, Text } from '@bloobirds-it/flamingo-ui';
// @ts-ignore
import { useMeetingLinks } from '@bloobirds-it/hooks';

import { useUserSettings } from '../../../components/userPermissions/hooks';
import { ConfirmDeleteModalLayout } from '../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import { LoadingSpinner } from '../../homePage/pages/leftContent/utils/utils';
import { CreateEditMeetingModal } from './createEditMeetingLinkModal/createEditMeetingModal';
import {
  MeetingEntityCard,
  MeetingEntityHeader,
  MeetingSettingsEntityList,
} from './entityList/meetingEntityList';
import styles from './meetingSettings.module.css';
import { useMeetingSettings } from './useMeetingSettings';

export enum ACTION_TYPES {
  ADD = 'ADD',
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  STAR = 'STAR',
}

export const MeetingSettings = () => {
  const settings = useUserSettings();
  const {
    modalInfo,
    setModalInfo: setModalProps,
    onCreate,
    onStar,
    onDelete,
    closeModals,
  } = useMeetingSettings();

  const { getUserMeetingLinks, mutate, isLoading } = useMeetingLinks();
  const meetingLinks = getUserMeetingLinks(settings?.user?.id);

  const hasMeetingLinks = Array.isArray(meetingLinks) && meetingLinks?.length > 0;

  function handleClose() {
    mutate();
    closeModals();
  }
  return (
    <>
      <MeetingSettingsEntityList>
        <MeetingEntityHeader key="listHeader" title="My meeting links">
          <Button size="small" onClick={onCreate}>
            + Add link
          </Button>
        </MeetingEntityHeader>
        {isLoading ? (
          <LoadingSpinner />
        ) : hasMeetingLinks ? (
          meetingLinks.map(meeting => (
            <MeetingEntityCard
              key={meeting.id}
              entity={meeting}
              onOpenDelete={() => setModalProps({ openedModal: 'DELETE', entity: meeting })}
              onOpenEdit={() => setModalProps({ openedModal: 'EDIT&CREATE', entity: meeting })}
              onStar={() => onStar(meeting).then(() => mutate())}
            />
          ))
        ) : (
          <div className={styles.noLinks}>
            <Text size="m" weight="bold">
              No meeting links created!
            </Text>
            <Text size="m">
              Select the time of the day when you’re available for your meetings and create a link
              to send your clients to book meetings 📅
            </Text>
          </div>
        )}
      </MeetingSettingsEntityList>
      {modalInfo?.openedModal === 'DELETE' && (
        <ConfirmDeleteModalLayout
          assetLabel="Meeting link"
          handleDelete={() => {
            onDelete().then(() => handleClose());
          }}
          handleClose={closeModals}
        >
          You’re about to delete a Meeting Link. The following action cannot be undone. Do you wish
          to continue?
        </ConfirmDeleteModalLayout>
      )}
      <CreateEditMeetingModal
        isOpen={modalInfo?.openedModal === 'EDIT&CREATE'}
        closeModals={handleClose}
        modalInfo={modalInfo}
        openDelete={() => setModalProps({ ...modalInfo, openedModal: 'DELETE' })}
      />
    </>
  );
};
