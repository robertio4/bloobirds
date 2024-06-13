import { useTranslation } from 'react-i18next';

import { formatDateAsText } from '../../../../../../utils/dates';
import { InfoDetailElement } from '../../briefCardComponents/infoDetailElement';
import styles from '../leadBriefCard.module.css';
import { MainNoteButton } from './mainNoteButton';

export const LeadInfoDetails = ({ lead }) => {
  const {
    attemptsCount,
    touchesCount,
    lastTouch,
    lastAttempt,
    cadence,
    mainNote,
    cadenceEnded,
  } = lead;
  const hasRunningCadence = cadence && cadenceEnded !== 'true';
  const { t } = useTranslation();

  return (
    <>
      <div style={{ flexShrink: 1 }} />
      <div className={styles.countsColumn}>
        <InfoDetailElement
          icon="check"
          iconColor="softPeanut"
          text={t('sidePeek.overview.activity.attempts', { count: parseInt(attemptsCount) || 0 })}
        />
        <InfoDetailElement
          icon="checkDouble"
          text={t('sidePeek.overview.activity.touches', { count: parseInt(touchesCount) || 0 })}
        />
      </div>
      <div className={styles.datesColumn}>
        <InfoDetailElement
          icon="calendar"
          iconColor="softPeanut"
          text={`${formatDateAsText({ text: lastTouch, t })}`}
        />
        <InfoDetailElement
          icon="calendar"
          iconColor="softPeanut"
          text={`${formatDateAsText({ text: lastAttempt, t })}`}
        />
      </div>
      <div className={styles.actionsColumn}>
        {hasRunningCadence && (
          <InfoDetailElement
            icon="statusCircle"
            iconColor="grape"
            iconSize={6}
            text={t('sidePeek.bobjectBriefCard.onCadence')}
          />
        )}
        {mainNote && <MainNoteButton bobject={lead} />}
      </div>
    </>
  );
};
