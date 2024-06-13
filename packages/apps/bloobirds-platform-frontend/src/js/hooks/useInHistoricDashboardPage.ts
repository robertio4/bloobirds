import { useRouter } from './useRouter';

export const useInHistoricDashboardPage = () => {
  const { location } = useRouter();
  return location.pathname.includes('historic_conversion_rates');
};
