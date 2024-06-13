import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, IconButton, Text } from '@bloobirds-it/flamingo-ui';
import { useDataModel, useFullSalesEnabled, usePlaybook } from '@bloobirds-it/hooks';
import {
  PlaybookFeed,
  SegmentationFilter,
  SegmentationFilters,
  TemplateDetail,
} from '@bloobirds-it/playbook';
import { Environment } from '@bloobirds-it/playbook/src/types/playbook';
import {
  DataModelResponse,
  LinkedInLead,
  MessagingTemplate,
  PlaybookTab,
  TemplateStage,
} from '@bloobirds-it/types';
import { getIsSales } from '@bloobirds-it/utils';

import styles from './templatesSelector.module.css';

type Page = 'TemplateDetail' | 'SegmentationFilters' | 'PlaybookFeed' | 'EditOrCreateTemplate';

function getPage(selectedTemplate, filterDetailView): Page {
  if (selectedTemplate) {
    return selectedTemplate.edit ? 'EditOrCreateTemplate' : 'TemplateDetail';
  } else {
    return filterDetailView ? 'SegmentationFilters' : 'PlaybookFeed';
  }
}

export const TemplateSelector = ({
  environment,
  lead,
  closeDropdown,
  setEditModal,
  handleAdd,
  whatsappData,
}: {
  environment: Environment;
  lead: LinkedInLead;
  closeDropdown: () => void;
  handleAdd: ({
    id,
    fallbackContent,
    closeDropdown,
    leadIdValue,
    companyIdValue,
  }: {
    id: string;
    fallbackContent: any;
    closeDropdown?: boolean;
    leadIdValue?: string;
    companyIdValue?: string;
  }) => void;
  setEditModal: ({ template, open }: { template: MessagingTemplate; open: boolean }) => void;
  whatsappData?: any;
}) => {
  const dataModel: DataModelResponse = useDataModel();
  const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.playbookTab' });
  const accountId = lead?.id?.accountId;
  const isSalesEnabled = useFullSalesEnabled(accountId);
  const [filterDetailView, setFilterDetailView] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const isSalesStage = useMemo(() => !!lead && getIsSales(dataModel, lead), [
    !!dataModel,
    lead?.id?.value,
  ]);

  const [segmentationValues, setSegmentationValues] = useState<SegmentationFilters>({
    segmentationData: undefined,
    stage: isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting,
    visibilityFilters: {
      onlyMine: false,
      onlyOfficial: false,
      onlyPrivate: false,
      onlyBattlecards: false,
    },
  });

  const defaultStage = isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
  const playbookStage = segmentationValues?.stage ? segmentationValues.stage : defaultStage;

  const { segmentationFields, activeBobjectSegmentationValues } = usePlaybook({
    stage: playbookStage,
    bobjectData: {
      activeBobject: lead,
    },
  });

  const onClickCard = (template: MessagingTemplate) => {
    setSelectedTemplate(template);
  };

  const replaceTemplate = (template: MessagingTemplate) => {
    handleAdd({ id: template.id, fallbackContent: template.previewContent });
  };

  function editTemplate(template) {
    setEditModal({ template, open: true });
  }

  useEffect(() => {
    setSegmentationValues(values => ({
      ...values,
      stage: !lead ? TemplateStage.All : defaultStage,
    }));
  }, [isSalesStage]);

  useEffect(() => {
    setSegmentationValues(values => ({
      ...values,
      segmentationData: activeBobjectSegmentationValues,
    }));
  }, [activeBobjectSegmentationValues]);

  const page = getPage(selectedTemplate, filterDetailView);
  switch (page) {
    case 'TemplateDetail':
      return (
        <TemplateDetail
          setSelectedTemplate={setSelectedTemplate}
          template={selectedTemplate}
          extended
          backButtonAction={() => setSelectedTemplate(null)}
          replaceButtonAction={replaceTemplate}
          insertButtonAction={replaceTemplate}
          onlyReadable
        />
      ) as ReactElement;
    case 'SegmentationFilters':
      return (
        <div className={styles.filterDetailContainer}>
          <div className={styles.backButton} onClick={() => setFilterDetailView(false)}>
            <Icon name={'arrowLeft'} size={20} color="purple" />
            <Text size="s" color="purple">
              {t('header.back')}
            </Text>
          </div>
          <div className={styles.filterElementsContainer}>
            <SegmentationFilter
              isSmartEmail
              shouldShowBattlecards={false}
              shouldShowVisibilityFilters
              activeBobjectSegmentationValues={activeBobjectSegmentationValues}
              isSalesEnabled={isSalesEnabled}
              segmentationFields={segmentationFields}
              setFiltersContext={setSegmentationValues}
              filterValues={segmentationValues?.segmentationData}
              visibilityFilters={segmentationValues?.visibilityFilters}
              stage={segmentationValues?.stage}
              defaultStage={!lead ? TemplateStage.All : defaultStage}
            />
          </div>
        </div>
      ) as ReactElement;
    case 'PlaybookFeed':
      return (
        <PlaybookFeed
          shouldShowTemplateSuggestions={true}
          accountId={accountId}
          environment={environment}
          selectedTab={
            environment === Environment.WHATSAPP_TEMPLATE_SELECTOR
              ? PlaybookTab.WHATSAPP
              : PlaybookTab.LINKEDIN
          }
          activeBobject={lead}
          isMainBobjectSalesStage={isSalesStage}
          onCardClicked={onClickCard}
          toggleFilterView={() => setFilterDetailView(true)}
          segmentationFields={segmentationFields}
          setFiltersContext={setSegmentationValues}
          segmentationValues={segmentationValues?.segmentationData}
          visibilityFilters={segmentationValues?.visibilityFilters}
          stage={segmentationValues?.stage}
          templateFunctions={{
            replaceTemplate,
            editTemplate,
          }}
          whatsappData={whatsappData}
          headerComponent={
            <div className={styles.crossContainer}>
              <IconButton name="cross" color="purple" onClick={closeDropdown} />
            </div>
          }
        />
      ) as ReactElement;
    default:
      return (<div></div>) as ReactElement;
  }
};
