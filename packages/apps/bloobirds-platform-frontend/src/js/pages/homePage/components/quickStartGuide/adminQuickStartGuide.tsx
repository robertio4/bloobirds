import React, { useEffect, useMemo, useState } from 'react';

import { ExpandableBox, ExpandableStep, SubStep } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useCadenceV2Enabled } from '@bloobirds-it/hooks';
import {getAdminQuickStartGuideBlocks,
  UserHelperKeys,
  UserHelperTooltipsKeys,
  UserPermission,
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
import { useEntity, usePhoneConnections, useRouter } from '../../../../hooks';
import { useCadences } from '../../../../hooks/useCadences';
import { useQuickStartGuideCompletedAggregation } from '../../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import { api } from '../../../../utils/api';
import { getTextFromLogicRole } from '../../../../utils/bobjects.utils';
import { UserCreatedModal } from '../../../accountSettingsPages/usersPage/components/userCreatedModal/userCreatedModal';
import { useUserCreatedModal } from '../../../accountSettingsPages/usersPage/hooks/useUserCreatedModal';
import { SelectCRMViewModal } from '../chooseCRMModal/selectCRMModal';
import InvitationForm from '../invitationForm/invitationForm';
import { Footer } from './quickStartGuide';
import styles from './quickStartGuide.module.css';
import { AdminQSGInfoType, StepPropsAdmin } from './quickStartGuide.types';
import {
  getAdminTourKeys,
  getIsCompleted,
  getIsDisabled,
  getNavigation,
  getSkippableText,
  tooltipTextDictionary,
} from './quickStartGuide.utils';

const { persistAtom } = recoilPersist();

const AdminQSGInfoAtom = atom<AdminQSGInfoType>({
  key: 'AdminQSGInfo',
  default: { openedAdminBlocks: ['DEFINE_PLAYBOOK'], contactableBobjects: {} },
  effects: [persistAtom],
});

const Step = ({ goals, setSelectCRMModalIsOpen, defaultOpened, ...props }: StepPropsAdmin) => {
  const { userHelpers }: { userHelpers: Record<UserHelperKeys, Date> } = useUserSettings();
  const { user } = useUserSettings();
  const { cadences } = useCadences([BobjectTypes.Company, BobjectTypes.Lead]);
  const { save, reset } = useUserHelpers();
  const { connections } = usePhoneConnections();
  const hasConnections = connections?.list?.length > 0;
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
            [UserHelperKeys.SAVE_NUMBER_SETTINGS]: hasConnections,
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
  const { contactableBobjects } = useRecoilValue(AdminQSGInfoAtom);
  const [showInvitationForm, setShowInvitationForm] = useState<boolean>(true);

  function handleCardClick(key: UserHelperKeys, linkNavigationFunction: string) {
    if (key === UserHelperKeys.ENABLE_KPI_METRICS) {
      props.toggleFiltersVisible();
    } else if (key === UserHelperKeys.CONNECT_CRM_TOUR) {
      setSelectCRMModalIsOpen(true);
    } else if (key === UserHelperKeys.INVITE_TEAM) {
      setShowInvitationForm(!showInvitationForm);
    } else if (key === UserHelperKeys.DOWNLOAD_CHROME_EXTENSION) {
      return window.open(linkNavigationFunction, '_blank');
    } else if (key === UserHelperKeys.CREATE_FIRST_LIST) {
      reset(
        `${UserHelperTooltipsKeys.CREATE_FIRST_LIST_FILTERS_COLUMNS},${UserHelperTooltipsKeys.SAVE_LIST}`,
      );
    }
    if (linkNavigationFunction) {
      if (linkNavigationFunction.includes('app')) {
        history.push(linkNavigationFunction);
      } else {
        window.open(linkNavigationFunction, '_blank');
      }
    }
    if (key.includes('TOUR')) reset(getAdminTourKeys(key));
  }

  function handleCardComplete(key: UserHelperKeys, skippable: boolean) {
    if (skippable) {
      save(key);
    }
  }

  return (
    <>
      <ExpandableStep
        progressPercentage={progressPercentage}
        defaultOpened={defaultOpened && progressPercentage !== 100}
        {...props}
      >
        {goals.map(goal => {
          const { label, key, linkYoutube, linkHowTo, linkTour, linkNavigation, skippable } = goal;
          const isCompleted = getIsCompleted(userHelpers, key, {
            [UserHelperKeys.SET_UP_REMINDERS]: user.remaindersEnabled,
            [UserHelperKeys.SAVE_NUMBER_SETTINGS]: hasConnections,
          });
          if (emptyEntities.includes(goal.key)) return;
          const linkNavigationFunction = getNavigation(linkNavigation, contactableBobjects, key);

          const { isDisabled, tooltipText } = Object.keys(tooltipTextDictionary)?.includes(key)
            ? getIsDisabled(key as keyof typeof tooltipTextDictionary, {
                [UserHelperKeys.LAUNCH_YOUR_FIRST_CADENCE]: !cadences,
                [UserHelperKeys.SEND_YOUR_FIRST_EMAIL]:
                  Object.values(contactableBobjects).filter(bobject => bobject.url !== '')
                    .length === 0,
              })
            : { isDisabled: false, tooltipText: '' };

          return (
            <>
              <SubStep
                key={key}
                isDisabled={isDisabled}
                tooltipText={tooltipText}
                completed={isCompleted}
                title={label}
                linkHowTo={linkHowTo}
                linkTour={linkTour}
                linkYoutube={linkYoutube}
                linkNavigation={linkNavigationFunction}
                onClick={() => {
                  if (key.includes('TOUR')) reset(getAdminTourKeys(key) as UserHelperKeys);
                  handleCardClick(key, linkNavigationFunction);
                }}
                onComplete={() => handleCardComplete(key, skippable)}
                skippable={!!skippable}
                skippableText={getSkippableText(key)}
              />
              {showInvitationForm && key === UserHelperKeys.INVITE_TEAM && <InvitationForm />}
            </>
          );
        })}
      </ExpandableStep>
    </>
  );
};

export const AdminQuickStartGuide = React.forwardRef(
  (
    {
      toggleFiltersVisible,
      ...props
    }: {
      toggleFiltersVisible: () => void;
    },
    ref: React.LegacyRef<HTMLDivElement>,
  ) => {
    const [tasksTotal, setTasksTotal] = useState(0);
    const [{ openedAdminBlocks, contactableBobjects }, setAdminQSGInfo] = useRecoilState(
      AdminQSGInfoAtom,
    );
    const completedGoals = useQuickStartGuideCompletedAggregation();
    const [selectCRMModalIsOpen, setSelectCRMModalIsOpen] = useState(false);
    const { has } = useUserHelpers();
    const { settings } = useActiveUserSettings();
    const cadencesV2Enabled = useCadenceV2Enabled(settings?.account?.id);
    const hasCadencePermission = settings?.user?.permissions?.includes(
      UserPermission.VIEW_CADENCES,
    );

    const adminQuickStartGuideBlocks = getAdminQuickStartGuideBlocks(
      hasCadencePermission,
      cadencesV2Enabled,
      {
        READY_TO_LINKEDIN: { hasExtension: has(UserHelperKeys.DOWNLOAD_CHROME_EXTENSION) },
      },
    );
    const { handleCloseUserCreatedModal, modalOpen: userCreatedOpen } = useUserCreatedModal();

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
                setAdminQSGInfo({
                  openedAdminBlocks: openedAdminBlocks,
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
      const openedAdminBlockInfo = openedAdminBlocks.includes(key)
        ? openedAdminBlocks.filter((block: string) => block !== key)
        : [...openedAdminBlocks, key];
      setAdminQSGInfo({
        openedAdminBlocks: openedAdminBlockInfo,
        contactableBobjects,
      });
    }

    useEffect(() => {
      const totalGoals = adminQuickStartGuideBlocks.reduce((acc, block) => {
        return acc + block.goals.length;
      }, 0);

      setTasksTotal(totalGoals);
    }, [adminQuickStartGuideBlocks]);

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
            {adminQuickStartGuideBlocks.map((block, index) => (
              <Step
                key={block.key + '-' + index}
                defaultOpened={openedAdminBlocks?.includes(block?.key)}
                setSelectCRMModalIsOpen={setSelectCRMModalIsOpen}
                onClick={() => handleStepClick(block.key)}
                toggleFiltersVisible={toggleFiltersVisible}
                {...block}
              />
            ))}
            <Footer />
          </div>
        </ExpandableBox>
        {selectCRMModalIsOpen && (
          <SelectCRMViewModal onClose={() => setSelectCRMModalIsOpen(false)} />
        )}
        {userCreatedOpen && <UserCreatedModal onClose={handleCloseUserCreatedModal} />}
      </div>
    );
  },
);
