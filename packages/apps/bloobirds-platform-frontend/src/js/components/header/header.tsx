import React from 'react';

import { Divider, Dropdown, Item, Nav, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import {
  useAiAnalysisEnabled,
  useCadenceV2Enabled,
  useFullSalesEnabled,
} from '@bloobirds-it/hooks';
import {
  APP_AI_ANALYSIS,
  APP_CADENCES,
  APP_CADENCES_MANAGE,
  APP_CL_ACTIVITIES,
  APP_CL_COMPANIES,
  APP_CL_LEADS,
  APP_CL_LISTS,
  APP_CL_MEETINGS,
  APP_CL_OPPORTUNITIES,
  APP_CL_TASKS,
  APP_DASHBOARD,
  APP_MANAGEMENT_USER,
  APP_TASKS,
  APP_TASKS_WELCOME,
  BobjectTypes,
} from '@bloobirds-it/types';
import clsx from 'clsx';
import { atom, useSetRecoilState } from 'recoil';

import { useDialerVisibility, useMediaQuery, useRouter } from '../../hooks';
import { USER_PERMISSIONS } from '../userPermissions/constants';
import { useUserPermissions, useUserSettings } from '../userPermissions/hooks';
import { BloobirdsLogo } from './bloobirdsIcon';
import styles from './header.module.css';
import { HeaderActions } from './headerActions/headerActions.view';

export const listBobjectTypeAtom = atom({
  key: 'listBobjectType',
  default: undefined,
});

const Header = () => {
  const { dashboards: canSeeDashboards } = useUserPermissions();
  const setListBobjectTypeAtom = useSetRecoilState(listBobjectTypeAtom);
  const { pathname, push } = useRouter();
  const settings = useUserSettings();
  const hasCadencePermission = settings?.user?.permissions?.includes(
    USER_PERMISSIONS.VIEW_CADENCES,
  );
  const user = settings?.user;
  const canSeeReports = user?.permissions?.includes('VIEW_REPORTS');
  const salesFeatureEnabled = useFullSalesEnabled(settings?.account?.id);
  const cadenceV2Enabled = useCadenceV2Enabled(settings?.account?.id);
  const aiAnalysisEnabled = useAiAnalysisEnabled(settings?.account?.id);

  const { ref, visible: isDropdownVisible, setVisible } = useVisible(false);
  const { isOpen: isDialerOpen } = useDialerVisibility();
  const { windowDimensions, isSmallDesktop } = useMediaQuery();
  const screenWithSpace = windowDimensions.width > 1650;

  const handleClick = () => {
    setVisible(!isDropdownVisible);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleClickForRedirect = (url: any, e: any) => {
    push(url, { event: e });
    handleClick();
  };

  if (pathname.includes(APP_MANAGEMENT_USER)) {
    return null;
  }

  return (
    <header
      className={clsx(styles._container, {
        [styles._is_dialer_open]: isDialerOpen,
        [styles._is_dialer_open_small]: (isDialerOpen && !screenWithSpace) || isSmallDesktop,
      })}
    >
      <div
        className={clsx(styles._left_column, {
          [styles._left_column_dialer_open]: (isDialerOpen && !screenWithSpace) || isSmallDesktop,
        })}
      >
        <BloobirdsLogo />
        <div
          className={clsx(styles._account_name_wrapper, {
            [styles._account_name_wrapper_is_open_dialer]:
              (isDialerOpen && !screenWithSpace) || isSmallDesktop,
          })}
        >
          <Text size="m" weight="bold" color="bloobirds">
            {settings?.account.name || ''}
          </Text>
        </div>
      </div>
      <div data-test="Container-HeaderNavBar" className={styles._middle_column}>
        <div
          className={clsx(styles._tabs_wrapper, {
            [styles._tab_AI_analysis_active]: pathname.startsWith(APP_AI_ANALYSIS),
          })}
        >
          <Nav
            iconLeft="home"
            active={pathname === APP_TASKS_WELCOME}
            dataTest="Nav-HeaderHome"
            onClick={e => {
              push(APP_TASKS, { event: e });
              handleClose();
            }}
            size="small"
          >
            Home
          </Nav>
          {canSeeReports && (
            <Dropdown
              ref={ref}
              visible={isDropdownVisible}
              arrow={false}
              anchor={
                <Nav
                  iconLeft="list"
                  iconRight={isDropdownVisible ? 'chevronUp' : 'chevronDown'}
                  active={[
                    APP_CL_TASKS,
                    APP_CL_ACTIVITIES,
                    APP_CL_MEETINGS,
                    APP_CL_COMPANIES,
                    APP_CL_LEADS,
                    APP_CL_LISTS,
                    APP_CL_OPPORTUNITIES,
                  ].some(e => pathname.startsWith(e))}
                  dataTest="Nav-HeaderLists"
                  onClick={() => {
                    handleClick();
                  }}
                  size="small"
                >
                  {cadenceV2Enabled ? 'Reports' : 'Lists'}
                </Nav>
              }
            >
              <Item
                icon="list"
                dataTest="HeaderListsAllSaved"
                onClick={(value, e) => {
                  handleClickForRedirect(APP_CL_LISTS, e);
                }}
              >
                All saved {cadenceV2Enabled ? 'reports' : 'lists'}
              </Item>
              <Divider />
              <Item
                icon="briefcase"
                dataTest="HeaderListsCompanies"
                onClick={(value, e) => {
                  {
                    setListBobjectTypeAtom(BobjectTypes.Company);
                    handleClickForRedirect(APP_CL_COMPANIES, e);
                  }
                }}
              >
                Companies
              </Item>
              <Item
                icon="people"
                dataTest="HeaderListsLeads"
                onClick={(value, e) => {
                  setListBobjectTypeAtom(BobjectTypes.Lead);
                  handleClickForRedirect(APP_CL_LEADS, e);
                }}
              >
                Leads
              </Item>
              <Item
                icon="calendar"
                dataTest="HeaderListsMeetings"
                onClick={(value, e) => {
                  setListBobjectTypeAtom('Meeting');
                  handleClickForRedirect(APP_CL_MEETINGS, e);
                }}
              >
                Meetings
              </Item>
              {salesFeatureEnabled && (
                <Item
                  icon="fileOpportunity"
                  dataTest="HeaderListsOpportunities"
                  onClick={(value, e) => {
                    setListBobjectTypeAtom(BobjectTypes.Opportunity);
                    handleClickForRedirect(APP_CL_OPPORTUNITIES, e);
                  }}
                >
                  Opportunities
                </Item>
              )}
              <Item
                icon="gridSquares"
                dataTest="HeaderListsActivities"
                onClick={(value, e) => {
                  setListBobjectTypeAtom(BobjectTypes.Activity);
                  handleClickForRedirect(APP_CL_ACTIVITIES, e);
                }}
              >
                Activities
              </Item>
              <Item
                icon="check"
                dataTest="HeaderListsTasks"
                onClick={(value, e) => {
                  setListBobjectTypeAtom(BobjectTypes.Task);
                  handleClickForRedirect(APP_CL_TASKS, e);
                }}
              >
                Tasks
              </Item>
            </Dropdown>
          )}
          {cadenceV2Enabled && hasCadencePermission && (
            <Nav
              iconLeft="deliver"
              active={pathname.startsWith(APP_CADENCES)}
              size="small"
              dataTest="Nav-HeaderCadences"
              onClick={() => {
                push(`${APP_CADENCES_MANAGE}`);
              }}
            >
              Cadences
            </Nav>
          )}
          {canSeeDashboards && (
            <Nav
              iconLeft="barchart"
              active={pathname.startsWith(APP_DASHBOARD)}
              size="small"
              dataTest="Nav-HeaderDashboards"
              onClick={() => {
                push(`${APP_DASHBOARD}`);
              }}
            >
              Dashboards
            </Nav>
          )}
          {aiAnalysisEnabled && (
            <Nav
              iconLeft="search"
              active={pathname.startsWith(APP_AI_ANALYSIS)}
              size="small"
              dataTest="Nav-HeaderAiAnalysis"
              /* onClick={() => {
                push(`${APP_AI_ANALYSIS_MEETING}`);
              }} */
            >
              AI Analysis
            </Nav>
          )}
        </div>
      </div>
      <div className={styles._right_column} data-test="Container-HeaderActions">
        <HeaderActions userName={settings?.user.name} />
      </div>
    </header>
  );
};

export default Header;
