import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useDataModel, useFullSalesEnabled, usePlaybook } from '@bloobirds-it/hooks';
import {
  HandleTemplate,
  PlaybookFeed,
  SegmentationFilter,
  SegmentationFilters,
  TemplateDetail,
} from '@bloobirds-it/playbook';
import { Environment } from '@bloobirds-it/playbook/src/types/playbook';
import { deserialize, useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import {
  Bobject,
  DataModelResponse,
  MainBobjectTypes,
  MessagingTemplate,
  PlaybookTab,
  TemplateStage,
} from '@bloobirds-it/types';
import { getIsSales } from '@bloobirds-it/utils';
import { insertNodes } from '@udecode/plate';

import { useSmartEmailModal } from '../../../smartEmailModal';
import { TabProps } from '../smartEmailHelperTabs';
import styles from './templatesTab.module.css';

type Page = 'TemplateDetail' | 'SegmentationFilters' | 'PlaybookFeed' | 'EditOrCreateTemplate';

function getPage(selectedTemplate, filterDetailView): Page {
  if (selectedTemplate) {
    return selectedTemplate.edit ? 'EditOrCreateTemplate' : 'TemplateDetail';
  } else {
    return filterDetailView ? 'SegmentationFilters' : 'PlaybookFeed';
  }
}

const getDeserializedTemplate = (content, format, plugins) => {
  return JSON.parse(
    JSON.stringify(
      deserialize(content, {
        format: format,
        plugins: plugins,
      }),
    ),
  );
};

const insertText = (editor, template, plugins, position) => {
  const deserializedTemplate = getDeserializedTemplate(template.content, template.format, plugins);
  //removeNodes(editor, { at: position });
  insertNodes(editor, deserializedTemplate, {
    at: position,
  });
};

export const TemplatesTab = ({ tabProps }: { tabProps: Pick<TabProps, 'bodyEditor'> }) => {
  const { bodyEditor } = tabProps;
  const {
    activeBobject,
    company,
    leads,
    opportunities,
    playbookTab,
    setPlaybookTab,
    replaceEmailBodyWithTemplate,
    selectedTemplate,
    setSelectedTemplate,
    mutateSnippets,
    accountId,
    contactBobject,
  } = useSmartEmailModal();
  const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.playbookTab' });
  const isSalesEnabled = useFullSalesEnabled(accountId);
  const [filterDetailView, setFilterDetailView] = useState(false);

  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true,
  });

  const onClickCard = (template: MessagingTemplate) => {
    setSelectedTemplate({ ...template, edit: false });
  };

  const replaceTemplate = (template: MessagingTemplate) => {
    replaceEmailBodyWithTemplate(template);
  };

  const insertTemplate = (template: MessagingTemplate) => {
    const bodySelection = bodyEditor?.selection;

    insertText(bodyEditor, template, bodyPlugins, bodySelection ?? [0]);
  };

  const dataModel: DataModelResponse = useDataModel();
  const isSalesStage = useMemo(() => !!activeBobject && getIsSales(dataModel, activeBobject), [
    !!dataModel,
    activeBobject?.id.value,
  ]);
  const stage = dataModel?.findValueById(activeBobject?.stage);

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
    // @ts-ignore workaround to use the activeBobject segmentation if the selected ones on the to: field are not valid
    bobjectData: {
      company,
      activeBobject: (activeBobject?.rawBobject ? activeBobject : contactBobject) as Bobject<
        MainBobjectTypes
      >,
    },
  });

  useEffect(() => {
    setSegmentationValues(values => ({
      ...values,
      stage: !activeBobject ? TemplateStage.All : defaultStage,
    }));
  }, [isSalesStage]);

  useEffect(() => {
    setSegmentationValues(values => ({
      ...values,
      segmentationData: activeBobjectSegmentationValues,
    }));
  }, [activeBobjectSegmentationValues]);

  function editTemplate(template) {
    setSelectedTemplate({ ...template, edit: true });
  }

  const page = getPage(selectedTemplate, filterDetailView);
  const contextProps = useSmartEmailModal();
  switch (page) {
    case 'EditOrCreateTemplate':
      return (
        <HandleTemplate
          contextProps={contextProps}
          accountId={accountId}
          onBack={() => setSelectedTemplate(null)}
          template={selectedTemplate}
          mutateSnippets={mutateSnippets}
          contextValues={
            stage
              ? typeof stage === 'string'
                ? { stage }
                : { stage: stage.name.toUpperCase() }
              : {}
          }
        />
      );
    case 'TemplateDetail':
      return (
        <TemplateDetail
          setSelectedTemplate={setSelectedTemplate}
          template={selectedTemplate}
          extended
          backButtonAction={() => setSelectedTemplate(null)}
          replaceButtonAction={replaceTemplate}
          insertButtonAction={insertTemplate}
        />
      );
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
              shouldShowBattlecards={[PlaybookTab.SNIPPETS, PlaybookTab.PITCHES].includes(
                playbookTab,
              )}
              shouldShowVisibilityFilters={playbookTab !== PlaybookTab.QQS}
              activeBobjectSegmentationValues={activeBobjectSegmentationValues}
              isSalesEnabled={isSalesEnabled}
              segmentationFields={segmentationFields}
              setFiltersContext={setSegmentationValues}
              filterValues={segmentationValues?.segmentationData}
              visibilityFilters={segmentationValues?.visibilityFilters}
              stage={segmentationValues?.stage}
              defaultStage={!activeBobject ? TemplateStage.All : defaultStage}
            />
          </div>
        </div>
      );
    case 'PlaybookFeed':
      return (
        <PlaybookFeed
          shouldShowTemplateSuggestions={true}
          accountId={accountId}
          environment={Environment.SMART_EMAIL}
          selectedTab={playbookTab}
          setSelectedTab={setPlaybookTab}
          activeBobject={activeBobject}
          isMainBobjectSalesStage={isSalesStage}
          company={company}
          leads={leads}
          opportunities={opportunities}
          onCardClicked={onClickCard}
          toggleFilterView={() => setFilterDetailView(true)}
          segmentationFields={segmentationFields}
          setFiltersContext={setSegmentationValues}
          segmentationValues={segmentationValues?.segmentationData}
          visibilityFilters={segmentationValues?.visibilityFilters}
          stage={segmentationValues?.stage}
          templateFunctions={{ replaceTemplate, insertTemplate, editTemplate }}
        />
      );
    default:
      return <></>;
  }
};
