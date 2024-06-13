import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useActiveUserSettings,
  useBaseSetEmailVariablesValues,
  useMessagingTemplates,
  useMinimizableModals,
  useSuggestedTemplates,
  useUserHelpers,
} from '@bloobirds-it/hooks';
import { NoResultsPage } from '@bloobirds-it/misc';
import {
  BobjectTypes,
  EditableTemplateType,
  ExtensionHelperKeys,
  PlaybookTab,
  templateTypes,
  UserHelperTooltipsKeys,
  UserRole,
} from '@bloobirds-it/types';
import { EMAIL_MODE, getLinkedInURL, getTemplateTypeButtons, partition } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import { useDebounce } from 'use-debounce';

import { MessagingCard } from '../../playbookCard/playbookCard';
import { SnippetsTooltipBlock } from '../../snippetsTooltipBlock/snippetsTooltipBlock';
import styles from '../playbookFeed.module.css';
import { usePlaybookFeed } from '../usePlaybookFeed';
import { noResultsContent } from './tabContent.utils';
import { TemplateListDisplay } from './templateList/templateList';

export const MessagingContent = ({ parentRef }) => {
  const {
    selectedTab: tabSelected,
    templateFunctions,
    isSmartEmail,
    onCardClicked,
    activeBobject,
    segmentationValues,
    visibilityFilters,
    searchValue,
    stage,
    actionsDisabled,
    company,
    leads,
    sidePeekEnabled,
    whatsappData,
    environment,
  } = usePlaybookFeed();
  const { t } = useTranslation();
  const [debounceSearchValue] = useDebounce(searchValue, 300);

  const { messagingTemplates, isLoading } = useMessagingTemplates({
    stage: stage,
    type: templateTypes[tabSelected],
    name: debounceSearchValue ? debounceSearchValue : null,
    size: 200,
    page: 0,
    visibility: visibilityFilters?.onlyPrivate ? 'PRIVATE' : null,
    onlyMine: visibilityFilters?.onlyMine,
    onlyOfficials: visibilityFilters?.onlyOfficial,
    onlyBattlecards: visibilityFilters?.onlyBattlecards,
    segmentationValues,
  });
  const isSnippets = tabSelected === PlaybookTab.SNIPPETS;
  const setEmailVariablesValues = useBaseSetEmailVariablesValues();
  const { has, save } = useUserHelpers();
  const shouldShowEmailTooltip =
    tabSelected === PlaybookTab.EMAILS &&
    !has(UserHelperTooltipsKeys.BLANK_EMAIL_TOOLTIP) &&
    isSmartEmail;

  const { openMinimizableModal } = useMinimizableModals();
  const { settings } = useActiveUserSettings();
  const userId = settings?.user?.id;
  const userRoles = settings?.user?.roles;
  const isAdminUser =
    userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  const snippetsTooltipBlockSeen = has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_SEEN_ONE_TIME);
  const snippetsTooltipBlockHidden = has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN);

  const suggestedTemplates = useSuggestedTemplates(activeBobject, { company, leads }, tabSelected);

  const handleEmailModal = template => {
    const activeBobjectType = activeBobject?.id?.typeName;
    setEmailVariablesValues({
      company: company?.rawBobject,
      lead:
        activeBobjectType === BobjectTypes.Lead
          ? activeBobject?.rawBobject
          : leads && leads[0]?.rawBobject,
      opportunity: undefined,
    });
    openMinimizableModal({
      type: 'email',
      title: t('smartEmailModal.newEmail'),
      data: {
        template: {
          content: template?.content,
          subject: template?.subject || '',
          id: template?.id,
          format: template?.format,
          mediaFiles: template?.mediaFiles,
          name: template?.name || t('playbook.untitledTemplate'),
        },
        mode: EMAIL_MODE.SEND,
        isBlankEmail: false,
        company: activeBobjectType === BobjectTypes.Company ? activeBobject : company,
        leads,
        lead: activeBobjectType === BobjectTypes.Lead ? activeBobject : leads?.[0],
        pageBobjectType: activeBobject.id.typeName,
      },
      onSave: () => {
        window.dispatchEvent(
          new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
            detail: { type: BobjectTypes.Activity },
          }),
        );
      },
    });
  };

  function handleOnClick(template) {
    onCardClicked(template, tabSelected, handleEmailModal);
    mixpanel.track(`CLICK_ON_${templateTypes[tabSelected]}_CARD_FROM_PLAYBOOK_OTO`);
  }

  const handleAddTemplateClick = () => {
    templateFunctions?.editTemplate({
      type: templateTypes[tabSelected],
      edit: true,
    } as EditableTemplateType);
    mixpanel.track(`CLICK_ON_${templateTypes[tabSelected]}_ADD_TEMPLATE_FROM_PLAYBOOK_OTO`);
  };

  useEffect(() => {
    return () => {
      if (!noTemplates && !noResults && isSnippets) {
        save(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_SEEN_ONE_TIME);
      }
    };
  }, [messagingTemplates, isSnippets]);

  const [myTemplates, teamTemplates] = partition(
    messagingTemplates,
    template => template?.createdBy === userId,
  );

  const areThereSegmentationFiltersApplied =
    segmentationValues && Object.keys(segmentationValues).length !== 0;
  const areThereVisibilityFiltersApplied =
    visibilityFilters && Object.values(visibilityFilters).some(v => !!v);

  const noResults =
    messagingTemplates?.length === 0 &&
    (searchValue?.length > 0 ||
      areThereSegmentationFiltersApplied ||
      areThereVisibilityFiltersApplied);

  const noTemplates =
    messagingTemplates?.length === 0 &&
    !areThereSegmentationFiltersApplied &&
    !areThereVisibilityFiltersApplied &&
    searchValue?.length === 0;

  const renderTemplate = (template, showTooltip) => {
    const shouldShowSnippetsTooltip =
      isSmartEmail &&
      isSnippets &&
      snippetsTooltipBlockSeen &&
      !snippetsTooltipBlockHidden &&
      showTooltip;

    if (shouldShowSnippetsTooltip) {
      return <SnippetsTooltipBlock hasBeenSeen />;
    }
    const userIsOwner = userId === template?.createdBy;
    const userCanEdit = userIsOwner || isAdminUser;
    const linkedInURL = getLinkedInURL(template?.id, company, leads, activeBobject);
    const buttonProps = getTemplateTypeButtons({
      template,
      tabSelected,
      linkedInURL,
      handleEmailModal,
      isSEE: isSmartEmail,
      userCanEdit,
      environment,
      templateFunctions,
      t,
      whatsappData,
    });

    return (
      <MessagingCard
        template={template}
        onClick={handleOnClick}
        key={template?.id}
        tabSelected={tabSelected}
        buttonProps={buttonProps}
        isSmartEmail={isSmartEmail}
        templateFunctions={templateFunctions}
        actionsDisabled={actionsDisabled}
        sidePeekEnabled={sidePeekEnabled}
      />
    );
  };

  const { actionButton, description, title } = noResultsContent({
    tabSelected,
    callback: handleAddTemplateClick,
    t,
  });

  const templateListDisplayVariables = {
    sidePeekEnabled,
    renderTemplate,
    handleAddTemplateClick,
    isSmartEmail,
  };

  if (!messagingTemplates) return null;
  const templatesAggregate = {
    suggestedTemplates,
    myTemplates,
    teamTemplates,
    firstOfEach: {
      [suggestedTemplates?.[0]?.id]: 'suggestedTemplates',
      [myTemplates?.[0]?.id]: 'myTemplates',
      [teamTemplates?.[0]?.id]: 'teamTemplates',
    } as const,
  };

  return (
    <>
      {isSmartEmail &&
        isSnippets &&
        !snippetsTooltipBlockSeen &&
        !snippetsTooltipBlockHidden &&
        !noTemplates &&
        !noResults && <SnippetsTooltipBlock />}
      <TemplateListDisplay
        parentRef={parentRef}
        displayedTemplates={templatesAggregate}
        shouldShowTooltip={suggestedTemplates?.length === 0 && shouldShowEmailTooltip}
        {...templateListDisplayVariables}
      />
      {noResults && !isLoading && (
        <NoResultsPage
          title={t('playbook.tabContent.noResults')}
          description={t('playbook.tabContent.noResultsHint')}
          actionButton={actionButton}
        />
      )}
      {noTemplates && !isLoading && (
        <NoResultsPage title={title} description={description} actionButton={actionButton} />
      )}
      <div className={styles.invisibleFooter} />
    </>
  );
};
