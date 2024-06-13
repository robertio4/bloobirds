import React, { useMemo, useState } from 'react';
import { Button, Item, Section, useToasts } from '@bloobirds-it/flamingo-ui';
import styles from './tabLayout.module.css';
import SegmentationSelect from '../segmentationSelect';
import { useSegmentation } from '../../../../hooks';
import { getBobjectTypeByStage } from '../../../../utils/bobjects.utils';
import { commaAndFormatArray, numberToOrdinalString } from '../../../../utils/strings.utils';
import { useSegmentationValues } from '../../../../hooks/useSegmentationValues';
import SaveModal from '../saveModal';
import { useForm, Controller } from 'react-hook-form';
import { keyBy, mapValues } from 'lodash';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
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
  AccountSettingsSectionSubtitle,
  AccountSettingsSectionTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsSection/accountSettingsSection';
import { BOBJECT_TYPES } from '@bloobirds-it/types';

const TabContent = ({ stage }) => {
  const { segmentations, updateSegmentations, createSegmentations, mutate } = useSegmentation(
    stage,
  );
  const { createToast } = useToasts();
  const [openModal, setOpenModal] = useState(false);
  const stageBobjectTypes = getBobjectTypeByStage(stage);
  const possibleCriteria = useSegmentationValues(stageBobjectTypes);
  const defaultValues = mapValues(keyBy(segmentations, 'id'), 'bobjectFieldId');
  const { handleSubmit, control, formState, reset, watch } = useForm({ defaultValues });

  const hasChanges = !formState.isDirty || formState.isSubmitting;

  const selectedSegmentations = watch();

  const saveAll = async data => {
    try {
      if (!openModal) {
        const shouldOpenModal = Object.entries(defaultValues).some(([segmentationId, oldValue]) => {
          const newValue = data[segmentationId];
          const hasChanged = oldValue !== newValue;
          const isCreated = !oldValue && newValue;
          return hasChanged && !isCreated;
        });

        if (shouldOpenModal) {
          setOpenModal(true);
          return;
        }
      }
      const dataToCreate = [];
      const dataToUpdate = Object.entries(data)
        .map(s => {
          if (s[0].startsWith('new') && s[1]) {
            dataToCreate.push({ ordering: s[0].substring(s[0].length - 1), bobjectFieldId: s[1] });
            return undefined;
          }
          return s;
        })
        .filter(e => e)
        .reduce((a, v) => ({ ...a, [v[0]]: v[1] }), {});

      await createSegmentations(dataToCreate);
      await updateSegmentations(dataToUpdate);
      mutate().then(res => {
        reset(mapValues(keyBy(res, 'id'), 'bobjectFieldId'));
      });
      setOpenModal(false);
      createToast({ type: 'success', message: 'New segmentation settings saved' });
      // Reset only dirty fields
      reset(data, {
        dirtyFields: false,
        dirty: false,
        errors: true,
        isSubmitted: true,
        touched: true,
        isValid: true,
        submitCount: true,
      });
    } catch (e) {
      createToast({ type: 'error', message: 'Something went wrong' });
    }
  };
  const findChangedFields = () => {
    const fields = Object.keys(formState.dirtyFields).map(field => {
      return Object.values(possibleCriteria)
        .flat()
        .find(criteria => {
          return criteria.id === defaultValues[field];
        });
    });
    return fields.filter(field => field).map(field => field?.name);
  };

  const createItems = segmentation => {
    const bobjectField = segmentation?.name;
    const bobjectFieldId = segmentation?.id;
    const isCriteriaAlreadySelected = Object.values(selectedSegmentations).includes(
      segmentation.id,
    );
    return (
      <Item
        key={bobjectFieldId}
        hidden={isCriteriaAlreadySelected}
        label={bobjectField}
        value={bobjectFieldId}
      >
        {`${segmentation.name} ${!segmentation.enabled ? '(disabled)' : ''}`}
      </Item>
    );
  };

  const segmentationItems = type =>
    useMemo(() => possibleCriteria[type]?.map(criteria => createItems(criteria)), [
      possibleCriteria,
    ]);

  const leadSegmentation = segmentationItems(BOBJECT_TYPES.LEAD);
  const companySegmentation = segmentationItems(BOBJECT_TYPES.COMPANY);
  const opportunitySegmentation = segmentationItems(BOBJECT_TYPES.OPPORTUNITY);
  const stringStageBobjectTypes = commaAndFormatArray(stageBobjectTypes);
  const segmentationsToShow = Array(5)
    .fill({})
    .map((segmentations, i) => ({ id: `new-${i}`, ordering: i }));

  segmentations.forEach(segmentation => {
    segmentationsToShow[segmentation.ordering] = segmentation;
  });

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="filter" color="purple">
            Segmentation criteria
          </AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle />
        </AccountSettingsTabHeaderLeft>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <form onSubmit={handleSubmit(saveAll)}>
          <AccountSettingsSection>
            <AccountSettingsSectionTitle>
              Select the segmentation criteria for your playbook content
            </AccountSettingsSectionTitle>
            <AccountSettingsSectionSubtitle>
              The segmentation defined here will be the one you can apply when creating a template
              or qualifying question and will define the filters available in the messaging section
              of the {stringStageBobjectTypes}
            </AccountSettingsSectionSubtitle>
            <AccountSettingsSectionContent>
              <div className={styles.selectList}>
                {segmentationsToShow.map(segmentation => {
                  const { ordering, id } = segmentation;
                  const isProspect = stage === 'PROSPECT';
                  const title = `${numberToOrdinalString(ordering + 1)} criteria`;

                  return (
                    <Controller
                      name={id}
                      key={id}
                      control={control}
                      as={
                        <SegmentationSelect title={title} autocomplete={true}>
                          {selectedSegmentations[id] && (
                            <Item value="">
                              <em>None</em>
                            </Item>
                          )}
                          {!isProspect && <Section>Opportunity fields</Section>}
                          {opportunitySegmentation}
                          <Section>Company fields</Section>
                          {companySegmentation}
                          {leadSegmentation && <Section>Lead fields</Section>}
                          {leadSegmentation}
                        </SegmentationSelect>
                      }
                    />
                  );
                })}
              </div>
            </AccountSettingsSectionContent>
            <AccountSettingsSectionFooter>
              <Button
                disabled={hasChanges}
                type="submit"
                color={hasChanges ? 'lighterGray' : 'purple'}
              >
                Save
              </Button>
            </AccountSettingsSectionFooter>
            <SaveModal
              open={openModal}
              onSave={handleSubmit(saveAll)}
              onClose={() => setOpenModal(false)}
              changedFields={findChangedFields()}
            />
          </AccountSettingsSection>
        </form>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

const TabLayout = ({ stage }) => {
  const { isLoading } = useSegmentation(stage);

  if (isLoading) {
    return null;
  }

  return <TabContent stage={stage} />;
};

export default TabLayout;
