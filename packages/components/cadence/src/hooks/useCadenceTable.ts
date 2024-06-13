import { useEffect, useMemo, useState } from 'react';

import {
  Bobject,
  BobjectId,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  FIELDS_LOGIC_ROLE,
  isBobject,
  MainBobjectTypes,
} from '@bloobirds-it/types';
import { api, getTextFromLogicRole, getValueFromLogicRole, isCompany } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { useCadences } from './useCadences';

const fetchCadenceByTargetMarket = ([url, targetMarketName]) =>
  api.get(`${url}${targetMarketName ? `?targetMarketName=${targetMarketName}` : ''}`);

interface BobjectToSet {
  id: BobjectId;
  targetMarket: string;
  cadenceId?: string;
  cadence?: string;
}

export const useCadenceTable = (bobjectToSet: Bobject | BobjectToSet) => {
  const [bobject, setBobject] = useState(bobjectToSet);
  const typeName = bobject?.id?.typeName;
  const accountId = bobject?.id?.accountId;
  const { cadences } = useCadences({ bobjectTypeName: typeName, accountId, includeDeleted: true });
  const companyTM = useMemo(() => {
    if (bobject) {
      if (!isBobject(bobject)) {
        return bobject.targetMarket;
      } else if (isCompany(bobject)) {
        return getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET);
      }
    } else return null;
  }, [bobject]);

  const { data: cadenceByTargetMarket } = useSWR(
    companyTM ? ['/service/view/cadence/targetMarket', companyTM] : null,
    fetchCadenceByTargetMarket,
  );

  const getDefaultCadence = () => {
    switch (typeName) {
      case BobjectTypes.Company: {
        const defaultCadenceByBobjectType = cadences?.find(
          (cadence: any) => cadence?.defaultCadence,
        );
        const defaultCadenceByTargetMarket = cadences?.find(
          (cadence: any) => cadence.name === cadenceByTargetMarket?.data?.name,
        );
        return defaultCadenceByTargetMarket || defaultCadenceByBobjectType;
      }
      case BobjectTypes.Opportunity: {
        // TODO: Talk about how to better do this bullshit
        //return settings?.opportunityDefaultCadenceName;
        return null;
      }
      case BobjectTypes.Lead:
        return cadences?.find((cadence: any) => cadence.defaultCadence);
      default:
        return undefined;
    }
  };
  const defaultCadence = useMemo(() => bobject && cadences && getDefaultCadence(), [
    bobject,
    cadences,
    cadenceByTargetMarket,
  ]);

  const cadenceId = useMemo(() => {
    let cadenceName = '';

    if (bobject) {
      if (isBobject(bobject)) {
        cadenceName = getValueFromLogicRole(
          bobject,
          FIELDS_LOGIC_ROLE[bobject.id?.typeName as MainBobjectTypes]?.CADENCE,
        );
      } else {
        cadenceName = bobject.cadenceId ?? bobject.cadence;
      }
    }
    return cadenceName;
  }, [bobject]);

  useEffect(() => {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }
  }, [bobjectToSet]);

  return {
    bobject,
    cadence: cadenceId
      ? cadences?.find((cadence: any) => cadence?.id === cadenceId)
      : defaultCadence,
    defaultCadence,
  };
};
