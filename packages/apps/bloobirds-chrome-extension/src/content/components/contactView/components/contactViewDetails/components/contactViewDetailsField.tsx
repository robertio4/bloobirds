import { useTranslation } from 'react-i18next';

import { Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useDataModel } from '@bloobirds-it/hooks';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { parseCurrency, isUTCDateString } from '@bloobirds-it/utils';
import clsx from 'clsx';
import spacetime from 'spacetime';

import { CopyText } from '../../../../copyText/CopyText';
import styles from '../contactViewDetails.module.css';

export const ContactViewDetailsField = ({ field, sidePeekEnabled }) => {
  const detailRowClasses = clsx(styles.detail_row, {
    [styles.detail_row_sidePeek]: sidePeekEnabled,
  });
  const { t } = useTranslation();
  const { t: datesT } = useTranslation('translation', { keyPrefix: 'dates' });

  const { name, value } = field || {};
  let valueToPrint = value;
  const dataModel = useDataModel();
  const { prefix, suffix } =
    dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT) || {};
  if (name === 'Amount') {
    const amount = parseCurrency(value);
    valueToPrint = `${prefix ? prefix : ''} ${amount ? amount : '-'} ${suffix ? suffix : ''}`;
  }
  if (isUTCDateString(value)) {
    valueToPrint = spacetime(value).format(datesT('standardDate'));
  }
  const printableValue = typeof valueToPrint == 'string' || typeof valueToPrint == 'number';

  return (
    <div className={detailRowClasses}>
      <div
        className={clsx(styles.detail_row_left, {
          [styles.detail_row_left_sidePeek]: sidePeekEnabled,
        })}
      >
        <Tooltip title={name} position="top">
          <Text className={styles.detail_row_text} size="xs" color="softPeanut">
            {name}
          </Text>
        </Tooltip>
      </div>
      <div
        className={styles.detail_row_right}
        style={sidePeekEnabled ? undefined : { width: 'calc(100% - 88px)' }}
      >
        {value && value !== '-' ? (
          <CopyText textToCopy={value} isLinkTypeField={false}>
            <Tooltip title={value} position="top">
              <Text className={styles.detail_row_text} size="xs" color="peanut">
                {printableValue ? valueToPrint : t('notPrintable')}
              </Text>
            </Tooltip>
          </CopyText>
        ) : (
          <Text className={styles.detail_row_text} size="xs" color="peanut">
            {printableValue ? valueToPrint : t('notPrintable')}
          </Text>
        )}
      </div>
    </div>
  );
};
