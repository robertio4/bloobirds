import React, { useEffect, useMemo, useState } from 'react';

import {
  ExpandableBox,
  ExpandableStep,
  IconButton,
  SubStep,
  Text,
} from '@bloobirds-it/flamingo-ui';
import {getQuickStartGuideBlocks,
  UserHelperKeys,
  UserHelperTooltipsKeys,
  BobjectTypes,
} from '@bloobirds-it/types';
import { isObject } from 'lodash';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { bobjectUrl } from '../../../../app/_constants/routes';
import { WelcomeTooltip } from '../../../../components/discoveryTooltips/welcomeTooltips/welcomeTooltip';
import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { useEntity, useRouter } from '../../../../hooks';
import { useCadences } from '../../../../hooks/useCadences';
import { useQuickStartGuideCompletedAggregation } from '../../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import { api } from '../../../../utils/api';
import { getTextFromLogicRole } from '../../../../utils/bobjects.utils';
import styles from './quickStartGuide.module.css';
import { StepProps } from './quickStartGuide.types';
import {
  getIsCompleted,
  getIsDisabled,
  getNavigation,
  getTourKeys,
  tooltipTextDictionary,
} from './quickStartGuide.utils';

const { persistAtom } = recoilPersist();

interface QSGInfoAtomType {
  openedBlocks: string[];
  contactableBobjects: {
    Company: { url: string; creationDateTime: string };
    Lead: { url: string; creationDateTime: string };
  };
}

const QSGInfoAtom = atom<QSGInfoAtomType>({
  key: 'QSGInfo',
  //@ts-ignore
  default: { openedBlocks: ['PREPARE_PIPELINE'], contactableBobjects: {} },
  effects: [persistAtom],
});

export const Footer = () => (
  <div className={styles.hint_container}>
    <div className={styles.emoji}>🤓</div>
    <Text size="s" align="center">
      Check out Academy courses for best practices and level up content from Bloobirds Experts{' '}
    </Text>
    <div
      className={styles.academy_link}
      onClick={() => window.open('https://academy.bloobirds.com', '_blank')}
    >
      <Text size="s" color="bloobirds" align="center">
        https://academy.bloobirds.com
      </Text>
      <IconButton name="arrowRight" color="bloobirds" size={20} />
    </div>
  </div>
);

const Step = ({ goals, defaultOpened, ...props }: StepProps) => {
  const { cadences } = useCadences([BobjectTypes.Company, BobjectTypes.Lead]);
  const { userHelpers }: { userHelpers: Record<UserHelperKeys, Date> } = useUserSettings();
  const { user } = useUserSettings();
  const { has, reset } = useUserHelpers();
  const { history } = useRouter();
  const savedHelpersNumber = isObject(userHelpers) && Object.keys(userHelpers)?.length;
  const numberOfTotalGoals = goals?.length;

  const completedTasks = useMemo(
    () =>
      goals.reduce(
        (acc, { key }) =>
          acc +
          (getIsCompleted(userHelpers, key, {
            [UserHelperKeys.SET_UP_REMINDERS]: user.remaindersEnabled,
          })
            ? 1
            : 0),
        0,
      ),
    [goals.length, savedHelpersNumber],
  );

  const progressPercentage = (completedTasks / numberOfTotalGoals) * 100;
  const hasTargetMarkets = useEntity('targetMarkets')?.all()?.length !== 0;
  const hasBuyerPersonas = useEntity('idealCustomerProfiles')?.all()?.length !== 0;
  const emptyEntities = [
    !hasTargetMarkets && UserHelperKeys.CHECK_OUT_YOUR_TARGET_MARKETS,
    !hasBuyerPersonas && UserHelperKeys.CHECK_OUT_YOUR_BUYER_PERSONAS,
  ];
  const { contactableBobjects } = useRecoilValue(QSGInfoAtom);

  function handleCardClick(key: UserHelperKeys, linkNavigationFunction: string) {
    if (key === UserHelperKeys.ENABLE_KPI_METRICS) return props.toggleFiltersVisible();
    if (key === UserHelperKeys.DOWNLOAD_CHROME_EXTENSION)
      return window.open(linkNavigationFunction, '_blank');
    if (key === UserHelperKeys.CREATE_FIRST_LIST)
      reset(
        `${UserHelperTooltipsKeys.CREATE_FIRST_LIST_FILTERS_COLUMNS},${UserHelperTooltipsKeys.SAVE_LIST}` as UserHelperKeys,
      );
    if (linkNavigationFunction) {
      if (linkNavigationFunction.includes('app')) {
        history.push(linkNavigationFunction);
      } else {
        window.location.href = linkNavigationFunction;
      }
    }
    if (key.includes('TOUR')) reset(getTourKeys(key) as UserHelperKeys);
  }

  return (
    <ExpandableStep
      progressPercentage={progressPercentage}
      defaultOpened={defaultOpened && progressPercentage !== 100}
      {...props}
    >
      {goals.map(goal => {
        const { label, key, linkYoutube, linkHowTo, linkTour, linkNavigation } = goal;
        const isCompleted = getIsCompleted(userHelpers, key, {
          [UserHelperKeys.SET_UP_REMINDERS]: user.remaindersEnabled,
        });
        if (emptyEntities.includes(goal.key)) return;
        const linkNavigationFunction = getNavigation(linkNavigation, contactableBobjects, key);

        const { isDisabled, tooltipText } = Object.keys(tooltipTextDictionary)?.includes(key)
          ? getIsDisabled(key as keyof typeof tooltipTextDictionary, {
              [UserHelperKeys.LAUNCH_YOUR_FIRST_CADENCE]: !cadences,
              [UserHelperKeys.SEND_YOUR_FIRST_EMAIL]:
                Object.values(contactableBobjects).filter(bobject => bobject.url !== '').length ===
                0,
              [UserHelperKeys.START_TASK_FROM_CADENCE]: !has(
                UserHelperKeys.LAUNCH_YOUR_FIRST_CADENCE,
              ),
              [UserHelperKeys.MARK_AS_DONE_ATTEMPT]: !has(UserHelperKeys.LAUNCH_YOUR_FIRST_CADENCE),
            })
          : { isDisabled: false, tooltipText: '' };

        return (
          <SubStep
            key={key}
            isDisabled={isDisabled}
            completed={isCompleted}
            tooltipText={tooltipText}
            title={label}
            linkHowTo={linkHowTo}
            linkTour={linkTour}
            linkYoutube={linkYoutube}
            linkNavigation={linkNavigationFunction}
            onClick={() => {
              handleCardClick(key, linkNavigationFunction);
            }}
          />
        );
      })}
    </ExpandableStep>
  );
};

