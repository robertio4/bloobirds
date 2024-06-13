import React, { useEffect } from 'react';

import { IconButton, Input, TableCell, TableRow, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import useSWR from 'swr';

import { PRODUCT_FIELDS_LOGIC_ROLE } from '../../../../constants/product';
import { api } from '../../../../utils/api';
import { getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import { ellipsis } from '../../../../utils/strings.utils';
import { calculateTotalPrice, RelatedProduct } from './manageProductsModal';
import styles from './manageProductsModal.module.css';

enum AdornmentPositions {
  RIGHT = 'right',
  LEFT = 'left',
}

export function OpportunityProductRow({
  opportunityProduct,
  onChange,
  onRemove,
  currency,
}: {
  opportunityProduct: RelatedProduct;
  onChange: (product: RelatedProduct) => void;
  onRemove: () => void;
  currency: string;
}) {
  const { data: product, error: productError } = useSWR(
    opportunityProduct?.product && `/bobjects/${opportunityProduct.product}/form`,
    (url: string) => api.get(url),
  );

  const updateProduct = (field: string) => (value: string) => {
    // Replace all non numeric or dot characters with empty string
    value = value.replace(/[^0-9.]/g, '');
    // If there is a dot in the value, and the new value ends with a dot, remove the last dot
    if (value.endsWith('.')) {
      if (value === '.') {
        value = '0.';
      } else {
        const oldValue = value.slice(0, -1);
        value = oldValue.includes('.') ? oldValue : value;
      }
    }
    onChange({
      ...opportunityProduct,
      [field]: value,
    });
  };

  const deleteOpportunityProduct = () => {
    if (opportunityProduct.id) {
      api
        .delete(`/bobjects/${opportunityProduct.id}`, {
          headers: { 'Content-Type': 'application/json' },
          data: {},
        })
        .then(response => {
          //If the product is deleted, we remove it from the list
          if (response.status === 204) {
            onRemove();
          }
        });
    } else {
      onRemove();
    }
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice(opportunityProduct);
    if (totalPrice !== Number(opportunityProduct.totalPrice)) {
      onChange({
        ...opportunityProduct,
        totalPrice,
      });
    }
  }, [opportunityProduct]);

  const isProductSyncedWithSalesforce = getValueFromLogicRole(
    product?.data,
    PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRICEBOOK_ENTRY_ID,
  );

  return (
    <TableRow>
      <TableCell className={styles.cell} width="0">
        <Tooltip
          title={getValueFromLogicRole(product?.data, PRODUCT_FIELDS_LOGIC_ROLE.NAME)}
          position="top"
        >
          <Text size="s">
            {ellipsis(getValueFromLogicRole(product?.data, PRODUCT_FIELDS_LOGIC_ROLE.NAME), 12)}
          </Text>
        </Tooltip>
      </TableCell>
      <TableCell className={styles.cell} width="59px">
        <Input
          value={opportunityProduct.units}
          onChange={updateProduct('units')}
          width="59px"
          size="small"
        />
      </TableCell>
      <TableCell className={styles.cell} width="100px">
        <Input
          adornment={currency}
          value={opportunityProduct.unitPrice}
          onChange={updateProduct('unitPrice')}
          width="100px"
          size="small"
        />
      </TableCell>
      <TableCell className={styles.cell} width="80px">
        <Input
          adornment="%"
          adornmentPosition={AdornmentPositions.RIGHT}
          value={opportunityProduct.vat}
          onChange={updateProduct('vat')}
          width="80px"
          size="small"
        />
      </TableCell>
      <TableCell className={styles.cell} width="80px">
        <Input
          adornment="%"
          adornmentPosition={AdornmentPositions.RIGHT}
          value={opportunityProduct.discount}
          onChange={updateProduct('discount')}
          width="80px"
          size="small"
        />
      </TableCell>
      <TableCell className={styles.cell} width="100px">
        <Tooltip
          title={
            isProductSyncedWithSalesforce && 'Extra fee is not enabled for Salesforce products'
          }
          position="top"
        >
          <Input
            adornment={currency}
            width="100px"
            value={opportunityProduct.extraFee}
            onChange={updateProduct('extraFee')}
            size="small"
            disabled={!!isProductSyncedWithSalesforce}
          />
        </Tooltip>
      </TableCell>
      <TableCell className={styles.cell} width="130px">
        <Input
          adornment={currency}
          value={Math.round((opportunityProduct.totalPrice + Number.EPSILON) * 100) / 100}
          width="130px"
          size="small"
          disabled
        />
      </TableCell>
      <TableCell className={styles.cell} width="0">
        <IconButton name="trashFull" onClick={deleteOpportunityProduct} />
      </TableCell>
    </TableRow>
  );
}
