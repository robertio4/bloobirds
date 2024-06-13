import React from 'react';

import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { PluralBobjectTypes, BOBJECT_TYPES, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

import {
  APP_CL_COMPANIES,
  APP_CL_LEADS,
  companyIdUrl,
  companyUrl,
} from '../../app/_constants/routes';
import { useBobjectDetailsVisibility, useRouter } from '../../hooks';
import useConfirmResyncModal from '../../hooks/useConfirmResyncModal';
import { bobjectFieldsModel } from '../../misc/model/bobjectFieldsModel';
import { api } from '../../utils/api';
import {
  getFieldByLogicRole,
  getRelatedBobject,
  isCompany,
  isLead,
  isOpportunity,
} from '../../utils/bobjects.utils';
import { useBulkActionsFeedbackModal } from '../bobjectTable/bulkActionsPanel/modals/feedbackModal/useBulkActionsFeedbackModal';
import styles from './ConfirmResyncModal.module.css';

const ConfirmResyncModal = () => {
  const { history } = useRouter();
  const { bobject, isOpen, closeResyncModal, isQueuedBulk, setRefresh } = useConfirmResyncModal();
  const { closeBobjectDetailsModal } = useBobjectDetailsVisibility();
  const { toggleModalVisibility } = useBulkActionsFeedbackModal();

  if (!isOpen) return null;

  const isBulk = Array.isArray(bobject);
  const sampleBobject = isBulk ? bobject[0] : bobject;
  const bobjectType = sampleBobject?.id?.typeName;
  const model = bobjectFieldsModel(sampleBobject?.fields);
  const bobjectName = model.findByLogicRole(`${bobjectType.toUpperCase()}__NAME`)?.value;

  const handleDelete = async () => {
    if (isQueuedBulk) {
      const allItems = typeof isQueuedBulk !== 'boolean' && 'query' in isQueuedBulk;
      api
        .post(`/bobjects/bulkAction/createBulk${allItems ? 'ByQuery' : ''}`, {
          importName: `Resync ${allItems ? isQueuedBulk?.totalItems : bobject?.length} ${
            PluralBobjectTypes[bobjectType]
          }`,
          actionType: 'RESYNC',
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
          toggleModalVisibility();
          closeResyncModal();
          setRefresh(true);
        });
    }

    //mutate, dont redirect
    if (isCompany(bobject)) {
      history.push(APP_CL_COMPANIES);
    } else if (isOpportunity(bobject)) {
      const company = getRelatedBobject(bobject, BOBJECT_TYPES.COMPANY);
      history.push(companyUrl(company));
    } else if (isLead(bobject)) {
      const companyLead = getFieldByLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType].COMPANY)
        ?.text;

      if (!companyLead) {
        history.push(APP_CL_LEADS);
      } else {
        history.push(companyIdUrl(companyLead));
      }
    }

    closeBobjectDetailsModal();
    closeResyncModal();
  };

  return (
    <Modal width={600} open={isOpen} onClose={closeResyncModal}>
      <ModalHeader className={styles._modal_header}>
        <ModalTitle>Resync</ModalTitle>
        <ModalCloseIcon onClick={closeResyncModal} />
      </ModalHeader>
      <ModalContent>
        <div className={styles._content}>
          {isBulk ? (
            <Text size="m">
              You&apos;re about to{' '}
              <b>
                resync{' '}
                {isQueuedBulk && isQueuedBulk.totalItems ? isQueuedBulk.totalItems : bobject.length}{' '}
                {PluralBobjectTypes[bobjectType].toLowerCase()}
              </b>
              .
            </Text>
          ) : (
            <Text size="m">
              You&apos;re about to resync the {bobjectType.toLowerCase()}
              {bobjectName && <b> {bobjectName}</b>}.
            </Text>
          )}
          <Text size="m">
            <b>This action cannot be undone</b>, are you sure you want to continue?
          </Text>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={closeResyncModal}>
          Cancel
        </Button>
        <Button variant="primary" dataTest="deleteModalDeleteButton" onClick={handleDelete}>
          Resync
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmResyncModal;
