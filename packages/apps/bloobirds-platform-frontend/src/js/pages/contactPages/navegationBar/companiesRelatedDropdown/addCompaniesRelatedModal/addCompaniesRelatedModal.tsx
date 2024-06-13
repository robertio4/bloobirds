import React, { useState } from 'react';

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

import AddCompanyChildModal from '../addCompanyChildModal/addCompanyChildModal';
import AddCompanyRelation from '../addCompanyParentModal/addCompanyParentModal';
import styles from './addCompaniesRelatedModal.css';

export const AddCompaniesRelatedModal = ({ openModal, handleCloseModal, companyName }: any) => {
  const [openParent, setOpenParent] = useState(false);
  const [openChild, setOpenChild] = useState(false);
  return (
    <div>
      <Modal width="472px" open={openModal} onClose={handleCloseModal}>
        <ModalHeader className={styles._modal_header}>
          <ModalTitle color="peanut" icon="company" size="small">
            Add a related company
          </ModalTitle>
          <ModalCloseIcon
            color="peanut"
            size="small"
            onClick={() => handleCloseModal(!openModal)}
          />
        </ModalHeader>
        <ModalContent className={styles._add_related_company_content}>
          <div className={styles._modal_content_text}>
            <Text size="m" align="center">
              Add a parent or child company to track the organizational structure of{' '}
              <Text htmlTag="span" size="m" color="bloobirds">
                {companyName}
              </Text>
            </Text>
            <Text size="s" align="center">
              Select what type of company you want to add
            </Text>
          </div>
        </ModalContent>
        <ModalFooter className={styles._add_related_company_footer_content}>
          <div>
            <Button
              onClick={() => setOpenParent(true)}
              className={styles._add_related_company_button}
              uppercase
            >
              parent company
            </Button>
          </div>
          <div>
            <Button
              className={styles._add_related_company_button}
              onClick={() => setOpenChild(true)}
              uppercase
            >
              child company
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      <AddCompanyRelation
        handleCompaniesRelatedModal={handleCloseModal}
        open={openParent}
        setOpen={setOpenParent}
      />
      <AddCompanyChildModal
        handleCompaniesRelatedModal={handleCloseModal}
        open={openChild}
        setOpen={setOpenChild}
      />
    </div>
  );
};
