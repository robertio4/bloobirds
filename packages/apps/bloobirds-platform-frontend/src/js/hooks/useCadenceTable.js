import { useEffect, useMemo, useState } from 'react';

import useSWR from 'swr';

import { useUserSettings } from '../components/userPermissions/hooks';
import { FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../constants/company';
import { ServiceApi } from '../misc/api/service';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  isCompany,
  isLead,
  isOpportunity,
} from '../utils/bobjects.utils';
import { useBobjectTypes } from './useBobjectTypes';
import { useCadences } from './useCadences';

const fetchCadenceByTargetMarket = ([url, targetMarketName]) =>
  ServiceApi.request({
    url,
    method: 'GET',
    requestParams: {
      targetMarketName,
    },
  });

/**
 * @deprecated use the one in the hooks folder in cadence package
 * @param bobjectToSet
 * @returns {{bobject: unknown, defaultCadence: unknown, cadence: unknown}}
 */
export const useCadenceTable = bobjectToSet => {
  const [bobject, setBobject] = useState(bobjectToSet);
  const typeName = bobject?.id?.typeName;
  const { cadences } = useCadences(typeName, true);
  const bobjectTypes = useBobjectTypes();
  const settings = useUserSettings();
  const companyTM =
    bobject && isCompany(bobject)
      ? getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET)
      : null;

  const { data: cadenceByTargetMarket } = useSWR(
    companyTM ? ['/service/view/cadence/targetMarket', companyTM] : null,
    fetchCadenceByTargetMarket,
  );

  const getDefaultCadence = () => {
    if (isCompany(bobject) && cadences) {
      const defaultCadenceByBobjectType = cadences?.find(cadence => cadence?.defaultCadence);
      const defaultCadenceByTargetMarket = cadences?.find(
        cadence => cadence.name === cadenceByTargetMarket?.name,
      );
      return defaultCadenceByTargetMarket || defaultCadenceByBobjectType;
    }

    if (isOpportunity(bobject)) {
      return settings?.opportunityDefaultCadenceName;
    }

    if (isLead(bobject)) {
      return cadences?.find(cadence => cadence.defaultCadence);
    }

    return undefined;
  };
  const defaultCadence = useMemo(() => bobject && cadences && getDefaultCadence(), [
    bobject,
    cadences,
    bobjectTypes,
    cadenceByTargetMarket,
  ]);

  const cadenceId = useMemo(() => {
    let cadenceName = '';

    if (bobject) {
      cadenceName = getFieldByLogicRole(bobject, FIELDS_LOGIC_ROLE[bobject?.id.typeName].CADENCE)
        ?.value;
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
    cadence: cadenceId ? cadences?.find(cadence => cadence?.id === cadenceId) : defaultCadence,
    defaultCadence,
  };
};
