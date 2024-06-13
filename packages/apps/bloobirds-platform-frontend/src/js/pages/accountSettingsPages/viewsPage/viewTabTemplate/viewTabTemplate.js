import React, { useEffect, useState } from 'react';
import { forceCacheRefresh } from '../../../../hooks/entities/useEntity.utils';
import {
  Button,
  SortableList,
  IconButton,
  IconPicker,
  Item,
  Select,
  Text,
  useHover,
  useToasts,
  Icon,
} from '@bloobirds-it/flamingo-ui';
import { useEntity, useActiveUser } from '../../../../hooks';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import EmptyFieldsList from './emptyFieldsList';
import CardPreview from './cardPreview';
import styles from './viewTabTemplate.module.css';
import mixpanel from 'mixpanel-browser';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import {
  AccountSettingsSection,
  AccountSettingsSectionContent,
  AccountSettingsSectionFooter,
  AccountSettingsSectionTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsSection/accountSettingsSection';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import { RestApi } from '../../../../misc/api/rest';

const saveField = (accountId, fieldId, data) =>
  RestApi.patch({
    entity: 'bobjectFields',
    id: fieldId,
    body: {
      ...data,
      account: `/accounts/${accountId}`,
    },
  });

function useBobjectCardFields(bobjectType) {
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const bobjectTypeId = bobjectTypes?.findBy('name')(bobjectType)?.id;
  const allFields = bobjectFields
    ?.filterBy('bobjectType', bobjectTypeId)
    ?.filter(field => field.enabled)
    .sort((a, b) => a.infoCardOrder - b.infoCardOrder);
  const [fields, setFields] = useState([]);
  useEffect(() => {
    if (fields.length === 0 && allFields) {
      setFields(allFields);
    }
  }, [allFields]);
  return [fields, setFields];
}

const ViewTabTemplate = ({ bobjectType }) => {
  const { createToast } = useToasts();
  const [hoverRef, isHover] = useHover();
  const { activeAccount } = useActiveUser();
  const [fields, setFields] = useBobjectCardFields(bobjectType);
  const fieldsToShow = fields.filter(field => field.infoCardShow);
  const allowedFields = fields.filter(field => !field.infoCardShow);
  const hasChanges = fields.some(field => field.hasChanges);

  const addFieldToSelected = fieldId => {
    const maxInfoCardOrder = Math.max(...fields.map(field => field.infoCardOrder || 0));
    setFields(
      fields
        .map(field =>
          field.id === fieldId
            ? {
                ...field,
                infoCardShow: true,
                hasChanges: true,
                infoCardOrder: maxInfoCardOrder + 1,
                icon: field.icon || 'bookmark',
              }
            : field,
        )
        .sort((a, b) => a.infoCardOrder - b.infoCardOrder),
    );
  };

  const handleReorder = reorderedFields => {
    const newFields = [...fields];
    reorderedFields.forEach((field, index) => {
      const fieldIndex = newFields.findIndex(f => f.id === field.id);
      newFields[fieldIndex] = {
        ...field,
        infoCardOrder: index,
        hasChanges: true,
      };
    });
    const ordering = newFields.sort((a, b) => a.infoCardOrder - b.infoCardOrder);
    setFields(ordering);
  };

  const changeFieldIcon = (fieldId, icon) => {
    setFields(
      fields.map(field =>
        field?.id === fieldId ? { ...field, layoutIcon: icon, hasChanges: true } : field,
      ),
    );
  };

  const saveAllFields = async fieldsSave => {
    await Promise.all(
      fieldsSave.map(async field => {
        await saveField(activeAccount?.id, field?.id, {
          infoCardOrder: field?.infoCardOrder,
          infoCardShow: field?.infoCardShow,
          layoutIcon: field?.layoutIcon,
        });
      }),
    ).then(() => {
      forceCacheRefresh();
    });
  };

  const updateFields = async () => {
    const fieldsToUpdate = fields.filter(field => field.hasChanges);
    await saveAllFields(fieldsToUpdate);
    createToast({ type: 'success', message: 'View successfully updated' });
    setFields(
      fields.map(field => ({
        ...field,
        hasChanges: false,
      })),
    );
    const listOfFields = {};
    fieldsToUpdate.map(
      (field, i) => (listOfFields[`Field Position ${i}`] = field.logicRole || field.name),
    );
    mixpanel.track(`${bobjectType}_VIEW_EDITED`, {
      ...listOfFields,
    });
  };

  const removeField = id => {
    setFields(
      fields.map(field =>
        field.id === id ? { ...field, infoCardShow: false, hasChanges: true } : field,
      ),
    );
  };
  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="company">
            {bobjectType} view options
          </AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle>
            These defaults will be applied to the entire account.
          </AccountSettingsTabSubtitle>
        </AccountSettingsTabHeaderLeft>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <AccountSettingsSection>
          <AccountSettingsSectionTitle>
            Edit the information visible in the {bobjectType.toLowerCase()} view
          </AccountSettingsSectionTitle>
          <AccountSettingsSectionContent>
            <div className={styles._section_wrapper}>
              <div className={styles._column_wrapper}>
                <Text size="s">Available fields to display</Text>
                <Text size="xs" color="softPeanut">
                  We recommend a maximum of 10 fields to display the information correctly.
                </Text>
                <div className={styles._search_wrapper}>
                  <Select
                    placeholder="Search..."
                    width="322px"
                    autocomplete
                    onChange={addFieldToSelected}
                    value=""
                  >
                    {allowedFields.map(field => (
                      <Item
                        key={field?.id}
                        label={field?.name !== 'ICP' ? field?.name : 'Buyer persona'}
                        value={field?.id}
                      >
                        {field?.name !== 'ICP' ? field?.name : 'Buyer persona'}
                      </Item>
                    ))}
                  </Select>
                </div>
                {fields?.length > 0 ? (
                  <SortableList
                    data={fieldsToShow}
                    onReorder={handleReorder}
                    className={styles._item_list}
                    keyExtractor={field => field.id}
                    renderItem={({ item: field, innerRef, handleProps, containerProps }) => (
                      <div ref={innerRef} {...containerProps} className={styles._item_card}>
                        <div className={styles._item_handler} {...handleProps}>
                          <Icon name="dragAndDrop" size={16} color="softPeanut" />
                        </div>
                        <div className={styles._item_wrapper}>
                          <IconPicker
                            defaultValue={field?.layoutIcon}
                            searchable
                            onChange={newIcon => changeFieldIcon(field?.id, newIcon)}
                          />
                          <Text size="s" color="peanut">
                            {field?.name !== 'ICP' ? field?.name : 'Buyer persona'}
                          </Text>
                        </div>
                        <div className={styles._item_delete} ref={hoverRef}>
                          <IconButton
                            name="cross"
                            color={isHover ? 'black' : 'softPeanut'}
                            size={20}
                            onClick={() => removeField(field?.id)}
                          />
                        </div>
                      </div>
                    )}
                  />
                ) : (
                  <EmptyFieldsList />
                )}
              </div>
              <div className={styles._column_wrapper}>
                <Text size="s">Preview</Text>
                <Text size="xs" color="softPeanut">
                  The card will display the value of the selected field, if the field is not filled,
                  it will not be displayed.
                </Text>
                <CardPreview bobjectType={bobjectType} selectedFields={fieldsToShow} />
              </div>
            </div>
          </AccountSettingsSectionContent>
          <AccountSettingsSectionFooter>
            <Button dataTest="viewsSaveButton" onClick={updateFields} disabled={!hasChanges}>
              Save
            </Button>
          </AccountSettingsSectionFooter>
        </AccountSettingsSection>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default ViewTabTemplate;
