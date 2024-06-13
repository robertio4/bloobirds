import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useActiveUserSettings,
  useBaseResetEmailVariablesValues,
  useBaseSetEmailVariablesValues,
  useSnippetsEnabled,
  useTimeSlotsEnabled,
} from '@bloobirds-it/hooks';
import { useSnippets } from '@bloobirds-it/playbook';
import {
  Bobject,
  BobjectTypes,
  EditableTemplateType,
  EmailFiltersType,
  EmailProviderType,
  MessagingTemplate,
  PlaybookTab,
  SmartEmailContext,
  SmartEmailTab,
  TargetMarket,
  SlotsData,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LinkedInLead,
  LinkedInCompany,
  ExtensionCompany,
  UserSettings,
} from '@bloobirds-it/types';
import { api, EMAIL_MODE, getTextFromLogicRole, getUserTimeZone } from '@bloobirds-it/utils';
import { Editor } from 'slate';

import { useSimilarDeals } from './smartEmailHelper/hooks/useSimilarDeals';
import { SmartEmailModalComponent } from './smartEmailModal.view';

async function fillVariables(bobject, setEmailVariablesValue) {
  const { data } = await api.get(`/bobjects/${bobject?.id?.value}/form?injectReferences=true`);

  let companyReferenceBobject;
  if (
    bobject?.bobjectType === BobjectTypes.Lead ||
    bobject?.bobjectType === BobjectTypes.Opportunity
  ) {
    for (const key in data?.referencedBobjects) {
      if (key.indexOf(BobjectTypes.Company) !== -1) {
        companyReferenceBobject = data?.referencedBobjects[key];
      }
    }
  }

  const bobjectType = bobject?.bobjectType?.toLowerCase();
  setEmailVariablesValue({
    company: companyReferenceBobject?.raw?.contents,
    [bobjectType]: data?.raw?.contents,
  });
}

const getLeadName = ({
  isLead,
  activeBobject,
  lead,
  isExtension,
}: {
  isLead: boolean;
  activeBobject: Bobject | LinkedInLead;
  lead: Bobject;
  isExtension: boolean;
}) => {
  if (isLead) {
    return isExtension
      ? (activeBobject as LinkedInLead).fullName
      : getTextFromLogicRole(
          activeBobject as Bobject<BobjectTypes.Lead>,
          LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
        );
  } else {
    return getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  }
};

const useRefreshEmailVariables = relatedBobjectInfo => {
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const [previousBobject, setPreviousBobject] = useState(
    relatedBobjectInfo?.activeBobject?.id?.value,
  );

  const resetEmailVariablesValue = useBaseResetEmailVariablesValues();

  useEffect(() => {
    if (previousBobject !== relatedBobjectInfo?.activeBobject?.id?.value) {
      if (relatedBobjectInfo?.activeBobject) {
        fillVariables(relatedBobjectInfo?.activeBobject, setEmailVariablesValue);
        setPreviousBobject(relatedBobjectInfo?.activeBobject?.id?.value);
      } else {
        resetEmailVariablesValue();
        setPreviousBobject(null);
      }
    }
  }, [relatedBobjectInfo?.activeBobject]);
};

const SmartEmailModalContext = createContext<SmartEmailContext>(null);

