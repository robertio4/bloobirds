import { useTranslation } from 'react-i18next';

import { Text, Tooltip } from '@bloobirds-it/flamingo-ui';

import { formatDateAsText } from '../../../../../../utils/dates';
import styles from '../miniCard.module.css';

export const DateText = ({ value, prefixText }: { value?: string | Date; prefixText?: string }) => {
  const { t } = useTranslation();
  return value ? (
    <div>
      <Text size="s" ellipsis={25} color="darkBloobirds" inline>
        <b>{prefixText}</b> {formatDateAsText({ text: value as string, t })}
      </Text>
    </div>
  ) : (
    <></>
  );
};

export const ScheduledDateTime = ({
  scheduledDateTime,
  isOverdue,
  isCadence = false,
}: {
  scheduledDateTime: string | Date;
  isOverdue: boolean;
  isCadence?: boolean;
}) => {
  const { t } = useTranslation();

  return scheduledDateTime ? (
    <Tooltip title={isOverdue && 'Overdue'} position="top">
      <div className={styles._datetime}>
        {!isCadence && (
          <Text size="xs" color={isOverdue ? 'tomato' : 'darkBloobirds'}>
            {formatDateAsText({ text: scheduledDateTime as string, patternFormat: '{time-24}', t })}
          </Text>
        )}
        <Text size="xs" color={isOverdue ? 'tomato' : 'darkBloobirds'}>
          {formatDateAsText({
            text: scheduledDateTime as string,
            patternFormat: t('dates.shortMonth'),
            t,
          })}
        </Text>
      </div>
    </Tooltip>
  ) : (
    <></>
  );
};
