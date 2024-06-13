import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { formatDateAsText } from '@bloobirds-it/utils';

import styles from './emailDetailsDropdown.module.css';

interface EmailValue {
  name: string;
  email: string;
}

interface EmailDetailsDropdownProps {
  metadata: Record<string, EmailValue[]>;
  date: string;
  subject: string;
}

export const EmailDetailsDropdown = (props: EmailDetailsDropdownProps) => {
  const { metadata, date, subject } = props;

  const anchorRef = useRef();
  const { visible, setVisible, ref } = useVisible(false, anchorRef);
  const { t } = useTranslation();

  const formattedDate = formatDateAsText({
    text: date,
    patternFormat: '{date} {month-short} {year}, {time}',
    t,
  });

  return (
    <Dropdown
      anchor={
        <div
          onClick={e => {
            setVisible(visible => !visible);
            e.stopPropagation();
          }}
          ref={anchorRef}
        >
          <Icon name="chevronDown" size={12} />
        </div>
      }
      visible={visible}
      ref={ref}
      arrow={false}
    >
      <div className={styles.column}>
        {metadata && (
          <>
            <Row label={`${t('common.from').toLowerCase()}:`} values={metadata.from} />
            <Row label={t('common.to').toLowerCase()} values={metadata.to} />
            {metadata.cc && metadata.cc.length > 0 && <Row label="cc:" values={metadata.cc} />}
            {metadata.bcc && metadata.bcc.length > 0 && <Row label="bcc:" values={metadata.bcc} />}
            <Row label={t('common.date').toLowerCase()} values={formattedDate} />
            <Row label={t('common.subject').toLowerCase()} values={subject} />
          </>
        )}
      </div>
    </Dropdown>
  );
};

const Row = (props: { label: string; values: string | EmailValue[] }) => {
  const { label, values } = props;
  return (
    <div className={styles.row}>
      <div className={styles.label}>
        <Text size="s" color="softPeanut">
          {label}
        </Text>
      </div>
      <div className={styles.value}>
        {typeof values === 'string' ? (
          <Text size="s" color="peanut">
            {values || '-'}
          </Text>
        ) : values && values.length > 0 ? (
          values.map(value => (
            <Text size="s" color="peanut" key={`email-info-${label}-${value}`}>
              {value.name ? `${value.name} <${value.email}>` : value.email}
            </Text>
          ))
        ) : (
          <Text size="s" color="peanut">
            -
          </Text>
        )}
      </div>
    </div>
  );
};