export const QuickStartGuide = React.forwardRef(
  (
    { toggleFiltersVisible, ...props }: { toggleFiltersVisible: () => void },
    ref: React.LegacyRef<HTMLDivElement>,
  ) => {
    const [tasksTotal, setTasksTotal] = useState(0);
    const [{ openedBlocks, contactableBobjects }, setQSGInfo] = useRecoilState(QSGInfoAtom);
    const completedGoals = useQuickStartGuideCompletedAggregation();
    const settings = useUserSettings();
    const { has } = useUserHelpers();
    const quickStartGuideBlocks = getQuickStartGuideBlocks({
      LINKEDIN_SALES: { hasExtension: has(UserHelperKeys.DOWNLOAD_CHROME_EXTENSION) },
    });

    useEffect(() => {
      if (Object.values(contactableBobjects).filter(bobject => bobject.url !== '').length === 0) {
        const searchQuery = {
          page: 0,
          formFields: true,
          pageSize: 1,
          injectReferences: true,
          sort: [] as Array<string>,
        };
        const userId = settings?.user?.id;
        api
          .post(`/bobjects/${settings?.account.id}/Company/search`, {
            query: {
              [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userId,
            },
            ...searchQuery,
          })
          .then(responseCompany => {
            const company = responseCompany?.data?.contents[0];
            api
              .post(`/bobjects/${settings?.account.id}/Lead/search`, {
                query: {
                  [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userId,
                },
                ...searchQuery,
              })
              .then(responseLead => {
                const lead = responseLead?.data?.contents[0];
                setQSGInfo({
                  openedBlocks: openedBlocks,
                  contactableBobjects: {
                    [BobjectTypes.Company]: {
                      url: bobjectUrl(company),
                      creationDateTime: getTextFromLogicRole(
                        company,
                        COMPANY_FIELDS_LOGIC_ROLE.CREATION_DATETIME,
                      ),
                    },
                    [BobjectTypes.Lead]: {
                      url: bobjectUrl(lead),
                      creationDateTime: getTextFromLogicRole(
                        lead,
                        LEAD_FIELDS_LOGIC_ROLE.CREATION_DATETIME,
                      ),
                    },
                  },
                });
              });
          });
      }
    }, []);

    function handleStepClick(key: string) {
      const openedBlockInfo = openedBlocks.includes(key)
        ? openedBlocks.filter((block: string) => block !== key)
        : [...openedBlocks, key];
      setQSGInfo({
        openedBlocks: openedBlockInfo,
        contactableBobjects,
      });
    }

    useEffect(() => {
      const totalGoals = quickStartGuideBlocks.reduce((acc, block) => {
        return acc + block.goals.length;
      }, 0);

      setTasksTotal(totalGoals);
    }, [quickStartGuideBlocks]);

    return (
      <div ref={ref} {...props}>
        <ExpandableBox
          defaultOpened={true}
          title="Your quick start guide 🚀"
          subtitle={
            <>
              <WelcomeTooltip defaultTooltipVisible />
              Start prospecting in less than <b>10 minutes!</b>
            </>
          }
          progressPercentage={(completedGoals / tasksTotal) * 100}
          progressText={`${completedGoals} / ${tasksTotal} tasks completed`}
        >
          <div className={styles.container}>
            {quickStartGuideBlocks.map(block => (
              <Step
                key={block.key}
                defaultOpened={openedBlocks?.includes(block?.key)}
                onClick={() => handleStepClick(block.key)}
                {...(block.key === 'MESSAGE_PROGRESS' ? { toggleFiltersVisible } : {})}
                {...block}
              />
            ))}
            <Footer />
          </div>
        </ExpandableBox>
      </div>
    );
  },
);
