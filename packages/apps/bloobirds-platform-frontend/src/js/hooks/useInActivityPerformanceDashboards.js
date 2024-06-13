import { useRouter } from './useRouter';

export const useInActivityPerformanceDashboards = () => {
  const { location } = useRouter();
  return location.pathname.includes('/dashboards/prospecting/activity_performance');
};
