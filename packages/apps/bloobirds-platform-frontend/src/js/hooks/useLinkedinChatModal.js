import { useEffect, useMemo } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { injectReferencesSearchProcess } from '@bloobirds-it/utils';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  DATA_SOURCES,
} from '../constants/activity';

// import SessionManagerFactory from '../misc/session';

// const SessionManager = SessionManagerFactory();

const linkedinChatOpenAtom = atom({
  key: 'linkedinChatOpenAtom',
  default: false,
});

const linkedinLeadAtom = atom({
  key: 'linkedinLeadAtom',
  default: null,
});

const itemsAtom = atom({
  key: 'linkedinChatItemsAtom',
  default: [],
});

const responseAtom = selector({
  key: 'linkedinChatResponse',
  get: () => null,
  set: ({ set }, response) => {
    set(itemsAtom, response.contents);
  },
});

export const useLinkedinChatVisibility = () => {
  const [linkedinChatOpen, setLinkedinChatOpen] = useRecoilState(linkedinChatOpenAtom);

  const openLinkedinChat = () => {
    if (!linkedinChatOpen) {
      setLinkedinChatOpen(true);
    }
  };

  const closeLinkedinChat = () => {
    if (linkedinChatOpen) {
      setLinkedinChatOpen(false);
    }
  };

  return {
    isOpen: linkedinChatOpen,
    openLinkedinChat,
    closeLinkedinChat,
  };
};

export const useLinkedinChatConversation = ({ leadId }) => {
  const setResponse = useSetRecoilState(responseAtom);
  const items = useRecoilValue(itemsAtom);
  const resetItems = useResetRecoilState(itemsAtom);

  const { data, isLoading } = useSearchSubscription(
    leadId && {
      query: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN,
        [ACTIVITY_FIELDS_LOGIC_ROLE.DATA_SOURCE]: DATA_SOURCES.CHROME_EXTENSION,
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: leadId,
      },
      formFields: true,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: 'ASC',
        },
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.LEAD,
          direction: 'DESC',
        },
      ],
      pageSize: 1000,
      injectReferences: true,
    },
    BOBJECT_TYPES.ACTIVITY,
  );

  useEffect(() => {
    if (data?.data) {
      const extendedResponse = injectReferencesSearchProcess(data?.data);
      setResponse(extendedResponse);
    }
  }, [data]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return { items, isLoading, totalMatching, resetItems };
};

export const useLinkedinChatModal = () => {
  const { isOpen, openLinkedinChat, closeLinkedinChat } = useLinkedinChatVisibility();
  const [linkedinLead, setLinkedinLead] = useRecoilState(linkedinLeadAtom);

  const openLinkedinChatModal = ({ lead }) => {
    if (lead) {
      setLinkedinLead(lead);
    }

    openLinkedinChat();
  };

  return {
    linkedinLead,
    isOpen,
    closeLinkedinChat,
    openLinkedinChat: openLinkedinChatModal,
  };
};
