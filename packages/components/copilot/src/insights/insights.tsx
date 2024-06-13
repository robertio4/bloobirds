import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, IconButton, IconType, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useCopilotActivity } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  BobjectId,
  BobjectTypes,
  CoreInsightDefinition,
  Insight,
  InsightType,
  MIXPANEL_EVENTS,
  MessagesEvents,
  PicklistField,
} from '@bloobirds-it/types';
import { api, getFieldByLogicRole, getTextFromLogicRole } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import useSWR from 'swr';

import styles from './insights.module.css';

export const SectionTitle = ({
  activityId,
  title,
  copyValue,
  buttonIcon = 'noteAction',
  copyToNote,
}: {
  activityId: BobjectId;
  title: string;
  copyValue?: string;
  copyToNote?: (value: string) => void;
  buttonIcon?: IconType;
}) => {
  const { t } = useTranslation();
  const [copyTooltip, setCopyTooltip] = useState(t('copyText.copyToClipboard'));
  const [copiedToNote, setCopiedToNote] = useState(false);
  const [loading, setLoading] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(copyValue).then(() => {
      setCopyTooltip(t('copyText.copied'));
      setTimeout(() => setCopyTooltip(t('copyText.copyToClipboard')), 1000);
    });
  };

  const onCopyToNote = () => {
    if (copyToNote) {
      setLoading(true);
      copyToNote(copyValue);
      setCopiedToNote(true);
      setLoading(false);
    } else {
      defaultCopyToNote();
    }
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_ADD_NOTE_TO_INSIGHTS);
  };

  const defaultCopyToNote = () => {
    setLoading(true);

    api.get<Bobject>(`/bobjects/${activityId.value}/form`).then(res => {
      const freshActivity = res.data;
      const currentNote = getTextFromLogicRole(freshActivity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
      const finalNote = currentNote ? currentNote + `\n\n ${copyValue} ` : copyValue;
      const activityData = {
        [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: finalNote,
      };
      api.patch(`/bobjects/${activityId.value}/raw`, activityData).then(() => {
        setLoading(false);
        setCopiedToNote(true);

        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
      });
    });
  };

  const tooltipText = !copiedToNote
    ? t('activityTimelineItem.item.copilotInsights.addToInternalNote')
    : t('activityTimelineItem.item.copilotInsights.addedToNote');
  return (
    <div className={styles.aiQuestionsTitle}>
      <div className={styles.titleSection}>
        <Icon name="stars" color="purple" />
        <Text size="s" weight="heavy">
          {title}
        </Text>
      </div>
      {copyValue && (
        <div className={styles.titleSection}>
          <Tooltip title={copyTooltip} position="top">
            <IconButton name="copy" color="purple" onClick={onCopy} size={16} />
          </Tooltip>
          <Tooltip title={tooltipText} position="top">
            <Button
              size="small"
              uppercase={false}
              variant={!copiedToNote ? 'IAGradient' : 'clear'}
              color={!copiedToNote ? undefined : 'extraCall'}
              onClick={onCopyToNote}
              disabled={loading}
              className={styles.copyToNoteButton}
            >
              <Icon
                color={!copiedToNote ? 'purple' : 'extraCall'}
                name={!copiedToNote ? buttonIcon : 'check'}
                size={16}
              ></Icon>
              {copiedToNote
                ? t('activityTimelineItem.item.copilotInsights.addedToNote')
                : t('activityTimelineItem.item.copilotInsights.addToNote')}
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export const CopilotSummary = ({
  activityId,
  summary,
  copyToNote,
  buttonIcon = 'noteAction',
  isInPreview,
}: {
  activityId: BobjectId;
  summary: string;
  copyToNote?: (value: string) => void;
  buttonIcon?: IconType;
  isInPreview?: boolean;
}) => {
  const { t } = useTranslation();

  const previewStyle = {
    padding: 16,
    border: '1px solid #E2E5FF',
    borderRadius: '8px',
  };
  return (
    <div className={styles.aiQuestions} style={isInPreview ? previewStyle : undefined}>
      <SectionTitle
        activityId={activityId}
        title={t('activityTimelineItem.item.copilotInsights.aiGeneratedNote')}
        copyValue={summary}
        copyToNote={copyToNote}
        buttonIcon={buttonIcon}
      />
      <Text
        size="xs"
        color="peanut"
        className={isInPreview ? styles.increasedLineHeight : undefined}
      >
        {summary}
      </Text>
    </div>
  );
};

export const TagGroup = ({ values }: { values: { text: string; active: boolean }[] }) => {
  const activeStyle = {
    backgroundColor: '#1126EA',
    color: '#FFFFFF',
  };
  const [showNumber, setShowNumber] = useState(3);

  const { t } = useTranslation('translation', {
    keyPrefix: 'activityTimelineItem.item.copilotInsights',
  });
  values?.sort((a, b) => {
    if (a.active) {
      return -1;
    } else if (b.active) {
      return 1;
    } else {
      return a.text.localeCompare(b.text);
    }
  });

  const showFunction = useCallback(() => {
    if (showNumber < values?.length) {
      return () => setShowNumber(values?.length);
    } else {
      return () => setShowNumber(3);
    }
  }, [showNumber, values]);
  return (
    <>
      <div className={styles.tagGroup}>
        {values?.slice(0, showNumber)?.map(value => (
          <div className={styles.tagContainer} key={value.text}>
            <div className={styles.tag} style={value.active ? activeStyle : undefined}>
              {value.text}
            </div>
          </div>
        ))}
      </div>
      {values.length > 3 && (
        <Button
          className={styles._showMore_button}
          variant="clear"
          size="small"
          color="purple"
          uppercase={false}
          iconRight={showNumber < values?.length ? 'chevronDown' : 'chevronUp'}
          onClick={showFunction()}
        >
          {showNumber < values?.length ? t('showMore') : t('showLess')}
        </Button>
      )}
    </>
  );
};

interface InsightProps {
  activity: Bobject;
  insight: Insight;
  insightDefinition: CoreInsightDefinition;
}

export const DecisionInsight = ({ activity, insight, insightDefinition }: InsightProps) => {
  const { data: picklistField } = useSWR<PicklistField>(
    `/utils/picklists/${insightDefinition?.activityField}/type`,
    key => api.get<PicklistField>(key).then(res => res.data),
  );

  const values = picklistField?.values.map(pv => ({
    text: pv.value,
    active: insight?.choices.includes(pv.id),
  }));

  return (
    <div className={styles.aiQuestions}>
      <SectionTitle title={insightDefinition?.title} activityId={activity.id} />
      {values && <TagGroup values={values} />}
    </div>
  );
};

export const ExtractionInsight = ({ activity, insight, insightDefinition }: InsightProps) => {
  const values = insightDefinition?.searchWords.split(',')?.map(w => ({
    text: w,
    active: insight?.extracted_values.includes(w),
  }));
  return (
    <div className={styles.aiQuestions}>
      <SectionTitle title={insightDefinition?.title} activityId={activity.id} />
      {values && <TagGroup values={values} />}
    </div>
  );
};

export const GenerationInsight = ({ activity, insight, insightDefinition }: InsightProps) => {
  return (
    <div className={styles.aiQuestions}>
      <SectionTitle title={insightDefinition?.title} activityId={activity.id} />
      <Text size="xs" color="peanut">
        {insight.generated_text}
      </Text>
    </div>
  );
};

const insightComponents: Record<InsightType, (props: InsightProps) => JSX.Element> = {
  DECISION: DecisionInsight,
  EXTRACTION: ExtractionInsight,
  GENERATION: GenerationInsight,
};

interface CopilotAnalysisProps {
  activity: Bobject;
  onEdit?: () => void;
}

export const CopilotAnalysis = ({ activity, onEdit }: CopilotAnalysisProps) => {
  const { insights, setOverlay } = useCopilotActivity();
  const type = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
    ?.valueLogicRole as ACTIVITY_TYPES_VALUES_LOGIC_ROLE;
  const isCall = type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;

  const { t } = useTranslation();

  const activityType = isCall ? t('activityTimelineItem.item.call') : t('bobjectTypes.meeting');
  const goBack = () => {
    setOverlay(undefined);
    if (onEdit) {
      onEdit();
    }
  };

  const { data: coreInsights } = useSWR<CoreInsightDefinition[]>(
    '/utils/service/copilot-insights',
    key => api.get<CoreInsightDefinition[]>(key).then(res => res.data),
  );

  return (
    <>
      {insights && (
        <div>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            onClick={goBack}
          >
            <Icon name="arrowLeft" />
            <Text size="xs" color="bloobirds">
              {t('activityTimelineItem.item.copilotInsights.backTo', { type: activityType })}
            </Text>
          </div>
          <CopilotSummary summary={insights?.summary} activityId={activity.id} />
          {insights?.insights?.map(i => {
            const Insight = insightComponents[i.insight_type];
            return (
              <Insight
                key={i.pk}
                activity={activity}
                insight={i}
                insightDefinition={coreInsights?.find(ci => ci.versionIdentifier === i.insightId)}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
