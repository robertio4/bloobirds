import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon, Input, Spinner, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { useDataModel, useUserSearch } from '@bloobirds-it/hooks';
import { User } from '@bloobirds-it/types';

import styles from './assignedToSelector.module.css';

interface UserOptionsProps {
  filteredUsers: User[];
  handleOnCardClick: (userId) => void;
}
const UserOptions = ({ filteredUsers, handleOnCardClick }: UserOptionsProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'bobjects.assignToSelector.userOptions',
  });

  return (
    <div className={styles.results}>
      {filteredUsers?.length > 0 ? (
        filteredUsers?.map(user => {
          if (user && user?.id) {
            return (
              <div
                key={user?.id}
                className={styles.result_row}
                onClick={() => {
                  handleOnCardClick(user?.id);
                }}
              >
                <Text size="s" color="peanut" weight="medium">
                  {user?.name || t('unnamed')}
                </Text>
              </div>
            );
          }
        })
      ) : (
        <div className={styles.noResultFound}>
          <Icon name="searchNone" size={32} color="softPeanut" />
          <div className={styles.text}>
            <Text color="softPeanut" size="s" align="center">
              {t('noResultsTitle')}
            </Text>
            <Text color="softPeanut" size="s" align="center">
              {t('noResultsSubtitle')}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};

export const AssignedToSelector = ({
  assignedToId,
  updateAssignedTo,
}: {
  assignedToId: string;
  updateAssignedTo?: (assignedToId: string) => void;
}) => {
  const { users } = useUserSearch() || {};
  const dataModel = useDataModel();
  const assignedTo = dataModel && dataModel.findValueById(assignedToId);
  const userName = assignedTo?.name;
  const { t } = useTranslation();

  const { visible, ref, setVisible } = useVisible(false);
  const [searchValue, setSearchValue] = useState<string>('');

  function handleOnCardClick(userId: string) {
    setSearchValue('');
    updateAssignedTo(userId);
    setVisible(false);
  }

  return (
    <Dropdown
      width={323}
      ref={ref}
      visible={visible}
      zIndex={20000}
      anchor={
        <span onClick={() => setVisible(!visible)} className={styles.link_button}>
          <Text size="xs" color="bloobirds" weight="regular">
            {userName}
          </Text>
        </span>
      }
    >
      <div className={styles.content}>
        <Input
          autoFocus
          width="100%"
          placeholder={t('common.search')}
          onChange={setSearchValue}
          className={styles.input}
        />
        {users ? (
          <UserOptions
            filteredUsers={users?.filter(user =>
              user?.name?.toLowerCase()?.includes(searchValue.toLowerCase()),
            )}
            handleOnCardClick={handleOnCardClick}
          />
        ) : (
          <Spinner name="loadingCircle" />
        )}
      </div>
    </Dropdown>
  );
};
