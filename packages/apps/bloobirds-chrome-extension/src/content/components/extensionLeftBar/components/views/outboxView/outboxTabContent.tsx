import {
  ScheduleEmailModal,
  SendEmailModal,
  PreviewEmailModal,
  CancelEmailModal,
} from '@bloobirds-it/email';
import { useBobject } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  MessagesEvents,
} from '@bloobirds-it/types';
import { EmailModalType, ModalType } from '@bloobirds-it/utils';

import { useExtensionContext } from '../../../../context';
import { useSubhomeContext } from '../../layouts/subhomeLayout/subhomeLayout';
import { ViewPropsType } from '../views';
import { OutboxTabFilters } from './filters/outboxTabFilters';
import { OutboxTabList } from './list/outboxTabsList';

const OutboxTabContent = ({ parentRef }: ViewPropsType) => {
  const {
    query,
    setSelectedQuickFilter,
    setOpenedModalInfo,
    openedModalInfo: { openedModal, bobject },
    isLoading,
  } = useSubhomeContext();
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;

  const { patchBobject, bulkPatchBobjects } = useBobject(BobjectTypes.Task, accountId);

  const rescheduleEmail = ({
    bobject,
    datetime,
  }: {
    bobject: Bobject | Bobject[];
    datetime: Date;
  }) => {
    if (Array.isArray(bobject)) {
      let data: any;
      bobject.forEach(bobjectItem => {
        data = {
          ...data,
          [bobjectItem?.id.objectId]: {
            [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: datetime,
            [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
            [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
          },
        };
      });
      bulkPatchBobjects(data).then(() => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Task },
          }),
        );
      });
    } else {
      const data = {
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: datetime,
        [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      };
      patchBobject(bobject?.id?.objectId, data).then(() => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Task },
          }),
        );
      });
    }
  };

  function handleClose() {
    setOpenedModalInfo({ openedModal: undefined, bobject: undefined });
  }

  const isRescheduleEmail = openedModal === ModalType.RESCHEDULE_EMAIL;
  const isSendNowEmail = openedModal === ModalType.SEND_NOW_EMAIL;
  const isRetryEmail = openedModal === ModalType.RETRY_EMAIL;
  const isPreviewEmail = openedModal === ModalType.PREVIEW_EMAIL;
  const isCancelEmail = openedModal === ModalType.CANCEL_EMAIL;

  return (
    <>
      <OutboxTabFilters
        onToggleSelected={quickFilterSelected => {
          setSelectedQuickFilter(quickFilterSelected);
        }}
      />
      {Object.keys(query).length > 0 ? (
        <OutboxTabList parentRef={parentRef} isLoading={isLoading} />
      ) : null}
      {isRescheduleEmail && (
        <ScheduleEmailModal
          emails={[]}
          onClose={() => handleClose()}
          onSubmit={async ({ date }) => {
            handleClose();
            rescheduleEmail({ bobject: bobject, datetime: date });
            window.dispatchEvent(
              new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                detail: { type: BobjectTypes.Task },
              }),
            );
          }}
        />
      )}
      {isSendNowEmail && (
        <SendEmailModal
          bobject={bobject}
          modalType={EmailModalType.SEND}
          onClose={() => handleClose()}
          onSubmit={() => {
            window.dispatchEvent(
              new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                detail: { type: BobjectTypes.Task },
              }),
            );
          }}
        />
      )}
      {isRetryEmail && (
        <SendEmailModal
          bobject={bobject}
          modalType={EmailModalType.RETRY}
          onClose={() => handleClose()}
          onSubmit={() => {
            window.dispatchEvent(
              new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                detail: { type: BobjectTypes.Task },
              }),
            );
          }}
        />
      )}
      {isPreviewEmail && (
        <PreviewEmailModal taskId={bobject?.id?.objectId} onClose={() => handleClose()} />
      )}
      {isCancelEmail && (
        <CancelEmailModal
          handleClose={handleClose}
          open
          bobject={bobject}
          onSubmit={() => {
            window.dispatchEvent(
              new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                detail: { type: BobjectTypes.Task },
              }),
            );
          }}
        />
      )}
    </>
  );
};

export default OutboxTabContent;
