import { atom, useRecoilState } from 'recoil';
import { groupBy } from 'lodash';
import {
  getTextFromLogicRole,
  getValueFromLogicRole,
  isCompany,
  isLead,
} from '../utils/bobjects.utils';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../constants/lead';
import { useEntity } from './entities/useEntity';
import { useBobjectTypes } from './useBobjectTypes';
import { useCadences } from './useCadences';
import { Bobject } from '../typings/bobjects';
import { CadenceObject } from '../typings/cadence';

const quickStartOpenAtom = atom({
  key: 'quickStartOpenAtom',
  default: false,
});

const quickStartDataAtom = atom({
  key: 'quickStartDataAtom',
  default: null,
});

const useQuickStartVisibility = () => {
  const [quickStartOpen, setQuickStartOpen] = useRecoilState(quickStartOpenAtom);

  const openQuickStartModal = () => {
    if (!quickStartOpen) {
      setQuickStartOpen(true);
    }
  };

  const closeQuickStartModal = () => {
    if (quickStartOpen) {
      setQuickStartOpen(false);
    }
  };

  return {
    isOpen: quickStartOpen,
    openQuickStartModal,
    closeQuickStartModal,
  };
};

const isBulkActionAtom = atom({
  key: 'isBulkActionAtom',
  default: false,
});

const getQuickStartData = (
  data: Bobject | Bobject[],
): { bobjectName: string; bobjectBusinessAsset: any; cadence: string; defaultCadence?: any } => {
  // Confirm if data is from a bulk action or not
  if (!Array.isArray(data)) {
    // Search corresponding fields depending on the bobject type
    const LOGIC_ROLES = isCompany(data)
      ? {
          NAME: COMPANY_FIELDS_LOGIC_ROLE.NAME,
          BUSINESS_ASSET: COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
          CADENCE: COMPANY_FIELDS_LOGIC_ROLE.CADENCE,
        }
      : {
          NAME: LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
          BUSINESS_ASSET: LEAD_FIELDS_LOGIC_ROLE.ICP,
          CADENCE: LEAD_FIELDS_LOGIC_ROLE.CADENCE,
        };
    const bobjectName = getTextFromLogicRole(data, LOGIC_ROLES.NAME);
    const bobjectBusinessAsset = getTextFromLogicRole(data, LOGIC_ROLES.BUSINESS_ASSET);
    const cadence = getValueFromLogicRole(data, LOGIC_ROLES.CADENCE);
    return { bobjectName, bobjectBusinessAsset, cadence };
    // Possibility to add Opportunities here in case you need, not my case.
  }
  return { bobjectName: null, bobjectBusinessAsset: null, cadence: null };
};

const getDefaultCadenceInfo = (
  data: { id: { typeName: any } }[],
  bobjectTypes: any[],
  cadences: CadenceObject[],
): { defaultCadence: CadenceObject } => {
  const isBulk = Array.isArray(data);
  const bobjectType = bobjectTypes?.find(type =>
    // @ts-ignore
    isBulk ? data[0].id?.typeName === type?.name : data?.id?.typeName === type?.name,
  );
  return {
    defaultCadence: cadences?.find(
      cadence => cadence?.bobjectType === bobjectType?.id && cadence?.defaultCadence,
    ),
  };
};

const getEnrolledBobjectsInfo = (
  data: any[],
  defaultCadence: any,
  options: {
    buyerPersonas: {
      cadence: any;
      id: string;
    }[];
  },
) => {
  if (Array.isArray(data)) {
    if (isCompany(data[0])) {
      // Get Companies with target market included
      const companiesWithTargetMarket = data?.filter(company => {
        const targetMarket = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET);
        return !!targetMarket;
      });
      const enrollable = defaultCadence ? data : companiesWithTargetMarket;
      const total = data?.length;
      const groupedCompaniesTM = groupBy(
        companiesWithTargetMarket,
        x =>
          x.fields.find(
            (y: { logicRole: string }) => y.logicRole === COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
          )?.value,
      );

      return {
        enrollableBobjects: enrollable,
        excludedBobjects: defaultCadence ? 0 : total - enrollable?.length,
        groupedByBusinessAssetBobjects: groupedCompaniesTM,
        bobjectsWithBusinessAsset: companiesWithTargetMarket,
        totalBobjects: total,
      };
    }
    if (isLead(data[0])) {
      // Get Leads with buyer persona included
      const leadsWithBuyerPersonaAndCadence = data?.filter(lead => {
        const buyerPersona = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP);
        // We need to do this extra validation as all target markets have a default cadence but not for leads
        const hasBuyerPersonaCadence = options?.buyerPersonas?.find(bp => bp?.id === buyerPersona)
          ?.cadence;
        return !!buyerPersona && !!hasBuyerPersonaCadence;
      });
      const enrollable = defaultCadence ? data : leadsWithBuyerPersonaAndCadence;
      const total = data?.length;
      const groupedLeadsBuyerPersona = groupBy(
        leadsWithBuyerPersonaAndCadence,
        x =>
          x.fields.find((y: { logicRole: string }) => y.logicRole === LEAD_FIELDS_LOGIC_ROLE.ICP)
            ?.value,
      );
      return {
        enrollableBobjects: enrollable,
        excludedBobjects: defaultCadence ? 0 : total - enrollable?.length,
        groupedByBusinessAssetBobjects: groupedLeadsBuyerPersona,
        bobjectsWithBusinessAsset: leadsWithBuyerPersonaAndCadence,
        totalBobjects: total,
      };
    }
  }

  // Possibility to make a new case with Opportunities
  return {
    enrollableBobjects: null,
    excludedBobjects: null,
    groupedByBusinessAssetBobjects: null,
    bobjectsWithBusinessAsset: null,
    totalBobjects: null,
  };
};

export const useQuickStart = () => {
  const { isOpen, openQuickStartModal, closeQuickStartModal } = useQuickStartVisibility();
  const [data, setData] = useRecoilState(quickStartDataAtom);
  const bobjectTypes = useBobjectTypes()?.all();
  const { cadences } = useCadences(data?.id?.typeName);
  const buyerPersonas = useEntity('idealCustomerProfiles')?.all();
  const [isBulkAction, setIsBulkAction] = useRecoilState(isBulkActionAtom);
  const { bobjectName, bobjectBusinessAsset, cadence } = getQuickStartData(data);
  const { defaultCadence } = getDefaultCadenceInfo(data, bobjectTypes, cadences);

  const {
    enrollableBobjects,
    excludedBobjects,
    groupedByBusinessAssetBobjects,
    bobjectsWithBusinessAsset,
  } = getEnrolledBobjectsInfo(data, defaultCadence, { buyerPersonas });

  const openQuickStart = (bobject: Bobject[]) => {
    setIsBulkAction(Array.isArray(bobject));
    if (bobject) {
      setData(bobject);
    }
    openQuickStartModal();
  };

  return {
    isOpen,
    // Data could be a single object {} or multiple ones []
    data,
    bobjectCadenceId: cadence,
    openQuickStart,
    closeQuickStart: closeQuickStartModal,
    bobjectName,
    bobjectBusinessAsset,
    defaultCadence,
    enrollableBobjects,
    excludedBobjects,
    groupedByBusinessAssetBobjects,
    bobjectsWithBusinessAsset,
    bobjectType: isBulkAction ? data[0]?.id?.typeName : data?.id?.typeName,
  };
};