function updateIndex(count, editorsStored, length) {
  if (!editorsStored) return count === 0 ? 1 : 0;
  return count === length - 1 ? 0 : count + 1;
}
const SmartEmailModalProvider = ({
  children,
  bobjectsInfo,
  accountId,
  dataModel,
  ...props
}: EmailProviderType) => {
  const focusedRef = useRef<number>(0);
  const isLead = bobjectsInfo?.activeBobject?.id.typeName === BobjectTypes.Lead;
  const leadToSet = isLead
    ? bobjectsInfo?.activeBobject?.id?.value
    : !isLead && bobjectsInfo?.lead?.id?.value;
  const [filters, setFilters] = useState<EmailFiltersType>({
    type: [],
    lead: leadToSet ? [leadToSet] : [],
    user: [],
  });
  const { settings } = useActiveUserSettings();
  const accountName = settings?.account?.name;
  const [relatedBobjectsInfo, updateRelatedBobjectsInfo] = useState(bobjectsInfo);
  const similarDealsHook = useSimilarDeals(accountId, relatedBobjectsInfo.company?.id.objectId);
  const [selectedTab, setSelectedTab] = useState<SmartEmailTab>(
    props?.mode === EMAIL_MODE.REPLY ? SmartEmailTab.PAST_ACTIVITY : SmartEmailTab.TEMPLATES,
  );
  const [playbookTab, setPlaybookTab] = useState<PlaybookTab>(PlaybookTab.EMAILS);
  const [replaceEmailBodyWithTemplate, setReplaceEmailBodyWithTemplate] = useState<
    (template: MessagingTemplate) => void
  >();
  const [selectedTemplate, setSelectedTemplate] = useState<EditableTemplateType>();
  const [taskTitle, setTaskTitle] = useState<string>();
  const [newLeadInfo, setNewLeadInfo] = useState<{
    email: string;
    company: ExtensionCompany | Bobject<BobjectTypes.Company>;
  }>();
  const [leadCreatedCallback, setLeadCreatedCallback] = useState<(leadEmail: string) => void>();
  const [selectedActivity, setSelectedActivity] = useState<Bobject>();
  const hasSnippetsEnabled = useSnippetsEnabled(accountId);
  const hasTimeSlotsEnabled = useTimeSlotsEnabled(accountId);
  const { snippets, mutate } = useSnippets();
  const [editorsStored, setEditorsStored] = useState<boolean>(false);
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const { t } = useTranslation();

  const companyName = props.isExtension
    ? ((relatedBobjectsInfo?.company as unknown) as LinkedInCompany)?.name
    : getTextFromLogicRole(relatedBobjectsInfo?.company, COMPANY_FIELDS_LOGIC_ROLE.NAME);

  const leadName =
    !companyName &&
    getLeadName({
      activeBobject: bobjectsInfo.activeBobject as LinkedInLead,
      lead: relatedBobjectsInfo.lead,
      isLead,
      isExtension: props.isExtension,
    });

  const [slotsData, setSlotsData] = useState<SlotsData>({
    calendarSlotsVisible: false,
    calendarSlots: [],
    selectedTimezone: getUserTimeZone(),
    meetingTitle:
      companyName || leadName
        ? `${companyName ?? leadName} <> ${accountName}`
        : t('smartEmailModal.untitledMeeting'),
  });
  const editorsRef = useRef<Editor[]>();

  function storeEditorRef(editor) {
    if (editorsStored || editorsRef?.current?.some(storedEditor => storedEditor?.id === editor.id))
      return;
    // fix to insert the input identifier in the correct position
    if (editor.id === 'shortcutInput') {
      const newArray = [...(editorsRef.current || [])];
      newArray.splice(3, 0, editor);
      editorsRef.current = newArray;
      return;
    }
    editorsRef.current = [...(editorsRef.current || []), editor];
    if (editorsRef.current.length > 3) {
      setEditorsStored(true);
    }
  }

  useRefreshEmailVariables(relatedBobjectsInfo);
  const updateFocusedIndex = () => {
    focusedRef.current = updateIndex(focusedRef.current, editorsStored, editorsRef.current?.length);
  };

  return (
    <SmartEmailModalContext.Provider
      value={{
        editorsStored,
        editorsRef,
        storeEditorRef,
        focusedRef,
        updateFocusedIndex,
        hasSnippetsEnabled,
        hasTimeSlotsEnabled,
        filters,
        setFilters,
        ...props,
        selectedTab,
        tooltipVisible,
        setTooltipVisible,
        snippets,
        mutateSnippets: mutate,
        setSelectedTab,
        slotsData,
        setSlotsData,
        playbookTab,
        setPlaybookTab,
        dataModel,
        similarDealsHook,
        accountId,
        contactBobject: bobjectsInfo?.activeBobject,
        ...relatedBobjectsInfo,
        setRelatedBobjectsInfo: value => {
          updateRelatedBobjectsInfo(prevState => ({
            ...prevState,
            ...value,
          }));
        },
        resetBobjectEnvironment: () =>
          updateRelatedBobjectsInfo({
            activeBobject: undefined,
            company: undefined,
            leads: undefined,
            opportunity: undefined,
            pageBobjectType: undefined,
          }),
        replaceEmailBodyWithTemplate,
        updateReplaceMethod: method => {
          setReplaceEmailBodyWithTemplate(() => method);
        },
        selectedTemplate,
        setSelectedTemplate: value => {
          setSelectedTemplate(value);
          if (!value) {
            setEditorsStored(false);
            editorsRef.current = editorsRef.current.slice(0, 1);
            focusedRef.current = 0;
          }
        },
        setTaskTitle,
        taskTitle,
        newLeadInfo,
        setNewLeadInfo,
        leadCreatedCallback,
        setLeadCreatedCallback,
        selectedActivity,
        setSelectedActivity,
      }}
    >
      {children}
    </SmartEmailModalContext.Provider>
  );
};

export const useSmartEmailModal = () => {
  const context = useContext(SmartEmailModalContext);

  if (context === undefined) {
    throw new Error('useSmartEmailModal must be used within the modal provider');
  }

  return context;
};

interface SmartEmailModalComponentProps extends EmailProviderType {
  handleRedirect: (url: string) => void;
  scheduleEmailRedirect?: (url: string) => void;
  emailSettingsRedirect: (url: string) => void;
  targetMarkets?: TargetMarket[];
  idealCustomerProfiles?: any[];
  isExtension: boolean;
  userSettings: UserSettings;
}

const withProvider = Component => ({
  handleRedirect,
  scheduleEmailRedirect,
  emailSettingsRedirect,
  targetMarkets,
  idealCustomerProfiles,
  ...providerProps
}: SmartEmailModalComponentProps) => {
  return (
    <SmartEmailModalProvider {...providerProps}>
      <Component
        handleRedirect={handleRedirect}
        scheduleEmailRedirect={scheduleEmailRedirect}
        emailSettingsRedirect={emailSettingsRedirect}
        targetMarkets={targetMarkets}
        idealCustomerProfiles={idealCustomerProfiles}
        isExtension={providerProps.isExtension}
        userSettings={providerProps.userSettings}
      />
    </SmartEmailModalProvider>
  );
};

export const SmartEmailModal = withProvider(SmartEmailModalComponent);
