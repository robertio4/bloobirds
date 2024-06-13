import React, { useEffect, useState } from 'react';
import { useActiveUser } from '../../../../hooks';
import UsersTab from '../../../../layouts/integrationLayout/usersTabTemplate';
import { CRM } from '../../../../constants/integrations';
import { useToasts } from '@bloobirds-it/flamingo-ui';
import useDebounce from '../../../../hooks/useDebounce';
import { RestApi } from '../../../../misc/api/rest';
import { api } from '@bloobirds-it/utils';

const pageOptions = [10, 25, 50];

const HubspotUsersTab = () => {
  const [fetching, handleFetching] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(true);
  const [hubspotUsers, setHubspotUsers] = useState([]);
  const [bloobirdsUsers, setBloobirdsUsers] = useState([]);
  const { activeAccount } = useActiveUser();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageOptions[0]);
  const [count, setCount] = useState(0);
  const { createToast } = useToasts();
  const [searchText, setSearchText] = useState('');
  const debounce = useDebounce(searchText, 200);

  const usersMap = {
    userName: 'firstName',
    userSurname: 'lastName',
    userMail: 'email',
    userCRMId: 'hubspotId',
    userId: 'user',
  };
  useEffect(() => setRefreshUsers(true), [page, pageSize]);
  useEffect(() => {
    if (refreshUsers && !fetching) {
      RestApi.search({
        entity: 'hubspotUsers',
        query: {
          page,
          size: pageSize,
          sort: [
            {
              field: 'firstName',
              direction: 'ASC',
            },
          ],
          accountId: activeAccount.id,
        },
      }).then(response => {
        setCount(response.page.totalElements);
        setHubspotUsers(response?._embedded.hubspotUsers);
        setRefreshUsers(false);
      });
    }
  }, [refreshUsers]);

  useEffect(() => {
    RestApi.search({
      entity: 'users',
      query: {
        size: 1000,
        accountId: activeAccount.id,
      },
    }).then(response => {
      setBloobirdsUsers(response?._embedded.users);
    });
  }, []);

  const handleResyncUsers = () => {
    handleFetching(true);
    api
      .get(`/utils/service/hubspot/users/update${pageSize ? `?pageSize=${pageSize}` : ''}`)
      .then(response => {
        if (response?.status >= 400) {
          createToast({
            message: 'There was an error fetching the users',
            type: 'error',
          });
        } else {
          handleFetching(false);
          setRefreshUsers(true);
        }
        handleFetching(false);
      });
  };
  const handleOnSelectChange = (bloobirdsId, hubspotUser) => {
    RestApi.patch({
      entity: 'hubspotUsers',
      id: hubspotUser.id,
      body: {
        user: bloobirdsId === '' ? null : `/users/${bloobirdsId}`,
      },
    });
  };
  const hubspotAccountId = () => api.get('/utils/hubspot/portalId');

  const onClickLink = async user => {
    const id = await hubspotAccountId();
    const link = `https://app.hubspot.com/settings/${id}/users/editUser/${user.hubspotUserId}`;
    window.open(link, '_blank');
  };

  useEffect(() => {
    if (debounce) {
      api
        .post('/utils/service/hubspot/users/search', { query: debounce })
        .then(res => res?.data)
        .then(response => {
          setHubspotUsers(response);
          handleFetching(false);
        });
    }
  }, [debounce]);

  return (
    <>
      {hubspotUsers && bloobirdsUsers && (
        <UsersTab
          bloobirdsUsers={bloobirdsUsers}
          handleIntegrationUsers={setHubspotUsers}
          integrationUsers={
            Array.isArray(hubspotUsers) &&
            hubspotUsers?.sort((a, b) => (a.firstName > b.firstName ? 1 : -1))
          }
          handleResyncUsers={handleResyncUsers}
          handleOnSelectChange={handleOnSelectChange}
          handleClickUser={onClickLink}
          fetching={fetching}
          sortingBy="firstName"
          crm={CRM.HUBSPOT}
          usersMap={usersMap}
          handlePage={setPage}
          handlePageSize={setPageSize}
          pageOptions={pageOptions}
          page={page}
          rowsPerPage={pageSize}
          count={count}
          searchText={searchText}
          handleSearchText={setSearchText}
        />
      )}
    </>
  );
};
export default HubspotUsersTab;
