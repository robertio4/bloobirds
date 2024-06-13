import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  IconButton,
  Item,
  Select,
  SortableList,
  Text,
  useHover,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import styles from './linkedInFieldsTab.module.css';
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
import LinkedInCardPreview from './components/linkedInCardPreview/linkedInCardPreview';
import EmptyFieldsList from './components/emptyFieldsList/emptyFieldsList';
import { useController, useForm } from 'react-hook-form';
import { forceCacheRefresh } from '../../../../hooks/entities/useEntity.utils';
import { sortBy } from 'lodash';
import { api } from '../../../../utils/api';
import useSWR from 'swr';

function useLinkedInLayoutFields() {
  const { data, error, mutate } = useSWR('/linkedin/settings/layout', api.get);
  return {
    fields: data?.data.fields || [],
    isLoading: !error && !data,
    refreshFields: async () => {
      await mutate();
      await forceCacheRefresh();
    },
  };
}

async function sendFieldsEditedEvent(fields) {
  const positions = {};
  fields.forEach(
    (field, i) => (positions[`Field Position ${i + 1}`] = field.logicRole || field.name),
  );
  mixpanel.track('LEAD_LINKEDIN_LAYOUT_EDITED', positions);
}

const LinkedInFieldsTab = () => {
  const { createToast } = useToasts();
  const [hoverRef, isHover] = useHover();
  const { fields, isLoading, refreshFields } = useLinkedInLayoutFields();

  const {
    formState: { isSubmitting, isDirty },
    reset,
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      selectedFields: [],
      unselectedFields: [],
    },
  });

  const {
    field: { value: selectedFields, onChange: setSelectedFields },
  } = useController({ name: 'selectedFields', control });
  const {
    field: { value: unselectedFields, onChange: setUnselectedFields },
  } = useController({ name: 'unselectedFields', control });

  useEffect(() => {
    if (!isLoading) {
      const visibleFields = fields.filter(field => field.visibleInSettings);
      reset({
        selectedFields: visibleFields.filter(field => field.selected),
        unselectedFields: visibleFields.filter(field => !field.selected),
      });
    }
  }, [isLoading, fields]);

  const selectField = id => {
    const selectedField = unselectedFields.find(field => field.id === id);
    setSelectedFields([...selectedFields, selectedField]);
    setUnselectedFields(unselectedFields.filter(field => field.id !== id));
  };

  const deselectField = id => {
    const removedField = selectedFields.find(field => field.id === id);
    setSelectedFields(selectedFields.filter(field => field.id !== id));
    setUnselectedFields([...unselectedFields, removedField]);
  };

  const saveFields = async data => {
    try {
      const response = await api.put('/linkedin/settings/layout', {
        selectedFieldIds: data.selectedFields.map(field => field.id),
      });

      if (response.status === 200) {
        createToast({ type: 'success', message: 'LinkedIn layout successfully updated' });
      } else {
        createToast({ type: 'error', message: 'Could not save new LinkedIn layout' });
      }

      await sendFieldsEditedEvent(data.selectedFields);
      await refreshFields();
    } catch (e) {
      createToast({ type: 'error', message: 'Something went wrong' });
    }
  };

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="list">LinkedIn Fields</AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle>
            These defaults will be applied to the entire account.
          </AccountSettingsTabSubtitle>
        </AccountSettingsTabHeaderLeft>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <form onSubmit={handleSubmit(saveFields)}>
          <AccountSettingsSection>
            <AccountSettingsSectionTitle>
              Edit the fields available to create leads directly in Bloobirds from the LinkedIn
              chrome extension
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
                      onChange={selectField}
                      value=""
                    >
                      {sortBy(unselectedFields, ['name']).map(field => (
                        <Item key={field.id} label={field.name} value={field.id}>
                          {field.name}
                        </Item>
                      ))}
                    </Select>
                  </div>
                  {selectedFields?.length > 0 ? (
                    <SortableList
                      data={selectedFields}
                      onReorder={setSelectedFields}
                      keyExtractor={field => field.id}
                      renderItem={({ item: field, innerRef, handleProps, containerProps }) => (
                        <div ref={innerRef} {...containerProps} className={styles._item_card}>
                          <div className={styles._item_handler} {...handleProps}>
                            <Icon name="dragAndDrop" size={16} color="softPeanut" />
                          </div>
                          <div className={styles._item_wrapper}>
                            <Text size="s" color="peanut">
                              {field.name}
                            </Text>
                          </div>
                          <div className={styles._item_delete} ref={hoverRef}>
                            <IconButton
                              name="cross"
                              color={isHover ? 'black' : 'softPeanut'}
                              size={20}
                              onClick={() => deselectField(field.id)}
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
                    Some fields like <em>Name</em> cannot be removed since they are required
                  </Text>
                  <LinkedInCardPreview selectedFields={selectedFields} />
                </div>
              </div>
            </AccountSettingsSectionContent>
            <AccountSettingsSectionFooter>
              <Button dataTest="viewsSaveButton" type="submit" disabled={isSubmitting || !isDirty}>
                Save
              </Button>
            </AccountSettingsSectionFooter>
          </AccountSettingsSection>
        </form>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default LinkedInFieldsTab;
