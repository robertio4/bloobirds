import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CrmUpdatesModal, useBuildCRMUpdates } from '@bloobirds-it/copilot';
import {
  Button,
  Icon,
  IconButton,
  IconType,
  Spinner,
  Text,
  Tooltip,
  useHover,
} from '@bloobirds-it/flamingo-ui';
import { useCopilotActivity, useUserSettings, useAiAnalysisEnabled } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  MIXPANEL_EVENTS,
  UserType,
} from '@bloobirds-it/types';
import { baseUrls, getFieldByLogicRole, getTextFromLogicRole } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import mixpanel from 'mixpanel-browser';

import styles from './copilotSuggestionsCallout.module.css';

interface CalloutButtonProps {
  text: string;
  icon: IconType;
  onClick?: () => void;
  disabled?: boolean;
  generating?: boolean;
  error?: boolean;
  onRefresh?: () => void;
  isBubble?: boolean;
}

const CRMUpdatesButton = ({ isBubble }: { isBubble: boolean }) => {
  const settings = useUserSettings();
  const canRegenerate = settings?.user.type === UserType.SUPPORT_USER;
  const [modalOpen, setModalOpen] = useState(false);

  const { crmUpdates, regenerateUpdates, activity } = useCopilotActivity();
  const error = crmUpdates?.status === 'ERROR';
  const generating = crmUpdates?.status === 'GENERATING';
  const noUpdates = crmUpdates?.status === 'GENERATED' && 0;
  const hasUpdates = crmUpdates?.status === 'GENERATED' && 0;

  const handleRefresh = (e?: React.MouseEvent<HTMLSpanElement>) => {
    e?.stopPropagation();
    if (canRegenerate) {
      regenerateUpdates();
    }
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_REGENERATE_CRM_UPDATES);
  };
  const { t } = useTranslation();
  const getTooltipText = () => {
    if (generating) {
      return `${t('activityTimelineItem.item.copilotCallout.buttons.generating')} ✨`;
    } else if (hasUpdates) {
      return t('activityTimelineItem.item.copilotCallout.buttons.suggestions');
    } else if (noUpdates) {
      return t('activityTimelineItem.item.copilotCallout.buttons.noResults');
    } else if (error) {
      return t('activityTimelineItem.item.copilotCallout.buttons.failed');
    }
  };

  const { totalUpdates } = useBuildCRMUpdates(activity);

  const handleClick = () => {
    if (error) {
      handleRefresh();
    } else {
      if (totalUpdates) {
        setModalOpen(true);
      }
    }
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_OPEN_CRM_UPDATES);
  };

  const disabled = noUpdates || generating;
  return (
    <div
      style={{ cursor: !generating ? 'pointer' : 'not-allowed' }}
      className={clsx(styles.calloutButton, {
        [styles.disabled]: disabled,
        [styles.error]: error,
        [styles.smallButton]: isBubble,
      })}
      onClick={handleClick}
    >
      <Tooltip title={getTooltipText()} position="top">
        {!generating && !error && (
          <span
            className={styles.counter}
            onClick={handleRefresh}
            style={noUpdates ? { backgroundColor: '#D4E0F1' } : undefined}
          >
            <Text size="xxxs" color={noUpdates ? 'softPeanut' : 'purple'} weight="bold">
              {totalUpdates}
            </Text>
          </span>
        )}
        {!error && generating && <Spinner name="loadingCircle" color="purple" size={24} />}
        {!error && !generating && (
          <IconButton name="salesforce" size={24} color={noUpdates ? 'verySoftPeanut' : 'purple'} />
        )}
        {error && (
          <div className={styles.errorBlock}>
            <Icon name="cross" size={14} color="verySoftTomato" />
            <Text size="xxs" color="extraMeeting">
              {t('common.failed')}
            </Text>
          </div>
        )}
        <Text
          className={styles.calloutButtonText}
          size={isBubble ? 'xxs' : 'xs'}
          color={noUpdates ? 'verySoftPeanut' : generating ? 'lightPurple' : 'purple'}
          weight="medium"
        >
          {t('activityTimelineItem.item.copilotCallout.crmUpdates')}
        </Text>
        <CrmUpdatesModal activity={activity} open={modalOpen} onClose={() => setModalOpen(false)} />
      </Tooltip>
    </div>
  );
};

