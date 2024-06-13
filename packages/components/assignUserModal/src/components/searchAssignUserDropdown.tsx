import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Callout,
  CircularBadge,
  Dropdown,
  Item,
  Select,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useFullSalesEnabled, useUserSearch } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  SalesforceTabs,
  User,
} from '@bloobirds-it/types';
import { api, getValueFromLogicRole, isOpportunity } from '@bloobirds-it/utils';

import styles from './assignUser.module.css';
import useAssignUser from './useAssignUser';

export interface AssignUserViewDropdownActionProps {
  bobject: Bobject;
  accountId: string;
  assigneeUser: User;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  ref: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  onSave: () => void;
  showCallout: boolean;
  subhomeTab?: SalesforceTabs;
  assignReferencedBobject?: boolean;
}

export const SearchAssignUserDropdown = React.forwardRef<
  HTMLInputElement,
  AssignUserViewDropdownActionProps
>(
  (
    {
      bobject,
      accountId,
      assigneeUser,
      visible,
      setVisible,
      children,
      onSave,
      showCallout,
      subhomeTab,
      assignReferencedBobject,
    },
    ref,
  ) => {
    const { isLoading, handleAssign } = useAssignUser(bobject, accountId);
    const { t } = useTranslation();
    const [userSelected, setUserSelected] = useState<User>(assigneeUser);
    const [search, setSearch] = useState<string>();
    const users = useUserSearch();
    const hasSalesConversionEnabled = useFullSalesEnabled(accountId);
    const isBulkAction = Array.isArray(bobject);
    const sampleBobject = isBulkAction ? bobject[0] : bobject;
    const bobjectType = sampleBobject?.id?.typeName;
    const bobjectName = t(`bobjectTypes.${bobjectType?.toLowerCase()}`, {
      count: isBulkAction ? 2 : 1,
    })?.toLowerCase();
    const handleChanges = () => {
      handleAssign(userSelected?.id, () => setVisible(false), onSave, subhomeTab);

      if (assignReferencedBobject && bobjectType == BobjectTypes.Activity) {
        const activityLead = getValueFromLogicRole(sampleBobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
        const activityCompany = getValueFromLogicRole(
          sampleBobject,
          ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY,
        );
        const referencedBobject = activityLead || activityCompany;
        if (referencedBobject) {
          api.patch(`/bobjects/${referencedBobject}/raw`, {
            contents: {
              [activityLead
                ? LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO
                : COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userSelected?.id,
            },
            params: {},
          });
        }
      }
    };

    const handlePreventPropagation = event => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Dropdown visible={visible} width={300} anchor={children}>
        <div onClick={handlePreventPropagation}>
          <div className={styles._dropdown_content__wraper}>
            <Text size="xs" color="peanut" className={styles._title_content__wraper}>
              {t('assignUserModal.dropdown.title')}
            </Text>
            <div className={styles._dropdown_autocomplete__wrapper}>
              <Select
                autocomplete
                width="268px"
                onChange={setUserSelected}
                value={userSelected}
                onSearch={v => setSearch(v)}
                renderDisplayValue={v => v?.name}
                placeholder={t('assignUserModal.dropdown.placeholder')}
                size={'small'}
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
                              size="small"
                              className={styles._circularBadge}
                              style={{ color: 'white', backgroundColor: user?.color || 'softGray' }}
                            >
                              {user?.shortname || 'U'}
                            </CircularBadge>
                            <div>
                              <Text color="peanut" size="xs" weight="medium">
                                {user?.name}
                              </Text>
                            </div>
                          </>
                        </Item>
                      );
                    })}
              </Select>
            </div>
            {showCallout && (
              <div className={styles._info__wrapper}>
                <Callout icon="info" width="100%">
                  <Text size="xs">
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
            )}
          </div>
          <div className={styles._dropdown_button_wrapper}>
            <Button
              variant="clear"
              color="extraMeeting"
              uppercase={false}
              onClick={() => setVisible(false)}
              size="small"
            >
              Cancel
            </Button>
            <Button
              disabled={!userSelected || isLoading}
              onClick={handleChanges}
              uppercase={false}
              size="small"
            >
              {isLoading ? <Spinner name="loadingCircle" /> : t('common.assign')}
            </Button>
          </div>
        </div>
      </Dropdown>
    );
  },
);
