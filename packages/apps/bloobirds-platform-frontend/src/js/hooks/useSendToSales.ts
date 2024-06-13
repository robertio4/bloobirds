import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { BOBJECT_TYPES } from './useBobjectTypes';
import { Bobject } from '../typings/bobjects';
import { api } from '../utils/api';
import { useActiveUser } from './useActiveUser';
import { useCompany } from './useCompany';
import useModalVisibility from './useModalVisibility';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../constants/company';

const bobjectAtom = atom({
  key: 'sendToSalesBojectAtom',
  default: null,
});

const leadsAtom = atom({
  key: 'sendToSalesLeadsAtom',
  default: null,
});

const useSendToSales = () => {
  const { activeAccount } = useActiveUser();
  const { isOpen, openModal, closeModal } = useModalVisibility('sendToSales');
  const { updateCompany } = useCompany('sendToSales');
  const [bobject, setBobject] = useRecoilState(bobjectAtom);
  const [bobjectLeads, setBobjectLeads] = useRecoilState(leadsAtom);
  const resetBobject = useResetRecoilState(bobjectAtom);
  const resetBobjectLeads = useResetRecoilState(leadsAtom);

  const setData = ({ bobjectToSet, leads }: { bobjectToSet: Bobject; leads?: Array<Bobject> }) => {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }

    if (leads) {
      setBobjectLeads(leads);
    }
  };

  const openSendToSalesModal = ({
    bobjectToSet,
    leads,
  }: {
    bobjectToSet: Bobject;
    leads?: Array<Bobject>;
  }) => {
    setData({ bobjectToSet, leads });

    if (!isOpen) {
      openModal();
    }
  };

  const closeSendToSalesModal = () => {
    if (isOpen) {
      closeModal();
      resetBobject();
      resetBobjectLeads();
    }
  };

  const send = async (leads: Array<string>, assignedUser?: string, companyId?: string) => {
    // Uses cases:
    // 1. Send to sales Company with leads
    // 2. Send to sales Company without leads
    // 3. Send to sales Lead with company
    // 4. Send to sales Lead without company

    if (assignedUser) {
      // Reassign Company
      if (companyId) {
        await updateCompany(companyId, {
          [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: assignedUser,
        });
      }
    }

    // Company to stage Sales and status ACTIVE from stage SALES
    if (companyId && leads?.length === 0) {
      let url = `/bobjects/${activeAccount?.id}/Company/${companyId}/convert`;

      if (assignedUser) {
        url = `${url}?reassignToId=${assignedUser}`;
      }
      await api.put(url, {});
    }

    // Leads to stage Sales and status ACTIVE from stage SALES
    if (leads.length) {
      const data = leads?.map((leadId: string) => ({
        bobjectType: BOBJECT_TYPES.Lead,
        bobjectId: leadId,
        reassignToId: assignedUser ? assignedUser : null,
      }));
      await api.put(`/bobjects/${activeAccount?.id}/convert/bulk`, { conversions: data });
    }
  };

  const convertSalesforce = async (
    leads: Array<string>,
    leadConvertedStatus: string,
    companyId?: string,
  ) => {
    await api.post('/utils/service/salesforce/convertLeads', {
      leadIds: leads,
      companyId: companyId,
      leadConvertedStatus,
    });
  };

  return {
    bobject,
    leads: bobjectLeads,
    isOpen,
    closeSendToSalesModal,
    openSendToSalesModal,
    resetBobjectLeads,
    send,
    setData,
    convertSalesforce,
  };
};

export default useSendToSales;
