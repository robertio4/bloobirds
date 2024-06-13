import React, { LegacyRef, Ref, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dropdown,
  Icon,
  IconButton,
  Item,
  Label,
  Select,
  SortableList,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useDataModel, useIsOTOAccount, usePicklist } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  MIXPANEL_EVENTS as MIXPANEL_EVENTS_TYPES,
} from '@bloobirds-it/types';
import { differenceInDays } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import { QUOTES } from '../../../../app/main/board/task/taskBoard/finalScreen/quotes';
import { ContentBlock } from '../../../../components/contentBlock/contentBlock';
import { HomeFiltersTooltip } from '../../../../components/discoveryTooltips/homeFilterTooltip';
import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { OTOConnectionsGuide } from '../../../../components/welcomeScreensModal/components/quickStartGuideBlocks/otoConnectionsGuide';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useHasBeenVisible } from '../../../../hooks/useHasBeenVisible';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import {
  useQuickStartEnabled,
  useQuickStartGuideCompleted,
} from '../../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import SessionManagerFactory from '../../../../misc/session';
import { Activity } from '../../components/activity/activity';
import { CallsStatistics } from '../../components/callsStatistics/callsStatistics';
import { CustomActivity } from '../../components/customActivity/customActivity';
import { EmailsAutoStatistics } from '../../components/emailsAutoStatistics/emailsAutoStatistics';
import { EmailsStatistics } from '../../components/emailsStatistics/emailsStatistics';
import { LinkedinStatistics } from '../../components/linkedinStatistics/linkedinStatistics';
import { MeetingsStatistics } from '../../components/meetingsStatistics/meetingsStatistics';
import { PipelineChart } from '../../components/pipelineChart/pipelineChart';
import { AdminQuickStartGuide } from '../../components/quickStartGuide/adminQuickStartGuide';
import { QuickStartGuide } from '../../components/quickStartGuide/quickStartGuide';
import { TasksStatistics } from '../../components/tasksStatistics/tasksStatistics';
import { TeamActivities } from '../../components/teamActivities/teamActivities';
import { TeamMeetings } from '../../components/teamMeetings/teamMeetings';
import styles from '../../homePage.module.css';
import { useUserHomepageSettings } from '../../hooks/useUserHomepageSettings';
import {
  Config,
  ConfigType,
  HomepageBlocks,
  TIME_WINDOW,
  UserHomeConfig,
} from '../../typings/home';
import {
  getAvailableUserConfig,
  getDefaultHomeConfig,
  getUserSettingConfigType,
} from '../../utils/homepage';

const getQuote = () => {
  const index = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[index];
};
const isBeforeEndOfJune = new Date() < new Date('June 30, 2022');

const handleLearnMore = () => {
  const roleManager = SessionManagerFactory().getRoleManager();
  if (roleManager?.isAccountAdmin()) {
    window.open('https://youtu.be/0oDvnT9xNk0', '_blank');
  } else {
    window.open('https://youtu.be/GnjQx1VdSdA', '_blank');
  }
};

const BlockToRender = React.forwardRef<
  Ref<any>,
  {
    block: HomepageBlocks;
    timeWindow: TIME_WINDOW;
    fullSalesEnabled: boolean;
    onChange: () => object;
    selectorDefault?: string;
    toggleFiltersVisible: () => void;
    isDragging?: boolean;
    QSGType: 'ADMIN' | 'USER' | 'OTO';
  }
