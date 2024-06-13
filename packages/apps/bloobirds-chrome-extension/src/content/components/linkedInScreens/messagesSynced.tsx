import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Text, Button } from '@bloobirds-it/flamingo-ui';
import { MessagesEvents } from '@bloobirds-it/types';

import { LinkedInLead } from '../../../types/entities';
import { searchLeadByQuery } from '../../../utils/leads';
import { createBloobirdsUrl, isIdLinkedinUrl } from '../../../utils/url';
import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeader,
} from '../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../context';
import Loading from '../loadingIndicator/loadingIndicator';
import styles from './styles.module.css';

const MessageInfo = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.syncMessageInfo' });
  const { useGetCurrentPage } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const [linkedInUrl, setLinkedInUrl] = useState(null);
  const [lead, setLead] = useState<LinkedInLead>(null);
  const [loading, setLoading] = useState(true);
  const [salesNavigatorUrl, setSalesNavigatorUrl] = useState(null);
  const [fullName, setFullName] = useState(null);

  useEffect(() => {
    setLoading(true);
    setLinkedInUrl(null);
    setLead(null);
    setSalesNavigatorUrl(null);
    setFullName(null);

    window.addEventListener(
      MessagesEvents.UrlFound,
      (event: CustomEvent) => {
        const { linkedInUrl, salesNavigatorUrl, fullName } = event.detail;
        setFullName(fullName);
        setLinkedInUrl(linkedInUrl);
        setSalesNavigatorUrl(salesNavigatorUrl);
      },
      { once: true },
    );

    window.addEventListener(
      MessagesEvents.UrlNotFound,
      (e: CustomEvent) => {
        const { detail } = e;
        const { salesNavigatorUrl } = detail;
        setSalesNavigatorUrl(salesNavigatorUrl);
      },
      { once: true },
    );
  }, [currentPage]);

  useEffect(() => {
    if (linkedInUrl || salesNavigatorUrl) {
      searchLeadByQuery({
        linkedInUrl: isIdLinkedinUrl(linkedInUrl) ? null : linkedInUrl || null,
        salesNavigatorUrl: salesNavigatorUrl || null,
        leadFullName: fullName || null,
      })
        .then(data => {
          if (data?.leads[0]) {
            setLead(data?.leads[0]);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [linkedInUrl, salesNavigatorUrl]);

  const appendAutoOpen = (url: string) => {
    return `${url}?bb-open`;
  };

  const onClickProfile = () => {
    if (salesNavigatorUrl) {
      window.open(appendAutoOpen(salesNavigatorUrl), '_blank');
    } else if (linkedInUrl) {
      window.open(appendAutoOpen(linkedInUrl), '_blank');
    }
  };

  const onClickLead = () => {
    const url = createBloobirdsUrl(lead.id);
    window.open(url, '_blank');
  };

  if (loading) {
    return <Loading />;
  }

  if (lead) {
    return (
      <BubbleWindow>
        <BubbleWindowHeader name="refresh" color="bloobirds" backgroundColor="lightBloobirds" />
        <BubbleWindowContent className={styles._textWrapper}>
          <Text align="left" weight="medium" size="l" color="peanut" className={styles.title}>
            👌 {t('messagesSynced')}
          </Text>
          <Text align="left" color="gray" size="m">
            {t('messagesSyncedInfo')}
          </Text>
        </BubbleWindowContent>
        <BubbleWindowFooter>
          <Button variant="secondary" onClick={onClickLead} expand>
            {t('viewInBloobirds')}
          </Button>
        </BubbleWindowFooter>
      </BubbleWindow>
    );
  }

  return (
    <BubbleWindow>
      <BubbleWindowHeader name="alertTriangle" color="banana" backgroundColor="verySoftBanana" />
      <BubbleWindowContent className={styles._textWrapper}>
        <Text align="left" weight="medium" size="l" color="peanut">
          👉{t('syncMessages')}
        </Text>
        <Text align="left" color="gray" size="m">
          👉{t('syncMessagesDescription')}
        </Text>
      </BubbleWindowContent>
      <BubbleWindowFooter>
        <Button onClick={onClickProfile} expand>
          👉{t('viewProfileButton')}
        </Button>
      </BubbleWindowFooter>
    </BubbleWindow>
  );
};

export default MessageInfo;
