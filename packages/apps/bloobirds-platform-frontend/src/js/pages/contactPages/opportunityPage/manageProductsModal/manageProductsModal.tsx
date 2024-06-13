import React, { useEffect, useState } from 'react';

import {
  Button,
  Icon,
  Item,
  Modal,
  ModalContent,
  ModalFooter,
  Select,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Text,
} from '@bloobirds-it/flamingo-ui';
import useSWR, { mutate } from 'swr';
import { v4 as uuid } from 'uuid';

import { SearchColumns } from '../../../../../assets/svg';
import { APP_PLAYBOOK_PRODUCTS } from '../../../../app/_constants/routes';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import { OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunityProduct';
import { PRODUCT_FIELDS_LOGIC_ROLE } from '../../../../constants/product';
import { useActiveUser, useEntity, useRouter } from '../../../../hooks';
import useManageProducts from '../../../../hooks/useManageProducts';
import SessionManagerFactory from '../../../../misc/session';
import { Bobject } from '../../../../typings/bobjects';
import { parseAmount } from '../../../../utils/amount.utils';
import { api } from '../../../../utils/api';
import { getTextFromLogicRole, getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import { keepPreviousResponse } from '../../../../utils/swr.utils';
import styles from './manageProductsModal.module.css';
import { OpportunityProductRow } from './opportunityProductRow';
import SkeletonTableRow from './skeletonTableRow';

export interface RelatedProduct {
  id?: string;
  temporaryId?: string;
  temporayId?: string;
  product: string;
  unitPrice: number;
  vat: number;
  units: number;
  discount: number;
  extraFee: number;
  totalPrice: number;
}

interface Category {
  id: string;
  value: string;
}

export function calculateTotalPrice(relatedProduct: RelatedProduct): number {
  const discountedPrice =
    relatedProduct.discount > 0
      ? relatedProduct.unitPrice * (1 - relatedProduct.discount / 100)
      : relatedProduct.unitPrice;

  return discountedPrice * relatedProduct.units + Number(relatedProduct.extraFee);
}

const ManageProductsModal = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  const { opportunityId } = useManageProducts();
  const { activeAccount, activeUser } = useActiveUser();
  const { history } = useRouter();
  const roleManager = SessionManagerFactory().getRoleManager();

  const fields = useEntity('bobjectFields');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const currency =
    fields.findByLogicRole(PRODUCT_FIELDS_LOGIC_ROLE.PRICE)?.layoutNumberSuffix ||
    fields.findByLogicRole(PRODUCT_FIELDS_LOGIC_ROLE.PRICE)?.layoutNumberPrefix ||
    fields.findByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT)?.layoutNumberPrefix;

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { id } = fields.findByLogicRole(PRODUCT_FIELDS_LOGIC_ROLE.CATEGORY);
  const categories = bobjectPicklistFieldValues?.filterBy('bobjectField')(id);

  const { data: categoryProducts } = useSWR(
    (selectedCategory !== '' || categories) && [
      `/bobjects/${activeAccount.id}/Product/search`,
      selectedCategory,
    ],
    ([url, selectedCategory]) =>
      api.post(url, {
        query: {
          ...(selectedCategory !== ''
            ? { [PRODUCT_FIELDS_LOGIC_ROLE.CATEGORY]: selectedCategory }
            : null),
        },
        formFields: true,
        pageSize: 50,
      }),
    {
      use: [keepPreviousResponse],
    },
  );

  const { data: { data: opportunityProducts } = { data: {} }, isValidating } = useSWR(
    opportunityId && [`/bobjects/${activeAccount.id}/OpportunityProduct/search`, opportunityId],
    ([url, opportunityId]) =>
      api.post(url, {
        query: {
          [OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [opportunityId],
        },
        formFields: true,
        pageSize: 50,
        injectReferences: true,
      }),
  );

  //Transform opportunity products to RelatedProducts and set the state
  useEffect(() => {
    if (opportunityProducts && opportunityProducts.contents?.length > 0) {
      const relatedProducts = opportunityProducts.contents?.map((opportunityProduct: Bobject) => {
        const product = getValueFromLogicRole(
          opportunityProduct,
          OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.PRODUCT,
        );
        const quantity =
          Number(
            getValueFromLogicRole(opportunityProduct, OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.UNITS),
          ) || 0;
        const unitPrice =
          Number(
            getValueFromLogicRole(opportunityProduct, OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.PRICE),
          ) || 0;
        const discount =
          Number(
            getValueFromLogicRole(
              opportunityProduct,
              OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.DISCOUNT,
            ),
          ) || 0;
        const extraFee =
          Number(
            getValueFromLogicRole(
              opportunityProduct,
              OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.EXTRA_FEE,
            ),
          ) || 0;
        const vat =
          Number(
            getValueFromLogicRole(opportunityProduct, OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.VAT),
          ) || 0;
        const totalPrice =
          Number(
            getValueFromLogicRole(
              opportunityProduct,
              OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.TOTAL_PRICE,
            ),
          ) || 0;

        return {
          id: opportunityProduct.id.value,
          product: product,
          units: quantity,
          unitPrice: unitPrice,
          discount: discount,
          extraFee: extraFee,
          vat: vat,
          totalPrice: totalPrice,
        };
      });

      setRelatedProducts(relatedProducts);
    }
  }, [opportunityProducts]);

  useEffect(() => {
    return () => {
      mutate(`/bobjects/${activeAccount.id}/OpportunityProduct/search`);
    };
  }, []);

  function addRelatedProduct() {
    const product = categoryProducts?.data?.contents?.find(
      (product: any) => product.id.value === selectedProduct,
    );
    const unitPrice = getTextFromLogicRole(product, PRODUCT_FIELDS_LOGIC_ROLE.PRICE);
    const vat = getTextFromLogicRole(product, PRODUCT_FIELDS_LOGIC_ROLE.VAT);
    const relatedProduct: RelatedProduct = {
      temporaryId: uuid(),
      product: product?.id?.value,
      units: 1,
      unitPrice: unitPrice ? Number(unitPrice.replace(/([$€])/g, '')) : 0,
      discount: 0,
      extraFee: 0,
      vat: vat ? Number(vat?.replace('%', '')) : 0,
      totalPrice: 0,
    };

    relatedProduct.totalPrice = calculateTotalPrice(relatedProduct);
    setRelatedProducts([...relatedProducts, relatedProduct]);
  }

  async function pushUpdatedProducts() {
    setIsSubmitting(true);
    for (const relatedProduct of relatedProducts) {
      const productToSave = {
        [OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.PRODUCT]: relatedProduct.product,
        [OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.UNITS]: relatedProduct.units,
        [OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.PRICE]: relatedProduct.unitPrice,
        [OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.DISCOUNT]: relatedProduct.discount,
        [OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.EXTRA_FEE]: relatedProduct.extraFee,
        [OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.VAT]: relatedProduct.vat,
        [OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.TOTAL_PRICE]: relatedProduct.totalPrice,
      };
      if (relatedProduct.id) {
        await api.patch(`/bobjects/${relatedProduct.id}/raw`, productToSave);
      } else {
        await api.post(`/bobjects/${activeAccount.id}/OpportunityProduct`, {
          ...productToSave,
          [OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.OPPORTUNITY]: opportunityId,
          [OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.AUTHOR]: activeUser.id,
        });
      }
    }
    //Patch the opportunity amount
    await api.patch(`/bobjects/${opportunityId}/raw`, {
      [OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT]: relatedProducts
        .reduce((acc, curr) => acc + Number(curr.totalPrice), 0)
        .toFixed(2),
    });
    //Close the modal
    setIsSubmitting(false);
    handleClose();
  }

  const totalPrice = relatedProducts.reduce((acc, product) => {
    const productTotalPrice =
      product.discount > 0
        ? Number(product.unitPrice) * (1 - Number(product.discount) / 100)
        : Number(product.unitPrice);
    return acc + productTotalPrice * Number(product.units);
  }, 0);
  const totalExtraFee = relatedProducts.reduce((acc, product) => {
    const extraFee = Number(product.extraFee);
    return acc + extraFee;
  }, 0);
  const totalOpportunityAmount = Number(totalPrice) + Number(totalExtraFee);
  const totalAmountWithVAT = relatedProducts.reduce((acc, product) => {
    const productTotalPrice = Number(product.totalPrice);
    const vat = Number(product.vat);
    const vatPercentage = vat / 100;

    return acc + (productTotalPrice + productTotalPrice * vatPercentage);
  }, 0);

  return (
    <Modal title="Manage products" open={open} onClose={handleClose} width={940}>
      <ModalContent>
        <div className={styles.sectionActions}>
          <Select
            size="medium"
            width="160px"
            placeholder="Categories"
            value={!categories?.length ? 'all' : selectedCategory}
            onChange={(value: string) => {
              setSelectedProduct('');
              setSelectedCategory(value);
            }}
            disabled={!categories || categories?.length === 0}
          >
            <Item value="">
              <em>None</em>
            </Item>
            {!categories && <Item value="all">All</Item>}
            {categories?.map((category: Category) => (
              <Item value={category.id} key={category.id}>
                {category.value}
              </Item>
            ))}
          </Select>
          <Select
            value={selectedProduct}
            size="medium"
            width="558px"
            placeholder="List of products"
            onChange={setSelectedProduct}
          >
            <Item value="">
              <em>None</em>
            </Item>
            {categoryProducts?.data?.contents?.map((product: Bobject) => (
              <Item value={product.id.value} key={product.id.value}>
                {getValueFromLogicRole(product, PRODUCT_FIELDS_LOGIC_ROLE.NAME)}
              </Item>
            ))}
          </Select>
          <Button
            iconLeft="plusSquare"
            variant="secondary"
            onClick={addRelatedProduct}
            disabled={!selectedProduct}
          >
            Add
          </Button>
        </div>
        <div className={styles.table}>
          {relatedProducts.length ? (
            <Table>
              <TableHead>
                <TableCell className={styles.headerCell} width="0">
                  Product name
                </TableCell>
                <TableCell className={styles.headerCell} width="0">
                  Quantity
                </TableCell>
                <TableCell className={styles.headerCell} width="0">
                  Unit price
                </TableCell>
                <TableCell className={styles.headerCell} width="0">
                  VAT
                </TableCell>
                <TableCell className={styles.headerCell} width="0">
                  Discount (%)
                </TableCell>
                <TableCell className={styles.headerCell} width="0">
                  Extra Fee
                </TableCell>
                <TableCell className={styles.headerCell} width="0">
                  Total price (without VAT)
                </TableCell>
                <TableCell className={styles.headerCell} width="0"></TableCell>
              </TableHead>
              <TableBody>
                {!isValidating ? (
                  relatedProducts.map((oppProduct, index) => {
                    function handleChange(relatedProduct: RelatedProduct) {
                      const newRelatedProducts = [...relatedProducts];
                      newRelatedProducts[index] = relatedProduct;
                      setRelatedProducts(newRelatedProducts);
                    }
                    function handleRemove() {
                      const newRelatedProducts = [...relatedProducts];
                      newRelatedProducts.splice(index, 1);
                      setRelatedProducts(newRelatedProducts);
                    }
                    return (
                      <OpportunityProductRow
                        currency={currency}
                        key={oppProduct?.id || oppProduct?.temporaryId}
                        onChange={handleChange}
                        onRemove={handleRemove}
                        opportunityProduct={oppProduct}
                      />
                    );
                  })
                ) : (
                  <SkeletonTableRow />
                )}
              </TableBody>
            </Table>
          ) : (
            <div className={styles.noProducts}>
              <SearchColumns width={48} height={48} />
              {categories?.length || categoryProducts?.data?.contents?.length ? (
                <Text size="l" align="center">
                  Still no products added, select the first one
                  <br />
                  to calculate the opportunity amount
                </Text>
              ) : (
                <>
                  <Text size="l" align="center">
                    Still no products added to your products book
                    <br />
                    start adding the first one to your playbook
                  </Text>
                  {roleManager.isAccountAdmin() && (
                    <div
                      className={styles.link}
                      onClick={() => {
                        handleClose();
                        history.push(APP_PLAYBOOK_PRODUCTS);
                      }}
                    >
                      <Icon name="externalLink" size={16} />
                      <Text color="bloobirds" size="s" uppercase>
                        Go to products book
                      </Text>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className={styles.result}>
          <div className={styles.resultRow}>
            <Text size="m">Total products price</Text>
            <Text size="m">
              {currency} {totalPrice ? parseAmount(totalPrice) : '0.00'}
            </Text>
          </div>
          <div className={styles.resultRow}>
            <Text size="m">Total extra fee</Text>
            <Text size="m">
              {currency} {totalExtraFee ? parseAmount(totalExtraFee) : '0.00'}
            </Text>
          </div>
          <div className={styles.resultRow}>
            <Text size="m" weight="bold">
              Total opportunity amount
            </Text>
            <Text size="m" weight="bold">
              {currency} {totalOpportunityAmount ? parseAmount(totalOpportunityAmount) : '0.00'}
            </Text>
          </div>
          <div className={styles.resultRow}>
            <Text size="s" color="softPeanut">
              Total with VAT
            </Text>
            <Text size="s" color="softPeanut">
              {currency} {totalAmountWithVAT ? parseAmount(totalAmountWithVAT) : '0.00'}
            </Text>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" color="tomato" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={pushUpdatedProducts}
          disabled={relatedProducts.length === 0 || isSubmitting}
        >
          {isSubmitting ? (
            <Spinner color="white" size={14} name="loadingCircle" />
          ) : (
            'Save Products'
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ManageProductsModal;
