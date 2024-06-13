import { useTranslation } from 'react-i18next';

import { Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { getUserTimeZone } from '@bloobirds-it/utils';

import { TaskFeedTask } from '../../../../../types/taskManagement.types';
import styles from '../../../taskTabsList.module.css';

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const isoDateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?(Z|[+-]\d{2}:\d{2})?$/;

export function ExtraFields({ extraFields }: { extraFields: TaskFeedTask['extraFields'] }) {
  const { i18n } = useTranslation();

  const formatDate = (value: string) => {
    if (isoDatePattern.test(value)) {
      return new Date(value).toLocaleDateString();
    } else if (isoDateTimePattern.test(value)) {
      return getI18nSpacetimeLng(i18n.language, new Date(), getUserTimeZone()).since(
        getI18nSpacetimeLng(i18n.language, new Date(value), getUserTimeZone()),
      ).rounded;
    } else {
      return value;
    }
  };

  const getColorByDateTime = (value: string) => {
    if (isoDateTimePattern.test(value)) {
      const now = new Date();
      const pastDate = new Date(value);
      //@ts-ignore
      const timeDiff = Math.abs(now - pastDate);
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

      if (hoursDiff < 2) {
        return 'melon'; // < 2 hours
      } else if (hoursDiff < 6) {
        return 'banana'; // < 6 hours
      } else if (hoursDiff < 12) {
        return 'tangerine'; // < 12 hours
      } else if (hoursDiff <= 24) {
        return 'softTomato'; // 12 - 24 hours
      } else {
        return 'softPeanut'; // > 24 hours
      }
    }
    return 'lightBloobirds';
  };

  return (
    <div className={styles.extraFields}>
      {extraFields.map((field, index) => {
        if (!field.value) return null;
        const formattedValue = formatDate(field.value);
        const iconColor = getColorByDateTime(field.value);
        const icon = iconColor !== 'lightBloobirds' ? 'flagFilled' : field.icon || 'circle';
        return (
          <div key={index} className={styles.extraField}>
            <Tooltip title={`${field.name}: ${field.value}`} position="top">
              <Icon name={icon} color={iconColor} size={16} />
              <Text size="xs" color="peanut" weight="bold">
                {formattedValue}
              </Text>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
}
