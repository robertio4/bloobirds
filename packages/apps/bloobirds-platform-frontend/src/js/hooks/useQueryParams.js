// A custom hook that builds on useLocation to parse the query string for you.
import { useLocation } from 'react-router';

export const useQueryParams = () => new URLSearchParams(useLocation().search);

export const useQueryParam = (name, decoded = false) => {
  const queryParams = useQueryParams();
  const paramValue = queryParams.get(name);

  if (decoded) {
    return paramValue ? decodeURIComponent(paramValue) : null;
  } else {
    return paramValue;
  }
};
