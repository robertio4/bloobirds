import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BobjectItemCompressed, SearchBobjects } from '@bloobirds-it/bobjects';
import { useDialerLauncher } from '@bloobirds-it/dialer';
import { CreateTasksTooltip, EmailActionTooltip } from '@bloobirds-it/discovery-tooltips';
import { Action, Input, Text } from '@bloobirds-it/flamingo-ui';
import {
  useAircallPhoneLinkEnabled,
  useBaseSetEmailVariablesValues,
  useMinimizableModals,
  useWhatsappEnabled,
  useWhatsappOpenNewPage,
} from '@bloobirds-it/hooks';
import { BobjectTypes, MessagesEvents } from '@bloobirds-it/types';
import {
  isUnassignedTask,
  openPhoneOrDialer,
  isElementLoaded,
  openWhatsAppWeb,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { BubbleWindow, BubbleWindowContent } from '../bubbleWindow/bubbleWindow';
import { ContactsTooltip } from '../contactView/components/discoveryTooltips/contactsTooltip/contactsTooltip';
import { HomePageTooltip } from '../contactView/components/discoveryTooltips/homePageTooltip/homePageTooltip';
import { useExtensionContext } from '../context';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import TaskHomePageCard from '../taskHomePageCard/taskHomePageCard';
import { GeneralSearchBarBanner } from './components/generalSearchBarBanner';
import styles from './noContextPage.module.css';

export default (): JSX.Element => {
  const { t } = useTranslation();
  const {
    useGetSettings,
    setContactViewBobjectId,
    useGetCurrentTask,
    useGetLoggedIn,
    useGetOpenStartTasksNavigation,
    useGetSidePeekEnabled,
  } = useExtensionContext();
  const isLoggedIn = useGetLoggedIn();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const username = settings?.user?.name;
  const hasWhatsApp = useWhatsappEnabled(accountId);
  const forceWsOpenNewPage = useWhatsappOpenNewPage(accountId);
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const { openDialer } = useDialerLauncher();
  const { openMinimizableModal } = useMinimizableModals();
  const { getLastVisitedBobjects, setIsHome } = useFloatingMenuContext();
  const lastVisitedBobjects = getLastVisitedBobjects();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const currentTask = useGetCurrentTask();
  const isUnassignedCurrentTask = isUnassignedTask(currentTask);
  const { open: openStartTaskNavigation } = useGetOpenStartTasksNavigation();
  const [contactsTooltipParams, setContactsTooltipParams] = useState({
    top: 0,
    left: 0,
    display: false,
  });
  const [displayHomePageTooltip, setDisplayHomePageTooltip] = useState(false);
  const ref = useRef<HTMLDivElement>();
  const [visibleBobjects, setVisibleBobjects] = useState(0);
  const containerRef = useRef(null);

  const handleMailAction = () => {
    mixpanel.track(`SEND_EMAIL_FROM_NO_CONTEXT_BUBBLE`);
    setEmailVariablesValue({
      company: null,
      lead: null,
      opportunity: null,
    });
    openMinimizableModal({
      type: 'email',
      title: 'New Email',
      data: {},
    });
  };

  const handleCallAction = () => {
    mixpanel.track(`CALL_FROM_NO_CONTEXT_BUBBLE`);
    openPhoneOrDialer('', settings, openDialer);
  };

  const handleLinkedinAction = () => {
    mixpanel.track(`SEND_LINKEDIN_FROM_NO_CONTEXT_BUBBLE`);
    window.open('https://www.linkedin.com', '_blank');
  };

  const handleWhatsAppAction = () => {
    mixpanel.track(`SEND_WHATSAPP_FROM_NO_CONTEXT_BUBBLE`);
    openWhatsAppWeb(forceWsOpenNewPage);
  };

  const handleTaskAction = () => {
    mixpanel.track(`CREATE_TASK_FROM_NO_CONTEXT_BUBBLE`);
    openMinimizableModal({
      type: 'task',
      data: {
        location: 'bubble',
      },
    });
  };

  const handleCalendarAction = () => {
    mixpanel.track(`CREATE_MEETING_FROM_NO_CONTEXT_BUBBLE`);
    openMinimizableModal({
      type: 'calendarMeeting',
      data: {},
      onSave: () => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
      },
    });
  };

  const handleNoteAction = () => {
    mixpanel.track(`CREATE_NOTE_FROM_NO_CONTEXT_BUBBLE`);
    openMinimizableModal({
      type: 'note',
      data: {
        location: 'bubble',
      },
    });
  };

  const handleChange = (bobject: BobjectItemCompressed) => {
    if (bobject?.id?.value) {
      setContactViewBobjectId(bobject?.id?.value);
    } else {
      setContactViewBobjectId(bobject?.rawBobject?.id);
    }
    setIsHome(false);
  };

  const contentClasses = clsx(styles.content, {
    [styles.contentSidePeek]: sidePeekEnabled,
  });

  const currentTaskClasses = clsx(styles.currentTask, {
    [styles.currentTaskSidePeek]: sidePeekEnabled,
  });

  const lastVisitedItemClasses = clsx(styles.lastVisitedItem, {
    [styles.lastVisitedItemSidePeek]: sidePeekEnabled,
  });

  useEffect(() => {
    const container = containerRef.current;

    const adjustVisibleElements = () => {
      const containerHeight = container?.clientHeight;
      let totalHeight = 0;
      let visibleElements = 0;

      while (totalHeight < containerHeight) {
        visibleElements++;

        const itemHeight = 52;
        totalHeight += itemHeight;
      }

      setVisibleBobjects(visibleElements);
    };

    adjustVisibleElements();

    window.addEventListener('resize', adjustVisibleElements);

    return () => {
      window.removeEventListener('resize', adjustVisibleElements);
    };
  }, [currentTask]);

  useEffect(() => {
    if (isLoggedIn) {
      isElementLoaded('[data-target-selection-name="sfdc:TabDefinition.standard-Contact"]').then(
        () => {
          const contactsButton = document.querySelector(
            '[data-target-selection-name="sfdc:TabDefinition.standard-Contact"]',
          );
          const contactsButtonPosition = contactsButton?.getBoundingClientRect();
          if (contactsButtonPosition) {
            setContactsTooltipParams({
              top: contactsButtonPosition.top,
              left: contactsButtonPosition.left,
              display: true,
            });
          }
        },
      );
      if (ref?.current) {
        const width = ref?.current?.clientWidth;
        if (width > 0) {
          setTimeout(() => {
            setDisplayHomePageTooltip(true);
          }, 500);
        }
      }
    }
  }, [isLoggedIn]);

  const getLastVisitedVisibleObject = () => {
    const items = [];
    let i = 0;

    Object.keys(lastVisitedBobjects).map(key => {
      if (i < visibleBobjects - 1) {
        const bobject = lastVisitedBobjects[key];

        items.push(
          <div key={key} className={lastVisitedItemClasses}>
            <BobjectItemCompressed
              bobject={{
                ...bobject,
                bobjectType: bobject.id.typeName,
                ...(bobject.id.typeName === 'Company' && { companyName: bobject.name }),
              }}
              handleCompanyClicked={() => null}
              handleClick={handleChange}
              key={bobject?.rawBobject?.id}
              isBubbleHomePage
            />
          </div>,
        );
        i++;
      }
    });

    return items;
  };

  return (
    <BubbleWindow height={594}>
      <BubbleWindowContent className={contentClasses}>
        <div
          className={clsx(styles.title, { [styles.invisibleTitle]: openStartTaskNavigation })}
          ref={ref}
        >
          <Text size="l" weight="medium" className={styles.title_text}>
            {t('common.welcome')}, {username}!
          </Text>
        </div>
        <div className={styles.searchBar}>
          <SearchBobjects
            accountId={accountId}
            onChange={handleChange}
            isBubbleHomePage={!sidePeekEnabled}
            customStyles={{ width: sidePeekEnabled ? 'calc(33% - 108px)' : '260px' }}
            anchorElement={(setSearchValue, searchValue) => (
              <Input
                width="100%"
                placeholder={t('common.search') + ' ...'}
                onChange={setSearchValue}
                value={searchValue}
                className={styles.input}
                icon="search"
              />
            )}
            numberOfResults={20}
          />
          <GeneralSearchBarBanner />
        </div>
        <div className={styles.containerButtons}>
          <HomePageTooltip display={displayHomePageTooltip} />
          <div
            className={sidePeekEnabled ? styles.buttons : styles.buttonsBubble}
            style={{ gap: '8px', maxWidth: sidePeekEnabled ? '100%' : '80%' }}
          >
            {hasAircallPhoneLinkEnabled ? (
              <a href={`callto:`}>
                <Action color="extraCall" icon="phone" />
              </a>
            ) : (
              <Action color="extraCall" icon="phone" onClick={handleCallAction} size="xl" />
            )}
            <div style={{ position: 'relative' }}>
              <Action color="tangerine" icon="mail" onClick={handleMailAction} size="xl" />
              <EmailActionTooltip />
            </div>
            <Action
              color="darkBloobirds"
              icon="linkedin"
              onClick={handleLinkedinAction}
              size="xl"
            />
            {hasWhatsApp && (
              <Action color="whatsapp" icon="whatsapp" onClick={handleWhatsAppAction} size="xl" />
            )}
            <div style={{ position: 'relative' }}>
              <Action
                color="softBloobirds"
                icon="taskAction"
                onClick={handleTaskAction}
                size="xl"
              />
              <CreateTasksTooltip />
            </div>
            <Action color="banana" icon="noteAction" onClick={handleNoteAction} size="xl" />
            <Action color="tomato" icon="calendar" onClick={handleCalendarAction} size="xl" />
          </div>
        </div>

        {Object.keys(lastVisitedBobjects).length > 0 && !isUnassignedCurrentTask ? (
          <div ref={containerRef} className={styles.lastVisited}>
            <Text size="s" color="softPeanut">
              {t('common.last_visited')}
            </Text>
            {getLastVisitedVisibleObject()}
          </div>
        ) : currentTask && isUnassignedCurrentTask ? (
          <div className={currentTaskClasses}>
            <Text size="s" color="softPeanut">
              {t('sidePeek.noContextPage.currentTask')}
            </Text>
            <TaskHomePageCard />
          </div>
        ) : (
          <div
            className={styles.extraMile}
            style={{
              padding: `0 ${sidePeekEnabled ? 8 : 16}px`,
            }}
          >
            <Text size={sidePeekEnabled ? 'xl' : 'm'} weight="bold" align="center">
              {t('sidePeek.noContextPage.extraMile')}
            </Text>
            <Text size={sidePeekEnabled ? 'm' : 'xs'} color="softPeanut" align="center">
              {t('sidePeek.noContextPage.stayOnTop')}
            </Text>
          </div>
        )}
      </BubbleWindowContent>
      <ContactsTooltip {...contactsTooltipParams} />
    </BubbleWindow>
  );
};
