import { useState } from 'react';

import { ConfirmDeleteModal } from '@bloobirds-it/bobjects';
import { ConfirmCloseModal } from '@bloobirds-it/confirm-close-modal';
import { SmartEmailModal } from '@bloobirds-it/email';
import { IconButton, IconType, Portal, Text } from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserId,
  useMeetingLinks,
  useMinimizableModal,
  useMinimizableModals,
  useMinimizableStore,
} from '@bloobirds-it/hooks';
import { MeetingModal } from '@bloobirds-it/meeting';
import { HandleTemplateModal } from '@bloobirds-it/playbook';
import { TaskStaticModal } from '@bloobirds-it/tasks';
import { Bobject, BobjectTypes, ExtensionBobject, MinimizableModalType, TemplateStage } from "@bloobirds-it/types";
import { getExtensionBobjectByIdFields, baseUrls } from '@bloobirds-it/utils';
import classNames from 'clsx';

import { useExtensionContext } from '../context';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import { NoteModal } from '../noteModal/noteModal';
import { TaskModal } from '../taskModal/taskModal';
import styles from './minimizableModals.module.css';

const icons: Record<Exclude<MinimizableModalType, 'handleTemplate'>, IconType> = {
  email: 'mail',
  meeting: 'calendar',
  note: 'noteAction',
  task: 'taskAction',
  taskStatic: 'taskAction',
  calendarMeeting: 'calendar',
};

interface MinimizableModalDataProps {
  lead: Bobject<BobjectTypes.Lead>;
  leads: Bobject<BobjectTypes.Lead>[];
  company: Bobject<BobjectTypes.Company>;
  opportunity: Bobject<BobjectTypes.Opportunity>;
  opportunities: Bobject<BobjectTypes.Opportunity>[];
  pageBobjectType: BobjectTypes;
  mode: 'create' | 'edit';
  template?: any;
  stage?: TemplateStage;
  onSaveCallback?: () => void;
  onDeleteCallback?: () => void;
}
const GenericModal = ({ type, id }: { type: MinimizableModalType; id: string }) => {
  const { useGetSettings, useGetDataModel, setActiveBobject } = useExtensionContext();
  const { isLoading: areMeetingLinksLoading } = useMeetingLinks();
  const { getConnections, getMutateConnections } = useFloatingMenuContext();
  const settings = useGetSettings();
  const dataModel = useGetDataModel();
  const connections = getConnections();
  const mutateConnections = getMutateConnections();
  const userId = settings?.user?.id;
  const accountId = settings?.account?.id;
  const {
    data: {
      lead,
      leads,
      company,
      opportunity,
      opportunities,
      pageBobjectType,
      mode,
      template,
      stage,
      onSaveCallback,
      onDeleteCallback,
    },
    closeModal,
  } = useMinimizableModal<MinimizableModalDataProps>(id);
  //need to check availability before opening modal
  const activeUserId = useActiveUserId();
  const baseUrl = baseUrls[process.env.NODE_ENV];
  const [transformedBobject, setTransformedBobject] = useState<ExtensionBobject>();

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
              window.open(`${baseUrl}/app/management/user`, '_blank');
            }}
            handleRedirect={() => null}
            dataModel={dataModel}
            statusActivityRedirect={(bobject: Bobject) => {
              // TODO: To be replaced with extension redirect type
              getExtensionBobjectByIdFields(bobject.id).then(({ data }) =>
                setTransformedBobject(data),
              );
              setActiveBobject(transformedBobject);
              closeModal();
            }}
            bobjectsInfo={{
              activeBobject:
                pageBobjectType === BobjectTypes.Company ? company : lead ?? opportunity,
              company,
              lead,
              leads,
              opportunity,
              opportunities,
              pageBobjectType,
            }}
            mode={mode}
            isExtension
            userSettings={settings?.user}
          />
        );
      }
    case 'meeting':
    case 'note':
      return <NoteModal id={id} />;
    case 'task':
      return <TaskModal id={id} />;
    case 'taskStatic':
      return <TaskStaticModal id={id} />;
    case 'calendarMeeting':
      return (
        <MeetingModal
          id={id}
          accountId={accountId}
          userId={userId}
          settings={settings}
          connections={connections}
          mutateConnections={mutateConnections}
          dataModel={dataModel}
        />
      );
    case 'handleTemplate':
      return (
        <HandleTemplateModal
          template={template}
          handleClose={closeModal}
          contextValues={{ onSaveCallback, onDeleteCallback, ...(stage ? { stage } : {}) }}
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
      <IconButton name={icons[type]} color="white" size={16} onClick={maximize} />
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
    <Portal>
      <div className={styles._container}>
        {confirmationModal.open && <ConfirmCloseModal />}
        <ConfirmDeleteModal />
        {minimizableModals?.map(({ id }: { id: string }) => (
          <MinimizableModal id={id} key={id} />
        ))}
      </div>
    </Portal>
  );
};

export default MinimizableModals;
