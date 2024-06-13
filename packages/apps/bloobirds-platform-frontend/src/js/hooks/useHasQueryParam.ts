import { useLocation } from 'react-router';

export const useHasQueryParam = (param: string) => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  return query.get(param);
};
