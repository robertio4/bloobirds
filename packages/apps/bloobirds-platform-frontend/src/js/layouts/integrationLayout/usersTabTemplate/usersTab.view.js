import React from 'react';

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
import PropTypes from 'prop-types';

import { SearchLogs } from '../../../../assets/svg';
import { CRM_DISPLAY_NAME } from '../../../constants/integrations';
import UserTabRow from './userTabRow/userTabRow';
import styles from './usersTab.module.css';

const UsersTab = ({
  bloobirdsUsers,
  integrationUsers,
  handleResync,
  handleOnSelectChange,
  isDescending,
  descending,
  iconName,
  fetching,
  handleClickUser,
  crm,
  usersMap,
  handlePage,
  handlePageSize,
  pageOptions,
  page,
  rowsPerPage,
  count,
  searchText,
  handleSearchText,
}) => {
  const displayCrm = CRM_DISPLAY_NAME[crm.toUpperCase()];

  const handleSearchChange = value => {
    if (value === '') {
      handleResync(true);
    }
    handleSearchText(value);
  };

  const NoResults = () => (
    <TableRow>
      <TableCell />
      <TableCell />
      <TableCell>
        <div className={styles._no_results_content}>
          <SearchLogs className={styles._no_results_content_img} />
          <Text size="xl" weight="bold" align="center" color="softPeanut">
            No {displayCrm} users found
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

  return (
    <div>
      <div className={styles._header_container}>
        <div>
          <div className={styles._header}>
            <Icon name="people" size="24" />
            <Text size="l" color="peanut">
              {displayCrm} users
            </Text>
            <Button
              variant="secondary"
              onClick={handleResync}
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
            Here you link {displayCrm} users to Bloobirds users. Use the resync button to check for
            deleted and recently added users in {displayCrm}
          </Text>
        </div>
        <div>
          <SearchInput
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
            color="softBloobirds"
          />
        </div>
      </div>
      <div className={styles._table}>
        <Table>
          <TableHead>
            <TableCell>
              <div className={styles._users_sort} onClick={() => isDescending(!descending)}>
                <Text size="xs" color="peanut" uppercase>
                  {displayCrm} user
                </Text>
                <Icon name={iconName} size="16" color="peanut" />
              </div>
            </TableCell>
            <TableCell>
              <Text size="xs" color="peanut" uppercase>
                {displayCrm} user email
              </Text>
            </TableCell>
            <TableCell>
              <Text size="xs" color="peanut" uppercase>
                {displayCrm} user id
              </Text>
            </TableCell>
            <TableCell>
              <Text size="xs" color="peanut" uppercase>
                bloobirds user
              </Text>
            </TableCell>
          </TableHead>
          <TableBody>
            {integrationUsers && integrationUsers.length > 0 ? (
              integrationUsers.map((salesforceUser, index) => (
                <UserTabRow
                  key={`row-${index}`}
                  bloobirdsUsers={bloobirdsUsers}
                  onClickLink={handleClickUser}
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
            rowsPerPage={rowsPerPage}
            onChangePage={handlePage}
            rowsPerPageOptions={pageOptions}
            onChangeRowsPerPage={handlePageSize}
            count={count}
          />
        </div>
      </div>
    </div>
  );
};

UsersTab.propTypes = {
  bloobirdsUsers: PropTypes.object,
  descending: PropTypes.bool,
  handleOnSelectChange: PropTypes.func,
  handleResync: PropTypes.func,
  iconName: PropTypes.string,
  integrationUsers: PropTypes.object,
  isDescending: PropTypes.func,
};
export default UsersTab;
