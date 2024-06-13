import { FormProvider, useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useSalesforceUserAuthEnabled } from '@bloobirds-it/hooks';
import useSWR from 'swr';

import { api } from '../../../utils/api';
import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeader,
} from '../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../context';
import styles from './styles.module.css';

interface ExtensionSettings {
  autoAssignLeads: boolean;
  autoSyncSobjects: boolean;
  autoCloseLeftBar: boolean;
  showOpportunitiesWhatsapp: boolean;
}

export default (): JSX.Element => {
  const { t } = useTranslation();
  const { useGetSettings, updateSettings, updateIsSettings } = useExtensionContext();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const accountName = settings?.account?.name;
  const defaultSettings: ExtensionSettings = {
    autoAssignLeads: settings?.user?.assignLinkedinLeads,
    autoSyncSobjects: settings?.user?.autoSyncObjectsSalesforce,
    autoCloseLeftBar: settings?.user?.autoCloseLeftBar,
    showOpportunitiesWhatsapp: settings?.user?.showOpportunityInWhatsapp,
  };
  const { mutate, saveUserSettings } = useActiveUserSettings();
  const methods = useForm({ defaultValues: defaultSettings });
  const hasSalesforce = settings?.account?.salesforceInstance;
  const isDirty = methods.formState.isDirty;
  const {
    data: salesforceUserIntegration,
  } = useSWR(`/utils/service/salesforceUsers/integration/${userId}`, url => api.get(url));
  const isSalesforceUserIntegrated = salesforceUserIntegration?.data?.found;
  const authPerUserEnabled = useSalesforceUserAuthEnabled(settings?.account?.id);

  const {
    field: { value: autoAssignLeadsValue, onChange: onAutoAssignLeadsChange },
  } = useController({
    control: methods.control,
    name: 'autoAssignLeads',
  });

  const {
    field: { value: autoSyncSobjects, onChange: onAutoSyncSobjectsChange },
  } = useController({
    control: methods.control,
    name: 'autoSyncSobjects',
  });

  const {
    field: { value: autoCloseLeftBar, onChange: onAutoCloseLeftBarChange },
  } = useController({
    control: methods.control,
    name: 'autoCloseLeftBar',
  });

  const {
    field: { value: showOpportunitiesWhatsapp, onChange: onShowOpportunitiesWhatsappChange },
  } = useController({
    control: methods.control,
    name: 'showOpportunitiesWhatsapp',
  });

  const submit = () =>
    saveUserSettings(userId, {
      assignLinkedinLeads: autoAssignLeadsValue,
      autoSyncObjectsSalesforce: autoSyncSobjects,
      autoCloseLeftBar,
      showOpportunitiesWhatsapp,
    }).then(() => {
      mutate().then(settings => {
        updateSettings(settings);
      });
      methods.reset({
        autoAssignLeads: autoAssignLeadsValue,
        autoSyncSobjects,
        autoCloseLeftBar,
        showOpportunitiesWhatsapp,
      });
    });

  const loginSalesforce = () => {
    api.get('/utils/service/salesforce/generate-user-url').then(data => {
      if (data?.data?.url) {
        window.open(data?.data?.url, '_self');
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <BubbleWindow>
        <BubbleWindowHeader color="bloobirds" backgroundColor="lightBloobirds" name="settings" />
        <BubbleWindowContent className={styles._settingsWrapper}>
          <Text uppercase={true} align="center" dataTest="navigate-profile" size="m" weight="bold">
            {t('common.settings')}
          </Text>
          <Text
            align="center"
            dataTest="navigate-profile"
            size="s"
            color="softPeanut"
            className={styles._tabName}
          >
            {accountName}
          </Text>
          <div className={styles._settingsContainer}>
            <div>
              <div className={styles._settingDescription}>
                <Text dataTest="navigate-profile" size="s" weight="bold">
                  {t('extension.card.leadAssignment')}
                </Text>
                <Text color="gray" size="xs">
                  {t('sidePeek.settings.captureLead.description')}
                </Text>
              </div>
              <div className={styles._settingsCheckbox}>
                {' '}
                <Checkbox
                  size="small"
                  checked={autoAssignLeadsValue}
                  onClick={onAutoAssignLeadsChange}
                >
                  {t('sidePeek.settings.captureLead.assignToMe')}
                </Checkbox>
              </div>
            </div>
            {hasSalesforce && (
              <>
                <div>
                  <div className={styles._settingDescription}>
                    <Text dataTest="navigate-profile" size="s" weight="bold">
                      {t('sidePeek.settings.captureLead.autoSync')}
                    </Text>
                    <Text color="gray" size="xs">
                      {t('sidePeek.settings.captureLead.autoSyncDescription')}
                    </Text>
                  </div>
                  <div className={styles._settingsCheckbox}>
                    {' '}
                    <Checkbox
                      size="small"
                      checked={autoSyncSobjects}
                      onClick={onAutoSyncSobjectsChange}
                    >
                      {t('sidePeek.settings.captureLead.autoSyncSalesforce')}
                    </Checkbox>
                  </div>
                </div>
                <div>
                  <div className={styles._settingDescription}>
                    <Text dataTest="navigate-profile" size="s" weight="bold">
                      {t('sidePeek.settings.captureLead.autoHideLeftBarSetting')}
                    </Text>
                    <Text color="gray" size="xs">
                      {t('sidePeek.settings.captureLead.autoHideLeftBarSettingDescription')}
                    </Text>
                  </div>
                  <div className={styles._settingsCheckbox}>
                    {' '}
                    <Checkbox
                      size="small"
                      checked={autoCloseLeftBar}
                      onClick={onAutoCloseLeftBarChange}
                    >
                      {t('sidePeek.settings.captureLead.autoHideLeftBarSettingCheckbox')}
                    </Checkbox>
                  </div>
                </div>
                <div>
                  <div className={styles._settingDescription}>
                    <Text dataTest="navigate-profile" size="s" weight="bold">
                      {t('sidePeek.settings.captureLead.showOpportunityInWhatsapp')}
                    </Text>
                    <Text color="gray" size="xs">
                      {t('sidePeek.settings.captureLead.showOpportunityInWhatsappDescription')}
                    </Text>
                  </div>
                  <div className={styles._settingsCheckbox}>
                    {' '}
                    <Checkbox
                      size="small"
                      checked={showOpportunitiesWhatsapp}
                      onClick={onShowOpportunitiesWhatsappChange}
                    >
                      {t('sidePeek.settings.captureLead.showOpportunityInWhatsappCheckbox')}
                    </Checkbox>
                  </div>
                </div>
              </>
            )}
            {hasSalesforce && authPerUserEnabled && salesforceUserIntegration && (
              <div>
                <div>
                  <Text size="s" weight="bold">
                    {t('sidePeek.settings.captureLead.salesforceConnection')}
                  </Text>
                  {isSalesforceUserIntegrated ? (
                    <Text color="gray" size="xs">
                      <Icon name="check" color="extraCall" />
                      {t('sidePeek.settings.captureLead.connectionSuccessful')}
                    </Text>
                  ) : (
                    <Button
                      size="medium"
                      iconLeft="salesforce"
                      onClick={loginSalesforce}
                      className={styles.button}
                    >
                      {t('sidePeek.settings.captureLead.connectSalesforceButton')}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </BubbleWindowContent>
        <BubbleWindowFooter>
          <div className={styles._settingsFooter}>
            <Button onClick={updateIsSettings} variant="secondary">
              {t('common.goBack')}
            </Button>
            <Button onClick={methods.handleSubmit(submit)} disabled={!isDirty} variant="secondary">
              {t('common.save')}
            </Button>
          </div>
        </BubbleWindowFooter>
      </BubbleWindow>
    </FormProvider>
  );
};
