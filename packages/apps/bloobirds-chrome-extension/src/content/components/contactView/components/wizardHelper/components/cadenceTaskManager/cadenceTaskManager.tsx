import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CadenceControlModal } from '@bloobirds-it/cadence';
import { useToasts } from '@bloobirds-it/flamingo-ui';
import { useTasksFeed } from '@bloobirds-it/hooks';
import { BobjectTypes, ExtensionBobject, MessagesEvents } from '@bloobirds-it/types';
import { useSWRConfig } from 'swr';

import { useExtensionContext } from '../../../../../context';
import { useSubscribeListeners } from '../../../../hooks/useSubscribeListeners';
import { WizardHelpers } from '../../wizardHelper';
import { StartCadenceHelper } from '../startCadenceHelper/startCadenceHelper';
import { TodayTasksHelper } from '../todayTasksHelper/todayTasksHelper';
import { hasOngoingCadenceTasks } from './utils/cadenceTaskManager.utils';

const RenderHelper = ({
  toggleCadenceControlVisibility,
  bobject,
  cadenceControlCallback,
  minimized,
  step,
  isLoading,
  hasCadenceTasks,
}) => {
  switch (step) {
    case WizardHelpers.START_CADENCE:
      return (
        <StartCadenceHelper
          bobject={bobject}
          cadenceControlCallback={cadenceControlCallback}
          isLoading={isLoading}
          minimized={minimized}
        />
      );
    case WizardHelpers.TODAY_TASKS:
      return (
        <TodayTasksHelper
          hasCadenceTasks={hasCadenceTasks}
          isLoading={isLoading}
          minimized={minimized}
          toggleCadenceControlVisibility={toggleCadenceControlVisibility}
        />
      );
    //case WizardHelpers.HANDLE_INACTIVE:
    //  return <InactiveBobjectHelper />;
    default:
      return <></>;
  }
};

interface CadenceTaskManagerProps {
  bobject: ExtensionBobject;
  relatedCompany?: ExtensionBobject<BobjectTypes.Company>;
  minimized?: boolean;
}
export const CadenceTaskManager = ({
  bobject,
  relatedCompany,
  minimized,
}: CadenceTaskManagerProps) => {
  const { t } = useTranslation();
  const { cache } = useSWRConfig();
  const {
    useGetActiveBobjectContext,
    useGetActiveBobject,
    useGetSettings,
    refreshActiveBobjectContext,
  } = useExtensionContext();
  const settings = useGetSettings();
  const activeBobject = useGetActiveBobject();
  const contextData = useGetActiveBobjectContext();
  const { tasks } = useTasksFeed(activeBobject, contextData, useSubscribeListeners);
  const cadenceAction = useRef(null);
  const [isProcessingTasks, setIsProcessingTasks] = useState(false);
  const [placeholderLoading, setPlaceholderLoading] = useState(true);
  const [cadenceControlVisibility, setCadenceControlVisibility] = useState<boolean>(false);
  const taskRequestSWRKey = `/tasksFeed/${bobject?.id?.value}/1/25`;
  const hasLoadedTasks = !!cache.get(taskRequestSWRKey);

  const hasCadenceTasks = useMemo(() => hasOngoingCadenceTasks(bobject, tasks), [tasks?.length]);
  const isLead = bobject?.id?.typeName === BobjectTypes.Lead;

  const step = tasks?.length > 0 ? WizardHelpers.TODAY_TASKS : WizardHelpers.START_CADENCE;

  const { createToast } = useToasts();

  function toggleCadenceControlVisibility() {
    setCadenceControlVisibility(!cadenceControlVisibility);
  }

  function cadenceControlCallback(action: 'reschedule' | 'start' | 'stop') {
    setIsProcessingTasks(true);
    if (isLead && relatedCompany) {
      cache.delete(`/tasksFeed/${relatedCompany?.id?.value}/1/25`);
    }
    cadenceAction.current = action;
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: { type: BobjectTypes.Task },
        }),
      );
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: { type: bobject?.id?.typeName },
        }),
      );
      refreshActiveBobjectContext();
      setTimeout(() => {
        setPlaceholderLoading(false);
      }, 800);
    }, 2000);
  }

  useEffect(() => {
    const isCached = cache.get(taskRequestSWRKey);
    const isStopping = cadenceAction?.current === 'stop' && !hasCadenceTasks;
    const isStarting = cadenceAction?.current === 'start' && hasCadenceTasks;
    const isRescheduling = cadenceAction?.current === 'reschedule' && hasCadenceTasks;
    const hasFinishedProcessing = isStarting || isStopping || isRescheduling;
    if (isCached && isProcessingTasks && hasFinishedProcessing) {
      createToast({
        type: 'success',
        message: hasCadenceTasks
          ? t('sidePeek.overview.toasts.cadenceTasksAdded')
          : t('sidePeek.overview.toasts.cadenceTasksDeleted'),
      });
      setIsProcessingTasks(false);
    }
  }, [hasCadenceTasks]);

  useEffect(() => {
    if (placeholderLoading && hasLoadedTasks) {
      const processHasEnded =
        cadenceAction?.current === null ||
        cadenceAction?.current !== 'reschedule' ||
        (cadenceAction?.current === 'reschedule' && tasks?.length);
      setPlaceholderLoading(false);
      if (isProcessingTasks && processHasEnded) setIsProcessingTasks(false);
    }
  }, [tasks?.[0]?.id.value, hasLoadedTasks]);

  //TODO warning this could be problematic
  useEffect(() => {
    return () => {
      cache.delete(taskRequestSWRKey);
    };
  }, []);

  return (
    <>
      <RenderHelper
        bobject={bobject}
        toggleCadenceControlVisibility={toggleCadenceControlVisibility}
        step={step}
        cadenceControlCallback={cadenceControlCallback}
        isLoading={placeholderLoading || isProcessingTasks}
        hasCadenceTasks={hasCadenceTasks}
        minimized={minimized}
      />
      {cadenceControlVisibility && (
        <CadenceControlModal
          /* As the object is always going to be assigned at the end of the flow we set here a fake assignedTo so all options in CadenceControlModal are available */
          bobject={{ ...bobject, assignedTo: settings?.user?.id }}
          setIsOpen={setCadenceControlVisibility}
          initialStep={{
            step: hasCadenceTasks ? 'NEXT_STEPS' : 'CONFIGURE_CADENCE',
            hadStartedCadence: false,
          }}
          callbackOnSave={cadenceControlCallback}
        />
      )}
    </>
  );
};
