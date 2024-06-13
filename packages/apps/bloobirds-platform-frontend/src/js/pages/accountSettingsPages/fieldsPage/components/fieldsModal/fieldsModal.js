import React, { useEffect, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  Button,
  Collapsible,
  Icon,
  IconButton,
  IconInputPicker,
  Input,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Text,
  TextArea,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, BOBJECT_TYPES } from '@bloobirds-it/types';
import classnames from 'clsx';

import { useUserSettings } from '../../../../../components/userPermissions/hooks';
import { useEntity } from '../../../../../hooks';
import { forceSelectedEntitiesCacheRefresh } from '../../../../../hooks/entities/useEntity.utils';
import { useEntityActions } from '../../../../../hooks/entities/useEntityActions';
import { useBobjectFieldGroupsCleaning } from '../../../../../hooks/useBobjectFieldGroups';
import { useSteppableModal } from '../../../../../hooks/useSteppableModal';
import { useUserHelpers } from '../../../../../hooks/useUserHelpers';
import { ConfirmDeleteModalLayout } from '../../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import { BOBJECT_FIELD } from '../../constants/fields.constants';
import { useGroupFields } from '../../hooks/useGroupFields';
import styles from '../../styles/fieldsPage.module.css';
import ConfirmationEmailModal from '../confirmationFieldModal/confirmationEmailModal';
import { PicklistModal } from '../picklistModal/picklistModal';
import { SizeField } from '../sizeField/sizeField';

const REFRESHED_ENTITIES = [
  'bobjectFields',
  'bobjectPicklistFieldValues',
  'bobjectGlobalPicklists',
];

const HIDE_FIELD_TYPE = ['REFERENCE', 'REFERENCE_ENTITY', 'REFERENCE_LIST'];

