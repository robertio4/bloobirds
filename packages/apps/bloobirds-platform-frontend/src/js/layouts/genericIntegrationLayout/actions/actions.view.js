import React, { useEffect, useState } from 'react';

import { Icon, IconButton, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import useSWR, { mutate } from 'swr';

import { SearchLogs } from '../../../../assets/svg';
import { EntityCard, EntityCardItem } from '../../../components/entityList/entityCard/entityCard';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../components/entityList/entityList';
import { api } from '../../../utils/api';
import { indefiniteArticle, toTitleCase } from '../../../utils/strings.utils';
import AccountSettingsTab from '../../accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTableContainer,
} from '../../accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import styles from './actions.module.css';
import ActionsHeader from './actionsHeader';
import ActionsModal from './actionsModal/actionsModal';
import spacetime from 'spacetime';

const ActionsView = ({
  filters,
  onFilterChange,
  fetching,
  onRefreshClicked,
  actionsAvailable,
  actionsSubscribed,
  bobjectTypes,
  integrationName,
  driver,
}) => {
  const { createToast } = useToasts();
  const [values, setValues] = useState();
  const [showActionModal, setShowActionModal] = useState(false);

  useEffect(() => {
    if (!showActionModal) setValues({});
  }, [showActionModal]);

  const handleDelete = action => {
    const url = `/integrations/manager/drivers/${driver}/actions`;
    useSWR(
      url,
      api.delete(url, { data: action }).then(() => {
        createToast({ type: 'success', message: 'Action deleted successfully' });
        mutate(`${url}/subscribed`);
      }),
    );
  };

  const actionsReduced = actionsAvailable?.reduce(
    (array, key) => [...array, { value: key, label: key }],
    [],
  );

  return (
    <AccountSettingsTab>
      <ActionsHeader
        filters={filters}
        onFilterChange={onFilterChange}
        onRefreshClicked={onRefreshClicked}
        fetching={fetching}
        setShowActionModal={setShowActionModal}
        actionsAvailable={actionsAvailable}
        bobjectTypes={bobjectTypes}
        integrationName={integrationName}
      />
      <AccountSettingsTabContent>
        <AccountSettingsTableContainer>
          <div className={styles._content_container}>
            <>
              {actionsSubscribed?.length > 0 ? (
                <>
                  <EntityList>
                    <>
                      <EntityListHeader className={styles._table__header}>
                        <EntityHeaderItem label="Rule" />
                        <EntityHeaderItem label="Author" />
                        <EntityHeaderItem label="Date" />
                        <EntityHeaderItem label="Status" className={styles._status__header} />
                      </EntityListHeader>
                      {actionsSubscribed?.map(action => {
                        const rules = action?.bloobirdsTrigger;
                        const entity = rules?.split(':')[0];
                        const event = rules?.split(':')[1];
                        const genericAction = action?.actionName;
                        const parsedDate = new Date(action?.creationDatetime);
                        const stringDate = spacetime(parsedDate).format('nice');

                        return (
                          <>
                            <EntityCard>
                              <EntityCardItem className={styles._table__card}>
                                <div className={styles.trigger}>
                                  <Text size="s" color="softPeanut">
                                    When {indefiniteArticle(entity)}{' '}
                                  </Text>
                                  <Text size="s" color="bloobirds" weight="bold">
                                    {entity}
                                  </Text>
                                  <Text size="s" color="softPeanut">
                                    is
                                  </Text>
                                  <Text size="s" color="peanut">
                                    {`${toTitleCase(event)}d`}
                                  </Text>
                                  <Text size="s" color="softPeanut">
                                    at Bloobirds
                                  </Text>
                                </div>
                                <Icon
                                  name="arrowRight"
                                  color="verySoftPeanut"
                                  className={styles._connection__arrow}
                                />
                                <div className={styles._content_action}>
                                  <Text size="s" color="peanut">
                                    {toTitleCase(genericAction)}
                                  </Text>
                                  <Text size="s" color="softPeanut">
                                    at {integrationName}
                                  </Text>
                                </div>
                              </EntityCardItem>
                              <EntityCardItem>
                                <div className={styles.action}>
                                  <Text size="s">{action.author}</Text>
                                </div>
                              </EntityCardItem>
                              <EntityCardItem>
                                <div className={styles.action}>
                                  <Text size="s">{stringDate}</Text>
                                </div>
                              </EntityCardItem>
                              <EntityCardItem>
                                <IconButton name="trashFull" onClick={() => handleDelete(action)} />
                              </EntityCardItem>
                            </EntityCard>
                          </>
                        );
                      })}
                    </>
                  </EntityList>
                </>
              ) : (
                <div className={styles._no_results__contents}>
                  <SearchLogs className={styles._no_results__img} />
                  <Text size="xl" weight="bold" align="center" color="softPeanut">
                    Still no actions have been created
                  </Text>
                  <Text size="m" align="center" color="softPeanut">
                    Click the Configure a new action button to get started.
                  </Text>
                </div>
              )}
              {showActionModal && (
                <ActionsModal
                  isModalOpen={setShowActionModal}
                  step={values}
                  actionsAvailable={actionsReduced}
                  driver={driver}
                  integrationName={integrationName}
                />
              )}
            </>
          </div>
        </AccountSettingsTableContainer>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default ActionsView;
