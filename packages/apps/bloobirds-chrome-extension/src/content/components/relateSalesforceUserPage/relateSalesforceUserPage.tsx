import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Item, Select, Spinner, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { useSalesforceDataModel, useSalesforceUserAuthEnabled } from '@bloobirds-it/hooks';
import { SalesforceDataModelResponse } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

import NoContext from '../../../assets/noContext.png?base64';
import { BubbleWindow, BubbleWindowContent } from '../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../context';
import styles from './relateSalesforceUserPage.module.css';

export const RelateSalesforceUserPage = ({ onSave }: { onSave: () => void }) => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const username = settings?.user?.name;
  const sfdcDataModel: SalesforceDataModelResponse = useSalesforceDataModel();
  const salesforceUsers = sfdcDataModel?.salesforceUsers;
  const { createToast } = useToasts();
  const [selectedSalesforceId, setSelectedSalesforceId] = useState<string>(
    sfdcDataModel?.salesforceUsers?.find(u => u?.salesforceUserEmail === settings?.user?.email)
      ?.salesforceUserId,
  );
  const [forceManualSync, setForceManualSync] = useState<boolean>(false);
  const [refresh, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const authPerUserEnabled = useSalesforceUserAuthEnabled(settings?.account?.id);

  const { t } = useTranslation('translation', {
    keyPrefix: 'extension.salesforcePages.relatedSalesforceUserPage',
  });

  useEffect(() => {
    const possibleMatchUser = sfdcDataModel?.salesforceUsers?.find(
      u => u?.salesforceUserEmail === settings?.user?.email,
    );
    if (possibleMatchUser) {
      setSelectedSalesforceId(possibleMatchUser?.salesforceUserId);
    }
  }, [sfdcDataModel]);

  const handleRefreshDataModel = () => {
    setRefreshing(true);
    api.get<SalesforceDataModelResponse>('/utils/service/sfdcdatamodel/refresh').then(() => {
      sfdcDataModel?.mutate();
      setRefreshing(false);
    });
  };

  const saveSalesforceUser = () => {
    setLoading(true);
    api
      .patch(`/utils/service/salesforceUsers/${selectedSalesforceId}/${settings?.user?.id}`, {})
      .then(async () => {
        await api.get<SalesforceDataModelResponse>('/utils/service/sfdcdatamodel/refresh');
        if (onSave) {
          onSave();
        }
        createToast({
          message: t('toast.success'),
          type: 'success',
        });
        setLoading(false);
      })
      .catch(() => {
        createToast({
          message: t('toast.error'),
          type: 'error',
        });
        setLoading(false);
      });
  };

  const loginSalesforce = () => {
    api.get('/utils/service/salesforce/generate-user-url').then(data => {
      if (data?.data?.url) {
        window.open(data?.data?.url, '_self');
      }
    });
  };

  return (
    <BubbleWindow height={594}>
      <BubbleWindowContent className={styles.container}>
        <div className={styles.title}>
          <Text size="l" weight="medium">
            {t('welcome', { name: username })}
          </Text>
        </div>
        <div className={styles.content}>
          <img src={NoContext} width={200} alt="Bloobirds" className={styles.img} />
          <Text
            size="m"
            color="bloobirds"
            className={styles.title_text}
            align="center"
            weight="medium"
          >
            {t('linkSalesforce')}
          </Text>
          {authPerUserEnabled && !forceManualSync ? (
            <div className={styles.button_container}>
              <Button iconLeft="salesforce" className={styles.button} onClick={loginSalesforce}>
                {t('loginToSF')}
              </Button>
              <Text size="xxs" color="softPeanut" align="center" className={styles.force_text}>
                {t('notAbleToSignIn')}
                <span onClick={() => setForceManualSync(true)} style={{ display: 'inline' }}>
                  <Text
                    decoration="underline"
                    size="xxs"
                    color="peanut"
                    className={styles.force_text_link}
                  >
                    {t('clickHere')}
                  </Text>
                </span>
              </Text>
            </div>
          ) : (
            <>
              {refresh ? (
                <div className={styles.spinner}>
                  <Spinner name="loadingCircle" color="bloobirds" />
                </div>
              ) : (
                <Select
                  value={selectedSalesforceId}
                  placeholder={t('SFDCUserPlaceholder')}
                  onChange={setSelectedSalesforceId}
                  className={styles.select}
                  autocomplete
                >
                  {salesforceUsers &&
                    Array.isArray(salesforceUsers) &&
                    salesforceUsers?.map(sfdcUser => (
                      <Item
                        label={sfdcUser?.salesforceUserName}
                        value={sfdcUser?.salesforceUserId}
                        key={sfdcUser?.salesforceUserId}
                      >
                        {sfdcUser?.salesforceUserName}
                      </Item>
                    ))}
                </Select>
              )}
              <Button className={styles.button} onClick={saveSalesforceUser} disabled={loading}>
                {loading ? <Spinner name="loadingCircle" color="bloobirds" /> : t('continue')}
              </Button>
            </>
          )}
          <Text color="softPeanut" size="xs" align="center" className={styles.info_text}>
            {t('linkExplanation')}
            <a color="var(--bloobirds)" onClick={handleRefreshDataModel}>
              {t('refreshHere')}
            </a>
          </Text>
        </div>
      </BubbleWindowContent>
    </BubbleWindow>
  );
};