export const FieldsModal = ({
  handleClose,
  isCreation,
  bobjectType,
  initialStep = 1,
  field,
  refresh,
  isGlobalPicklist,
}) => {
  const settings = useUserSettings();

  const isSystemField = !!field?.logicRole;

  const totalSteps = 2;
  const {
    currentStep,
    handleReset,
    handleAdvanceStep,
    modalInfo,
    setModalInfo,
  } = useSteppableModal({
    totalSteps,
    initialStep,
  });
  const methods = useForm({ defaultValues: field });
  const { cleanCachedBobjectGroups } = useBobjectFieldGroupsCleaning();
  const [isLoading, setIsLoading] = useState(false);
  const [fieldsByGroup, setFieldsByGroup] = useState([]);
  const [showGroupPreview, setShowGroupPreview] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const bobjectFields = useEntity('bobjectFields');
  const fieldTypes = useEntity('fieldTypes');
  const { groups: fieldGroup } = useGroupFields();
  const bobjectGlobalPicklist = useEntity('bobjectGlobalPicklists');
  const bobjectTypes = useEntity('bobjectTypes');

  const fieldTypeValue = methods.watch('fieldType');
  const fieldGroupValue = methods.watch('bobjectFieldGroup');
  const nameValue = methods.watch('name');
  const orderingValue = methods.watch('ordering');
  const bobjectTypeName = bobjectTypes?.find(bt => bt?.id === bobjectType)?.name;
  const fieldGroupRef = useRef();

  const { handleUpdateEntity, handleCreateEntity, handleDeleteEntity } = useEntityActions();

  const handleCloseModal = () => {
    handleReset();
    handleClose();
  };

  const handleDeleteField = () => {
    setIsDeleting(true);
    handleDeleteEntity({
      id: field?.id,
      entityName: 'bobjectFields',
      label: 'Field',
      callback: () => {
        forceSelectedEntitiesCacheRefresh(BOBJECT_FIELD);
        cleanCachedBobjectGroups();
        setConfirmModalOpen(false);
        setIsDeleting(false);
        refresh();
        handleCloseModal();
      },
    });
  };

  const handleSkip = () => {
    handleCloseModal();
  };

  useEffect(() => {
    if (initialStep === 2) {
      setModalInfo({
        ...modalInfo,
        [initialStep - 1]: {
          ...field,
        },
      });
    }
  }, [initialStep, field]);

  useEffect(() => {
    const bfs = bobjectFields
      ?.filterBy('bobjectFieldGroup', fieldGroupValue)
      ?.filter(bf => bf.enabled && bf.bobjectType === bobjectType);

    bfs.push({ name: nameValue || 'NEW FIELD', ordering: orderingValue || 0, isNewField: true });

    setFieldsByGroup(bfs?.sort((a, b) => a.ordering - b.ordering));
    setShowGroupPreview(!!fieldGroupValue);
  }, [
    fieldGroupValue,
    bobjectType,
    nameValue,
    orderingValue,
    setFieldsByGroup,
    setShowGroupPreview,
  ]);

  const picklistTypeId = fieldTypes.find(t => t.name === 'Picklist')?.id;
  const multiPicklistTypeId = fieldTypes.find(t => t.name === 'Multi picklist')?.id;
  const multiGlobalPicklistTypeId = fieldTypes.find(t => t.name === 'Multi global picklist')?.id;
  const referenceListId = fieldTypes.find(t => t.name === 'Reference list')?.id;
  const globalPicklistTypeId = fieldTypes.find(t => t.name === 'Global Picklist')?.id;
  const phoneTypeId = fieldTypes.find(t => t.name === 'Phone')?.id;
  const emailTypeId = fieldTypes.find(t => t.name === 'Email')?.id;
  const numberTypeId = fieldTypes.find(t => t.name === 'Number')?.id;
  const decimalTypeId = fieldTypes.find(t => t.name === 'Decimal')?.id;
  const urlTypeId = fieldTypes.find(t => t.name === 'URL')?.id;
  const textTypeId = fieldTypes.find(t => t.name === 'Text')?.id;
  const globalPicklistFiltered = bobjectGlobalPicklist?.all()?.filter(p => !p.qualifyingQuestion);

  const isEmail = field && field.fieldType === emailTypeId;
  const validEmailTemplateFields = [
    textTypeId,
    picklistTypeId,
    phoneTypeId,
    emailTypeId,
    numberTypeId,
    urlTypeId,
    globalPicklistTypeId,
    decimalTypeId,
  ];
  const isReferenceField = fieldTypes?.get(field?.fieldType)?.name === 'Reference';
  const { save } = useUserHelpers();
  const handleSave = (values, isSaveContinue) => {
    setIsLoading(true);
    const valuesToSave = {
      ...values,
      account: `/accounts/${settings.account.id}`,
      bobjectFieldGroup: `/bobjectFieldGroups/${values.bobjectFieldGroup}`,
      bobjectGlobalPicklist: values.bobjectGlobalPicklist
        ? `/bobjectFieldGroups/${values.bobjectGlobalPicklist}`
        : null,
      fieldType: `/fieldTypes/${values.fieldType}`,
      bobjectType: `/bobjectTypes/${bobjectType}`,
      reportingName: values.name,
    };
    if (field) {
      handleUpdateEntity({
        id: field.id,
        entityName: 'bobjectFields',
        body: valuesToSave,
        label: 'Field',
        callback: ({ response, error }) => {
          if (error) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            if (
              (values.fieldType === picklistTypeId || values.fieldType === multiPicklistTypeId) &&
              isSaveContinue
            ) {
              handleAdvanceStep(response);
              cleanCachedBobjectGroups();
            } else {
              handleCloseModal();
            }
            cleanCachedBobjectGroups();
            refresh();
            forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
          }
        },
      });
    } else {
      handleCreateEntity({
        entityName: 'bobjectFields',
        body: valuesToSave,
        label: 'Field',
        callback: ({ response, error }) => {
          if (error) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            if (
              (values.fieldType === picklistTypeId || values.fieldType === multiPicklistTypeId) &&
              isSaveContinue
            ) {
              handleAdvanceStep(response);
              cleanCachedBobjectGroups();
            } else {
              handleCloseModal();
            }
            cleanCachedBobjectGroups();
            refresh();
            forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
          }
        },
      });
    }
    if (bobjectTypeName === BOBJECT_TYPES.COMPANY) save(UserHelperKeys.SET_COMPANY_FIELDS_TOUR);
    if (bobjectTypeName === BOBJECT_TYPES.LEAD) save(UserHelperKeys.SET_LEAD_FIELDS_TOUR);
  };

  useEffect(() => {
    if (methods?.errors?.['bobjectFieldGroup']) {
      fieldGroupRef.current.scrollIntoView({ behaviour: 'smooth', block: 'center' });
    }
  }, [methods.errors]);

  const title = () => {
    if (currentStep === 1) {
      return `${isCreation ? 'Create' : 'Edit'} ${field?.name || ''} field `;
    }
    if (isGlobalPicklist) {
      return isCreation
        ? `Create global picklist values`
        : `Edit global picklist values from ${field?.name}`;
    }
    return isCreation ? `Create picklist values` : `Edit picklist values from ${field?.name}`;
  };

  const buttonSaveText = isSaveContinue => {
    if (isSaveContinue) {
      return isCreation ? 'CREATE & ADD VALUE' : 'SAVE & ADD VALUE';
    }
    return isCreation ? 'CREATE' : 'SAVE';
  };

  const isMultipicklist =
    fieldTypeValue === picklistTypeId || fieldTypeValue === multiPicklistTypeId;

  return (
    <Modal open onClose={handleSkip} width={800}>
      <ModalHeader variant="primary">
        <ModalTitle variant="primary">
          <div className={styles._title__container}>
            <Icon
              name={currentStep === 0 ? 'company' : 'hamburgerList'}
              color="peanut"
              className={styles._icon}
            />
            <Text size={16} inline color="peanut">
              {title()}{' '}
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon variant="primary" color="peanut" onClick={handleCloseModal} />
      </ModalHeader>
      {currentStep === 1 && (
        <>
          <FormProvider {...methods}>
            <div className={styles._modal__content}>
              <ModalContent>
                <ModalSection title="Main information" icon="company">
                  <div className={styles._main_info__section}>
                    <Controller
                      name="name"
                      rules={{
                        required: 'This field is required',
                      }}
                      render={({ onChange, value }) => (
                        <div className={styles._main_info__input}>
                          {isSystemField && (
                            <Tooltip
                              title={
                                'This is a field used by the system, some properties are not available to edit.'
                              }
                              position={'top'}
                            >
                              <div className={styles._field_input_full_tooltip} />
                            </Tooltip>
                          )}
                          <div
                            className={classnames({
                              [styles._tooltip_enabled]: isSystemField,
                            })}
                          >
                            <Input
                              disabled={isSystemField}
                              error={methods.errors.name?.message}
                              placeholder="Name*"
                              size="medium"
                              width="100%"
                              onChange={onChange}
                              value={value}
                            />
                          </div>
                        </div>
                      )}
                    />
                    <div className={styles._field_inputs}>
                      <Controller
                        name="fieldType"
                        rules={{
                          required: 'This field is required',
                        }}
                        render={({ onChange, value }) => (
                          <div className={styles._main_info__input_mid}>
                            {!isCreation && (
                              <Tooltip
                                title={'You cannot change the field type for an existing fields'}
                                position={'top-start'}
                              >
                                <div className={styles._field_input_mid_tooltip} />
                              </Tooltip>
                            )}
                            <div
                              className={classnames({
                                [styles._tooltip_enabled]: !isCreation,
                              })}
                            >
                              <Select
                                error={methods.errors.fieldType?.message}
                                placeholder="Field type*"
                                disabled={!isCreation}
                                size="medium"
                                onChange={onChange}
                                value={value}
                                width="100%"
                              >
                                {fieldTypes
                                  ?.all()
                                  ?.filter(type => !HIDE_FIELD_TYPE.includes(type?.enumName))
                                  ?.map(type => (
                                    <Item value={type.id} key={type.id} dataTest={`${type.name}`}>
                                      {type.name}
                                    </Item>
                                  ))}
                              </Select>
                            </div>
                          </div>
                        )}
                      />
                      {(fieldTypeValue === picklistTypeId ||
                        fieldTypeValue === globalPicklistTypeId) && (
                        <Controller
                          name="layoutFormPicklistType"
                          rules={{
                            required: 'This field is required',
                          }}
                          render={({ onChange, value }) => (
                            <div className={styles._main_info__input_mid}>
                              <Select
                                error={methods.errors.layoutFormPicklistType?.message}
                                placeholder="Picklist type*"
                                size="medium"
                                onChange={onChange}
                                value={value}
                                width="100%"
                              >
                                <Item value="DROPDOWN" key="DROPDOWN" dataTest="DROPDOWN">
                                  Dropdown
                                </Item>
                                <Item value="CHIP" key="CHIP" dataTest="CHIP">
                                  Chip
                                </Item>
                              </Select>
                            </div>
                          )}
                        />
                      )}
                    </div>
                    {(fieldTypeValue === globalPicklistTypeId ||
                      fieldTypeValue === multiGlobalPicklistTypeId) && (
                      <Controller
                        name="bobjectGlobalPicklist"
                        rules={{
                          required: 'This field is required',
                        }}
                        render={({ onChange, value }) => (
                          <div className={styles._main_info__input}>
                            {!isCreation && (
                              <Tooltip
                                title={'You cannot change global picklist for existing fields'}
                                position={'top-start'}
                              >
                                <div className={styles._field_input_full_tooltip} />
                              </Tooltip>
                            )}
                            <div
                              className={classnames({
                                [styles._tooltip_enabled]: !isCreation,
                              })}
                            >
                              <Select
                                error={methods.errors.bobjectGlobalPicklist?.message}
                                placeholder="Global picklist*"
                                size="medium"
                                width="100%"
                                disabled={isSystemField}
                                onChange={onChange}
                                value={value}
                                inline={false}
                              >
                                {globalPicklistFiltered?.map(globalPicklist => (
                                  <Item
                                    value={globalPicklist.id}
                                    key={globalPicklist.id}
                                    dataTest={`${globalPicklist.name}`}
                                  >
                                    {globalPicklist.name}
                                  </Item>
                                ))}
                              </Select>
                            </div>
                          </div>
                        )}
                      />
                    )}
                    <Text size={14} className={styles._main_info__text} weight="bold">
                      Should this field be mandatory?
                    </Text>
                    <Text size={14}>
                      If this field is not filled in, it is not possible to save an object either
                      manually or by import.
                    </Text>
                    <Controller
                      name="required"
                      defaultValue={false}
                      render={({ onChange, value }) => (
                        <div className={styles._main_info__input}>
                          <RadioGroup onChange={onChange} value={value}>
                            <Radio size="medium" value={false}>
                              <div className={styles._radio_text}>Don’t mark as required</div>
                            </Radio>
                            <Radio size="medium" value>
                              <div className={styles._radio_text}>Mark as required</div>
                            </Radio>
                          </RadioGroup>
                        </div>
                      )}
                    />
                    <Text size={14} className={styles._main_info__text} weight="bold">
                      Should this field be read only?
                    </Text>
                    <Text size={14} color="softPeanut">
                      This field won’t be editable on forms but will be visible on previews
                    </Text>
                    <Controller
                      name="layoutReadOnly"
                      defaultValue={false}
                      render={({ onChange, value }) => (
                        <div className={styles._main_info__input}>
                          <RadioGroup onChange={onChange} value={value} disabled={isReferenceField}>
                            <Radio size="medium" value={false}>
                              <div className={styles._radio_text}>Don’t mark as read only</div>
                            </Radio>
                            <Radio size="medium" value>
                              <div className={styles._radio_text}>Mark as read only</div>
                            </Radio>
                          </RadioGroup>
                        </div>
                      )}
                    />
                  </div>
                </ModalSection>
                <ModalSection title="Style" icon="edit">
                  <div className={styles._style_section_header}>
                    <Text size={14} className={styles._main_info__text} weight="bold">
                      In which group, order and size do you want to see this field?
                    </Text>
                    <Text size={14} color="softPeanut">
                      Once created you can preview the field in the option at the top of the page.
                    </Text>
                  </div>
                  <div className={styles._field_inputs}>
                    <Controller
                      name="bobjectFieldGroup"
                      rules={{
                        required: 'This field is required',
                      }}
                      render={({ onChange, value }) => (
                        <div className={styles._field_group_input} ref={fieldGroupRef}>
                          <Select
                            error={methods.errors.bobjectFieldGroup?.message}
                            placeholder="Field group*"
                            size="medium"
                            width="100%"
                            onChange={onChange}
                            value={value}
                          >
                            {fieldGroup?.map(group => (
                              <Item value={group.id} key={group.id} dataTest={`${group.name}`}>
                                {group.name}
                              </Item>
                            ))}
                          </Select>
                        </div>
                      )}
                    />
                    <Controller
                      name="ordering"
                      rules={{
                        required: 'This field is required',
                      }}
                      render={({ onChange, value }) => (
                        <div className={styles._ordering_input}>
                          <Input
                            error={methods.errors.ordering?.message}
                            placeholder="Ordering*"
                            type="number"
                            size="medium"
                            onChange={onChange}
                            value={value}
                            width="100%"
                          />
                        </div>
                      )}
                    />
                    <Controller
                      name="layoutIcon"
                      render={({ onChange, value }) => (
                        <div className={styles._icon_input}>
                          <IconInputPicker
                            onChange={onChange}
                            value={value}
                            searchable
                            width="100%"
                          />
                        </div>
                      )}
                    />
                  </div>
                  <Controller
                    name="layoutFormWidth"
                    defaultValue={field?.layoutFormWidth || '100%'}
                    render={({ onChange, value }) => (
                      <SizeField onChange={onChange} value={value} />
                    )}
                  />
                  {showGroupPreview && (
                    <div className={styles._preview_fields_ordering}>
                      <div className={styles._preview_ordering_title}>
                        <div className={styles._preview_ordering_title_left}>
                          <Icon name="eye" color="verySoftPeanut" />
                          <Text size={14}>
                            Current fields in{' '}
                            <b>{fieldGroup?.find(g => g.id === fieldGroupValue)?.name}</b>
                          </Text>
                        </div>
                        <IconButton
                          name="cross"
                          onClick={() => {
                            setShowGroupPreview(false);
                          }}
                          color="peanut"
                        />
                      </div>
                      {fieldsByGroup &&
                        fieldsByGroup.map(f => (
                          <div className={styles._field_prev_card} key={f?.name}>
                            <div className={styles._field_prev_name}>
                              <Text size={14} weight={f.isNewField ? 'bold' : 'regular'}>
                                {f?.name}
                              </Text>
                            </div>
                            <div className={styles._field_prev_ordering}>
                              <Text size={14} weight={f.isNewField ? 'bold' : 'regular'}>
                                {f?.ordering}
                              </Text>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </ModalSection>
                <Collapsible
                  color="softPeanut"
                  className={styles._other_info_collapsible}
                  expanded={false}
                  title={
                    <Text size={16} color="softPeanut" inline>
                      Other information (optional)
                    </Text>
                  }
                >
                  <Controller
                    name="description"
                    render={({ onChange, value }) => (
                      <div className={styles._main_info__input}>
                        <TextArea
                          placeholder="Description"
                          size="medium"
                          width="100%"
                          onChange={onChange}
                          value={value}
                          minRows={3}
                          maxRows={10}
                        />
                      </div>
                    )}
                  />
                  <Text size={14} className={styles._main_info__text} weight="bold">
                    Should we check this field to avoid duplicates?
                  </Text>
                  <Text size={14} color="softPeanut">
                    We recommend using the name and/or email fields for this purpose.
                  </Text>
                  <Controller
                    name="duplicateValidation"
                    defaultValue={false}
                    render={({ onChange, value }) => (
                      <div className={styles._main_info__input}>
                        <RadioGroup onChange={onChange} value={value}>
                          <Radio size="medium" value={false}>
                            <div className={styles._radio_text}>
                              Don’t use for duplicate validation
                            </div>
                          </Radio>
                          <Radio size="medium" value>
                            <div className={styles._radio_text}>Use for duplicate validation</div>
                          </Radio>
                        </RadioGroup>
                      </div>
                    )}
                  />
                  {validEmailTemplateFields.includes(fieldTypeValue) &&
                    bobjectTypeName !== BOBJECT_TYPES.ACTIVITY &&
                    bobjectTypeName !== BOBJECT_TYPES.TASK && (
                      <>
                        <Text size={14} className={styles._main_info__text} weight="bold">
                          Should we show this field as variable?
                        </Text>
                        <Text size={14} color="softPeanut">
                          This field will be available as a variable in the creation of templates
                          and emails.
                        </Text>
                        <Controller
                          name="templateVariable"
                          defaultValue={false}
                          render={({ onChange, value }) => (
                            <div className={styles._main_info__input}>
                              <RadioGroup onChange={onChange} value={value}>
                                <Radio size="medium" value={false}>
                                  <div className={styles._radio_text}>Don’t show as variable</div>
                                </Radio>
                                <Radio size="medium" value>
                                  <div className={styles._radio_text}>Show as variable</div>
                                </Radio>
                              </RadioGroup>
                            </div>
                          )}
                        />
                      </>
                    )}

                  <Text size={14} className={styles._main_info__text} weight="bold">
                    Do you want to see this field indexed in filters?
                  </Text>
                  <Text size={14} color="softPeanut">
                    If this field is indexed, it will be visible in filters and can be used as a
                    filter.
                  </Text>
                  <Controller
                    name="indexed"
                    defaultValue
                    render={({ onChange, value }) => (
                      <div className={styles._main_info__input}>
                        <Tooltip
                          title={
                            isSystemField &&
                            'This is a field used by the system, some edits are not available to avoid errors.'
                          }
                          position={isSystemField && 'top-start'}
                        >
                          <RadioGroup
                            disabled={
                              isSystemField ||
                              fieldTypeValue === phoneTypeId ||
                              fieldTypeValue === emailTypeId
                            }
                            onChange={onChange}
                            value={value}
                          >
                            <Radio size="medium" value>
                              <div className={styles._radio_text}>Mark as indexed</div>
                            </Radio>
                            <Radio size="medium" value={false}>
                              <div className={styles._radio_text}>Don’t mark as indexed</div>
                            </Radio>
                          </RadioGroup>
                        </Tooltip>
                      </div>
                    )}
                  />
                </Collapsible>
              </ModalContent>
            </div>
            <ModalFooter>
              <div>
                <Button onClick={handleCloseModal} variant="clear">
                  CANCEL
                </Button>
                {!(isSystemField || isCreation) && (
                  <Button color="tomato" onClick={() => setConfirmModalOpen(true)} variant="clear">
                    DELETE
                  </Button>
                )}
              </div>
              <div>
                <Button
                  variant={isMultipicklist ? 'clear' : 'primary'}
                  onClick={methods.handleSubmit(v => handleSave(v, false))}
                >
                  {isLoading ? (
                    <Spinner color="bloobirds" name="loadingCircle" />
                  ) : (
                    buttonSaveText()
                  )}
                </Button>
                {isMultipicklist && (
                  <Button onClick={methods.handleSubmit(v => handleSave(v, true))}>
                    {isLoading ? (
                      <Spinner color="white" name="loadingCircle" />
                    ) : (
                      buttonSaveText(true)
                    )}
                  </Button>
                )}
              </div>
            </ModalFooter>
          </FormProvider>
          {confirmModalOpen && !isEmail && (
            <ConfirmDeleteModalLayout
              icon="list"
              assetLabel={'Field'}
              isDeleting={isDeleting}
              handleDelete={handleDeleteField}
              handleClose={() => setConfirmModalOpen(false)}
              variant="gradient"
            >
              <Text size="m">
                You are going to delete permanently the Field &quot;{field?.name}&quot;
              </Text>
              <Text size="m">Are you sure you want to continue?</Text>
            </ConfirmDeleteModalLayout>
          )}
          {confirmModalOpen && isEmail && field && (
            <ConfirmationEmailModal
              onClose={() => setConfirmModalOpen(false)}
              field={field}
            ></ConfirmationEmailModal>
          )}
        </>
      )}
      <>
        {currentStep === 2 && (
          <>
            <PicklistModal
              handleClose={handleCloseModal}
              isCreation={isCreation}
              isGlobalPicklist={isGlobalPicklist}
              modalInfo={modalInfo}
              refresh={refresh}
            />
          </>
        )}
      </>
    </Modal>
  );
};
