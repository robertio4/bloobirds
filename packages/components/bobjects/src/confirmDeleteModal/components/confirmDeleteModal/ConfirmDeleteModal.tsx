import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useSelectAll } from '@bloobirds-it/hooks';
import {
  APP_CL,
  APP_CL_COMPANIES,
  APP_CL_LEADS,
  BobjectType,
  BobjectTypes,
  companyIdUrl,
  companyUrl,
  FIELDS_LOGIC_ROLE,
  LogicRoleType,
  PluralBobjectTypes,
} from '@bloobirds-it/types';
import {
  api,
  getFieldByLogicRole,
  getRelatedBobject,
  getValueFromLogicRole,
  isCompany,
  isLead,
  isOpportunity,
} from '@bloobirds-it/utils';

import { useConfirmDeleteModal } from '../../hooks/useConfirmDeleteModal';
import styles from './ConfirmDeleteModal.module.css';

export const ConfirmDeleteModal = ({ history, location }: { history?: any; location?: any }) => {
  const {
    bobject,
    isOpen,
    closeDeleteModal,
    isQueuedBulk,
    setRefresh,
    length,
    callback,
  } = useConfirmDeleteModal();
  const { resetSelectedItems } = useSelectAll();

  const { t } = useTranslation();

  if (!isOpen) return null;

  const accountId = bobject?.id?.accountId;
  const isBulk = Array.isArray(bobject);
  const sampleBobject = isBulk ? bobject[0] : bobject;
  const bobjectType: BobjectType = sampleBobject?.id?.typeName;
  const bobjectName = getValueFromLogicRole(
    sampleBobject,
    `${bobjectType?.toUpperCase()}__NAME` as LogicRoleType<BobjectTypes>,
  );

  const handleDelete = async () => {
    if (isBulk) {
      const objectsIds = bobject?.map(object => object?.id?.objectId);
      if (isQueuedBulk) {
        const allItems = typeof isQueuedBulk !== 'boolean' && 'query' in isQueuedBulk;
        api
          .post(`/bobjects/bulkAction/createBulk${allItems ? 'ByQuery' : ''}`, {
            importName: `Delete ${allItems ? isQueuedBulk?.totalItems : bobject?.length} ${
              PluralBobjectTypes[bobjectType]
            }`,
            actionType: 'DELETE',
            bobjectType,
            ...(allItems
              ? {
                  query: { query: isQueuedBulk.query },
                }
              : {
                  bobjectIds: bobject?.map(b => b?.id?.objectId),
                }),
            contents: {},
          })
          .then(() => {
            closeDeleteModal();
            setRefresh(true);
          });
      } else {
        await api.delete(`${accountId}/${bobjectType}/delete/bulk`, {
          data: [objectsIds],
        });
      }
      resetSelectedItems();
    } else {
      await api.delete(`/bobjects/${bobject?.id?.value}`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: {},
      });
    }

    //mutate, dont redirect if FE
    if (history && location) {
      if (location.pathname?.includes(APP_CL)) {
        if (isCompany(bobject)) {
          history.push(APP_CL_COMPANIES);
        } else if (isOpportunity(bobject)) {
          const company = getRelatedBobject(bobject, BobjectTypes.Company);
          history.push(companyUrl(company));
        } else if (isLead(bobject)) {
          const companyLead = getFieldByLogicRole(
            bobject,
            FIELDS_LOGIC_ROLE[bobjectType as BobjectTypes.Lead].COMPANY,
          )?.text;

          if (!companyLead) {
            history.push(APP_CL_LEADS);
          } else {
            history.push(companyIdUrl(companyLead));
          }
        }
      }
    }

    if (callback) {
      callback();
    }

    closeDeleteModal();
  };

  return (
    <Modal width={600} open={isOpen} onClose={closeDeleteModal}>
      <ModalHeader>
        <ModalTitle>
          {t('bobjects.confirmDeleteModal.title', {
            bobject: bobjectType ? t(`bobjectTypes.${bobjectType.toLowerCase()}`) : '',
          })}
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className={styles._content}>
          {isBulk ? (
            <Text size="m">
              {t('bobjects.confirmDeleteModal.bulkMessage', {
                count: length || bobject?.length || 0,
                bobjectType: t(`bobjectTypes.${bobjectType.toLowerCase()}`, {
                  count: length || bobject?.length || 0,
                }),
              })}
            </Text>
          ) : (
            <Text size="m">
              {t('bobjects.confirmDeleteModal.message', {
                bobjectName: bobjectName ? bobjectName : '',
                bobjectType: bobjectType ? t(`bobjectTypes.${bobjectType.toLowerCase()}`) : '',
              })}
            </Text>
          )}
          <Text size="m">
            <Trans i18nKey="bobjects.confirmDeleteModal.subtitle" />
          </Text>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={closeDeleteModal}>
          {t('bobjects.confirmDeleteModal.cancel')}
        </Button>
        <Button
          variant="primary"
          color="tomato"
          dataTest="deleteModalDeleteButton"
          onClick={handleDelete}
        >
          {isBulk
            ? t('bobjects.confirmDeleteModal.deleteBulk', {
                bobjectType: t(`bobjectTypes.${bobjectType.toLowerCase()}`, { count: 2 }),
              })
            : t('bobjects.confirmDeleteModal.delete')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
