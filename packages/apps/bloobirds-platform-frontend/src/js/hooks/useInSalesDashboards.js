import { useRouter } from './useRouter';

export const useInSalesDashboards = () => {
  const { location } = useRouter();
  return location.pathname.includes('/dashboards/sales');
};
