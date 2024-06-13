import React, { useEffect, useState } from 'react';

import {
  Button,
  Icon,
  Pagination,
  SearchInput,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useDebounce } from '@bloobirds-it/hooks';
import { api, keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { SearchLogs } from '../../../../../assets/svg';
import { useEntity } from '../../../../hooks';
import { useSalesforceIntegration } from '../../../../hooks/useSalesforceIntegration';
import UserTabRow from '../../../../layouts/integrationLayout/usersTabTemplate/userTabRow/userTabRow';
import styles from '../../../../layouts/integrationLayout/usersTabTemplate/usersTab.module.css';
import { RestApi } from '../../../../misc/api/rest';

const pageOptions = [10, 25, 50];

const NoResults = () => (
  <TableRow>
    <TableCell />
    <TableCell />
    <TableCell>
      <div className={styles._no_results_content}>
        <SearchLogs className={styles._no_results_content_img} />
        <Text size="xl" weight="bold" align="center" color="softPeanut">
          No Salesforce users found
        </Text>
        <Text size="m" align="center" weight="regular" color="softPeanut">
          Your search result doesn&apos;t match any user
        </Text>
      </div>
    </TableCell>
    <TableCell />
    <TableCell />
  </TableRow>
);

const SalesforceUsersTab = () => {
  const [fetching, isFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageOptions[0]);
  const bloobirdsUsers = useEntity('users')?.all();
  const [searchText, setSearchText] = useState('');
  const debounce = useDebounce(searchText, 200);

  const usersMap = {
    userName: 'salesforceUserName',
    userMail: 'salesforceUserEmail',
    userCRMId: 'salesforceUserId',
    userId: 'bloobirdsUserId',
  };

  useEffect(() => {
    if (debounce) {
      setPage(0);
    }
  }, [debounce]);

  const { data, mutate } = useSWR(
    '/utils/service/salesforceUsers/search' +
      debounce.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
    () =>
      api.post('/utils/service/salesforceUsers/search', {
        query: debounce.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      }),
    { use: [keepPreviousResponse] },
  );
  const salesforceUsers = data?.data?.users.sort((a, b) =>
    a['salesforceUserName'] > b['salesforceUserName'] ? 1 : -1,
  );
  const pagedUsers = salesforceUsers?.slice(page * pageSize, page * pageSize + pageSize);

  const handleResyncUsers = () => {
    isFetching(true);
    api
      .post(
        `/utils/service/salesforceUsers/updateUsers${pageSize ? `?pageSize=${pageSize}` : ''}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          data: {},
        },
      )
      .then(() => {
        mutate();
        isFetching(false);
      });
  };

  const handleOnSelectChange = (bloobirdsId, salesforceUser) => {
    RestApi.patch({
      entity: 'salesforceUsers',
      id: salesforceUser.id,
      body: {
        bloobirdsUserId: bloobirdsId !== '' ? bloobirdsId : null,
      },
    }).then(() => api.get('/utils/service/sfdcdatamodel/refresh'));
  };

  const { activeIntegration } = useSalesforceIntegration();
  const onClickLink = salesforceUser => {
    const link = `${activeIntegration.instanceHost}/lightning/r/User/${salesforceUser.salesforceUserId}/view`;
    window.open(link, '_blank');
  };

  return (
    <>
      {salesforceUsers && (
        <div>
          <div className={styles._header_container}>
            <div>
              <div className={styles._header}>
                <Icon name="people" size="24" />
                <Text size="l" color="peanut">
                  Salesforce users
                </Text>
                <Button
                  variant="secondary"
                  onClick={handleResyncUsers}
                  iconLeft={!fetching && 'refresh'}
                  size="small"
                  uppercase
                >
                  {fetching ? (
                    <div style={{ width: '100%' }}>
                      <Spinner size={14} name="loadingCircle" />
                    </div>
                  ) : (
                    'resync'
                  )}
                </Button>
              </div>
              <Text size="xs" color="softPeanut">
                Here you link Salesforce users to Bloobirds users. Use the resync button to check
                for deleted and recently added users in Salesforce
              </Text>
            </div>
            <div>
              <SearchInput
                placeholder="Search"
                value={searchText}
                onChange={setSearchText}
                color="softBloobirds"
              />
            </div>
          </div>
          <div className={styles._table}>
            <Table>
              <TableHead>
                <TableCell>
                  <div className={styles._users_sort}>
                    <Text size="xs" color="peanut" uppercase>
                      Salesforce user
                    </Text>
                    {/*crm !== 'Salesforce' && <Icon name={iconName} size="16" color="peanut" />*/}
                  </div>
                </TableCell>
                <TableCell>
                  <Text size="xs" color="peanut" uppercase>
                    Salesforce user email
                  </Text>
                </TableCell>
                <TableCell>
                  <Text size="xs" color="peanut" uppercase>
                    Salesforce user id
                  </Text>
                </TableCell>
                <TableCell>
                  <Text size="xs" color="peanut" uppercase>
                    bloobirds user
                  </Text>
                </TableCell>
              </TableHead>
              <TableBody>
                {pagedUsers && pagedUsers.length > 0 ? (
                  pagedUsers.map((salesforceUser, index) => (
                    <UserTabRow
                      key={`row-${index}`}
                      bloobirdsUsers={bloobirdsUsers}
                      onClickLink={onClickLink}
                      crmUser={salesforceUser}
                      handleOnSelectChange={handleOnSelectChange}
                      usersMap={usersMap}
                    />
                  ))
                ) : (
                  <NoResults />
                )}
              </TableBody>
            </Table>
            <div className={styles._pagination}>
              <Pagination
                page={page}
                rowsPerPage={pageSize}
                onChangePage={setPage}
                rowsPerPageOptions={pageOptions}
                onChangeRowsPerPage={setPageSize}
                count={salesforceUsers?.length}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SalesforceUsersTab;
