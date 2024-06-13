import React, { useEffect, useState } from 'react';

import { Button, Checkbox, Spinner, Text } from '@bloobirds-it/flamingo-ui';

import { LogoSvg } from '../../../../assets/svg';
import styles_sync from './outbound/syncLeadSettings/syncLeadSyncSettings.module.css';
import SyncSettingsCard from './syncSettingsCard/syncSettingsCard';
import styles from './syncSettingsTab.module.css';

const SyncSettingsTab = props => {
  const iAppClient = props.iAppClient;
  const integration = props.integration;
  const fetchIAppData = props.fetchIAppData;
  const [loaded, setLoaded] = useState(false);
  const [enabledState, setEnabledState] = useState({});
  const [sections, setSections] = useState([
    {
      name: 'Sync Leads',
      fieldMappingKey: 'crmcontact-bblead',
      blueprints: {
        'sync-crm-contacts': {
          setupNode: 'filter',
          name: `Sync contacts from ${integration.name} to Bloobirds leads`,
        },
        'sync-bb-contacts': {
          setupNode: 'filter',
          name: `Sync leads from Bloobirds to ${integration.name} contacts`,
        },
      },
    },
    {
      name: 'Sync Companies',
      fieldMappingKey: 'crmcompany-bbcompany',
      blueprints: {
        'sync-crm-companies': {
          setupNode: 'filter',
          name: `Sync companies from ${integration.name} to Bloobirds`,
        },
        'sync-bb-companies': {
          setupNode: 'filter',
          name: `Sync companies from Bloobirds to ${integration.name}`,
        },
      },
    },
    {
      name: 'Sync Opportunities',
      fieldMappingKey: 'deals-to-bb-deals',
      blueprints: {
        'sync-crm-deal-to-bb': {
          //setupNode: 'filter',
          name: `Sync opportunities from ${integration.name} to Bloobirds`,
        },
        'sync-bb-deal-to-crm': {
          //setupNode: 'filter',
          name: `Sync opportunities from Bloobirds to ${integration.name}`,
        },
      },
    },
    {
      name: 'Sync Activities',
      fieldMappingKey: 'activities-to-bb-activities',
      blueprints: {
        'sync-crm-activity': {
          setupNode: 'filter',
          name: `Sync activities from ${integration.name} to Bloobirds`,
        },
        'sync-bb-activity': {
          setupNode: 'filter',
          name: `Sync activities from Bloobirds to ${integration.name}`,
        },
      },
    },
  ]);

  useEffect(() => {
    (async () => {
      if (!loaded) {
        const tmpSections = sections.filter(section => Object.keys(section.blueprints).length > 0);
        const flowInstancePromises = [];

        for (const sectionIdx in sections) {
          const section = sections[sectionIdx];
          for (const flowKey in section.blueprints) {
            flowInstancePromises.push(
              iAppClient
                .flowInstance({
                  integrationKey: integration.key,
                  flowKey: flowKey,
                })
                .get()
                .then(flowInstance => {
                  if (flowInstance) {
                    sections[sectionIdx].blueprints[
                      flowKey
                    ].instanceEnabled = !!flowInstance.enabled;
                  }
                }),
            );
          }
        }
        Promise.all(flowInstancePromises).then(async () => {
          await setSections(tmpSections);
          setLoaded(true);
        });
      }
    })();
  });
  if (loaded) {
    return (
      <div className={styles._container}>
        {sections.map(function (section) {
          return (
            <SyncSettingsCard
              icon="personAdd"
              isDisabled={false}
              key={section.name}
              title={section.name}
            >
              <>
                {' '}
                <div className={styles_sync._children_iApp_container}>
                  <Text color="peanut" size="m" weight="bold">
                    {section.description}
                    <Button
                      iconLeft={'settings'}
                      variant="secondary"
                      size="small"
                      uppercase
                      onClick={() => {
                        iAppClient
                          .fieldMappingInstance({
                            integrationKey: integration.key,
                            fieldMappingKey: section.fieldMappingKey,
                            autoCreate: true,
                          })
                          .openConfiguration();
                      }}
                    >
                      {' '}
                      Configure Field Mapping
                    </Button>
                  </Text>

                  {Object.keys(section.blueprints).map(function (flowKey) {
                    return (
                      <div className={styles_sync._checkBox_iApp} key={flowKey}>
                        <Checkbox
                          defaultChecked={section.blueprints[flowKey].instanceEnabled}
                          onClick={async value => {
                            const flowInstanceAccessor = await iAppClient.flowInstance({
                              integrationKey: integration.key,
                              flowKey: flowKey,
                              autoCreate: true,
                            });
                            const tmpEnabledState = Object.assign({}, enabledState);
                            tmpEnabledState[flowKey] = value;
                            await setEnabledState(tmpEnabledState);
                            await flowInstanceAccessor.get();
                            flowInstanceAccessor.patch({
                              enabled: value,
                            });
                          }}
                          expand
                        >
                          {' '}
                          {section.blueprints[flowKey].name}{' '}
                        </Checkbox>
                        {loaded && section.blueprints[flowKey].setupNode && (
                          <Button
                            iconLeft={'settings'}
                            variant="secondary"
                            size="small"
                            uppercase
                            disabled={(() => {
                              return !(flowKey in enabledState
                                ? enabledState[flowKey]
                                : section.blueprints[flowKey].instanceEnabled);
                            })()}
                            onClick={async () => {
                              await iAppClient
                                .flowInstance({
                                  integrationKey: integration.key,
                                  flowKey: flowKey,
                                  autoCreate: true,
                                })
                                .openConfiguration({
                                  nodeKey: section.blueprints[flowKey].setupNode,
                                  autoCreate: true,
                                });
                            }}
                          >
                            Configure
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            </SyncSettingsCard>
          );
        })}
        <SyncSettingsCard
          icon="personAdd"
          isDisabled={false}
          key={integration.key}
          title={integration.name + ' Account'}
        >
          <div className={styles_sync._children_iApp_container}>
            Using Bloobirds App within {integration.name}
            <div className={styles_sync._checkBox_iApp}>
              <Button
                iconLeft={'settings'}
                variant="primary"
                color="bloobirds"
                onClick={async () => {
                  iAppClient.connection(integration.connection.id).refresh();
                }}
              >
                Refresh Connection with {integration.name}
              </Button>
              <Button
                iconLeft={'settings'}
                variant="secondary"
                uppercase
                onClick={async () => {
                  await iAppClient.connection(integration.connection.id).archive();
                  fetchIAppData();
                }}
              >
                Disconnect
              </Button>
            </div>
          </div>
        </SyncSettingsCard>
      </div>
    );
  } else {
    return (
      <div className={styles.loader}>
        <LogoSvg fill="var(--bloobirds)" width={50} />
        <div className={styles.spinner}>
          <Spinner />
        </div>
      </div>
    );
  }
};

export default SyncSettingsTab;
