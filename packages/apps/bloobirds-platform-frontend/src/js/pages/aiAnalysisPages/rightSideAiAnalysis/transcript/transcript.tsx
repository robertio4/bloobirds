import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { Icon, SearchInput, Text } from '@bloobirds-it/flamingo-ui';
import { useCopilotActivity } from '@bloobirds-it/hooks';

import { secondsToTime } from '../../utiils';
import NoResultsFound from './noResultsFound';
import styles from './transcript.module.css';

interface Props {
  onClick: (start: number) => void;
}

const Transcript = ({ onClick }: Props) => {
  const { activityType } = useParams<{ activityType: string }>();
  const { transcript: data } = useCopilotActivity();
  const [searchValue, setSearchValue] = useState('');
  const { t } = useTranslation();

  const filteredData = data?.transcript?.filter(fragment => {
    return fragment.text?.toLowerCase().includes(searchValue.toLowerCase());
  });

  const highlightText = (text: string) => {
    if (!searchValue.trim()) return text; // Si no hay término de búsqueda, retornar el texto original
    const regex = new RegExp(`(${searchValue})`, 'gi');
    return text.split(regex).map((fragment, index) => {
      return fragment.match(regex) ? (
        <span className={styles.highlight} key={index}>
          {fragment}
        </span>
      ) : (
        fragment
      );
    });
  };

  const parseTime = (time: number) => {
    if (activityType === 'call') {
      return time / 1000;
    } else {
      return time;
    }
  };

  return (
    <div className={styles.blocks}>
      <div className={styles.titleSection}>
        <Icon name="search" color="purple" />
        <Text size="s" weight="heavy">
          {t('ai.aiAnalysis.searchTranscript')}
        </Text>
      </div>
      <div className={styles.searchSection}>
        <SearchInput
          color="purple"
          size="small"
          width="100%"
          placeholder={t('ai.aiAnalysis.searchTranscriptTooltip')}
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>

      <div className={styles.titleSection}>
        <Icon name="snippet" color="purple" />
        <Text size="s" weight="heavy">
          {activityType === 'call'
            ? t('ai.aiAnalysis.callTranscript')
            : t('ai.aiAnalysis.meetingTranscript')}
        </Text>
      </div>
      {filteredData?.length > 0 ? (
        filteredData?.map((fragment, index) => (
          <div key={index} onClick={() => onClick(parseTime(fragment.start))}>
            <div className={styles.fragmentHeader}>
              <Text color="purple" size="xs" inline>
                {secondsToTime(parseTime(fragment.start))}
              </Text>
              <Text color="purple" size="xs" weight="bold">
                <Icon name={fragment.isLead ? 'person' : 'user'} color="purple" size={16} />
                {fragment.speaker} ({fragment.isLead ? 'lead' : 'user'})
              </Text>
            </div>

            <Text size="xs">{highlightText(fragment?.text)}</Text>
          </div>
        ))
      ) : (
        <NoResultsFound />
      )}
    </div>
  );
};

export default Transcript;
