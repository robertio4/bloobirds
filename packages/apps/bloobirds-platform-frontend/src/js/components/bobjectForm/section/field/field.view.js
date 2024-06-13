import React from 'react';

import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import ChipField from './chipField';
import DateField from './dateField';
import DateTimeField from './dateTimeField';
import DecimalField from './decimalField';
import DropdownField from './dropdownField';
import EmailField from './emailField';
import MultiPicklistField from './multiPicklistField/multiPicklistField.view';
import MultilineField from './multilineField';
import NumberField from './numberField';
import PhoneField from './phoneField';
import { ReferenceEntityField } from './referenceEntityField/referenceEntityField';
import TextField from './textField';
import UrlField from './urlField';

// TODO: Memoize into a single function by field id
const isPickList = field => field.type === 'Picklist' || field.type === 'Global Picklist';
const isChip = field => isPickList(field) && field.picklistType === 'CHIP';
const isReference = field => field.type === 'Reference' && field.referencedBobjectType;
const isDatetime = field => field.type === 'DateTime';
const isPhoneNumber = field => field.type === 'Phone';
const isDate = field => field.type === 'Date';
const isEmail = field => field.type === 'Email';
const isUrl = field => field.type === 'URL';
const isNumber = field => field.type === 'Number';
const isDecimal = field => field.type === 'Decimal';
const isReferenceEntity = field => field.type === 'Reference entity';
const isMultiPicklist = field =>
  field.type === 'Multi picklist' || field.type === 'Multi global picklist';
const isMultiLine = field => field.multiline;

const Field = props => {
  const hasSalesEnabled = useFullSalesEnabled();

  if (isDatetime(props)) {
    return <DateTimeField {...props} />;
  }

  if (isDate(props)) {
    return <DateField {...props} />;
  }

  if (isReference(props) || isPickList(props)) {
    if (isChip(props)) {
      return <ChipField {...props} />;
    }
    return <DropdownField {...props} />;
  }

  if (isPhoneNumber(props)) {
    return <PhoneField {...props} />;
  }

  if (isEmail(props)) {
    return <EmailField {...props} />;
  }

  if (isUrl(props)) {
    return <UrlField {...props} />;
  }

  if (isDecimal(props)) {
    return <DecimalField isProductsEnabled={hasSalesEnabled} {...props} />;
  }

  if (isNumber(props)) {
    return <NumberField {...props} />;
  }

  if (isMultiLine(props)) {
    return <MultilineField {...props} />;
  }

  if (isMultiPicklist(props)) {
    return <MultiPicklistField {...props} />;
  }

  if (isReferenceEntity(props)) {
    return <ReferenceEntityField {...props} />;
  }

  return <TextField {...props} />;
};
export default Field;
