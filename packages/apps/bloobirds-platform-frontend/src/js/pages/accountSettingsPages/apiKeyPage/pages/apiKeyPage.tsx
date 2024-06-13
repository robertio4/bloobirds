import React from 'react';

import { Button, Skeleton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';

import { SearchLogs } from '../../../../../assets/svg';
import useModalVisibility from '../../../../hooks/useModalVisibility';
import AccountSettingsLayout from '../../../../layouts/accountSettingsLayout';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { ApiKeyCard } from '../components/apiKeyCard/apiKeyCard';
import { GenerateApiKeyModal } from '../components/generateApiKeyModal/generateApiKeyModal';
import { ApiKey, useApiKeys } from '../hooks/useApiKeys';
import styles from './apiKeyPage.module.css';

export const ApiKeyPage = () => {
  const { isOpen, openModal, closeModal } = useModalVisibility('apiKeys');
  const { keys } = useApiKeys();
  const notAbleToCreateKeys = keys?.length >= 3;
  return (
    <AccountSettingsLayout
      title={'API Keys'}
      subtitle={undefined}
      actionChildren={
        <Button
          variant="clear"
          iconLeft="externalLink"
          uppercase={false}
          color="bloobirds"
          onClick={() => {
            window.open('https://api-docs.bloobirds.com', '_blank');
          }}
        >
          See our API docs here
        </Button>
      }
    >
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="link" color={undefined}>
              Create / Manage API keys
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              Generate your api keys to connect Bloobirds with other platforms
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
          <AccountSettingsTabHeaderRight>
            <Tooltip
              title={notAbleToCreateKeys && "You've reached the max amount of API keys available"}
              position="top"
            >
              <Button onClick={openModal} disabled={notAbleToCreateKeys}>
                New Api Key
              </Button>
            </Tooltip>
          </AccountSettingsTabHeaderRight>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            {keys ? (
              <>
                {keys.length > 0 ? (
                  <div className={styles.keysContainer}>
                    {keys?.map((key: ApiKey, index: number) => (
                      <ApiKeyCard apiKey={key} key={index} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.noResultsContents}>
                    <SearchLogs className={styles.noResultsImg} />
                    <Text size="xl" weight="bold" align="center" color="softPeanut">
                      No Api Keys generated yet
                    </Text>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.skeletonContainer}>
                <Skeleton variant="rect" width="1000px" height="80px" />
                <Skeleton variant="rect" width="1000px" height="80px" />
                <Skeleton variant="rect" width="1000px" height="80px" />
                <Skeleton variant="rect" width="1000px" height="80px" />
              </div>
            )}
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      {isOpen && <GenerateApiKeyModal onClose={closeModal} apiKey={undefined} />}
    </AccountSettingsLayout>
  );
};
