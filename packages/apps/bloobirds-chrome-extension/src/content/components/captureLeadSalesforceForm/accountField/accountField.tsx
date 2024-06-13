import { CSSProperties, useEffect } from 'react';
import { Control, useController } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { Icon, Tooltip, Text } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import styles from './accountField.module.css';

export interface AccountFieldProps {
  control: Control<any>;
  accountName: string;
  hasDifferentAssignedTo: boolean;
  salesforceOwnerName: string;
  sobjectType: string;
  hasBloobirdsAssignedTo: boolean;
}

export const AccountField = ({
  control,
  accountName,
  hasDifferentAssignedTo,
  salesforceOwnerName,
  sobjectType,
  hasBloobirdsAssignedTo,
}: AccountFieldProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'extension.salesforcePages.accountField',
  });
  const title = hasDifferentAssignedTo
    ? t('titleDiffAssigned')
    : hasBloobirdsAssignedTo
    ? null
    : t('titleAssigned', { salesforceOwnerName });
  const disabled = !hasBloobirdsAssignedTo;
  const isOpportunity = sobjectType === 'Opportunity';
  const {
    field: { value: syncAccount, onChange: setSyncAccount },
  } = useController({
    control,
    name: 'syncAccount',
    defaultValue: true,
  });

  useEffect(() => {
    setSyncAccount(true);
  }, []);

  const checkBoxStyle = {
    backgroundColor: syncAccount ? 'var(--lightBloobirds)' : 'rgba(205, 226, 246, 0.2)',
    color: syncAccount ? 'peanut' : 'white',
    cursor: disabled ? 'not-allowed' : 'pointer',
  } as CSSProperties;

  return (
    <div>
      <div className={styles.company_label}>
        <Text size="m" color="white">
          <Trans
            i18nKey="extension.salesforcePages.accountField.title"
            values={{ accountName: accountName || t('untitledCompany') }}
          />
        </Text>
        {(hasDifferentAssignedTo || !hasBloobirdsAssignedTo) && (
          <Tooltip title={title} position="top">
            <Icon name="alertTriangle" color="banana" />
          </Tooltip>
        )}
      </div>
      <div>
        <span
          style={checkBoxStyle}
          className={styles.checkbox}
          onClick={() => !disabled && setSyncAccount(!syncAccount)}
        >
          <span
            className={clsx(styles.check, {
              [styles.checked]: syncAccount,
            })}
            style={{ border: `1px solid var(--${syncAccount ? 'bloobirds' : 'white'})` }}
          >
            {syncAccount && <Icon size={16} name="check" color="white" />}
          </span>
          <Text
            size="s"
            className={styles.noSelect}
            color={disabled ? 'gray' : syncAccount ? 'peanut' : 'white'}
          >
            {isOpportunity ? t('syncAccountAndContacts') : t('syncAlsoAccount')}
          </Text>
        </span>
      </div>
    </div>
  );
};
