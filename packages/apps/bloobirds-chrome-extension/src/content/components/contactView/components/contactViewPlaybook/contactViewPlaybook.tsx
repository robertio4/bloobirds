import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useActiveUserSettings, useMinimizableModals, usePlaybook } from '@bloobirds-it/hooks';
import { PlaybookFeed } from '@bloobirds-it/playbook';
import { Environment } from '@bloobirds-it/playbook/src/types/playbook';
import {
  MessagesEvents,
  MessagingTemplate,
  PlaybookTab,
  TEMPLATE_TYPES,
  TemplateStage,
  templateTypes,
  UserRole,
} from '@bloobirds-it/types';
import { getLinkedInURL, getTemplateTypeButtons } from '@bloobirds-it/utils';

import { ExtendedContextTypes } from '../../../../../types/extendedContext';
import { useExtensionContext } from '../../../context';
import { useFloatingMenuContext } from '../../../floatingMenu/floatingMenuContext';
import { useContactViewContext } from '../../context/contactViewContext';

export const ContactViewPlaybook = () => {
  const {
    useGetActiveBobject,
    useGetDataModel,
    setExtendedContext,
    useGetActiveBobjectContext,
    closeExtendedScreen,
    useGetExtendedContext,
    openExtendedScreen,
    useGetSidePeekEnabled,
    useGetSettings,
    useGetWhatsappLead,
  } = useExtensionContext();
  const whatsappLead = useGetWhatsappLead();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const activeBobject = useGetActiveBobject();
  const data = useGetActiveBobjectContext();
  const extendedContext = useGetExtendedContext();
  const { getMeta, setMeta } = useFloatingMenuContext();
  const { company, leads } = data || {};
  const dataModel = useGetDataModel();
  const accountId = useGetSettings()?.account?.id;
  const stage = dataModel?.findValueById(activeBobject?.stage);
  const isSalesStage =
    stage?.logicRole?.includes('SALES') || activeBobject.id.typeName === 'Opportunity';
  const { actionsDisabled } = useContactViewContext();
  const { settings } = useActiveUserSettings();
  const userId = settings?.user?.id;
  const userRoles = settings?.user?.roles;
  const isAdminUser =
    userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  const meta = getMeta();
  const [selectedTab, setSelectedTab] = useState(PlaybookTab.PITCHES);
  const { openMinimizableModal } = useMinimizableModals();
  const { t } = useTranslation();

  const whatsappData = {
    phoneNumber: activeBobject?.phoneNumbers?.[0],
    isSameActiveLead: whatsappLead?.id === activeBobject?.id.value,
    userName: settings?.user?.name,
    lead: activeBobject,
  };

  function openEditingModal(template) {
    const getDefaultStage = () => {
      if (template?.type === TEMPLATE_TYPES.SNIPPET) {
        return TemplateStage.All;
      }
      if (isSalesStage) {
        return TemplateStage.Sales;
      }
      return TemplateStage.Prospecting;
    };

    openMinimizableModal({
      type: 'handleTemplate',
      title: 'Template',
      data: {
        template,
        stage: getDefaultStage(),
        onSaveCallback: closeExtendedScreen,
      },
    });
  }

  function handleOnClick(template: MessagingTemplate, tabSelected, handleEmailModal) {
    const userIsOwner = userId === template?.createdBy;
    const userCanEdit = userIsOwner || isAdminUser;
    if (extendedContext?.template?.id === template.id) {
      closeExtendedScreen();
    } else {
      openExtendedScreen({
        type: ExtendedContextTypes[`PLAYBOOK_${templateTypes[tabSelected]}`],
        template,
        buttonData: getTemplateTypeButtons({
          template,
          tabSelected,
          linkedInURL: getLinkedInURL(template.id, company, leads, activeBobject),
          handleEmailModal,
          isSEE: false,
          userCanEdit,
          editTemplate: () => openEditingModal(template),
          t,
          whatsappData,
        }),
        actionsDisabled: actionsDisabled,
      });
    }
  }

  const defaultStage = isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
  const getPlaybookStage: () => TemplateStage = () => {
    if (meta?.stage) {
      return meta.stage;
    } else {
      return defaultStage;
    }
  };

  const playbookStage = useMemo(getPlaybookStage, [meta?.stage, isSalesStage]);
  const { segmentationFields, activeBobjectSegmentationValues } = usePlaybook({
    stage: playbookStage,
    bobjectData: { company, activeBobject },
  });

  function toggleFilterView(value, tabSelected) {
    value
      ? setExtendedContext({ type: ExtendedContextTypes.PLAYBOOK_SEGMENTATION_FILTER })
      : closeExtendedScreen();

    setMeta({
      ...meta,
      segmentationData: activeBobjectSegmentationValues,
      isFilterViewOpen: value,
      shouldShowBattlecards: [PlaybookTab.SNIPPETS, PlaybookTab.PITCHES].includes(tabSelected),
      shouldShowVisibilityFilters: tabSelected !== PlaybookTab.QQS,
    });
  }

  const segmentationData = useMemo(
    () => (meta?.segmentationData ? meta.segmentationData : activeBobjectSegmentationValues),
    [meta?.segmentationData, activeBobjectSegmentationValues],
  );

  return (
    <>
      <PlaybookFeed
        shouldShowTemplateSuggestions={false}
        environment={Environment.EXTENSION}
        accountId={accountId}
        activeBobject={activeBobject}
        isMainBobjectSalesStage={isSalesStage}
        company={company}
        leads={leads}
        onCardClicked={handleOnClick}
        isFilterViewOpen={meta?.isFilterViewOpen}
        toggleFilterView={toggleFilterView}
        setFiltersContext={setMeta}
        segmentationFields={segmentationFields}
        segmentationValues={segmentationData}
        visibilityFilters={meta?.visibilityFilters}
        stage={playbookStage}
        refreshMainBobject={() =>
          window.dispatchEvent(
            new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
              detail: { type: activeBobject?.id?.typeName },
            }),
          )
        }
        actionsDisabled={actionsDisabled}
        sidePeekEnabled={sidePeekEnabled}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        templateFunctions={{ editTemplate: openEditingModal }}
        whatsappData={whatsappData}
      />
    </>
  );
};
