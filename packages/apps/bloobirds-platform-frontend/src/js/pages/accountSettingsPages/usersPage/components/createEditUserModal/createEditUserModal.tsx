import React, { useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  Button,
  ColorType,
  Icon,
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
  useToasts,
  Checkbox,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useIsOTOAccount, useWhatsappEnabled } from '@bloobirds-it/hooks';
import { PermissionType as SettingsPermissionType } from '@bloobirds-it/types';
import { mutate } from 'swr';

import { useUserSettingsReload } from '../../../../../components/userPermissions/hooks';
import { useEntity } from '../../../../../hooks';
import {
  useFullSalesEnabled,
  useNewCadenceTableEnabled,
} from '../../../../../hooks/useFeatureFlags';
import { isEmail } from '../../../../../misc/utils';
import { api } from '../../../../../utils/api';
import { randomizeColor } from '../../../../../utils/styles.utils';
import { USER_ROLES_BLACKLIST } from '../../constants/userForm.constants';
import { useCreateEditUserModal } from '../../hooks/useCreateEditUserModal';
import { useUserCreatedModal } from '../../hooks/useUserCreatedModal';
import styles from '../../styles/usersPage.module.css';
import { PermissionsModalSection } from './permissionsModalSection';
import { PermissionType, SectionInterface } from './types/permissions';

export interface PermissionField {
  fieldName: string;
  enumName: PermissionType;
  id: string;
}

