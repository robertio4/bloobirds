import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { Button, Input, Item, Select, Spinner, useToasts } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import { useEntity, useMediaQuery } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import { ACCOUNT_ADMIN } from '../../../../misc/session/RoleManager';
import { isEmail } from '../../../../misc/utils';
import { api } from '../../../../utils/api';
import { randomizeColor } from '../../../../utils/styles.utils';
import { PermissionField } from '../../../accountSettingsPages/usersPage/components/createEditUserModal/createEditUserModal';
import { USER_ROLES_BLACKLIST } from '../../../accountSettingsPages/usersPage/constants/userForm.constants';
import { useUserCreatedModal } from '../../../accountSettingsPages/usersPage/hooks/useUserCreatedModal';
import styles from './invitationForm.module.css';

const InvitationForm = () => {
  const userPermissionsFields = useEntity('userPermissions');
  const hasSalesEnabled = useFullSalesEnabled();
  const { isDesktop } = useMediaQuery();

  const userRoles = useEntity('userRoles')?.all();
  const employeeRoles = useEntity('employeeRoles')?.all();

  const getEmployeeRoleId = (roleName: string) => {
    return employeeRoles?.filter(role => role?.name === roleName)[0]?.id;
  };

  const checkRoleSelected = (roleSelected: string, id: string) => {
    return userRoles?.filter(role => role?.id === id)[0]?.enumName === roleSelected;
  };

  const adminSectionEnums: string[] = ['EDIT_ALL', 'DOWNLOAD_LIST', 'BULK_ACTIONS'];
  const userSectionEnums: string[] = ['DOWNLOAD_LIST', 'BULK_ACTIONS'];
  const adminVisibilitySectionEnums: string[] = [
    'VIEW_INBOUND_TAB',
    'VIEW_INBOX',
    'VIEW_OUTBOX_TAB',
    'VIEW_ASSIGN_TAB',
    'VIEW_PROSPECT_TAB',
    ...(hasSalesEnabled ? ['VIEW_SALES_TAB'] : []),
    'VIEW_DASHBOARDS_TAB',
    'VIEW_ADD_QC_TAB',
    'VIEW_CADENCES',
    'CUSTOM_TASK',
  ];
  const userVisibilitySectionEnums: string[] = [
    'VIEW_INBOX',
    'VIEW_OUTBOX_TAB',
    'VIEW_PROSPECT_TAB',
    ...(hasSalesEnabled ? ['VIEW_SALES_TAB'] : []),
  ];

  const { save } = useUserHelpers();
  const methods = useForm();
  const { createToast } = useToasts();
  const { handleOpenUserCreatedModal } = useUserCreatedModal();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const emailInput = methods.watch('email');
  const userRolesInput = methods.watch('userRoles');

  useEffect(() => {
    setSubmitDisabled(
      emailInput === '' || userRolesInput === '' || Object.keys(methods.errors).length !== 0,
    );
  }, [emailInput, userRolesInput]);

  const getGeneralModalSections = (sectionEnums: string[]) => {
    const generalSections: PermissionField[] = [];
    sectionEnums.forEach(section =>
      generalSections.push(
        userPermissionsFields?.find((field: { enumName: string }) => field?.enumName === section),
      ),
    );
    return generalSections;
  };
  const getVisibilityModalSections = (sectionEnums: string[]) => {
    const visibilitySections: PermissionField[] = [];

    sectionEnums.forEach(section =>
      visibilitySections.push(
        userPermissionsFields?.find((field: { enumName: string }) => field?.enumName === section),
      ),
    );
    return visibilitySections;
  };

  const handleSave = (data: { userRoles: string; email: string }) => {
    setIsSubmitting(true);
    const accountAdminSelected = checkRoleSelected(ACCOUNT_ADMIN, data?.userRoles);

    const sDREmployeeRoleId = getEmployeeRoleId('SDR');
    const salesManagerEmployeeRoleId = getEmployeeRoleId('Sales Manager');
    const employeeRoleId = accountAdminSelected ? salesManagerEmployeeRoleId : sDREmployeeRoleId;

    const generalSectionsEnum = accountAdminSelected ? adminSectionEnums : userSectionEnums;
    const visibilitySectionsEnum = accountAdminSelected
      ? adminVisibilitySectionEnums
      : userVisibilitySectionEnums;

    const generalSectionsIds = getGeneralModalSections(generalSectionsEnum)?.map(
      section => section?.id,
    );

    const visibilitySectionsIds = getVisibilityModalSections(visibilitySectionsEnum)?.map(
      section => section?.id,
    );

    const parsedPermissionsIds = generalSectionsIds.concat(visibilitySectionsIds);

    const newData = {
      name: data?.email.trim().toLowerCase(),
      employeeRole: employeeRoleId,
      assignable: !accountAdminSelected,
      userPermissions: parsedPermissionsIds,
      email: data?.email.trim().toLowerCase(),
      userRoles: [data?.userRoles],
      color: randomizeColor(),
      shortname: 'NU',
    };

    api
      .post('/utils/service/users/create', { ...newData })
      .then(() => {
        setIsSubmitting(false);
        setSubmitDisabled(true);
        methods.reset();
        handleOpenUserCreatedModal();
        createToast({
          message: 'Invitation successfully sent',
          type: 'success',
        });
        save(UserHelperKeys.INVITE_TEAM);
      })
      .catch(() => {
        createToast({
          message: 'There was an error creating the user, please try again!',
          type: 'error',
        });
        setIsSubmitting(false);
      });
  };

  return (
    <FormProvider {...methods}>
      <div className={styles._invitation_form_wrapper}>
        <div className={styles._inputs_wrapper}>
          <Controller
            name="email"
            rules={{
              required: 'This field is required',
              validate: v => isEmail(v) || 'The email format is not correct',
            }}
            defaultValue=""
            render={({ onChange, value }) => (
              <Input
                name="email"
                width="14rem"
                error={methods.errors.email?.message}
                value={value}
                onChange={onChange}
                placeholder="Email *"
                size="small"
              />
            )}
          />
          <Controller
            name="userRoles"
            rules={{
              required: 'This field is required',
            }}
            defaultValue=""
            render={({ onChange, value }) => (
              <Select
                width="8rem"
                onChange={onChange}
                value={value}
                placeholder="User role *"
                error={methods.errors.userRoles?.message}
                size="small"
                borderless={false}
              >
                {userRoles
                  ?.filter(role => !USER_ROLES_BLACKLIST?.includes(role?.enumName))
                  ?.map(role => (
                    <Item key={role?.id} value={role?.id} data-test={role?.enumName}>
                      {role?.name}
                    </Item>
                  ))}
              </Select>
            )}
          />
        </div>
        <div className={styles._submit_button}>
          <Button
            onClick={methods.handleSubmit(handleSave)}
            iconLeft="send"
            data-test="save-user-button"
            disabled={submitDisabled}
            size="small"
          >
            <div>
              {isSubmitting ? (
                <Spinner color="white" name="loadingCircle" size={16} />
              ) : !isDesktop ? (
                ''
              ) : (
                'SEND INVITE'
              )}
            </div>
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default InvitationForm;