const CalloutButton = ({
  text,
  icon,
  onClick,
  disabled,
  generating,
  error,
  onRefresh,
  isBubble,
}: CalloutButtonProps) => {
  const settings = useUserSettings();
  const canRegenerate = settings?.user.type === UserType.SUPPORT_USER;

  const handleRefresh = e => {
    e.stopPropagation();
    onRefresh();
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_REGENERATE_INSIGHTS);
  };

  const { t } = useTranslation();
  return (
    <div
      style={{ cursor: !error && !generating ? 'pointer' : 'not-allowed' }}
      className={clsx(styles.calloutButton, {
        [styles.disabled]: disabled,
        [styles.error]: error,
        [styles.smallButton]: isBubble,
      })}
      onClick={() => !disabled && !generating && !error && onClick()}
    >
      {(canRegenerate || error) && !disabled && !generating && (
        <Tooltip title="Regenerate" position="right-end">
          <IconButton
            name="refresh"
            size={16}
            color="purple"
            className={styles.calloutButtonRefresh}
            onClick={handleRefresh}
          />
        </Tooltip>
      )}

      {!error && generating && <Spinner name="loadingCircle" color="purple" size={24} />}
      {!error && !generating && (
        <IconButton name={icon} size={24} color={disabled ? 'verySoftPeanut' : 'purple'} />
      )}
      {error && (
        <div className={styles.errorBlock}>
          <Icon name="cross" size={14} color="verySoftTomato" />
          <Text size="xxs" color="extraMeeting">
            {t('common.failed')}
          </Text>
        </div>
      )}
      <Text
        className={styles.calloutButtonText}
        size={isBubble ? 'xxs' : 'xs'}
        color={disabled ? 'verySoftPeanut' : 'purple'}
        weight="medium"
      >
        {text}
      </Text>
    </div>
  );
};

export const CopilotSuggestionsCallout = ({ isBubble }: { isBubble: boolean }) => {
  const settings = useUserSettings();
  const { setOverlay, insights, regenerateAnalysis, activity } = useCopilotActivity();
  const { t, i18n } = useTranslation();
  const canSeeCRMUpdates = settings?.user.type === UserType.SUPPORT_USER;
  const [ref, isHovering] = useHover();
  const accountId = settings?.account?.id;
  const aiAnalysisEnabled = useAiAnalysisEnabled(accountId);

  const navigateToAiAnalysisPage = () => {
    const activityId = activity.id.objectId;
    const activityTypeLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
      ?.valueLogicRole;

    let activityType = '';
    if (activityTypeLogicRole === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING) {
      activityType = 'meeting';
    } else if (activityTypeLogicRole === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL) {
      activityType = 'call';
    }

    const url = `/app/ai-analysis/${activityType}/${activityId}`;
    window.open(baseUrls[process.env.NODE_ENV] + url, '_blank');
  };

  const copilotAnalysis = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS,
  );
  const canShowAnalysis = copilotAnalysis && aiAnalysisEnabled;

  const lang = i18n.language;

  const classes = clsx(styles.suggestedEntitiesHeaderButton, {
    [styles.suggestedEntitiesHeaderButtonHoverEn]: isHovering && lang === 'en',
    [styles.suggestedEntitiesHeaderButtonHoverEs]: isHovering && lang === 'es',
  });

  return (
    <div className={styles.iaCallout}>
      <div className={styles.suggestedEntitiesHeader}>
        <div className={styles.suggestedEntitiesHeaderTitle}>
          <Icon name="stars" color="lightPurple" size={16} />
          <Text color="purple" size="l" weight="bold">
            {t('activityTimelineItem.item.copilotCallout.aiAnalysis')}
          </Text>
        </div>
        {canShowAnalysis && (
          <div ref={ref}>
            <AnimatePresence>
              <Button
                className={classes}
                iconLeft="externalLink"
                variant="IAGradient"
                size="small"
                color="purple"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigateToAiAnalysisPage();
                }}
                uppercase={false}
              >
                {isHovering && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.2 }}
                  >
                    {t('common.openInNewTab')}
                  </motion.div>
                )}
              </Button>
            </AnimatePresence>
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <CalloutButton
          icon="search"
          text={t('activityTimelineItem.item.copilotCallout.insights')}
          onClick={() => {
            if (insights.status === 'GENERATED') {
              setOverlay('analysis');
            }
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_OPEN_INSIGHTS);
          }}
          generating={!insights || insights?.status === 'GENERATING'}
          error={insights?.status === 'ERROR'}
          onRefresh={regenerateAnalysis}
          isBubble={isBubble}
        />
        {canSeeCRMUpdates && <CRMUpdatesButton isBubble={isBubble} />}
        <CalloutButton
          icon="taskAction"
          text={t('activityTimelineItem.item.copilotCallout.nextSteps')}
          disabled
          isBubble={isBubble}
        />
      </div>
    </div>
  );
};
