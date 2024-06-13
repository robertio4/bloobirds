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
import useSWR from 'swr';

import { SEARCH_MODES } from '../../../../../components/bobjectTable/context/bobjectTable.constants';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';
import useDebounce from '../../../../../hooks/useDebounce';
import useParentCompany from '../../../../../hooks/useParentCompany';
import { api } from '../../../../../utils/api';
import { keepPreviousResponse } from '../../../../../utils/swr.utils';
import { useContactBobjects } from '../../../contactPageContext';
import SearchCompanyItem from '../searchCompanyItem/searchCompanyItem';
import styles from './addCompanyChildModal.css';

const AddCompanyChildModal = ({ handleCompaniesRelatedModal, open, setOpen }: any) => {
  const [focus, setFocus] = useState(false);
  const [deleteChildRelationship, setDeleteChildRelationship] = useState(false);
  const { company } = useContactBobjects();
  const { ref, visible, setVisible } = useVisible(false);
  const [searchValue, setSearchValue] = useState('');
  const {
    parentCompany,
    childCompanies,
    addChildrenCompanies,
    openEditChildModal,
  } = useParentCompany();
  const [childrenCompanies, setChildrenCompanies] = useState(
    childCompanies?.data?.contents.slice(),
  );
  const debounceSearchValue = useDebounce(searchValue, 100);
  const companyColumns = [
    COMPANY_FIELDS_LOGIC_ROLE.NAME,
    COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
    COMPANY_FIELDS_LOGIC_ROLE.WEBSITE,
    COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT,
  ];
  const companiesQuery = {
    query:
      searchValue !== ''
        ? {
            [COMPANY_FIELDS_LOGIC_ROLE.NAME]: {
              query: debounceSearchValue,
              searchMode: SEARCH_MODES.AUTOCOMPLETE__SEARCH,
              pageSize: 300,
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
    ([url, debouncedSearchValue]) => api.post(url, companiesQuery),
    {
      use: [keepPreviousResponse],
    },
  );

  const handleOnClick = (company: any) => {
    setFocus(false);
    company.delete = false;
    if (childrenCompanies?.includes(company)) {
      setDeleteChildRelationship(!deleteChildRelationship);
    } else {
      childrenCompanies?.unshift(company);
    }
  };

  const handleSearchValue = (newValue: any) => {
    setSearchValue(newValue ? newValue : '');
  };

  const handleDelete = (company: any) => {
    company.delete = true;
    setDeleteChildRelationship(!deleteChildRelationship);
  };

  useEffect(() => {
    setVisible(focus && companies?.data?.contents?.length > 0);
  }, [companies, focus]);

  useEffect(
    () =>
      setChildrenCompanies(
        childCompanies?.data?.contents
          .slice()
          .reduce((acc: any, curr: any) => [...acc, { ...curr, delete: false }], []),
      ),
    [childCompanies, openEditChildModal, open],
  );

  const filteredCompanyResults = useMemo(
    () =>
      companies?.data?.contents?.filter((cmp: any) => {
        return (
          cmp.id.value !== company?.id?.value &&
          parentCompany?.id.value !== cmp.id.value &&
          !childrenCompanies?.find((childCompany: any) => childCompany.id.value === cmp.id.value)
        );
      }),
    [companies, childrenCompanies?.length, deleteChildRelationship],
  );

  const handleOnClose = () => {
    setOpen(false);
    setSearchValue('');
    setVisible(false);
    setFocus(false);
    handleCompaniesRelatedModal(false);
    setChildrenCompanies([]);
  };

  return (
    <div>
      <Modal
        open={open}
        width="472px"
        className={styles._modal_container}
        onClose={() => handleOnClose()}
      >
        <ModalHeader className={styles._modal_header}>
          <ModalTitle color="peanut" icon="company" size="small">
            Add child companies
          </ModalTitle>
          <ModalCloseIcon color="peanut" size="small" onClick={handleOnClose} />
        </ModalHeader>
        <ModalContent className={styles._modal_content}>
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
              {filteredCompanyResults?.map((company: any) => (
                <Item key={company.id.value} value={company.id.value}>
                  <SearchCompanyItem
                    company={company}
                    handleOpenModal={() => handleOnClick(company)}
                  />
                </Item>
              ))}
            </div>
          </Dropdown>
          <Text className={styles._search_input_text} size="xs" color="softPeanut">
            Search companies by name.
          </Text>
          <div className={styles._display_child_companies}>
            {childrenCompanies
              ?.filter((childCompany: any) => !childCompany.delete)
              .map((childCompany: any) => (
                <SearchCompanyItem
                  company={childCompany}
                  key={childCompany?.id.value}
                  handleDelete={() => handleDelete(childCompany)}
                />
              ))}
          </div>
        </ModalContent>
        <ModalFooter className={styles._modal_footer}>
          <Button variant="clear" onClick={handleOnClose} uppercase>
            cancel
          </Button>
          <Button
            onClick={() => {
              addChildrenCompanies(childrenCompanies);
              handleOnClose();
            }}
            uppercase
          >
            Save changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default AddCompanyChildModal;
