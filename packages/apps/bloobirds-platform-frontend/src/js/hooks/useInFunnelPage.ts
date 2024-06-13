import { useRouter } from './useRouter';

export const useInFunnelPage = () => {
  const { location } = useRouter();
  return location.pathname.includes('funnel');
};
