import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, IconButton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import {
  useDataModel,
  useFullSalesEnabled,
  useMinimizableModals,
  usePlaybook,
  useSuggestedTemplates,
} from '@bloobirds-it/hooks';
import {
  PlaybookFeed,
  SegmentationFilter,
  SegmentationFilters,
  TemplateDetail,
} from '@bloobirds-it/playbook';
import { Environment } from '@bloobirds-it/playbook/src/types/playbook';
import { Bobject, BobjectTypes, PlaybookTab, TemplateStage } from '@bloobirds-it/types';
import { getIsSales } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { useDialer } from '../../dialer';
import styles from './dialerPlaybook.module.css';

type Page = 'TemplateDetail' | 'SegmentationFilters' | 'PlaybookFeed';

export const DialerPlaybookFeed = ({
  accountId,
  isRightOpen,
  handleOnClose,
  setShowAutoSetting,
  userId,
  isAdminUser,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(undefined);
  const [page, setPage] = useState<Page>('PlaybookFeed');
  const isSalesEnabled = useFullSalesEnabled(accountId);
  const { openMinimizableModal } = useMinimizableModals();
  const userIsOwner = userId === selectedTemplate?.createdBy;
  const userCanEdit = userIsOwner || isAdminUser;
  const matchBobject = useDialer(state => state.bobjectMatch);
  const matchedBobject = matchBobject?.bobject;
  const suggestedTemplate = useSuggestedTemplates(matchedBobject, undefined, PlaybookTab.PITCHES);

  useEffect(() => {
    if (suggestedTemplate.length === 1) {
      setSelectedTemplate(suggestedTemplate[0]);
      setPageView('TemplateDetail');
    }
  }, [suggestedTemplate?.length]);
  const bobject = matchBobject && matchBobject.bobject;

  const dataModel = useDataModel();
  const isSalesStage = useMemo(() => bobject && getIsSales(dataModel, bobject), [
    !!dataModel,
    bobject?.id.value,
  ]);
  const defaultStage = !bobject
    ? TemplateStage.All
    : isSalesStage
    ? TemplateStage.Sales
    : TemplateStage.Prospecting;

  const [segmentationValues, setSegmentationValues] = useState<SegmentationFilters>({
    segmentationData: undefined,
    stage: defaultStage,
  });

  const { segmentationFields, activeBobjectSegmentationValues } = usePlaybook({
    stage: segmentationValues?.stage,
    bobjectData: {
      company: matchBobject ? { rawBobject: matchBobject.relatedBobject } : undefined,
      activeBobject: bobject,
    },
  });

  const { t } = useTranslation();

  useEffect(() => {
    setSegmentationValues(values => ({
      ...values,
      stage: defaultStage,
    }));
  }, [isSalesStage]);

  useEffect(() => {
    setSegmentationValues(values => ({
      ...values,
      segmentationData: activeBobjectSegmentationValues,
    }));
  }, [activeBobjectSegmentationValues]);

  function setPageView(view: Page) {
    setPage(view);
    setShowAutoSetting(view === 'PlaybookFeed');
  }

  function onCardClicked(template) {
    setSelectedTemplate(template);
    setPageView('TemplateDetail');
  }

  const onClickBack = () => {
    setSelectedTemplate(undefined);
    setPageView('PlaybookFeed');
  };

  const onClickEditTemplate = e => {
    e.stopPropagation();
    e.preventDefault();
    openEditingModal(selectedTemplate);
  };

  function openEditingModal(template) {
    const getDefaultStage = () => {
      if (isSalesStage) {
        return TemplateStage.Sales;
      }
      return TemplateStage.Prospecting;
    };

    //setViewEditingModal(template);
    openMinimizableModal({
      type: 'handleTemplate',
      title: 'Template',
      data: {
        template,
        stage: getDefaultStage(),
        onSaveCallback: () => setPageView('PlaybookFeed'),
      },
    });
  }

  switch (page) {
    case 'TemplateDetail':
      return (
        <TemplateDetail
          dialerButtons={
            <>
              {
                <div style={{ cursor: userCanEdit ? 'auto' : 'initial' }}>
                  <Tooltip
                    title={!userCanEdit && t('dialer.extendedScreen.onlyAdminCanEditTemplate')}
                    position="top"
                  >
                    <IconButton
                      name="edit"
                      color={userCanEdit ? 'purple' : 'softPeanut'}
                      size={20}
                      onClick={userCanEdit ? onClickEditTemplate : undefined}
                    />
                  </Tooltip>
                </div>
              }
              <IconButton name="cross" color="purple" onClick={handleOnClose} />
            </>
          }
          template={selectedTemplate}
          extended
          backButtonAction={onClickBack}
        />
      );
    case 'SegmentationFilters':
      return (
        <div className={styles.filterDetailContainer}>
          <div
            className={styles.segmentationHeader}
            {...(isRightOpen ? { style: { flexDirection: 'row-reverse' } } : {})}
          >
            <IconButton name="cross" color="purple" onClick={handleOnClose} />
            <div className={styles.backButton} onClick={() => setPageView('PlaybookFeed')}>
              <Icon name={'arrowLeft'} size={20} color="purple" />
              <Text size="s" color="purple">
                {t('common.back')}
              </Text>
            </div>
          </div>
          <div className={styles.filterElementsContainer}>
            <SegmentationFilter
              isSalesEnabled={isSalesEnabled}
              isSmartEmail={false}
              activeBobjectSegmentationValues={activeBobjectSegmentationValues}
              segmentationFields={segmentationFields}
              setFiltersContext={setSegmentationValues}
              filterValues={segmentationValues?.segmentationData}
              visibilityFilters={segmentationValues?.visibilityFilters}
              shouldShowVisibilityFilters
              shouldShowBattlecards
              stage={segmentationValues?.stage}
              defaultStage={defaultStage}
            />
          </div>
        </div>
      );
    case 'PlaybookFeed':
    default:
      return (
        <>
          <div
            className={clsx(styles.header, {
              [styles.headerLeft]: !isRightOpen,
              [styles.headerRight]: isRightOpen,
            })}
            {...(isRightOpen ? { style: { flexDirection: 'row-reverse' } } : {})}
          >
            <IconButton name="cross" color="purple" onClick={handleOnClose} />
          </div>
          <div className={styles.playbookFeedContainer}>
            <PlaybookFeed
              selectedTab={PlaybookTab.PITCHES}
              shouldShowTemplateSuggestions
              accountId={accountId}
              environment={Environment.DIALER}
              activeBobject={bobject}
              isMainBobjectSalesStage={isSalesStage}
              company={
                matchBobject?.relatedBobject &&
                ({ rawBobject: matchBobject.relatedBobject } as Bobject<BobjectTypes.Company>)
              }
              leads={undefined}
              onCardClicked={onCardClicked}
              toggleFilterView={() => setPageView('SegmentationFilters')}
              segmentationFields={segmentationFields}
              setFiltersContext={setSegmentationValues}
              segmentationValues={segmentationValues?.segmentationData}
              stage={segmentationValues?.stage}
              visibilityFilters={segmentationValues.visibilityFilters}
              templateFunctions={{
                editTemplate: openEditingModal,
                insertTemplate: () => {},
                replaceTemplate: () => {},
              }}
            />
          </div>
        </>
      );
  }
};
