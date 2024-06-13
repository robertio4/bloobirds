import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Item,
  ModalContent,
  ModalFooter,
  ModalSection,
  Select,
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import styles from '../../styles/fieldsPage.module.css';
import { SortablePicklistValues } from '../sortablePicklistValues/sortablePicklistValues';
import { useEntity } from '../../../../../hooks';
import { forceSelectedEntitiesCacheRefresh } from '../../../../../hooks/entities/useEntity.utils';
import { useUserSettings } from '../../../../../components/userPermissions/hooks';
import { api } from '../../../../../utils/api';

const REFRESHED_ENTITIES = [
  'bobjectFields',
  'bobjectPicklistFieldValues',
  'bobjectGlobalPicklists',
];

export const PicklistModal = ({
  handleClose,
  isCreation,
  isGlobalPicklist,
  modalInfo,
  refresh,
}) => {
  const [isLoading, setIsLoading] = useState();
  const settings = useUserSettings();
  const { createToast } = useToasts();

  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');

  const [picklistValues, setPicklistValues] = useState([]);
  const [picklistValuesFiltered, setPicklistValuesFiltered] = useState([]);

  const methods = useForm({ defaultValues: { name: modalInfo[1]?.name } });
  const searchValue = methods.watch('search');
  const sortValue = methods.watch('sort');
  const sortAlphabetically = () => {
    picklistValues.sort((a, b) => {
      if (a.value > b.value) {
        return 1;
      }
      if (a.value < b.value) {
        return -1;
      }
      return 0;
    });
    const newValues = picklistValues.map((val, i) => ({ ...val, order: i }));
    setPicklistValues(newValues);
    setPicklistValuesFiltered(newValues);
  };

  const handleReset = () => {
    setPicklistValues([]);
    setPicklistValuesFiltered([]);
    methods.setValue('name', '');
  };

  const handleCloseModal = () => {
    handleReset();
    setIsLoading(false);
    handleClose();
  };

  const sortScore = () => {
    picklistValues.sort((a, b) => a.score - b.score);
    const newValues = picklistValues.map((val, i) => ({ ...val, order: i }));
    setPicklistValues(newValues);
    setPicklistValuesFiltered(newValues);
  };

  useEffect(() => {
    setPicklistValues(
      bobjectPicklistFieldValues
        ?.filterBy(isGlobalPicklist ? 'bobjectGlobalPicklist' : 'bobjectField', modalInfo[1]?.id)
        ?.sort((a, b) => a.ordering - b.ordering),
    );
  }, [bobjectPicklistFieldValues, modalInfo]);

  useEffect(() => {
    if (searchValue) {
      setPicklistValuesFiltered(
        picklistValues.filter(pv => pv?.value?.toLowerCase().includes(searchValue?.toLowerCase())),
      );
    } else {
      setPicklistValuesFiltered(picklistValues);
    }
  }, [picklistValues, searchValue]);

  useEffect(() => {
    setPicklistValuesFiltered(picklistValues);
  }, [picklistValues]);

  useEffect(() => {
    if (sortValue === 'alphabetical') {
      sortAlphabetically();
    }
    if (sortValue === 'score') {
      sortScore();
    }
  }, [sortValue]);

  const handleConfirmSave = () => {
    refresh();
    handleCloseModal();
    createToast({ message: 'Values updated succesfully', type: 'success' });
    forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
  };

  const handleSave = async values => {
    setIsLoading(true);
    const valuesToSave = {
      ...values,
      values: picklistValues.map((v, i) => ({
        value: v.value,
        enabled: v.enabled,
        id: v.id?.length > 16 ? null : v.id,
        ordering: i,
        score: v.score,
        account: `/accounts/${settings.account.id}`,
      })),
    };
    if (isCreation && isGlobalPicklist) {
      await api
        .post('/utils/picklists/bobjectGlobalPicklist', valuesToSave)
        .then(() => {
          handleConfirmSave();
        })
        .catch(() => {
          setIsLoading(false);
          createToast({ message: 'You cannot create duplicated picklists values', type: 'error' });
        });
    }
    if (!isCreation && isGlobalPicklist) {
      await api
        .put(`/utils/picklists/bobjectGlobalPicklist/${modalInfo[1]?.id}`, valuesToSave)
        .then(() => {
          handleConfirmSave();
        })
        .catch(() => {
          setIsLoading(false);
          createToast({ message: 'You cannot create duplicated picklists values', type: 'error' });
        });
    }
    if (!isGlobalPicklist) {
      await api
        .put(`/utils/picklists/bobjectField/${modalInfo[1]?.id}`, valuesToSave)
        .then(() => {
          handleConfirmSave();
        })
        .catch(() => {
          setIsLoading(false);
          createToast({ message: 'You cannot create duplicated picklists values', type: 'error' });
        });
    }
  };

  useEffect(() => {
    methods.setValue('name', modalInfo[1]?.name);
  }, [modalInfo]);

  return (
    <>
      <FormProvider {...methods}>
        <ModalContent>
          <ModalSection title="Main information" icon="company">
            {isGlobalPicklist && (
              <Controller
                name="name"
                defaultValue={modalInfo[1]?.name}
                rules={{
                  required: 'This field is required',
                }}
                render={({ onChange, value }) => (
                  <div className={styles._main_info__input}>
                    <Input
                      error={methods.errors.name?.message}
                      placeholder="Name*"
                      size="medium"
                      width="100%"
                      onChange={onChange}
                      value={value}
                    />
                  </div>
                )}
              />
            )}
          </ModalSection>
          <ModalSection title={`Values (${picklistValues?.length})`} icon="list">
            <div className={styles._picklist_values_filters}>
              <div className={styles._picklist_values_sort}>
                <Text size={14}>Sort</Text>
                <Controller
                  name="sort"
                  render={({ onChange, value }) => (
                    <div className={styles._picklist_sort_select}>
                      <Select
                        error={methods.errors.sort?.message}
                        placeholder="Sort"
                        onChange={onChange}
                        value={value}
                        width="100%"
                        borderless={false}
                        size="small"
                      >
                        <Item
                          value="alphabetical"
                          key="picklist-sort-alphabetical"
                          dataTest="picklist-sort-alphabetical"
                        >
                          Alphabetical
                        </Item>
                        <Item
                          value="score"
                          key="picklist-sort-score"
                          dataTest="picklist-sort-score"
                        >
                          Score
                        </Item>
                      </Select>
                    </div>
                  )}
                />
              </div>
              <Controller
                name="search"
                render={({ onChange, value }) => (
                  <div className={styles._search_picklist_value}>
                    <Input
                      error={methods.errors.name?.message}
                      placeholder="Search value"
                      size="small"
                      width="100%"
                      onChange={onChange}
                      value={value}
                    />
                  </div>
                )}
              />
            </div>
            <SortablePicklistValues
              values={picklistValues}
              filteredValues={picklistValuesFiltered}
              setFilteredValues={setPicklistValuesFiltered}
              setValues={setPicklistValues}
              fieldOrGlobal={modalInfo[1]}
            />
          </ModalSection>
        </ModalContent>
        <ModalFooter>
          <div>
            <Button onClick={handleCloseModal} variant="clear">
              CANCEL
            </Button>
          </div>
          <Button onClick={methods.handleSubmit(handleSave)}>
            {isLoading ? <Spinner color="white" /> : 'SAVE VALUES'}
          </Button>
        </ModalFooter>
      </FormProvider>
    </>
  );
};
