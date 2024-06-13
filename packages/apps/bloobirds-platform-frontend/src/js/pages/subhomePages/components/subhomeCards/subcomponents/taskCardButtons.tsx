import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
  CardButton,
  CardHoverButtons,
  Dropdown,
  IconButton,
  Item,
  Tooltip,
  useToasts,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import {
  QuickLogModalData,
  useMinimizableModals,
  useQuickLogActivity,
  useSelectAll,
} from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  CustomTask,
  PluralBobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { isCadenceTask, isSkippableTask } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import { STEPS } from '../../../../../components/cadenceControlModal/cadenceControlModal.machine';
import CardRescheduleTaskButton from '../../../../../components/rescheduleTask/cardRescheduleTaskButton';
import { useUserSettings } from '../../../../../components/userPermissions/hooks';
import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';
import { useCadenceControl, useMediaQuery, useTaskDone } from '../../../../../hooks';
import { useSetCadenceEnabled } from '../../../../../hooks/useFeatureFlags';
import { useRescheduleTask } from '../../../../../hooks/useRescheduleTask';
import useStopCadence from '../../../../../hooks/useStopCadence';
import { getFieldByLogicRole } from '../../../../../utils/bobjects.utils';
import { getTaskReferenceBobject } from '../../../../../utils/tasks.utils';
import { useLocationReturn, useParamsReturn } from '../../../salesPage/salesPage.utils';
import { PROSPECTING_SLUGS, SALES_SLUGS } from '../../../subhomes.constants';
import { getMixpanelKey } from '../../../subhomes.utils';
import { PriorityButton } from './priorityButton';
import { SkipTaskButton } from './skipTaskButton';
import { useTaskInfo } from './taskRelatedBobject.utils';

