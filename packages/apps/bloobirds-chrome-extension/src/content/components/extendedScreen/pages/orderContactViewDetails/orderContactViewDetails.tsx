// @ts-ignore
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  IconButton,
  Item,
  Select,
  Skeleton,
  SortableList,
  Text,
  useHover,
} from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { CustomUserHelperKeys, Dictionary, ExtensionBobject } from '@bloobirds-it/types';
import { areListsEqual } from '@bloobirds-it/utils';
import range from 'lodash/range';

import {
  OrderedField,
  postNewOrder,
  useBloobirdsFields,
  useOrderedFields,
} from '../../../../../hooks/useOrderedFields';
import { useSalesforceFields } from '../../../../../hooks/useSalesforceFields';
import {
  ContactDetailsSource,
  Source,
} from '../../../contactDetails/contactDetailSource/contactDetailSource';
import { NoFieldsSelectedToDisplay } from '../../../contactDetails/noFieldsSelectedToDisplay/noFieldsSelectedToDisplay';
import { useExtensionContext } from '../../../context';
import styles from './orderContactViewDetails.module.css';

interface SortableFieldsProps {
  bobject: ExtensionBobject;
  extraInfo: Dictionary<any>;
  mutate: () => void;
}

export const OrderContactViewDetails = ({ bobject, extraInfo, mutate }: SortableFieldsProps) => {
  const [source, setSource] = useState<Source>(extraInfo?.source);
  const [fieldsToSave, setFieldsToSave] = useState([]);
  const [savedFields, setSavedFields] = useState([]);
  const { closeExtendedScreen } = useExtensionContext();
  const { t } = useTranslation();
  // Handle default with helpers
  const { saveCustom, get } = useUserHelpers();
  const helperKey = CustomUserHelperKeys.HAVE_SAVED_FIELDS_CUSTOM_ORDER;
  const helperValue: string[] = get(helperKey) ? JSON.parse(get(helperKey)) : [];
  const helperValueKey = source + bobject?.id?.typeName;

  // Get Fields from data model
  const { bloobirdsFields, bloobirdsOptions } = useBloobirdsFields(
    bobject,
    helperValue.includes(helperValueKey),
  );
  const { salesforceFields, salesforceOptions } = useSalesforceFields(
    bobject,
    helperValue.includes(helperValueKey),
  );
  // Get ordered fields from BE
  const { orderedFields } = useOrderedFields(source, bobject?.id?.typeName);

  // All fields from source (to display in select)
  const sourceFields =
    source === Source.salesforce ? (salesforceOptions as OrderedField[]) : bloobirdsOptions;

  // Save ordered fields from BE as fields to save
  useEffect(() => {
    if (orderedFields && (orderedFields.length || helperValue.includes(helperValueKey))) {
      setFieldsToSave(source === Source.salesforce ? salesforceFields : orderedFields);
      setSavedFields(source === Source.salesforce ? salesforceFields : orderedFields);
    } else {
      setFieldsToSave(source === Source.salesforce ? salesforceFields : bloobirdsFields);
    }
  }, [orderedFields?.length, bloobirdsFields?.length, salesforceFields?.length]);

  // Send new order to BE
  async function acceptChanges() {
    if (!areListsEqual(savedFields, fieldsToSave)) {
      if (!helperValue.includes(helperValueKey)) {
        const toBeSaved = helperValue.concat([helperValueKey]);
        saveCustom({ key: helperKey, data: JSON.stringify(toBeSaved) });
      }
      await postNewOrder(fieldsToSave, source, bobject?.id?.typeName);
      mutate();
    }
    closeExtendedScreen();
  }

  function handleDiscard() {
    setFieldsToSave([]);
    setSavedFields([]);
    closeExtendedScreen();
  }

  function updateCompoundSource(value: Source) {
    extraInfo.setSource(value);
    setSource(value);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_element}>
            <Text size="s" color="peanut" weight="bold">
              {t('extendedScreen.contactViewFields.selectFieldsFrom')}
            </Text>
          </div>
          <div className={styles.header_element}>
            <ContactDetailsSource source={source} setSource={updateCompoundSource} size={'m'} />
          </div>
        </div>
        <div className={styles.row}>
          <Text size="s" color="peanut" weight="bold">
            {t('extendedScreen.contactViewFields.availableFields')}
          </Text>
        </div>
        <div className={styles.row}>
          <Text size="xs" color="softPeanut">
            {t('extendedScreen.contactViewFields.searchText')}
          </Text>
        </div>
        <SortableFields
          fields={fieldsToSave}
          setFields={setFieldsToSave}
          allFields={sourceFields}
        />
      </div>
      <div className={styles.footerContainer}>
        <Button
          className={styles.button}
          variant="secondary"
          onClick={handleDiscard}
          iconLeft="reply"
        >
          {t('common.discard')}
        </Button>
        <Button className={styles.button} onClick={acceptChanges} iconLeft="save">
          {t('common.accept')}
        </Button>
      </div>
    </div>
  );
};