>(({ block, timeWindow, fullSalesEnabled, onChange, QSGType, ...props }, ref) => {
  const dataModel = useDataModel();
  const mainTypeField = dataModel?.findFieldByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
  );
  const mainResultField = dataModel?.findFieldByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT,
  );
  const { data: meetingTypes } = usePicklist(mainTypeField?.id);
  const { data: meetingResults } = usePicklist(mainResultField?.id);
  const types = meetingTypes?.filter(i => i.enabled)?.sort((a, b) => a.ordering - b.ordering);
  const results = meetingResults?.filter(i => i.enabled)?.sort((a, b) => a.ordering - b.ordering);

  switch (block) {
    case HomepageBlocks.QUICK_START_GUIDE:
      if (QSGType === 'OTO') {
        return (
          <OTOConnectionsGuide
            ref={(ref as unknown) as Ref<HTMLDivElement>}
            isHomePage
            handleFinish={() => {}}
            {...props}
          />
        );
      } else if (QSGType === 'USER') {
        return (
          <QuickStartGuide
            toggleFiltersVisible={props.toggleFiltersVisible}
            ref={(ref as unknown) as Ref<HTMLDivElement>}
            {...props}
          />
        );
      } else if (QSGType === 'ADMIN') {
        return (
          <AdminQuickStartGuide
            toggleFiltersVisible={props.toggleFiltersVisible}
            ref={(ref as unknown) as Ref<HTMLDivElement>}
            {...props}
          />
        );
      } else {
        return <div ref={(ref as unknown) as LegacyRef<HTMLDivElement>} {...props} />;
      }
    case HomepageBlocks.EMAIL_AUTOMATION:
      return (
        <ContentBlock
          iconName="autoMail"
          iconColor="tangerine"
          title="Email Automation"
          titleExtra={
            <div className={styles._ad_block_emailAuto}>
              {isBeforeEndOfJune && (
                <Label size="small" color="extraCall" textColor="white" uppercase={false}>
                  New
                </Label>
              )}
              ✨
              <Text size="xs" htmlTag="span">
                Do you want to start using email automation?{' '}
              </Text>
              <span onClick={handleLearnMore} className={styles.link}>
                <Text size="xs" color="bloobirds" htmlTag="span">
                  Learn how here!
                </Text>
              </span>
            </div>
          }
          ref={ref}
          {...props}
          draggable
        >
          <EmailsAutoStatistics timeWindow={timeWindow} />
        </ContentBlock>
      );
    case HomepageBlocks.TEAM_MEETINGS:
      return (
        <ContentBlock
          title="Team Meetings"
          iconColor="tomato"
          iconName="calendar"
          helperText="Here you will find the created meetings from each team member for the selected time frame"
          ref={ref}
          minHeight="200px"
          blockEnum={HomepageBlocks.TEAM_MEETINGS}
          {...props}
          filter={{
            placeholder: 'Meeting types',
            options: types,
            mixpanelEventName:
              MIXPANEL_EVENTS_TYPES.CLICK_ON_CHANGE_MEETING_TYPE_FROM_TEAM_MEETINGS_KPI,
          }}
          secondaryFilter={{
            placeholder: 'Meeting results',
            options: results,
            mixpanelEventName:
              MIXPANEL_EVENTS_TYPES.CLICK_ON_CHANGE_MEETING_RESULT_FROM_TEAM_MEETINGS_KPI,
          }}
          draggable
        >
          <TeamMeetings timeWindow={timeWindow} />
        </ContentBlock>
      );
    case HomepageBlocks.TEAM_ACTIVITIES:
      return (
        <ContentBlock
          title="Team Activities"
          iconName="barchart"
          helperText="Here you will see the activities across the different team mates for the selected time frame"
          ref={ref}
          {...props}
          minHeight="200px"
          draggable
        >
          <TeamActivities timeWindow={timeWindow} />
        </ContentBlock>
      );
    case HomepageBlocks.MEETINGS:
      return (
        <ContentBlock
          iconName="calendar"
          iconColor="tomato"
          title={`Meetings ${TIME_WINDOW[timeWindow.toUpperCase()].toLowerCase()}`}
          ref={ref}
          blockEnum={HomepageBlocks.MEETINGS}
          {...props}
          filter={{
            placeholder: 'Meeting types',
            options: types,
            mixpanelEventName:
              MIXPANEL_EVENTS_TYPES.CLICK_ON_CHANGE_MEETING_TYPE_FROM_MEETINGS_IN_PERIOD_KPI,
          }}
          draggable
        >
          <MeetingsStatistics timeWindow={timeWindow} />
        </ContentBlock>
      );
    case HomepageBlocks.MY_PIPELINE:
      return (
        <ContentBlock
          title="My pipeline"
          blockEnum={block}
          iconName="server"
          iconColor="softPeanut"
          onChange={onChange}
          minHeight="200px"
          ref={ref}
          {...props}
          filter={{
            options: [
              {
                id: 'COMPANY',
                value: 'Companies',
              },
              {
                id: 'LEAD',
                value: 'Leads',
              },
              fullSalesEnabled
                ? {
                    id: 'OPPORTUNITY',
                    value: 'Opportunities',
                  }
                : null,
            ],
          }}
          defaultFilterValue={props?.selectorDefault || 'COMPANY'}
          draggable
        >
          <PipelineChart />
        </ContentBlock>
      );
    case HomepageBlocks.EMAIL:
      return (
        <ContentBlock
          iconName="mail"
          iconColor="tangerine"
          title="Emails"
          ref={ref}
          {...props}
          draggable
        >
          <EmailsStatistics timeWindow={timeWindow} />
        </ContentBlock>
      );
    case HomepageBlocks.CALLS:
      return (
        <ContentBlock
          iconName="phone"
          iconColor="melon"
          title="Calls"
          ref={ref}
          {...props}
          draggable
        >
          <CallsStatistics timeWindow={timeWindow} />
        </ContentBlock>
      );
    case HomepageBlocks.MY_ACTIVITY:
      return (
        <ContentBlock
          iconName="activity"
          iconColor="softPeanut"
          title="My Activity"
          ref={ref}
          helperText="Here you are able to see your outgoing activity and your completed task during the selected time frame."
          {...props}
          draggable
        >
          <Activity timeWindow={timeWindow} />
        </ContentBlock>
      );
    case HomepageBlocks.MY_CUSTOM_ACTIVITY:
      return (
        <ContentBlock
          iconName="taskAction"
          iconColor="softPeanut"
          title="My Custom Activity"
          ref={ref}
          helperText="Here you are able to see your custom activity during the selected time frame."
          {...props}
          draggable={true}
        >
          <CustomActivity timeWindow={timeWindow} />
        </ContentBlock>
      );
    case HomepageBlocks.LINKEDIN:
      return (
        <ContentBlock iconName="linkedin" title="LinkedIn" ref={ref} {...props} draggable>
          <LinkedinStatistics timeWindow={timeWindow} />
        </ContentBlock>
      );
    case HomepageBlocks.TASKS:
      return (
        <ContentBlock iconName="taskAction" title="Tasks" ref={ref} {...props} draggable>
          <TasksStatistics timeWindow={timeWindow} />
        </ContentBlock>
      );
    default:
      return <></>;
  }
});

