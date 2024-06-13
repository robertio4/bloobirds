import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dropdown,
  Icon,
  Item,
  Spinner,
  Text,
  useToasts,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { ExtensionBobject, MessagesEvents } from '@bloobirds-it/types';
import { createBobjectInSfdc } from '@bloobirds-it/utils';

import styles from '../../wizardHelper.module.css';

export const CreateInSfdcHelper = ({ bobject }: { bobject: ExtensionBobject }) => {
  const { ref, visible, setVisible } = useVisible();
  const [loading, setLoading] = useState<boolean>(false);
  const isLead = bobject?.id?.typeName === 'Lead';
  const { createToast } = useToasts();
  const { t } = useTranslation();

  const createInSfdc = (createContact: boolean) => {
    setLoading(true);
    createBobjectInSfdc(bobject?.id?.value, createContact)
      .then(() => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: bobject?.id?.typeName },
          }),
        );
        createToast({
          message: t('sidePeek.overview.toasts.createInSalesforceSuccess', {
            bobject: bobject?.id?.typeName,
          }),
          type: 'success',
        });
        setLoading(false);
        setVisible(false);
      })
      .catch(e => {
        createToast({
          message: t('sidePeek.overview.toasts.createBobjectInSfdcError', {
            bobject: bobject?.id?.typeName,
            message: e?.response?.data?.message ? `: ${e?.response?.data?.message}` : '.',
          }),
          type: 'error',
        });
        setLoading(false);
        setVisible(false);
      });
  };
  return (
    <div className={styles.createsfdc__box}>
      <Dropdown
        ref={ref}
        visible={visible}
        anchor={
          <Button
            size="small"
            variant="clear"
            color="white"
            expand
            uppercase={false}
            className={styles.createsfdc__button}
            onClick={() => (isLead ? setVisible(true) : createInSfdc(false))}
          >
            {loading ? (
              <Spinner name={'loadingCircle'} size={16} />
            ) : (
              <Text size="xs" color="white" weight="bold" className={styles.button_text}>
                <Icon name="plus" color="white" size={16} />
                {t('sidePeek.overview.createInSalesforce')}
                <Icon name="salesforce" color="white" size={16} />
              </Text>
            )}
          </Button>
        }
      >
        <Item onClick={() => createInSfdc(false)}>
          <Icon name="personBody" color="softTangerine" />
          {t('sidePeek.overview.createAs', { bobject: 'Lead' })}
        </Item>
        <Item onClick={() => createInSfdc(true)}>
          <Icon name="personBody" color="gradientPurple" />
          {t('sidePeek.overview.createAs', { bobject: 'Contact' })}
        </Item>
      </Dropdown>
    </div>
  );
};
