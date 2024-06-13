import { useTranslation } from 'react-i18next';

import { Button, Text } from '@bloobirds-it/flamingo-ui';

import styles from './noFieldsSelectedToDisplay.module.css';

interface NoFieldsSelectedToDisplayProps {
  hasButton?: boolean;
  onClick?: () => void;
}

export function NoFieldsSelectedToDisplay(props: NoFieldsSelectedToDisplayProps) {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.message}>
        <Text size="s" color="peanut" weight="bold">
          {t('sidePeek.overview.fields.noFieldsSelected')}
        </Text>
      </div>
      {props.hasButton ? (
        <div className={styles.button}>
          <Button
            className={styles.button_text}
            size="small"
            color="bloobirds"
            uppercase={false}
            iconLeft="plus"
            onClick={props.onClick}
          >
            <Text className={styles.text} size="xs" color="white" weight="regular">
              {t('sidePeek.overview.fields.addFields')}
            </Text>
          </Button>
        </div>
      ) : (
        <div className={styles.text_div}>
          <Text className={styles.text} size="xs" color="softPeanut" weight="regular">
            {t('sidePeek.overview.fields.searchHint')}
          </Text>
        </div>
      )}
    </>
  );
}