export function SortableFields({
  fields,
  setFields,
  allFields,
}: {
  fields: OrderedField[];
  setFields: React.Dispatch<React.SetStateAction<OrderedField[]>>;
  allFields: OrderedField[];
}) {
  const { t } = useTranslation();
  const [hoverRef, isHover] = useHover();
  const [selectableFields, setSelectableFields] = useState([]); // fields to choose from
  // Filter all fields to get only the ones that are not already selected
  useEffect(() => {
    if (allFields && fields) {
      setSelectableFields(allFields.filter(f => !fields.find(g => g.fieldId === f.fieldId)));
    }
  }, [allFields, fields]);

  // Save new order to state
  const handleReorder = (newOrder: OrderedField[]) => {
    setFields(newOrder);
  };
  // Add field to ordered, remove from selectable
  const addField = (field: OrderedField) => {
    setFields(fields => [...(fields || []), field]);
    setSelectableFields(selectFields => selectFields.filter(selectField => selectField !== field));
  };
  // Remove field from ordered, add to selectable
  const removeField = (field: OrderedField) => {
    setFields(fields => fields.filter(allowedField => allowedField !== field));
    setSelectableFields(allowedFields => [...(allowedFields || []), field]);
  };

  return (
    <>
      <div className={styles._search_wrapper}>
        <Select
          placeholder={`${t('common.search')}...`}
          autocomplete
          onChange={addField}
          value=""
          size="small"
          borderless={false}
          width="100%"
          dropdownProps={{ customStyles: { boxShadow: 'none' } }}
        >
          {selectableFields.map(field => (
            <Item
              key={field.fieldId}
              label={field.name}
              value={field}
              className={styles.selectOptions}
            >
              {field.name}
            </Item>
          ))}
        </Select>
      </div>
      {fields === undefined || fields === null ? (
        <ActivityFeedSkeleton />
      ) : fields?.length > 0 ? (
        <SortableList
          data={fields}
          onReorder={handleReorder}
          className={styles._item_list}
          keyExtractor={field => field.fieldId}
          renderItem={({ item: field, innerRef, handleProps, containerProps }) => (
            <div className={styles._item_card} ref={innerRef} {...containerProps} {...handleProps}>
              <div className={styles._item_handler}>
                <Icon name="dragAndDrop" size={20} color="verySoftPeanut" />
              </div>
              <div className={styles._item_wrapper}>{field.name}</div>
              <div className={styles._item_delete} ref={hoverRef}>
                <IconButton
                  name="cross"
                  color={isHover ? 'black' : 'softPeanut'}
                  size={20}
                  onClick={() => removeField(field)}
                />
              </div>
            </div>
          )}
        />
      ) : (
        <NoFieldsSelectedToDisplay />
      )}
    </>
  );
}

const ActivityCardSkeleton = () => (
  <div className={styles.card}>
    <header className={styles.cardHeader}>
      <Skeleton variant="circle" width={16} height={16} />
      <div className={styles.cardHeaderText}>
        <Skeleton variant="text" width="100%" height={16} />
      </div>
      <Skeleton variant="rect" width={16} height={16} />
    </header>
  </div>
);

const ActivityFeedSkeleton = () => (
  <>
    {range(8).map(number => (
      <Fragment key={number}>
        <ActivityCardSkeleton />
      </Fragment>
    ))}
  </>
);
