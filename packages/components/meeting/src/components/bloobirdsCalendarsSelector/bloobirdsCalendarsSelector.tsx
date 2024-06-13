import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, Dropdown, Icon, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { useFullSalesEnabled, useUserSearch } from '@bloobirds-it/hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE, User } from '@bloobirds-it/types';

import { useCalendar } from '../../hooks/useCalendar';
import styles from '../calendarsSelector/calendarsSelector.module.css';
import CalendarContext from './../../meetingModal/context';

export const BloobirdsCalendarsSelector = ({
  anchor,
}: {
  anchor?: (x: boolean, y: React.Dispatch<React.SetStateAction<boolean>>) => JSX.Element;
}) => {
  const {
    accountId,
    userId,
    usersSelected,
    setUsersSelected,
    accountExecutivesSelected,
    setAccountExecutivesSelected,
  } = useCalendar();
  const { t } = useTranslation('translation', {
    keyPrefix: 'meetingModal.bloobirdsCalendarSelector',
  });
  const { ref, visible, setVisible } = useVisible();
  const { dataModel } = useContext(CalendarContext);
  const isFullSalesEnabled = useFullSalesEnabled(accountId);
  const userResponse = useUserSearch();
  const users = userResponse?.users;
  const sortedUsers = users?.reduce((acc: User[], user) => {
    if (user?.id === userId) {
      return [user, ...acc];
    }
    return [...acc, user];
  }, []);
  const activityAccountExecutiveField = dataModel?.findValuesByFieldLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE,
  );
  const totalCalendarsSelected = [...accountExecutivesSelected, ...usersSelected];
  const accountExecutivePicklistValues = activityAccountExecutiveField?.filter(ae => ae?.enabled);
  const handleSelectUser = (user: any, value: boolean) => {
    if (value) {
      setUsersSelected((curr: any) => [...curr, user?.id]);
    } else {
      setUsersSelected(usersSelected?.filter((id: string) => id !== user?.id));
    }
  };

  const handleSelectAccountExecutive = (ae: any, value: boolean) => {
    if (value) {
      setAccountExecutivesSelected((curr: any) => [...curr, ae?.id]);
    } else {
      setAccountExecutivesSelected(
        accountExecutivesSelected?.filter((id: string) => id !== ae?.id),
      );
    }
  };

  return (
    <Dropdown
      anchor={
        anchor ? (
          anchor(visible, setVisible)
        ) : (
          <div className={styles._select_anchor} onClick={() => setVisible(true)}>
            <span style={{ display: 'flex' }}>
              <span className={styles._icon_container}>
                <Icon name="calendar" size={12} color="softPeanut" />
              </span>
              <Text size="xs" color="peanut" className={styles._select_text}>
                {totalCalendarsSelected?.length} {t('calendar').toLowerCase()}
                {totalCalendarsSelected?.length === 1 ? '' : 's'} {t('selected').toLowerCase()}
              </Text>
            </span>
            <span style={{ marginRight: '4px' }}>
              <Icon name="chevronDown" size={12} color="softPeanut" />
            </span>
          </div>
        )
      }
      visible={visible}
      ref={ref}
    >
      <div className={styles._calendars_container}>
        {users?.length > 0 && (
          <>
            <Text size="m" color="peanut">
              {t('users')}
            </Text>
            <div className={styles._calendars_list}>
              {sortedUsers?.map((user: User) => {
                const isSelfUser = userId === user?.id;
                return (
                  <Checkbox
                    key={user?.id}
                    size="small"
                    disabled={isSelfUser}
                    checked={!!usersSelected?.find((id: string) => id === user?.id)}
                    onClick={v => handleSelectUser(user, v)}
                  >
                    {user?.name} {isSelfUser && `(${t('you')})`}
                  </Checkbox>
                );
              })}
            </div>
          </>
        )}
        {!isFullSalesEnabled && accountExecutivePicklistValues?.length > 0 && (
          <>
            <Text size="m" color="peanut">
              {t('accountExecutives')}
            </Text>
            <div className={styles._calendars_list}>
              {accountExecutivePicklistValues?.map((ae: any) => (
                <Checkbox
                  key={ae?.id}
                  size="small"
                  checked={!!accountExecutivesSelected?.find((id: string) => id === ae?.id)}
                  onClick={v => handleSelectAccountExecutive(ae, v)}
                >
                  {ae?.value}
                </Checkbox>
              ))}
            </div>
          </>
        )}
      </div>
    </Dropdown>
  );
};
