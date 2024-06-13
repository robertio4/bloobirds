import { useTranslation } from 'react-i18next';

import { Icon, Tooltip } from '@bloobirds-it/flamingo-ui';

import styles from './copilotAnalysisIndicator.module.css';

interface CopilotAnalysisIndicatorProps {
  size?: number;
}
export const CopilotAnalysisIndicator = ({ size = 18 }: CopilotAnalysisIndicatorProps) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t('extension.card.copilotAnalysis')} position="top">
      <div className={styles.copilot_analysis_indicator}>
        <Icon size={size} color="purple" name="stars" />
      </div>
    </Tooltip>
  );
};
