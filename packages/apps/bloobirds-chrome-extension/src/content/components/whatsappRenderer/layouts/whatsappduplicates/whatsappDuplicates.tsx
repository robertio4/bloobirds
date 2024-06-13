import { Trans, useTranslation } from 'react-i18next';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectTypes } from '@bloobirds-it/types';

import { MultipleBobjectsLayout } from '../../../linkedInScreens/multipleBobjectsLayout';
import WhatsappBobjectCard from '../components/card';
import styles from './whatsappDuplicates.module.css';

function Callout() {
  return (
    <div className={styles.warningCallout}>
      <Icon name="alertTriangle" color="banana" className={styles.warningIcon} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Text size="s">
          <Trans i18nKey="sidePeek.whatsappDuplicates.callout" />
        </Text>
      </div>
    </div>
  );
}

export const WhatsappDuplicates = ({ bobjects }: { bobjects: Bobject[] }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.whatsappDuplicates' });
  const isOpportunitiesDuplicates = bobjects[0]?.id?.typeName === BobjectTypes.Opportunity;

  return (
    <MultipleBobjectsLayout>
      <MultipleBobjectsLayout.Header />
      <MultipleBobjectsLayout.List>
        <>
          <div className={styles._text}>
            <Text size="m" color="peanut" className={styles.headerText}>
              {t(isOpportunitiesDuplicates ? 'headerTextOpportunities' : 'headerText')}
            </Text>
            <Text size="m" weight="bold" color="peanut">
              {t('titleText')}
            </Text>
          </div>
          {!isOpportunitiesDuplicates && <Callout />}
          <div className={styles._leadListWrapper}>
            {bobjects.map((bobject, index) => (
              <WhatsappBobjectCard
                key={index + bobject?.id?.value}
                bobject={bobject as Bobject<BobjectTypes.Lead>}
              />
            ))}
          </div>
        </>
      </MultipleBobjectsLayout.List>
    </MultipleBobjectsLayout>
  );
};
