import React, { useMemo } from 'react';
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
import useParentCompany from '../../../../../hooks/useParentCompany';
import styles from './deleteCompaniesRelatedModal.css';
import { getValueFromLogicRole } from '../../../../../utils/bobjects.utils';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';

const DeleteCompaniesRelatedModal = () => {
  const {
    parentCompany,
    openDeleteModal,
    setOpenDeleteModal,
    addParentCompany,
  } = useParentCompany();
  const companyName = useMemo(
    () => getValueFromLogicRole(parentCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME),
    [parentCompany],
  );

  return (
    <>
      <Modal width="472px" open={openDeleteModal}>
        <ModalHeader className={styles._modal_header}>
          <ModalTitle color="peanut" icon="company" size="small">
            Remove parent company
          </ModalTitle>
          <ModalCloseIcon color="peanut" size="small" onClick={() => setOpenDeleteModal(false)} />
        </ModalHeader>
        <ModalContent className={styles._modal_content}>
          <div>
            <Text align="center" size="m">
              You are about to remove{' '}
              <Text htmlTag="span" size="m" color="bloobirds" inline weight="bold">
                {companyName}
              </Text>{' '}
              as your parent company. Are you sure you want to do this?
            </Text>
          </div>
        </ModalContent>
        <ModalFooter className={styles._modal_footer}>
          <div>
            <Button variant="clear" onClick={() => setOpenDeleteModal(false)} uppercase>
              cancel
            </Button>
          </div>
          <div>
            <Button
              color="tomato"
              onClick={() => {
                addParentCompany(null);
                setOpenDeleteModal(false);
              }}
              uppercase
            >
              confirm
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default DeleteCompaniesRelatedModal;
