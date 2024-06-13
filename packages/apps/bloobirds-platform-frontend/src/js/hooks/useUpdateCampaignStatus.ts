import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import useSWR from 'swr';
import { useToasts } from '@bloobirds-it/flamingo-ui';
import { BobjectType } from '../typings/bobjects';
import { api } from '../utils/api';
import useModalVisibility from './useModalVisibility';

const leadAtom = atom({
  key: 'updateCampaignStatusLeadAtom',
  default: null,
});

const campaignMemberIdAtom = atom({
  key: 'updateCampaignMemberIdAtom',
  default: null,
});

const campaignNameAtom = atom({
  key: 'updateCampaignStatusCampaignNameAtom',
  default: null,
});
const campaignIdAtom = atom({
  key: 'updateCampaignStatusCampaignIdAtom',
  default: null,
});
const bobjectIdToSetAtom = atom({
  key: 'updateCampaignStatusBobjectIdToSetAtom',
  default: null,
});
const campaignMemberStatusAtom = atom({
  key: 'updateCampaingMemberStatusToSetAtom',
  default: null,
});

const useUpdateSalesforceCampaignStatus = () => {
  const { isOpen, openModal, closeModal } = useModalVisibility('updateSalesforceCampaignStatus');
  const [lead, setLead] = useRecoilState(leadAtom);
  const [campaignName, setCampaignName] = useRecoilState(campaignNameAtom);
  const [campaignId, setCampaignId] = useRecoilState(campaignIdAtom);
  const [bobjectId, setBobjectId] = useRecoilState(bobjectIdToSetAtom);
  const [campaignMemberStatus, setCampaignMemberStatus] = useRecoilState(campaignMemberStatusAtom);
  const [campaignMemberId, setCampaignMemberId] = useRecoilState(campaignMemberIdAtom);
  const resetLead = useResetRecoilState(leadAtom);
  const resetCampaignName = useResetRecoilState(campaignNameAtom);
  const resetBobjectId = useResetRecoilState(bobjectIdToSetAtom);
  const resetCampaignId = useResetRecoilState(campaignIdAtom);
  const { createToast } = useToasts();
  const { data, error } = useSWR(
    campaignId && `/utils/service/salesforce/campaignMemberStatus?campaignId=${campaignId}`,
    async () =>
      await api
        .get(`/utils/service/salesforce/campaignMemberStatus?campaignId=${campaignId}`, {
          headers: { 'Content-Type': 'application/json' },
          data: {},
        })
        .then((res: any) => res.data),
  );

  const openUpdateSalesforceCampaignStatus = ({
    leadToSet,
    campaignNameToSet,
    campaignIdToSet,
    bobjectIdToSet,
    campaignMemberStatusToSet,
    campaignMemberIdToSet,
  }: {
    leadToSet: BobjectType;
    campaignNameToSet: string;
    campaignIdToSet: string;
    bobjectIdToSet: string;
    campaignMemberStatusToSet: string;
    campaignMemberIdToSet: string;
  }) => {
    if (leadToSet) {
      setLead(leadToSet);
    }
    if (campaignIdToSet) {
      setCampaignId(campaignIdToSet);
    }
    if (bobjectIdToSet) {
      setBobjectId(bobjectIdToSet);
    }
    if (campaignNameToSet) {
      setCampaignName(campaignNameToSet);
    }
    if (campaignMemberStatusToSet) {
      setCampaignMemberStatus(campaignMemberStatusToSet);
    }
    if (campaignMemberIdToSet) {
      setCampaignMemberId(campaignMemberIdToSet);
    }
    openModal();
  };
  const updateSalesforceCampaignStatus = async (status: string) => {
    await api
      .post(`/utils/service/salesforce/campaignMemberStatus`, {
        sobjectId: campaignMemberId,
        bobjectId: bobjectId,
        status: status,
      })
      .then(() => {
        createToast({ message: 'Campaign successfully updated', type: 'success' });
        closeUpdateSalesforceCampaignStatus();
      });
  };

  const closeUpdateSalesforceCampaignStatus = () => {
    closeModal();
    resetLead();
    resetBobjectId();
    resetCampaignId();
    resetCampaignName();
  };

  return {
    lead,
    campaignMemberStatus,
    campaignName,
    campaignMember: data,
    isOpen,
    loading: !error && !data,
    closeModal: closeUpdateSalesforceCampaignStatus,
    openModal: openUpdateSalesforceCampaignStatus,
    updateSalesforceCampaignStatus,
  };
};

export default useUpdateSalesforceCampaignStatus;
