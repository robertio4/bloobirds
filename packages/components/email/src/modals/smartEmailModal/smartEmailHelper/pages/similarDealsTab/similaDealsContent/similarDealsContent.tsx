import React, { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { NoDataPage } from '@bloobirds-it/activity-feed';
import { Button, Checkbox, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { Bobject, ExtensionBobject, ExtensionHelperKeys } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { CompanyCard, SimilarDealsSkeleton } from '../../../components/companyCard/companyCard';
import { SimilarDealsHookType } from '../../../hooks/useSimilarDeals';
import SimilarDealsTimeFilter from '../filters/similarDealsTimeFilter';
import styles from '../similarDeals.module.css';

export type SimilarDealsContentProps = {
  activeBobject: Bobject | ExtensionBobject;
  similarDealsHook: SimilarDealsHookType;
  isBubble?: boolean;
};

export const InfoBanner = () => {
  const { saveCustom } = useUserHelpers();
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.similarDealsTab.infoBanner',
  });
  function handleLearnMore() {
    mixpanel.track('SMART_EMAIL_SIMILAR_DEALS_LEARN_MORE');
    window.open(
      'https://support.bloobirds.com/hc/en-us/articles/9263498944540-5-ways-in-which-Similar-Won-Deals-will-help-you-close-a-new-deal',
      '_blank',
    );
  }
  function banishBanner() {
    mixpanel.track('SMART_EMAIL_SIMILAR_DEALS_DONT_SHOW_BANNER');
    saveCustom({ key: ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER, data: 'Banner banished' });
  }

  return (
    <div className={styles._info_banner}>
      <div className={styles._info_banner_title}>
        <Icon name="book" color="purple" size={24} />
        <Text size="m" color="purple" weight="bold">
          {t('title')}
        </Text>
      </div>
      <Text size="xs" color="purple" weight="regular">
        <Trans i18nKey="smartEmailModal.similarDealsTab.infoBanner.content" />
      </Text>
      <div className={styles._info_banner_footer}>
        <Checkbox
          color="purple"
          size="small"
          onClick={(value: boolean) => {
            if (value) banishBanner();
          }}
        >
          <Text size="xs">{t('checkBox')}</Text>
        </Checkbox>
        <Button
          size="small"
          variant="secondary"
          color="purple"
          uppercase={false}
          onClick={handleLearnMore}
        >
          <Icon name="book" color="purple" size={16} />
          <Text size="xs" color="purple" weight="bold">
            {t('learnMore')}
          </Text>
        </Button>
      </div>
    </div>
  );
};

export const NoDeals = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.similarDealsTab.noDeals',
  });
  return (
    <div className={styles._no_results_container}>
      <Icon name="searchNone" color="softPeanut" size={36} />
      <div>
        <Text size="m" align="center" color="softPeanut" weight="bold">
          {t('title')}
        </Text>
        <Text size="s" align="center" color="softPeanut">
          {t('subtitle')}
        </Text>
      </div>
    </div>
  );
};

export const SimilarDealsContent = ({
  activeBobject,
  similarDealsHook,
  isBubble = false,
}: SimilarDealsContentProps) => {
  const { get } = useUserHelpers();
  const bannerStatus = get(ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER);
  const hasSeenTheBanner = !!bannerStatus && bannerStatus !== 'Banner banished';
  const ref = useRef();
  const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.similarDealsTab' });
  const { similarDeals, isLoading, error, dateFilter, setDateFilter } = similarDealsHook || {};
  return (
    <>
      <div className={styles._header}>
        <Text size="m" color="peanut" weight="medium">
          {t('title')}
        </Text>
        <SimilarDealsTimeFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </div>
      {!bannerStatus && <InfoBanner />}
      {error || !activeBobject ? (
        <div className={styles._no_results}>
          <NoDataPage objectName={t('deals').toLowerCase()} />
        </div>
      ) : (
        <div className={styles._deals_container} ref={ref}>
          {isLoading ? (
            <SimilarDealsSkeleton />
          ) : (
            <>
              {similarDeals?.length > 0 ? (
                similarDeals?.map((company, index) => (
                  <CompanyCard
                    key={company.name}
                    company={company}
                    index={index}
                    isBubble={isBubble}
                  />
                ))
              ) : (
                <NoDeals />
              )}
            </>
          )}
        </div>
      )}
      {hasSeenTheBanner && <InfoBanner />}
    </>
  );
};
