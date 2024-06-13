import React from 'react';

import { useConfirmDeleteModal } from '@bloobirds-it/bobjects';
import {
  Button,
  IconButton,
  Pagination,
  SearchInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Tag,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useSearchSubscription } from '@bloobirds-it/plover';

import { SearchColumns } from '../../../../assets/svg';
import { SEARCH_MODES } from '../../../components/bobjectTable/context/bobjectTable.constants';
import { EntityCard, EntityCardItem } from '../../../components/entityList/entityCard/entityCard';
import { PRODUCT_FIELDS_LOGIC_ROLE } from '../../../constants/product';
import { useBobjectFormCreation, useBobjectFormVisibility, useEntity } from '../../../hooks';
import useDebounce from '../../../hooks/useDebounce';
import useHubspot from '../../../hooks/useHubspot';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useSalesforce from '../../../hooks/useSalesforce';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabTitle,
} from '../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { getTextFromLogicRole, getValueFromLogicRole } from '../../../utils/bobjects.utils';
import styles from './productPage.module.css';

const ProductRow = ({ rawProduct }: { rawProduct: any }) => {
  const fields = useEntity('bobjectFields');
  const { openEditModal } = useBobjectFormVisibility();
  const { openDeleteModal } = useConfirmDeleteModal();
  const { salesforceIntegration } = useSalesforce();
  const { hubspotIntegration } = useHubspot();
  const product = {
    name: getValueFromLogicRole(rawProduct, 'PRODUCT__NAME'),
    description: getValueFromLogicRole(rawProduct, 'PRODUCT__DESCRIPTION'),
    price: getValueFromLogicRole(rawProduct, 'PRODUCT__PRICE'),
    category: getTextFromLogicRole(rawProduct, 'PRODUCT__CATEGORY'),
    salesforceProduct:
      getValueFromLogicRole(rawProduct, PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRICEBOOK_ENTRY_ID) ||
      getValueFromLogicRole(rawProduct, PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRODUCT_ID),
    hubspotProduct: getValueFromLogicRole(rawProduct, PRODUCT_FIELDS_LOGIC_ROLE.HUBSPOT_PRODUCT_ID),
  };
  const openInCRM = () => {
    if (salesforceIntegration) {
      window.open(`${salesforceIntegration?.instanceHost}/${product?.salesforceProduct}`, '_blank');
    }
  };

  const openInHubspot = () => {
    if (hubspotIntegration) {
      window.open(
        `https://app.hubspot.com/settings/${hubspotIntegration?.portalId}/sales/products`,
      );
    }
  };

  const currency = fields.findByLogicRole('PRODUCT__PRICE')?.layoutNumberSuffix;

  return (
    <EntityCard className={styles.category_row}>
      <EntityCardItem className={styles.productName}>{product.name}</EntityCardItem>
      <EntityCardItem className={styles.descriptionCell}>{product.description}</EntityCardItem>
      <EntityCardItem>{product.category && <Tag>{product.category}</Tag>}</EntityCardItem>
      <EntityCardItem>
        <Text weight="medium" size="s" inline>
          {currency}
        </Text>{' '}
        {product.price}
      </EntityCardItem>
      <EntityCardItem align="right" className={styles.statusCell}>
        {salesforceIntegration && product?.salesforceProduct && (
          <Tooltip title="View in Salesforce" position="top">
            <IconButton name="salesforce" size={25} color="bloobirds" onClick={openInCRM} />
          </Tooltip>
        )}
        {hubspotIntegration && product?.hubspotProduct && (
          <Tooltip title="View in Hubspot" position="top">
            <IconButton name="hubspot" size={25} color="tangerine" onClick={openInHubspot} />
          </Tooltip>
        )}
        <IconButton
          name="edit"
          size={20}
          color="purple"
          onClick={() => openEditModal({ bobject: rawProduct })}
        />
        <IconButton
          name="trashFull"
          size={20}
          color="purple"
          onClick={() => openDeleteModal(rawProduct)}
        />
      </EntityCardItem>
    </EntityCard>
  );
};

export const ProductsTab = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const debounceSearchValue = useDebounce(searchValue, 200);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const { isSmallDesktop } = useMediaQuery();
  const { openAddProduct } = useBobjectFormCreation();

  const query =
    debounceSearchValue.length > 0
      ? {
          PRODUCT__NAME: {
            query: debounceSearchValue,
            searchMode: SEARCH_MODES.AUTOCOMPLETE__SEARCH,
          },
        }
      : {};

  const { data: products } = useSearchSubscription(
    {
      query,
      formFields: true,
      pageSize: rowsPerPage,
      page: page,
    },
    'Product',
  );

  return (
    <>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="assignBoard" color="purple">
              <div className={styles._business_asset_title}>Products</div>
            </AccountSettingsTabTitle>
          </AccountSettingsTabHeaderLeft>
          <AccountSettingsTabHeaderRight>
            <SearchInput
              width="200"
              placeholder="Search"
              onChange={value => setSearchValue(value)}
              color="purple"
            />
            <Button iconLeft="plus" onClick={openAddProduct} color="purple">
              {!isSmallDesktop && 'Create Product'}
            </Button>
          </AccountSettingsTabHeaderRight>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            {products?.data?.contents?.length ? (
              <Table>
                <TableHead>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell className={styles.statusHeader}>Status</TableCell>
                </TableHead>
                <TableBody>
                  {products?.data?.contents?.map((rawProduct: any) => (
                    <ProductRow key={rawProduct.id.value} rawProduct={rawProduct} />
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className={styles.noProducts}>
                <SearchColumns className={styles.noProductsIcon} width={60} height={60} />
                <Text size="l" align="center">
                  Still no products added to your products book.
                  <br />
                  Start adding the first one to your playbook.
                </Text>
                <div className={styles.link} onClick={openAddProduct}>
                  <Text size="s" uppercase color="purple">
                    {' '}
                    + create product
                  </Text>
                </div>
              </div>
            )}
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      <div className={styles._pagination}>
        <Pagination
          rowsPerPageOptions={[20, 50, 100, 200]}
          page={page}
          count={products?.data?.totalMatching}
          rowsPerPage={rowsPerPage}
          onChangePage={setPage}
          onChangeRowsPerPage={setRowsPerPage}
        />
      </div>
    </>
  );
};
