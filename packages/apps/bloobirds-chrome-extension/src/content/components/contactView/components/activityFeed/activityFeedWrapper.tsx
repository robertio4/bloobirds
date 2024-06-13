import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { 
  NewActivityFeed, 
  useActivityFeed, 
  ActivityFeedUserFilter,
  MagicFilter,
  PastActivityLeadFilter,
  PastActivityTypeFilter,
} from '@bloobirds-it/activity-feed';
import { Button, Text } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks, useMinimizableModals } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  BOBJECT_TYPES,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  ExtensionBobject,
  LEAD_FIELDS_LOGIC_ROLE,
  MIXPANEL_EVENTS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { getFieldByLogicRole, getRelatedBobject, getValueFromLogicRole } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { ExtendedContextTypes } from '../../../../../types/extendedContext';
import { useExtensionContext } from '../../../context';
import { useContactViewContext } from '../../context/contactViewContext';
import { useSubscribeListeners } from '../../hooks/useSubscribeListeners';
import styles from './activityFeed.module.css';

export const ActivityFeedWrapper = ({ parentRef, bobject }: { parentRef: any; bobject?: any }) => {
  const bobjectType = bobject?.id?.typeName;
  const isLeadPage = bobjectType === BobjectTypes.Lead;
  const [showTypeFilters, setShowTypeFilters] = useState<boolean>(false);
  const {
    filters,
    setFilters,
    resetTypeFilter,
    activeMagicFilter,
    setActiveMagicFilter,
  } = useActivityFeed({
    activeBobject: bobject,
    subscribeMutator: value => useSubscribeListeners(bobjectType, value),
  });

  const { minimizableModals } = useMinimizableModals();

  const {
    useGetDataModel,
    useGetActiveBobject,
    setExtendedContext,
    useGetActiveBobjectContext,
    useGetSidePeekEnabled,
    useGetExtendedContext,
    closeExtendedScreen,
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const dataModel = useGetDataModel();
  const activeBobject = useGetActiveBobject();
  const data = useGetActiveBobjectContext();
  const leads = data?.leads || [];
  const leadsAvailable = leads.map(lead => ({
    id: lead?.id.value,
    name: lead?.fullName,
  }));
  const { actionsDisabled } = useContactViewContext();
  const [enabledArrowNavigation, setEnabledArrowNavigation] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Bobject[] | ExtensionBobject[]>();
  const defaultLeadValue =
    activeBobject?.id?.typeName === BobjectTypes.Lead
      ? [activeBobject?.id?.value]
      : leadsAvailable?.map(l => l?.id);
  const extendedContext = useGetExtendedContext();
  const { getCustomTaskLogicRole } = useCustomTasks();
  const { t } = useTranslation('translation', { keyPrefix: 'activityTimelineItem.activityFeed' });

  useEffect(() => {
    resetTypeFilter();
    setActiveMagicFilter(false);
    setSelectedLead(filters?.lead?.length !== 0 ? filters?.lead : defaultLeadValue);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const elementsDisabledArrowNavigation = document.querySelectorAll(
        '#floating-menu div[role=textbox]',
      );

      const handleFocus = () => {
        setEnabledArrowNavigation(false);
      };

      const handleBlur = () => {
        setEnabledArrowNavigation(true);
      };

      elementsDisabledArrowNavigation.forEach(element => {
        element.addEventListener('focus', handleFocus);
        element.addEventListener('blur', handleBlur);
      });

      return () => {
        elementsDisabledArrowNavigation.forEach(element => {
          element.removeEventListener('focus', handleFocus);
          element.removeEventListener('blur', handleBlur);
        });
      };
    }, 500);
  }, [extendedContext]);

  useEffect(() => {
    setEnabledArrowNavigation(!(minimizableModals?.length > 0));
  }, [minimizableModals]);

  //TODO extract this monstruosity
  const handleOnClick = async (activity: Bobject) => {
    const activityType = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
      ?.valueLogicRole;
    const threadId = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_THREAD_ID);
    const lead = getRelatedBobject(activity, BOBJECT_TYPES.LEAD);
    const company = getRelatedBobject(activity, BOBJECT_TYPES.COMPANY);
    const opportunity = getRelatedBobject(activity, BOBJECT_TYPES.OPPORTUNITY);
    const activityBody = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);

    const bobjectFieldsData = {};
    activity.fields.forEach(field => {
      bobjectFieldsData[field.logicRole || field.name] = field.value;
    });
    const activityMainNoteYes = dataModel?.findValueByLogicRole(
      ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.YES,
    );
    const isMainNote =
      bobjectFieldsData[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE] === activityMainNoteYes?.id;

    mixpanel.track(MIXPANEL_EVENTS.CLICK_IN_ACTIVITY_FROM_FEED_OTO);

    switch (activityType) {
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
        setExtendedContext({
          type: ExtendedContextTypes.EMAIL_THREAD,
          threadId: threadId,
          bobjectId: activity?.id,
          bobject: activity,
          actionsDisabled: actionsDisabled,
        });
        break;
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
        // eslint-disable-next-line no-unused-expressions
        if (activityBody)
          setExtendedContext({
            type: ExtendedContextTypes.LINKEDIN_THREAD,
            bobject: activity,
            actionsDisabled: actionsDisabled,
          });
        break;
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK: {
        const customActivityType = getFieldByLogicRole(
          activity,
          ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
        );

        const customTaskLogicRole = getCustomTaskLogicRole(customActivityType?.value);
        switch (customTaskLogicRole) {
          case 'WHATSAPP':
            setExtendedContext({
              type: ExtendedContextTypes.WHATSAPP_THREAD,
              bobject: activity,
            });
            break;
          case 'WHATSAPP_BUSINESS':
            setExtendedContext({
              type: ExtendedContextTypes.WHATSAPP_BUSINESS_THREAD,
              bobject: activity,
            });
            break;
          default:
            break;
        }

        break;
      }
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
        setExtendedContext({
          type: ExtendedContextTypes.MEETING_DETAILS,
          threadId: threadId,
          bobject: activity,
          actionsDisabled: actionsDisabled,
        });
        break;
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
        setExtendedContext({
          type: ExtendedContextTypes.CALL_DETAILS,
          threadId: threadId,
          bobject: activity,
          actionsDisabled: actionsDisabled,
        });
        break;
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
        setExtendedContext({
          type: ExtendedContextTypes.INBOUND_ACTIVITY,
          threadId: threadId,
          bobject: activity,
        });
        break;
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
        setExtendedContext({
          type: ExtendedContextTypes.NOTE_DETAILS,
          bobject: activity,
          actionsDisabled: actionsDisabled,
          extraInfo: {
            lead: lead && {
              ...lead,
              fullName: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
            },
            company: company && {
              ...company,
              name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
            },
            opportunity: opportunity && {
              ...opportunity,
              name: getValueFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
            },
            bobjectId: activity?.id?.value,
            originallyMainNote: isMainNote,
            location: 'bubble',
            ...bobjectFieldsData,
          },
        });
        break;
      default:
        closeExtendedScreen();
        break;
    }
  };
  const headerClasses = clsx(styles.header_container, {
    [styles.header_container_sidePeek]: sidePeekEnabled,
  });

  function setTypeFilter(value) {
    setFilters({ ...filters, type: value, activeBobjectId: activeBobject?.id?.value });
  }

  function setLeadFilter(value) {
    setFilters({ ...filters, lead: value, activeBobjectId: activeBobject?.id?.value });
  }

  function setUserFilter(value) {
    setFilters({ ...filters, user: value, activeBobjectId: activeBobject?.id?.value });
  }

  return (
    <div className={styles.container}>
      <div className={headerClasses}>
        <div className={styles.left_header}>
          <Text
            size="xs"
            color="softPeanut"
            weight="bold"
            className={sidePeekEnabled && styles.title_sidePeek}
          >
            {t('title')}
          </Text>
          <Button
            iconLeft="slidersHor"
            size="small"
            onClick={() => {
              setShowTypeFilters(!showTypeFilters);
            }}
            color={activeMagicFilter ? 'softPeanut' : 'bloobirds'}
            variant={showTypeFilters ? 'primary' : 'clear'}
            disabled={activeMagicFilter}
          />
        </div>
        <div className={styles.right_header}>
          <ActivityFeedUserFilter selectedUser={filters.user} setUserFilter={setUserFilter} />
          {!isLeadPage && (
            <PastActivityLeadFilter
              setLeadFilter={setLeadFilter}
              leadsAvailable={leadsAvailable}
              selectedLead={selectedLead}
              setSelectedLead={setSelectedLead}
              isSEE={false}
            />
          )}
          <MagicFilter
            isDisabled={filters.type?.length !== 0}
            magicFilterHandling={[
              activeMagicFilter,
              () => {
                setShowTypeFilters(false);
                setActiveMagicFilter(!activeMagicFilter);
              },
            ]}
          />
        </div>
      </div>
      {showTypeFilters && (
        <PastActivityTypeFilter
          filters={filters}
          setTypeFilter={setTypeFilter}
          sidePeekEnabled={sidePeekEnabled}
        />
      )}
      <NewActivityFeed
        activeBobject={activeBobject}
        enabledArrowNavigation={enabledArrowNavigation}
        handleOnClick={handleOnClick}
        parentRef={parentRef}
        estimateSize={45}
        actionsDisabled={actionsDisabled}
        sidePeekEnabled={sidePeekEnabled}
        selectedItem={(extendedContext?.bobject as Bobject<BobjectTypes.Activity>)?.id.value}
        subscribeMutator={mutator => useSubscribeListeners(activeBobject?.id?.typeName, mutator)}
      />
    </div>
  );
};
