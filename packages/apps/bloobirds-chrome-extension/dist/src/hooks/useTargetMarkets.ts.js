import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { getTargetMarkets } from "/src/utils/leads.ts.js";
export const useTargetMarkets = () => {
  const { data } = useSWR("/utils/view/targetMarket", getTargetMarkets);
  return data;
};
