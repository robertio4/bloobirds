import React from 'react';

import { ConfirmCloseModal } from '@bloobirds-it/confirm-close-modal';
import { SmartEmailModal } from '@bloobirds-it/email';
import { IconButton, IconType, Text } from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserId,
  useDataModel,
  useEmailConnections,
  useMeetingLinks,
  useMinimizableModal,
  useMinimizableModals,
  useMinimizableStore,
} from '@bloobirds-it/hooks';
import { MeetingModal } from '@bloobirds-it/meeting';
import { MinimizableModalType, Bobject, BobjectTypes } from '@bloobirds-it/types';
import classNames from 'clsx';
import { capitalize } from 'lodash';

import { APP_MANAGEMENT_USER, bobjectUrl } from '../../app/_constants/routes';
import { useRouter } from '../../hooks';
import TaskModalWrapper from '../taskModalWrapper/taskModalWrapper';
import { useUserSettings } from '../userPermissions/hooks';
import BobjectFormModal from './bobjectFormModal';
import styles from './minimizableModals.module.css';

const icons: Record<Exclude<MinimizableModalType, 'handleTemplate'>, IconType> = {
  email: 'mail',
  meeting: 'calendar',
  note: 'noteAction',
  task: 'taskAction',
  calendarMeeting: 'calendar',
};

const GenericModal = ({ type, id }: { type: MinimizableModalType; id: string }) => {
  const { isLoading: areMeetingLinksLoading } = useMeetingLinks();
  const settings = useUserSettings();
  const userId = settings.user.id;
  const accountId = settings.account.id;
  const activeUserId = useActiveUserId();
  const {
    data: { lead, opportunity, company, leads, pageBobjectType, mode },
    closeModal,
  } = useMinimizableModal<Record<string, any>>(id);
  const { connections, mutate: mutateConnections } = useEmailConnections();
  const { history } = useRouter();
  const dataModel = useDataModel();

  switch (type) {
    case 'email':
      if (areMeetingLinksLoading || !activeUserId) {
        return null;
      } else {
        return (
          <SmartEmailModal
            id={id}
            user={{ id: userId }}
            accountId={accountId}
            connections={connections}
            mutateConnections={mutateConnections}
            emailSettingsRedirect={() => {
              closeModal();
              window.open(APP_MANAGEMENT_USER, '_blank');
            }}
            handleRedirect={() => {}}
            dataModel={dataModel}
            statusActivityRedirect={(bobject: Bobject) => {
              history.push(bobjectUrl(bobject));
              closeModal();
            }}
            bobjectsInfo={{
              activeBobject: pageBobjectType === BobjectTypes.Company ? company : lead,
              company,
              lead,
              leads,
              opportunity,
              pageBobjectType,
            }}
            mode={mode}
            userSettings={settings?.user}
          />
        );
      }
    case 'meeting':
    case 'note':
      return <BobjectFormModal id={id} bobjectType="Activity" type={capitalize(type)} />;
    case 'task':
    case 'taskStatic':
      return <TaskModalWrapper id={id} />;
    case 'calendarMeeting':
      return (
        <MeetingModal
          id={id}
          accountId={settings?.account?.id}
          userId={settings?.user.id}
          connections={connections}
          settings={settings}
          mutateConnections={mutateConnections}
          dataModel={dataModel}
        />
      );
    default:
      return null;
  }
};

const MinimizedModal = ({ id }: { id: string }) => {
  const { maximize, type, title, openConfirmModal } = useMinimizableModal(id);

  return (
    <div className={classNames(styles._minimizedModal__container, styles[type])} onClick={maximize}>
      <IconButton
        name={icons[type as keyof typeof icons]}
        color="white"
        size={16}
        onClick={maximize}
      />
      <Text color="white" size="s" weight="medium" ellipsis={24}>
        {title}
      </Text>
      <IconButton name="maximize" color="white" size={16} onClick={maximize} />
      <IconButton
        name="cross"
        color="white"
        size={18}
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
          openConfirmModal();
        }}
      />
    </div>
  );
};

const MinimizableModal = ({ id }: { id: string }) => {
  const { open, type } = useMinimizableModal(id);

  if (open) {
    return <GenericModal type={type} id={id} />;
  }

  return <MinimizedModal id={id} />;
};

const MinimizableModals = () => {
  const { minimizableModals, confirmationModal } = useMinimizableModals();
  useMinimizableStore();

  return (
    <div className={styles._container}>
      {confirmationModal.open && <ConfirmCloseModal />}
      {minimizableModals.map(({ id }: { id: string }) => (
        <MinimizableModal id={id} key={id} />
      ))}
    </div>
  );
};

export default MinimizableModals;
