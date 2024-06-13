import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { getBuyerPersonas } from "/src/utils/leads.ts.js";
export const useBuyerPersonas = () => {
  const { data } = useSWR("/utils/view/idealCustomerProfile", getBuyerPersonas);
  return data;
};
