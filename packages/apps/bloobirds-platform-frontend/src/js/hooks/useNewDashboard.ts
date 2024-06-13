import { atom, useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { camelCase } from 'lodash';
import { useRouter } from './useRouter';
import * as definitions from '../constants/dashboardDefinitions';
import { DashboardPage } from '../constants/newDashboards';
import { APP_DASHBOARD_PROSPECTING } from '../app/_constants/routes';

interface DashboardDataRecoilState {
  isSideBarOpen: boolean;
}
const dashboardDataAtom = atom<DashboardDataRecoilState>({
  key: 'newDashboardDataAtom',
  default: {
    isSideBarOpen: true,
  },
});

export const useDashboard = () => {
  const { slug } = useParams<{ slug: string }>();
  const { history } = useRouter();

  const dashboardType = (): 'prospecting' | 'sales' => {
    const path = history.location.pathname.replace(`/${slug}`, '');
    return path === APP_DASHBOARD_PROSPECTING ? 'prospecting' : 'sales';
  };
  const [dashboardData, setDashboardData] = useRecoilState(dashboardDataAtom);

  const setIsSideBarOpen = (boolean: boolean) =>
    setDashboardData({ ...dashboardData, isSideBarOpen: boolean });

  /**
   * Most setters are wrapped with setLoadingStateEarly, which sets the
   * isFetching flag early to avoid UI flashes (ex: groupBy disclaimers,
   * changes of time interval in cohorts table)
   */
  // @ts-ignore
  const definition: DashboardPage = definitions.paths[dashboardType(slug)][camelCase(slug)];
  return {
    definition,
    dashboardData,
    setDashboardData,
    setIsSideBarOpen,
  };
};