export const CreateEditUserModal = () => {
  const { handleCloseUserModal, modalInfo } = useCreateEditUserModal();
  const userRoles = useEntity('userRoles');
  const userPermissionsFields = useEntity('userPermissions');
  const hasSalesEnabled = useFullSalesEnabled();
  const isNewCadenceTableEnabled = useNewCadenceTableEnabled();
  const reloadUserSettings = useUserSettingsReload();
  const isOTOAccount = useIsOTOAccount();
  const { settings } = useActiveUserSettings();
  const accountId = settings?.account?.id;
  const hasWhatsappEnabled = useWhatsappEnabled(accountId);
  const generalSectionEnums: string[] = [
    'EDIT_ALL',
    'DOWNLOAD_LIST',
    'BULK_ACTIONS',
    ...(isNewCadenceTableEnabled ? ['VIEW_CADENCES', 'CUSTOM_TASK'] : []),
  ];
  const generalModalSections = useMemo(() => {
    const generalSections: SectionInterface[] = [];
    generalSectionEnums.forEach(section =>
      generalSections.push(
        userPermissionsFields?.find((field: { enumName: string }) => field?.enumName === section),
      ),
    );
    return generalSections;
  }, [userPermissionsFields]);
  const generalSectionsIds = generalModalSections?.map(section => section?.id);

  const visibilityModalSections = useMemo(() => {
    const visibilitySectionEnums = isOTOAccount
      ? ([
          'VIEW_DASHBOARDS_TAB',
          'USER_ACTIVITY_VISIBILITY',
          ...(!isNewCadenceTableEnabled ? ['VIEW_CADENCES'] : []),
          ...(hasWhatsappEnabled ? ['WHATSAPP_BUSINESS_ADMIN'] : []),
        ] as const)
      : ([
          'VIEW_INBOUND_TAB',
          'VIEW_INBOX',
          'VIEW_OUTBOX_TAB',
          'VIEW_ASSIGN_TAB',
          'VIEW_PROSPECT_TAB',
          ...(hasSalesEnabled ? ['VIEW_SALES_TAB'] : []),
          'VIEW_DASHBOARDS_TAB',
          'VIEW_ADD_QC_TAB',
          'USER_ACTIVITY_VISIBILITY',
          'VIEW_REPORTS',
          ...(!isNewCadenceTableEnabled ? ['VIEW_CADENCES'] : []),
          ...(hasWhatsappEnabled ? ['WHATSAPP_BUSINESS_ADMIN'] : []),
        ] as const);
    const visibilitySections: SectionInterface[] = [];
    visibilitySectionEnums.forEach(section =>
      visibilitySections.push(
        userPermissionsFields?.find((field: { enumName: string }) => field?.enumName === section),
      ),
    );
    return visibilitySections;
  }, [userPermissionsFields]);
  const visibilitySectionsIds = visibilityModalSections?.map(section => section?.id);
  const { handleOpenUserCreatedModal } = useUserCreatedModal();
  const employeeRoles = useEntity('employeeRoles');
  const isCreation = Object.keys(modalInfo).length === 0;
  const defaultOptionsChecked = visibilityModalSections.reduce((acc, section) => {
    if (['USER_ACTIVITY_VISIBILITY', 'VIEW_REPORTS'].includes(section?.enumName))
      acc.push(section.id);
    return acc;
  }, []);

  const defaultValues = useMemo(
    () =>
      isCreation
        ? {
            assignable: true,
            editAll: true,
            generalPermissions: [],
            visibilityPermissions: defaultOptionsChecked,
            name: '',
            email: '',
            employeeRole: '',
            userRoles: '',
            whatsappAutoSyncEnabled: false,
            selectSignatureEnabled: false,
            autoInsertSignatureEnabled: false,
          }
        : {
            ...modalInfo,
            ...{
              generalPermissions: modalInfo?.userPermissions,
              visibilityPermissions: modalInfo?.userPermissions,
            },
          },
    [generalSectionsIds, visibilitySectionsIds],
  );

  const methods = useForm({ defaultValues });

  const { createToast } = useToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSave = (data: {
    name: string;
    generalPermissions: SectionInterface['enumName'][];
    visibilityPermissions: SectionInterface['enumName'][];
    employeeRole: any;
    assignable: any;
    userRoles: any;
    email: string;
    color: ColorType;
    whatsappAutoSyncEnabled: boolean;
    selectSignatureEnabled: boolean;
    autoInsertSignatureEnabled: boolean;
  }) => {
    setIsSubmitting(true);
    const shortNameLetters = data.name.replace(/[^a-zA-Z ]/g, ' ').split(' ');
    const shortName =
      shortNameLetters.length >= 2
        ? shortNameLetters[0].slice(0, 1).toUpperCase() +
          shortNameLetters[1].slice(0, 1).toUpperCase()
        : shortNameLetters[0].slice(0, 2).toUpperCase();
    const parsedPermissionsIds = [];
    if (data?.generalPermissions)
      parsedPermissionsIds.push(
        ...data.generalPermissions.filter(permission => generalSectionsIds.includes(permission)),
      );
    if (data?.visibilityPermissions)
      parsedPermissionsIds.push(
        ...data.visibilityPermissions.filter(permission =>
          visibilitySectionsIds.includes(permission),
        ),
      );
    const newData = {
      name: data?.name,
      employeeRole: data?.employeeRole,
      assignable: isOTOAccount ? true : data.assignable,
      userRoles: [data?.userRoles],
      shortname: shortName,
      email: data?.email.trim().toLowerCase(),
      color: data?.color || randomizeColor(),
      userPermissions: parsedPermissionsIds,
      autoSyncWhatsappPermission: data?.whatsappAutoSyncEnabled
        ? SettingsPermissionType.FORCED
        : SettingsPermissionType.DISABLED,
      selectSignaturesPermission: data?.selectSignatureEnabled
        ? SettingsPermissionType.FORCED
        : SettingsPermissionType.DISABLED,
      autoInsertSignaturePermission: data?.autoInsertSignatureEnabled
        ? SettingsPermissionType.FORCED
        : SettingsPermissionType.DISABLED,
    };

    if (isCreation) {
      api
        .post('/utils/service/users/create', { ...newData })
        .then(() => {
          mutate('/users');
          setIsSubmitting(false);
          handleCloseUserModal();
          handleOpenUserCreatedModal();
        })
        .catch(() => {
          createToast({
            message: 'There was an error creating the user, please try again!',
            type: 'error',
          });
          setIsSubmitting(false);
        });
    } else {
      api
        .patch(`/utils/service/users/${modalInfo.id}`, { ...newData })
        .then(() => {
          createToast({ message: 'User updated successfully', type: 'success' });
          mutate('/users');
          reloadUserSettings();
          setIsSubmitting(false);
          handleCloseUserModal();
        })
        .catch(() => {
          createToast({
            message: 'There was an error creating the user, please try again!',
            type: 'error',
          });
          setIsSubmitting(false);
        });
    }
  };

  return (
    <Modal open onClose={handleCloseUserModal} width={760}>
      <ModalHeader size="small">
        <div style={{ display: 'flex' }}>
          <Icon name="person" color="peanut" />
          <ModalTitle size="small">Create new User</ModalTitle>
        </div>
        <ModalCloseIcon onClick={handleCloseUserModal} />
      </ModalHeader>
      <ModalContent>
        <FormProvider {...methods}>
          <ModalSection title="User information" icon="person">
            <div className={styles._section}>
              <div className={styles._section__row}>
                <Controller
                  name="name"
                  rules={{
                    required: 'This field is required',
                  }}
                  render={({ onChange, value }) => (
                    <Input
                      width="290"
                      name="name"
                      error={methods.errors.name?.message}
                      value={value}
                      onChange={onChange}
                      placeholder="Full name *"
                    />
                  )}
                />
                <Controller
                  name="email"
                  rules={{
                    required: 'This field is required',
                    validate: v => isEmail(v) || 'The email format is not correct',
                  }}
                  render={({ onChange, value }) => (
                    <Input
                      width="290"
                      name="email"
                      error={methods.errors.email?.message}
                      value={value}
                      onChange={onChange}
                      placeholder="Email *"
                    />
                  )}
                />
              </div>
              <div className={styles._section__row}>
                <Controller
                  name="userRoles"
                  rules={{
                    required: 'This field is required',
                  }}
                  render={({ onChange, value }) => (
                    <Select
                      width="290"
                      onChange={onChange}
                      value={value}
                      placeholder="User role *"
                      error={methods.errors.userRoles?.message}
                    >
                      {userRoles
                        ?.all()
                        ?.filter(role => !USER_ROLES_BLACKLIST?.includes(role?.enumName))
                        ?.map(role => (
                          <Item key={role?.id} value={role?.id} data-test={role?.enumName}>
                            {role?.name}
                          </Item>
                        ))}
                    </Select>
                  )}
                />
                <Controller
                  name="employeeRole"
                  rules={{
                    required: 'This field is required',
                  }}
                  render={({ onChange, value }) => (
                    <Select
                      width="290"
                      onChange={onChange}
                      error={methods.errors.employeeRole?.message}
                      value={value}
                      placeholder="Employee Role *"
                    >
                      {employeeRoles?.all()?.map(role => (
                        <Item key={role?.id} value={role?.id} data-test={role?.name}>
                          {role?.name}
                        </Item>
                      ))}
                    </Select>
                  )}
                />
              </div>
            </div>
          </ModalSection>
          <ModalSection title="User permissions" icon="lock">
            <Controller
              name="generalPermissions"
              render={({ onChange, value }) => (
                <PermissionsModalSection
                  sections={generalModalSections}
                  sectionTitle="General Permissions"
                  values={value?.filter((val: string) => generalSectionsIds.includes(val))}
                  updateValue={onChange}
                />
              )}
            />
            <Controller
              name="visibilityPermissions"
              render={({ onChange, value }) => (
                <PermissionsModalSection
                  sections={visibilityModalSections}
                  sectionTitle="Visibility Permissions"
                  selectAllHandle={!isOTOAccount && 'View all'}
                  values={value?.filter((val: string) => visibilitySectionsIds.includes(val))}
                  updateValue={onChange}
                />
              )}
            />
            <div className={styles._whatsapp_section}>
              <Text size="m" color="peanut" weight="bold">
                Whatsapp auto-sync of WhatsApp chats
              </Text>
              <Text size="s" color="peanut">
                Automatically sync all prospect&apos;s chat when accessing it from WhatsApp web as
                long as it is saved in the database
              </Text>
              <Controller
                name="whatsappAutoSyncEnabled"
                render={({ onChange, value }) => (
                  <Checkbox checked={value} onClick={onChange} expand>
                    Enable auto-sync of WhatsApp chats
                  </Checkbox>
                )}
              />
            </div>

            <div className={styles._whatsapp_section}>
              <Text size="m" color="peanut" weight="bold">
                Signatures
              </Text>
              {/*               <Text size="s" color="peanut">
                Automatically sync all prospect&apos;s chat when accessing it from WhatsApp web as
                long as it is saved in the database
              </Text> */}
              <Controller
                name="selectSignatureEnabled"
                render={({ onChange, value }) => (
                  <Checkbox checked={value} onClick={onChange} expand>
                    Always enable change signature when composing emails
                  </Checkbox>
                )}
              />
              <Controller
                name="autoInsertSignatureEnabled"
                render={({ onChange, value }) => (
                  <Checkbox checked={value} onClick={onChange} expand>
                    Always insert signature at the bottom when composing emails
                  </Checkbox>
                )}
              />
            </div>

            {!isOTOAccount && (
              <div className={styles._last_section}>
                <Text size="m" color="peanut" weight="bold">
                  Should this user be shown in the &quot;Assign&quot; tab in order to be able to
                  assign companies to him/her?
                </Text>
                <Controller
                  name="assignable"
                  render={({ onChange, value }) => (
                    <RadioGroup onChange={onChange} value={value}>
                      <Radio value size="small">
                        <Text size="s" inline>
                          This user{' '}
                          <Text size="s" weight="bold" inline>
                            will be visible
                          </Text>{' '}
                          in the assign tab{' '}
                        </Text>
                      </Radio>
                      <Radio value={false} size="small">
                        <Text size="s" inline>
                          This user{' '}
                          <Text size="s" weight="bold" inline>
                            won&apos;t be visible
                          </Text>{' '}
                          on the assign tab{' '}
                        </Text>
                      </Radio>
                    </RadioGroup>
                  )}
                />
              </div>
            )}
          </ModalSection>
        </FormProvider>
      </ModalContent>
      <ModalFooter>
        <div>
          <Button variant="clear" onClick={handleCloseUserModal}>
            CANCEL
          </Button>
        </div>
        <div>
          <Button onClick={methods.handleSubmit(handleSave)} data-test="save-user-button">
            {isSubmitting ? <Spinner color="white" name="loadingCircle" size={16} /> : 'SAVE'}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
