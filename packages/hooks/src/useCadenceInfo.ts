import { api, getTextFromLogicRole, isCompany, isLead, isOpportunity } from "@bloobirds-it/utils";
import { Bobject, COMPANY_FIELDS_LOGIC_ROLE } from "@bloobirds-it/types";
import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";

const fetchCadenceByTargetMarket = ([url, targetMarketName]: [url: string, targetMarketName: string]) =>
  api.get(`${url}${targetMarketName ? `?targetMarketName=${targetMarketName}` : ''}`);

const fetchCadences = ([url, ...filters]: [url: string, ...filters: Array<string>]) =>
  api.get(`${url}/?bobjectTypes=${filters[0]}`, {});

interface CadenceObject {
  id: string;
  reschedulableMode: string
}

interface CadenceInfoReturns {
  cadence: CadenceObject;
  defaultCadence: CadenceObject;
  getCadenceById: (cadenceId: string) => CadenceObject;
}
//TODO this should be refactored
export const useCadenceInfo = (bobjectToSet: Bobject): CadenceInfoReturns => {
  const [bobject, setBobject] = useState(bobjectToSet);
  const typeName = bobject?.id?.typeName;

  const { data: entities } = useSWR(
    //TODO add parsing to request multiple bobjectypes
    //bobjectTypesToRequest ? ['/messaging/cadences', bobjectTypesToRequest.join(',')] : null,
    ['/messaging/cadences', typeName],
    fetchCadences,
    {
      revalidateOnFocus: false,
    },
  );
  const cadences = entities?.data?.cadences;

  const companyTM =
    bobject && isCompany(bobject)
      ? getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET)
      : null;

  const { data: cadenceByTargetMarket } = useSWR(
    companyTM ? ['/service/view/cadence/targetMarket', companyTM] : null,
    fetchCadenceByTargetMarket,
    {
      revalidateOnFocus: false,
    },
  );

  const getDefaultCadence = () => {
    if (isCompany(bobject) && cadences) {
      const defaultCadenceByBobjectType = cadences?.find((cadence: any) => cadence?.defaultCadence);
      const defaultCadenceByTargetMarket = cadences?.find(
        (cadence: any) => cadence.name === cadenceByTargetMarket?.data?.name,
      );
      return defaultCadenceByTargetMarket || defaultCadenceByBobjectType;
    }

    if (isOpportunity(bobject)) {
      // TODO: Talk about how to better do this bullshit
      //return settings?.opportunityDefaultCadenceName;
      return null;
    }

    if (isLead(bobject)) {
      return cadences?.find((cadence: any) => cadence.defaultCadence);
    }

    return undefined;
  };
  const defaultCadence = useMemo(() => bobject && cadences && getDefaultCadence(), [
    bobject,
    cadences,
    cadenceByTargetMarket,
  ]);

  const cadenceId = (bobject as any)?.cadence;

  useEffect(() => {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }
  }, [bobjectToSet]);

  function getCadenceById(cadenceId: string) {
    return cadences?.find(({ id }: { id: string }) => cadenceId === id);
  }

  return {
    cadence: cadenceId
      ? cadences?.find((cadence: any) => cadence?.id === cadenceId)
      : defaultCadence,
    defaultCadence,
    getCadenceById,
  };
};
