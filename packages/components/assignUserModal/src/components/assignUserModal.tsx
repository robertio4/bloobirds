import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Callout,
  CircularBadge,
  Icon,
  Item,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useFullSalesEnabled, useUserSearch } from '@bloobirds-it/hooks';
import {
  Bobject,
  ExtensionBobject,
  SalesforceTabs,
  UseEveryBobjectType,
  User,
} from '@bloobirds-it/types';
import { isOpportunity } from '@bloobirds-it/utils';

import styles from './assignUser.module.css';
import useAssignUser from './useAssignUser';

const AssignUserModal = ({
  bobject,
  accountId,
  assigneeUser,
  onSave,
  onClose,
  useEveryBobject,
  subhomeTab,
}: {
  assigneeUser: User;
  bobject: Bobject | ExtensionBobject;
  accountId: string;
  onSave?: () => void;
  onClose?: () => void;
  useEveryBobject?: UseEveryBobjectType;
  subhomeTab?: SalesforceTabs;
}) => {
  const hasSalesConversionEnabled = useFullSalesEnabled(accountId);
  const [userSelected, setUserSelected] = useState<User>(assigneeUser);
  const { isLoading, handleAssign } = useAssignUser(bobject, accountId);
  const users = useUserSearch();
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>();
  const isBulkAction = Array.isArray(bobject);
  const sampleBobject = isBulkAction ? bobject[0] : bobject;
  const bobjectType = sampleBobject?.id?.typeName;
  const bobjectName = t(`bobjectTypes.${bobjectType?.toLowerCase()}`, {
    count: isBulkAction ? 2 : 1,
  })?.toLowerCase();

  return (
    <Modal open onClose={onClose} width={640}>
      <ModalHeader>
        <ModalTitle>{t('assignUserModal.assignAction', { bobjectName })}</ModalTitle>
      </ModalHeader>
      <div className={styles._content__wraper}>
        <div className={styles._autocomplete__wrapper}>
          <Select
            autocomplete
            width="520px"
            adornment={<Icon size={20} name="search" color="softPeanut" />}
            onChange={setUserSelected}
            value={userSelected}
            onSearch={v => setSearch(v)}
            renderDisplayValue={v => v?.name}
          >
            {users &&
              users?.users
                ?.filter(user => user?.active)
                .map(user => {
                  if (search && !user?.name?.toLowerCase().includes(search?.toLowerCase())) {
                    return null;
                  }
                  return (
                    <Item dataTest={user?.id} value={user} key={user?.id}>
                      <>
                        <CircularBadge
                          size="medium"
                          className={styles._circularBadge}
                          style={{ color: 'white', backgroundColor: user?.color || 'softGray' }}
                        >
                          {user?.shortname || 'U'}
                        </CircularBadge>
                        <div>
                          <Text color="peanut" size="m" weight="medium">
                            {user?.name}
                          </Text>
                          <Text color="softPeanut" size="m">
                            {user?.email}
                          </Text>
                        </div>
                      </>
                    </Item>
                  );
                })}
          </Select>
        </div>
        <div className={styles._info__wrapper}>
          <Callout icon="info" width="100%">
            <Text size="m">
              <span role="img" aria-label="icon-label">
                👉
              </span>{' '}
              {hasSalesConversionEnabled
                ? t('assignUserModal.callout.sales', { bobjectName })
                : t('assignUserModal.callout.noSales', {
                    bobjectName,
                    tab: isOpportunity(sampleBobject)
                      ? t('common.opportunity', { count: 2 })
                      : t('leftBar.quickFilters.delivered'),
                  })}
            </Text>
          </Callout>
        </div>
      </div>
      <ModalFooter>
        <div>
          <Button variant="clear" color="tomato" onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </div>
        <div className={styles._confirm__button}>
          <Button
            disabled={!userSelected || isLoading}
            onClick={() =>
              handleAssign(userSelected?.id, onClose, onSave, subhomeTab, useEveryBobject)
            }
          >
            {isLoading ? <Spinner name="loadingCircle" /> : t('common.assign')}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export { AssignUserModal };
