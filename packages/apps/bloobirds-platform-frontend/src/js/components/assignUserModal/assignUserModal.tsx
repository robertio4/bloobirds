import React, { useState } from 'react';

import {
  Button,
  Callout,
  CircularBadge,
  Icon,
  Item,
  Modal,
  ModalFooter,
  Select,
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { useSelectAll } from '@bloobirds-it/hooks';
import { Bobject, BobjectTypes, PluralBobjectTypes, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { isObject } from 'lodash';

import { useCompany, useEntity, useLeads, useOpportunity } from '../../hooks';
import useAssignUser from '../../hooks/useAssignUser';
import { useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import { UserObject } from '../../typings/user';
import { api } from '../../utils/api';
import { isCompany, isLead, isOpportunity } from '../../utils/bobjects.utils';
import { useBulkActionsFeedbackModal } from '../bobjectTable/bulkActionsPanel/modals/feedbackModal/useBulkActionsFeedbackModal';
import styles from './assignUserModal.module.css';

const AssignUserModal = ({
  onSave = () => {},
  isQueuedBulk = false,
}: {
  onSave?: () => void;
  isQueuedBulk?: { query: any; totalItems: number } | boolean;
}) => {
  const hasSalesEnabled = useFullSalesEnabled();
  const [userSelected, setUserSelected] = useState<UserObject>();
  const { createToast } = useToasts();
  const { closeAssignUserModal, bobject } = useAssignUser();
  const { toggleModalVisibility } = useBulkActionsFeedbackModal();
  const { updateOpportunity, updateOpportunities } = useOpportunity('assign-user');
  const { updateCompany, updateCompanies } = useCompany('assign-user');
  const { patchLead, patchLeads } = useLeads('assign-user');
  const users = useEntity('users');
  const [isLoading, setIsLoading] = useState<boolean>();
  const [search, setSearch] = useState<string>();
  const isBulkAction = Array.isArray(bobject);
  const sampleBobject = isBulkAction ? bobject[0] : bobject;
  const { resetSelectedItems } = useSelectAll();

  const bobjectTypeName = () => {
    if (isCompany(sampleBobject)) {
      return {
        singular: 'company',
        plural: PluralBobjectTypes.Company.toLowerCase(),
      };
    }
    if (isLead(sampleBobject)) {
      return {
        singular: 'lead',
        plural: PluralBobjectTypes.Lead.toLowerCase(),
      };
    }
    if (isOpportunity(sampleBobject)) {
      return {
        singular: 'opportunity',
        plural: PluralBobjectTypes.Opportunity.toLowerCase(),
      };
    }
    return {
      singular: '',
      plural: '',
    };
  };

  const updateSingleBobject = (singleBobject: Bobject, body: any) => {
    if (isCompany(singleBobject)) {
      return updateCompany(singleBobject?.id?.objectId, body);
    } else if (isOpportunity(singleBobject)) {
      return updateOpportunity(singleBobject?.id?.objectId, body);
    }
    return patchLead(singleBobject?.id?.objectId, body);
  };

  const updateBulkObjects = (data: object) => {
    if (isCompany(sampleBobject)) {
      return updateCompanies(data);
    } else if (isOpportunity(sampleBobject)) {
      return updateOpportunities(data);
    }
    return patchLeads(data);
  };

  const handleAssign = () => {
    setIsLoading(true);
    const bobjectType = sampleBobject?.id?.typeName as
      | BobjectTypes.Company
      | BobjectTypes.Lead
      | BobjectTypes.Opportunity;
    if (isQueuedBulk) {
      const allItems = isObject(isQueuedBulk);
      api
        .post(`/bobjects/bulkAction/createBulk${allItems ? 'ByQuery' : ''}`, {
          importName: `Update Assigned To in ${
            allItems ? isQueuedBulk?.totalItems : bobject?.length
          } ${PluralBobjectTypes[bobjectType]}`,
          actionType: 'UPDATE',
          bobjectType,
          ...(allItems
            ? {
                query: { query: isQueuedBulk.query },
              }
            : {
                bobjectIds: bobject?.map(bobject => bobject?.id?.objectId),
              }),
          contents: {
            [FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO]: userSelected?.id,
          },
        })
        .then(() => {
          toggleModalVisibility();
          closeAssignUserModal();
          setIsLoading(false);
          onSave();
        });
    } else {
      if (bobject) {
        const updateData = {
          [bobjectType?.toUpperCase() + '__ASSIGNED_TO']: userSelected?.id,
        };
        if (isBulkAction) {
          let bobjectsData = {};
          bobject
            .map(b => b?.id.objectId)
            .forEach(id => {
              bobjectsData = { ...bobjectsData, [id]: updateData };
            });
          updateBulkObjects(bobjectsData).then(() => {
            onSave();
            createToast({
              message: 'Users Assigned successfully!',
              type: 'success',
            });
            setIsLoading(false);
            resetSelectedItems();
            closeAssignUserModal();
            if (isQueuedBulk) toggleModalVisibility();
          });
        } else {
          updateSingleBobject(bobject, updateData).then(() => {
            onSave();
            createToast({
              message: 'User assigned successfully!',
              type: 'success',
            });
            setIsLoading(false);
            resetSelectedItems();
            closeAssignUserModal();
          });
        }
      }
    }
  };

  return (
    <Modal
      title={
        'Assign ' +
        `${isBulkAction ? bobjectTypeName()?.plural : bobjectTypeName()?.singular}` +
        ' to another user'
      }
      open
      onClose={closeAssignUserModal}
      width={640}
    >
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
              users
                ?.all()
                ?.filter(user => user?.active)
                .map(user => {
                  if (search && !user?.name?.toLowerCase().includes(search?.toLowerCase())) {
                    return null;
                  }
                  return (
                    <Item dataTest={user?.value} value={user} key={user?.value}>
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
              {hasSalesEnabled
                ? `The ${isBulkAction ? bobjectTypeName()?.plural : bobjectTypeName()?.singular}
                will be assigned to the new owner. If there are any pending tasks, they will be reassigned aswell.`
                : `The assigned ${
                    isBulkAction ? bobjectTypeName()?.plural : bobjectTypeName()?.singular
                  }
                will appear in the
              ${isOpportunity(sampleBobject) ? 'Opportunities' : 'delivered'}
                tab. If there are any pending tasks, they will be assigned to the new owner.`}
            </Text>
          </Callout>
        </div>
      </div>
      <ModalFooter>
        <div>
          <Button variant="clear" color="tomato" onClick={closeAssignUserModal}>
            Cancel
          </Button>
        </div>
        <div className={styles._confirm__button}>
          <Button disabled={!userSelected || isLoading} onClick={handleAssign}>
            {isLoading ? <Spinner name="loadingCircle" /> : 'Assign'}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
export default AssignUserModal;
