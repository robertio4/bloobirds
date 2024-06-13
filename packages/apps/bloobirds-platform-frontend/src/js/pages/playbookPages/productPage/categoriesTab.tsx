import React, { useMemo } from 'react';

import { Button, IconButton, Pagination, SearchInput, Text } from '@bloobirds-it/flamingo-ui';

import { SearchColumns } from '../../../../assets/svg';
import { EntityCard, EntityCardItem } from '../../../components/entityList/entityCard/entityCard';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../components/entityList/entityList';
import { useEntity } from '../../../hooks';
import useMediaQuery from '../../../hooks/useMediaQuery';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabTitle,
} from '../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { useCategoryModal } from './addCategoryModal/addCategoryModal';
import styles from './productPage.module.css';

function CategoriesRow({ category }: { category: any }): JSX.Element {
  const { openEditionModal, openDeleteModal } = useCategoryModal();
  return (
    <EntityCard className={styles.category_row}>
      <EntityCardItem>{category?.value}</EntityCardItem>
      <EntityCardItem align="right">
        <IconButton
          name="edit"
          size={20}
          color="purple"
          onClick={() => openEditionModal(category)}
        />
        <IconButton
          name="trashFull"
          size={20}
          color="purple"
          onClick={() => openDeleteModal(category)}
        />
      </EntityCardItem>
    </EntityCard>
  );
}

const useCategories = () => {
  const { id } = useEntity('bobjectFields').findByLogicRole('PRODUCT__CATEGORY');
  const [order, setOrder] = React.useState<'ASC' | 'DESC'>('ASC');
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const categories = useEntity('bobjectPicklistFieldValues')?.filterBy('bobjectField')(id);

  const filteredCategories = useMemo(() => {
    let filtered = categories;
    if (searchValue) {
      filtered = categories?.filter(
        (category: any) =>
          category.value.toLowerCase().includes(searchValue.toLowerCase()) ||
          category.bobjectField.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }
    return filtered?.sort((a: any, b: any) => {
      if (order === 'ASC') {
        return a.value.localeCompare(b.value);
      } else {
        return b.value.localeCompare(a.value);
      }
    });
  }, [categories, searchValue, order]);

  return {
    reorder: () => setOrder(order === 'ASC' ? 'DESC' : 'ASC'),
    search: (value: string) => setSearchValue(value),
    page,
    pageSize,
    totalMatching: filteredCategories?.length,
    categories: filteredCategories?.slice(page * pageSize, (page + 1) * pageSize),
    setPage,
    setPageSize: (value: number) => setPageSize(value),
    order,
  };
};

export const CategoriesTab = () => {
  const { isSmallDesktop } = useMediaQuery();
  const { openCreationModal } = useCategoryModal();
  const {
    categories,
    page,
    pageSize,
    reorder,
    search,
    setPage,
    setPageSize,
    totalMatching,
    order,
  } = useCategories();

  return (
    <>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="tag" color="purple">
              <div className={styles._business_asset_title}>Categories</div>
            </AccountSettingsTabTitle>
          </AccountSettingsTabHeaderLeft>
          <AccountSettingsTabHeaderRight>
            <SearchInput width="200" placeholder="Search" onChange={search} color="purple" />
            <Button iconLeft="plus" onClick={openCreationModal} color="purple">
              {!isSmallDesktop && 'Create Category'}
            </Button>
          </AccountSettingsTabHeaderRight>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            {categories.length ? (
              <EntityList>
                <EntityListHeader className={styles.header_row}>
                  <EntityHeaderItem canBeSorted label="Category" order={order} onClick={reorder} />
                  <EntityHeaderItem label="Status" align="right" />
                </EntityListHeader>
                {categories?.map((category: any) => (
                  <CategoriesRow key={category.id} category={category} />
                ))}
              </EntityList>
            ) : (
              <div className={styles.noProducts}>
                <SearchColumns className={styles.noProductsIcon} width={60} height={60} />
                <Text size="l" align="center">
                  Still no categories added to your products book.
                  <br />
                  Start adding the first one to your playbook.
                </Text>
                <div className={styles.link} onClick={openCreationModal}>
                  <Text size="s" uppercase color="purple">
                    {' '}
                    + create category
                  </Text>
                </div>
              </div>
            )}
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      <div className={styles._pagination}>
        <Pagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          page={page}
          count={totalMatching}
          rowsPerPage={pageSize}
          onChangePage={setPage}
          onChangeRowsPerPage={setPageSize}
        />
      </div>
    </>
  );
};
