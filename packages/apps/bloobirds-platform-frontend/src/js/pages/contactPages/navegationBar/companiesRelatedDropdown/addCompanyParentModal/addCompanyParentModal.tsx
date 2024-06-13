import React, { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Dropdown,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  SearchInput,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import useSWR from 'swr';

import { SEARCH_MODES } from '../../../../../components/bobjectTable/context/bobjectTable.constants';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';
import useDebounce from '../../../../../hooks/useDebounce';
import useParentCompany from '../../../../../hooks/useParentCompany';
import { api } from '../../../../../utils/api';
import { getValueFromLogicRole } from '../../../../../utils/bobjects.utils';
import { keepPreviousResponse } from '../../../../../utils/swr.utils';
import { useContactBobjects } from '../../../contactPageContext';
import SearchCompanyItem from '../searchCompanyItem/searchCompanyItem';
import styles from './addCompanyParentModal.css';

const AddCompanyRelation = ({ handleCompaniesRelatedModal, open, setOpen }: any) => {
  const [focus, setFocus] = useState(false);
  const { company } = useContactBobjects();
  const [openConfirmParentCompanyModal, setOpenConfirmParentCompanyModal] = useState(false);
  const { ref, visible, setVisible } = useVisible(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Bobject>();
  const debounceSearchValue = useDebounce(searchValue, 100);
  const { addParentCompany, parentCompany, childCompanies, setOpenEditModal } = useParentCompany();
  const companyColumns = [
    COMPANY_FIELDS_LOGIC_ROLE.NAME,
    COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
    COMPANY_FIELDS_LOGIC_ROLE.WEBSITE,
  ];
  const companiesQuery = {
    query:
      searchValue !== ''
        ? {
            [COMPANY_FIELDS_LOGIC_ROLE.NAME]: {
              query: debounceSearchValue,
              searchMode: SEARCH_MODES.AUTOCOMPLETE__SEARCH,
            },
          }
        : {},
    columns: companyColumns,
    formFields: true,
    pageSize: 300,
    searchMode: SEARCH_MODES.AUTOCOMPLETE__SEARCH,
  };
  const { data: companies, error: companiesErrors } = useSWR(
    company && [`/bobjects/${company?.id.accountId}/Company/search`, debounceSearchValue],
    ([url, debounceSearchValue]) => api.post(url, companiesQuery),
    {
      use: [keepPreviousResponse],
    },
  );

  useEffect(() => {
    setVisible(focus && companies?.data?.contents?.length > 0);
  }, [companies, focus]);

  const handleSearchValue = (newValue: any) => {
    setSearchValue(newValue ? newValue : '');
    setFocus(true);
  };
  const handleOnClose = () => {
    setOpen(false);
    setSearchValue('');
    setVisible(false);
    setFocus(false);
    setOpenEditModal(false);
  };
  const companyName = useMemo(
    () => getValueFromLogicRole(selectedCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME),
    [selectedCompany],
  );
  const handleOpenConfirmParentCompanyModal = (company: any) => {
    setOpenConfirmParentCompanyModal(true);
    setSelectedCompany(company);
    setFocus(false);
  };
  return (
    <div>
      <Modal open={open} width="472px" onClose={() => handleOnClose()}>
        <ModalHeader className={styles._modal_header}>
          <ModalTitle color="peanut" icon="company" size="small">
            {parentCompany ? 'Change parent company' : 'Add a parent company'}
          </ModalTitle>
          <ModalCloseIcon
            color="peanut"
            size="small"
            onClick={() =>
              openConfirmParentCompanyModal
                ? setOpenConfirmParentCompanyModal(false)
                : handleOnClose()
            }
          />
        </ModalHeader>
        {!openConfirmParentCompanyModal ? (
          <ModalContent className={styles._modal_content}>
            {parentCompany && (
              <Text size="m">
                It seems <b>you already have a parent company </b> set up. If you continue with this
                process, you will remove that relationship with the company.
              </Text>
            )}
            <Text size="m">Search and select a parent company</Text>
            <Dropdown
              ref={ref}
              width="376px"
              visible={visible}
              arrow={false}
              position="bottom-start"
              anchor={
                <SearchInput
                  width="376px"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchValue}
                  onClick={() => setFocus(!focus)}
                />
              }
            >
              <div className={styles._drop_down_container}>
                {companies?.data?.contents
                  ?.filter((cmp: any) => {
                    return (
                      cmp.id.value !== company?.id?.value &&
                      parentCompany?.id.value !== cmp.id.value &&
                      !childCompanies?.data?.contents.find(
                        (childCompany: any) => childCompany.id.value === cmp.id.value,
                      )
                    );
                  })
                  .map((company: any) => (
                    <Item key={company.id.value} value={company.id.value}>
                      <SearchCompanyItem
                        company={company}
                        handleOpenModal={() => handleOpenConfirmParentCompanyModal(company)}
                      />
                    </Item>
                  ))}
              </div>
            </Dropdown>
            <Text className={styles._search_input_text} size="xs" color="softPeanut">
              Search companies by name.
            </Text>
          </ModalContent>
        ) : (
          <>
            <ModalContent className={styles._confirm_modal_content}>
              <div>
                <Text size="m">
                  Do you want to set{' '}
                  <Text size="m" color="bloobirds" inline weight="bold">
                    {companyName}
                  </Text>{' '}
                  as your parent company?
                </Text>
                {parentCompany && (
                  <Text size="m">
                    This will <b>remove</b> previous relationships with other companies
                  </Text>
                )}
              </div>
            </ModalContent>
            <ModalFooter className={styles._modal_footer}>
              <div>
                <Button
                  variant="clear"
                  onClick={() => setOpenConfirmParentCompanyModal(false)}
                  uppercase
                >
                  {parentCompany ? 'discard changes' : 'cancel'}
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    addParentCompany(selectedCompany?.id?.value);
                    setOpenConfirmParentCompanyModal(false);
                    setOpen(false);
                    handleCompaniesRelatedModal(false);
                  }}
                  uppercase
                >
                  confirm
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
};
export default AddCompanyRelation;