export const CenterContent = () => {
  const { reset } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const isQSGCompleted = useQuickStartGuideCompleted();
  const { availableSettings, userSettings, updateHomeSettings } = useUserHomepageSettings();
  const handlerRef = useRef();
  const { ref, visible, setVisible } = useVisible(false, handlerRef);
  const hasBeenVisible = useHasBeenVisible(visible);
  const isFullSalesEnabled = useFullSalesEnabled();
  const settings = useUserSettings();
  const isOTOAccount = useIsOTOAccount();
  const isAdmin = useIsAccountAdmin();
  const {
    user: { type },
  } = settings || { user: { type: '' } };

  // In these 2 states we save the actual setting of the user
  const [userSelectorConfig, setUserSelectorConfig] = useState<UserHomeConfig | undefined>(
    undefined,
  );
  const [userBlocksConfig, setUserBlocksConfig] = useState<UserHomeConfig[] | undefined>(undefined);
  const userEnabledBlocks =
    userBlocksConfig?.length > 0
      ? [
          userBlocksConfig.find(block => block.enumName === 'QUICK_START_GUIDE'),
          ...userBlocksConfig.filter(block => block.enumName !== 'QUICK_START_GUIDE'),
        ]?.filter(block => block?.enabled)
      : [];

  const { text: quote, author } = useMemo(() => getQuote(), []);

  // These are date settings available for every user
  const availableDateOptions = getAvailableUserConfig(
    availableSettings,
    ConfigType.KPI_SECTION_SELECTOR,
  );
  const defaultSelectorOption = getDefaultHomeConfig(availableSettings, Config.LAST_7_DAYS);
  const blocksAvailableConfigs = getAvailableUserConfig(
    availableSettings,
    ConfigType.KPI_SECTION_FILTERS,
  );

  // These are the possible settings that the user could have saved in db
  const userSavedSelectorConfig = getUserSettingConfigType(
    userSettings,
    ConfigType.KPI_SECTION_SELECTOR,
  );
  const defaultUserSelectorConfig = userSavedSelectorConfig?.find(c => c.enabled);
  const userSavedBlocksSettings = getUserSettingConfigType(
    userSettings,
    ConfigType.KPI_SECTION_FILTERS,
  );

  // Here we define which is the setting the user actually has to add it in the state
  useEffect(() => {
    if (defaultUserSelectorConfig || defaultSelectorOption) {
      setUserSelectorConfig(defaultUserSelectorConfig || defaultSelectorOption);
    }
  }, [defaultUserSelectorConfig, defaultSelectorOption]);

  useEffect(() => {
    if (userSavedBlocksSettings || blocksAvailableConfigs) {
      setUserBlocksConfig(
        userSavedBlocksSettings ||
          blocksAvailableConfigs.filter(availableBlock =>
            availableBlock.enumName === 'QUICK_START_GUIDE' ? hasQSGEnabled : true,
          ),
      );
    }
  }, [userSavedBlocksSettings, blocksAvailableConfigs]);

  // Only make the request when the dropdown is being closed
  useEffect(() => {
    if (hasBeenVisible && !visible) {
      updateHomeSettings(userBlocksConfig, ConfigType.KPI_SECTION_FILTERS);
    }
  }, [visible, hasBeenVisible]);

  // These are the request that we need to update both settings
  const updateSelector = (configToUpdate: UserHomeConfig) => {
    mixpanel.track(MIXPANEL_EVENTS.HOME_CHANGED_TIMEFRAME_BLOCKS);
    setUserSelectorConfig(configToUpdate);
    updateHomeSettings([configToUpdate], ConfigType.KPI_SECTION_SELECTOR);
  };
  const changeBlocksSettings = (configToUpdate: UserHomeConfig, enabled: boolean) => {
    mixpanel.track(MIXPANEL_EVENTS.HOME_CHANGED_FILTERS_BLOCKS);
    const hasThisConfig = userBlocksConfig?.some(config => config.id === configToUpdate.id);
    if (hasThisConfig) {
      const filtersToUpdate = userBlocksConfig?.map(config => {
        if (config?.id === configToUpdate.id) {
          return {
            id: config?.id,
            name: config?.name,
            enumName: config?.enumName,
            ordering: config?.ordering,
            enabled: enabled,
            extraConfig: config?.extraConfig,
          };
        } else {
          return config;
        }
      });
      setUserBlocksConfig(filtersToUpdate);
    } else {
      const filterToAdd = [
        ...userBlocksConfig,
        {
          id: configToUpdate.id,
          name: configToUpdate.name,
          enumName: configToUpdate.enumName,
          ordering: configToUpdate.ordering,
          enabled: enabled,
          extraConfig: configToUpdate.extraConfig,
        },
      ];
      setUserBlocksConfig(filterToAdd);
    }
  };
  const addAndSaveExtraConfig = (enumName: string, extraConfig: string) => {
    const filtersToUpdate = userBlocksConfig?.map(config => {
      if (config.enumName === enumName) {
        return {
          id: config.id,
          name: config.name,
          enumName: config.enumName,
          ordering: config.ordering,
          enabled: config.enabled,
          extraConfig: extraConfig,
        };
      } else {
        return config;
      }
    });
    setUserBlocksConfig(filtersToUpdate);
    updateHomeSettings(filtersToUpdate, ConfigType.KPI_SECTION_FILTERS);
  };

  function handleResetHelpers() {
    reset(undefined);
  }

  function toggleVisible() {
    setVisible(!visible);
  }

  function getQSGType() {
    if (hasQSGEnabled) {
      if (isOTOAccount) {
        return 'OTO';
      } else if (isAdmin) {
        return 'ADMIN';
      } else {
        return 'USER';
      }
    }
  }
  const { t } = useTranslation();

  return (
    <div className={styles.centerContent__container}>
      <div className={styles.column__header}>
        <div className={styles.column__title}>
          <Text size="m" color="softPeanut">
            {t('common.kpis')}
          </Text>
          <div>
            <Select value={userSelectorConfig} size="small" onChange={updateSelector}>
              {availableDateOptions?.map(config => {
                if (config.enumName === Config.THIS_YEAR) {
                  return null;
                }
                return (
                  <Item value={config} key={config.id}>
                    {config.name}
                  </Item>
                );
              })}
            </Select>
          </div>
          <Dropdown
            ref={ref}
            visible={visible}
            position="bottom"
            anchor={
              <div className={styles.sliderRotate} onClick={toggleVisible}>
                <IconButton name="sliders" size={20} />
              </div>
            }
          >
            {blocksAvailableConfigs?.map(option => {
              const userBlock = userBlocksConfig?.find(
                block => block?.enumName === option.enumName,
              );
              const isEnabled = !!userBlock && userBlock?.enabled;
              // If the user is older than 15 days
              const creationDatetime = new Date(settings?.user?.creationDatetime);
              const isNewAccount = differenceInDays(new Date(), creationDatetime) < 15;
              const shouldShowTooltip =
                isEnabled &&
                option.enumName === 'QUICK_START_GUIDE' &&
                !isQSGCompleted &&
                isNewAccount;
              const tooltipText = t('home.centerContent.quickStartGuideHidden');
              if (!hasQSGEnabled && option.enumName === 'QUICK_START_GUIDE') return;

              return (
                <Tooltip key={option.id} title={shouldShowTooltip && tooltipText} position="top">
                  <Item
                    className={styles._tasks_item}
                    value={option.id}
                    onClick={() => {
                      if (!shouldShowTooltip) changeBlocksSettings(option, !isEnabled);
                    }}
                  >
                    <Text
                      size="s"
                      htmlTag="span"
                      color={!shouldShowTooltip ? 'bloobirds' : 'softPeanut'}
                    >
                      {option.name}
                    </Text>
                    <Icon size={16} name={isEnabled ? 'eye' : 'eyeOff'} />
                  </Item>
                </Tooltip>
              );
            })}
          </Dropdown>
          {visible && (
            <HomeFiltersTooltip defaultTooltipVisible={visible} handlerRef={handlerRef} />
          )}
          {type === 'SUPPORT_USER' && (
            <Button onClick={handleResetHelpers} size="small">
              {t('home.centerContent.resetHelpersButton')}
            </Button>
          )}
        </div>
      </div>
      {userSelectorConfig && userBlocksConfig && userEnabledBlocks?.length > 0 && (
        <SortableList
          className={styles.sortable}
          onReorder={valueList => {
            mixpanel.track(MIXPANEL_EVENTS.HOME_REORDERED_BLOCKS);
            const uniqIds: string[] = [];
            const list = valueList.reduce((acc, curr, index) => {
              if (uniqIds.includes(curr.id)) {
                return acc;
              } else {
                uniqIds.push(curr.id);
                return [
                  ...acc,
                  {
                    id: curr.id,
                    name: curr.name,
                    enumName: curr.enumName,
                    ordering: index,
                    enabled: curr.enabled,
                    extraConfig: curr.extraConfig,
                  },
                ];
              }
            }, []);
            //.filter(block => block.enumName !== HomepageBlocks.QUICK_START_GUIDE);
            setUserBlocksConfig(list);
            updateHomeSettings(list, ConfigType.KPI_SECTION_FILTERS);
          }}
          data={userEnabledBlocks}
          keyExtractor={x => x?.enumName}
          renderItem={({ item: block, innerRef, containerProps, handleProps, isDragging }) => (
            <BlockToRender
              block={block?.enumName}
              ref={innerRef}
              toggleFiltersVisible={toggleVisible}
              timeWindow={userSelectorConfig.enumName}
              selectorDefault={block.extraConfig}
              onChange={addAndSaveExtraConfig}
              fullSalesEnabled={isFullSalesEnabled}
              isDragging={!isDragging}
              QSGType={getQSGType()}
              {...containerProps}
              {...handleProps}
            />
          )}
        />
      )}
      {userEnabledBlocks?.length === 0 && (
        <div className={styles.quotes}>
          <Text size="m" color="softPeanut" align="center">
            &ldquo;{quote}&rdquo;
          </Text>
          <Text size="s" color="verySoftPeanut" align="center">
            - {author}
          </Text>
        </div>
      )}
    </div>
  );
};
