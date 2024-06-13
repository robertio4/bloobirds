import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { LinkedInLead } from '@bloobirds-it/types';

import { BobjectField } from '../../../types/entities';
import { updateLead } from '../../../utils/leads';
import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeader,
} from '../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../context';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import styles from './duplicatedLead.module.css';

interface DuplicatedLeadProps {
  linkedInURL: string;
  salesNavigatorURL: string;
  lead: LinkedInLead;
  field: BobjectField;
  onUpdate: (lead: LinkedInLead) => void;
}

export default function DuplicatedLead({
  linkedInURL,
  salesNavigatorURL,
  lead,
  field,
  onUpdate,
}: DuplicatedLeadProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.duplicates' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setActiveBobject } = useExtensionContext();
  const { setIsDuplicatePage } = useFloatingMenuContext();

  const leadName = lead?.fullName;
  const fieldName = field?.name.toLowerCase();

  const handleLeadRedirect = () => {
    setActiveBobject(lead);
  };

  useEffect(() => {
    setIsDuplicatePage(true);
    return () => setIsDuplicatePage(false);
  }, []);

  return (
    <BubbleWindow>
      <BubbleWindowHeader color="banana" backgroundColor="verySoftBanana" name="copy" />
      <BubbleWindowContent className={styles.wrapper}>
        <Text align="center" className={styles.title}>
          {t('duplicatedLead')}
        </Text>
        <Text align="center" color="gray" size="m">
          {leadName ? (
            <span>
              {t('existingLead')}
              <span onClick={handleLeadRedirect} className={styles.link}>
                {leadName} <Icon name="externalLink" size={20} />
              </span>{' '}
              {t('fieldName', { fieldName })}
            </span>
          ) : (
            <span>{t('sameField', { fieldName })}</span>
          )}
        </Text>
      </BubbleWindowContent>
      <BubbleWindowFooter>
        <Button
          expand
          disabled={isSubmitting}
          onClick={async () => {
            setIsSubmitting(true);
            const response = await updateLead(lead.id, linkedInURL, salesNavigatorURL);
            onUpdate(response.data);
          }}
        >
          {t('mergeExisting')}
        </Button>
      </BubbleWindowFooter>
    </BubbleWindow>
  );
}