const TASK_RESCHEDULE_VALUES = {
  RESCHEDULABLE: 'RESCHEDULABLE',
};
export const TaskCardButtons = ({
  bobject,
  customTask,
  isHovering,
}: {
  bobject: Bobject<BobjectTypes.Task>;
  isHovering: boolean;
  customTask?: CustomTask;
  logCustomActivity?: (data: QuickLogModalData) => void;
}) => {
  const params: useParamsReturn = useParams();
  const location: useLocationReturn = useLocation();
  const pathname = location.pathname;
  const mixpanelKey = getMixpanelKey(params, pathname);
  const settings = useUserSettings();
  const hasAutoLogCustomActivity = settings?.user?.autoLogCustomActivity;
  const { showToast } = useTaskDone();
  const { createToast } = useToasts();
  const { logCustomActivity } = useQuickLogActivity();
  const { openRescheduleModal } = useRescheduleTask();
  const { openCadenceControl } = useCadenceControl();
  const { openStopCadenceModal } = useStopCadence();
  const { openMinimizableModal } = useMinimizableModals();
  const { getCanBeMarkedAsDone, getCadenceEntity, getTaskActiveStatus } = useTaskInfo(bobject);
  const { ref, visible, setVisible } = useVisible(false);
  const { isSmallDesktop } = useMediaQuery();
  const { selectAllItems, selectedItems } = useSelectAll();
  const referenceBobject = getTaskReferenceBobject(bobject);
  const referenceBobjectType = referenceBobject?.id?.typeName;
  const buttonData = getCanBeMarkedAsDone();
  const isActiveTask = getTaskActiveStatus();
  const cadenceEntity = getCadenceEntity();
  const company = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const taskType = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
  const isScheduled =
    getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole ===
    TASK_TYPE.NEXT_STEP;
  const isSikppable = isSkippableTask(bobject);
  const isCadence = isCadenceTask(bobject);
  const isContactBeforeMeeting = taskType === TASK_TYPE.CONTACT_BEFORE_MEETING;

  const handleMarkAsDone = (event: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    showToast(true, id);
    if (hasAutoLogCustomActivity && customTask) {
      logCustomActivity({
        customTask,
        selectedBobject: referenceBobject,
        leads: [],
        company,
      });
    }
  };
  const tabsWithSetCadenceAvailable = [
    PROSPECTING_SLUGS.ON_CADENCE,
    PROSPECTING_SLUGS.MEETING,
    SALES_SLUGS.FOLLOW_UP,
    SALES_SLUGS.NURTURING,
    PROSPECTING_SLUGS.NURTURING,
  ];
  const { slug } = useParams();
  const isSetCadenceEnabled = useSetCadenceEnabled();
  const hasCadenceHoverOptions =
    tabsWithSetCadenceAvailable.includes(slug) &&
    taskType === TASK_TYPE.PROSPECT_CADENCE &&
    isSetCadenceEnabled;

  const onSaveAction = () => {
    selectAllItems([]);
    createToast({
      type: 'success',
      message:
        selectedItems.length > 1
          ? `${selectedItems.length} ${PluralBobjectTypes[referenceBobjectType]} updated successfully.`
          : `${referenceBobjectType} updated successfully`,
    });
  };

  useEffect(() => {
    if (!isHovering) setVisible(false);
  }, [isHovering]);

  return (
    <>
      <CardHoverButtons>
        {(isScheduled || isCadence || isContactBeforeMeeting) && <PriorityButton task={bobject} />}
        {cadenceEntity?.reschedulableMode === TASK_RESCHEDULE_VALUES.RESCHEDULABLE &&
          isActiveTask && <CardRescheduleTaskButton task={bobject} />}
        {isScheduled && (
          <CardButton
            dataTest="Subhome-RescheduleTask"
            iconLeft="clock"
            onClick={event => {
              mixpanel.track(MIXPANEL_EVENTS[`RESHEDULE_ACTION_CLICKED_ON_${mixpanelKey}_TAB`]);
              event.preventDefault();
              event.stopPropagation();
              openRescheduleModal({ bobjectToSet: bobject });
            }}
            variant="secondary"
          >
            {!isSmallDesktop && 'Reschedule'}
          </CardButton>
        )}
        {isSikppable && <SkipTaskButton task={bobject} />}
        <Tooltip title={buttonData?.tooltip} position="top">
          <CardButton
            dataTest="Subhome-MarkAsDone"
            iconLeft="check"
            onClick={event => {
              mixpanel.track(MIXPANEL_EVENTS[`MARK_AS_DONE_ACTION_CLICKED_ON_${mixpanelKey}_TAB`]);
              handleMarkAsDone(event, bobject?.id.objectId);
            }}
            disabled={buttonData.disabled}
          >
            Mark as done
          </CardButton>
        </Tooltip>
        {isScheduled && (
          <IconButton
            name="edit"
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              openMinimizableModal({
                type: 'task',
                data: {
                  [bobject?.id.typeName.toLowerCase()]: bobject,
                  bobjectId: bobject?.id?.value,
                },
              });
            }}
          />
        )}
        {hasCadenceHoverOptions && (
          <Dropdown
            ref={ref}
            visible={visible}
            arrow={false}
            anchor={
              <IconButton
                name="moreVertical"
                onClick={event => {
                  event.stopPropagation();
                  setVisible(!visible);
                }}
              />
            }
          >
            <Item
              icon="calendar"
              onClick={(value, event) => {
                mixpanel.track(MIXPANEL_EVENTS[`SET_CADENCE_ACTION_CLICKED_ON_${mixpanelKey}_TAB`]);
                event.preventDefault();
                event.stopPropagation();
                setVisible(false);
                openCadenceControl({
                  previousStep: false,
                  bobjectToSet: referenceBobject,
                  step: STEPS.CONFIGURE_CADENCE,
                  onSaveCallback: onSaveAction,
                  response: undefined,
                });
              }}
            >
              Set cadence
            </Item>
            <Item
              icon="slash"
              onClick={(value, event) => {
                mixpanel.track(
                  MIXPANEL_EVENTS[`STOP_CADENCE_ACTION_CLICKED_ON_${mixpanelKey}_TAB`],
                );
                event.stopPropagation();
                setVisible(false);
                openStopCadenceModal({ bobjectToSet: bobject });
              }}
            >
              Stop cadence
            </Item>
          </Dropdown>
        )}
      </CardHoverButtons>
    </>
  );
};
