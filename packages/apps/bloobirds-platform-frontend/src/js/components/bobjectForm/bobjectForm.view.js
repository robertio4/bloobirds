import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useConfirmDeleteModal } from '@bloobirds-it/bobjects';
import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import useSWR from 'swr';

import { OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE } from '../../constants/opportunityProduct';
import { useActiveUser, useBobjectForm, useBobjectFormVisibility, useEntity } from '../../hooks';
import { useActiveCompany } from '../../hooks/useActiveCompany';
import { useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import useHubspot from '../../hooks/useHubspot';
import useSalesforce from '../../hooks/useSalesforce';
import { BobjectApi } from '../../misc/api/bobject';
import { api } from '../../utils/api';
import { getValueFromLogicRole, isOpportunity } from '../../utils/bobjects.utils';
import { ProductHubspotSection } from '../productHubspotSection/productHubspotSection';
import { ProductSalesforceSection } from '../productSalesforceSection/productSalesforceSection';
import { useBobjectPermissions } from '../userPermissions/hooks';
import styles from './bobjectForm.module.css';
import BobjectFormSkeleton from './bobjectFormSkeleton';
import Section from './section';

const BobjectForm = () => {
  const { openDeleteModal } = useConfirmDeleteModal();
  const { closeBobjectForm } = useBobjectFormVisibility();
  const {
    sections,
    saveBobject,
    defaultValues,
    loading,
    mode,
    bobject,
    bobjectType,
    demoMode = false,
  } = useBobjectForm();
  const { company } = useActiveCompany();
  const { checkPermissions } = useBobjectPermissions();
  const methods = useForm({ defaultValues });
  const [hasPermission, setHasPermissions] = useState(false);
  const isSalesEnabled = useFullSalesEnabled();

  const hasCompany = !!company;
  const isCreating = mode === 'CREATE';
  const { isValid, submitCount, isSubmitting } = methods.formState;
  const canSave = (submitCount === 0 || isValid) && (isCreating || hasPermission || !hasCompany);

  const opportunityId = isOpportunity(bobject) && bobject?.id.value;
  const { activeAccount } = useActiveUser();

  const { data: { data: opportunityProducts } = { data: {} } } = useSWR(
    opportunityId && [`/bobjects/${activeAccount.id}/OpportunityProduct/search`, opportunityId],
    ([url, opportunityId]) =>
      api.post(url, {
        query: {
          [OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [opportunityId],
        },
        formFields: true,
        pageSize: 50,
        injectReferences: true,
      }),
  );

  useEffect(() => {
    if (hasCompany) {
      const hasPermissionFromSelfbobject = checkPermissions(bobject);
      setHasPermissions(
        hasPermissionFromSelfbobject || (company ? checkPermissions(company) : false),
      );
    } else if (bobjectType === 'Company') {
      setHasPermissions(checkPermissions(bobject));
    } else {
      const ownerCompanyId = getValueFromLogicRole(
        bobject,
        `${bobjectType.toUpperCase()}__COMPANY`,
      );
      if (ownerCompanyId) {
        BobjectApi.request()
          .Company()
          .getForm(ownerCompanyId.split('/')[2])
          .then(ownerCompany => {
            setHasPermissions(checkPermissions(ownerCompany));
          });
      } else {
        setHasPermissions(checkPermissions(bobject));
      }
    }
  }, []);

  const integrationTriggerConfigs = useEntity('integrationTriggerConfigs');
  const createProductsConfigSalesforce = integrationTriggerConfigs
    ?.all()
    ?.find(config => config?.key === 'createProduct' && config?.crm === 'SALESFORCE');
  const createProductsConfigHubspot = integrationTriggerConfigs
    ?.all()
    ?.find(config => config?.key === 'createProduct' && config?.crm === 'HUBSPOT');
  const { salesforceIntegration } = useSalesforce();
  const { hubspotIntegration } = useHubspot();

  const { customTasks } = useCustomTasks();

  return (
    <Modal open variant="primary" onClose={closeBobjectForm}>
      <ModalHeader>
        <ModalTitle>{`${mode === 'EDIT' ? 'Edit' : 'Create'} ${bobjectType}`}</ModalTitle>
        <ModalCloseIcon onClick={closeBobjectForm} />
      </ModalHeader>
      <ModalContent className={styles._content}>
        {loading ? (
          <BobjectFormSkeleton />
        ) : (
          <FormProvider {...methods}>
            {sections.map(section => (
              <Section
                key={section.title}
                {...section}
                modalBobjectType={bobjectType}
                defaultValues={defaultValues}
                hasProducts={opportunityProducts.contents?.length > 0}
                customTasks={customTasks}
              />
            ))}
            {isSalesEnabled &&
              bobjectType === BOBJECT_TYPES.PRODUCT &&
              createProductsConfigSalesforce?.value === 'true' &&
              salesforceIntegration?.id && <ProductSalesforceSection mode={mode} />}
            {isSalesEnabled &&
              bobjectType === BOBJECT_TYPES.PRODUCT &&
              createProductsConfigHubspot?.value === 'true' &&
              hubspotIntegration?.id && <ProductHubspotSection mode={mode} />}
          </FormProvider>
        )}
      </ModalContent>
      <ModalFooter>
        <div className={styles._footer_buttons}>
          <Button disabled={isSubmitting} variant="tertiary" onClick={closeBobjectForm}>
            Cancel
          </Button>
          {mode === 'EDIT' && hasPermission && (
            <Button
              color="tomato"
              variant="tertiary"
              dataTest="bobjectFormDeleteButton"
              disabled={isSubmitting || !hasPermission}
              onClick={() => {
                openDeleteModal(bobject);
                closeBobjectForm();
              }}
            >
              Delete
            </Button>
          )}
        </div>
        {!demoMode && (
          <div className={styles._save_buttons}>
            {isSalesEnabled && bobjectType === BOBJECT_TYPES.OPPORTUNITY && (
              <Button
                disabled={!canSave || isSubmitting}
                dataTest="Form-Save-Add-Products"
                variant="secondary"
                onClick={methods.handleSubmit(values => {
                  return saveBobject(values, { manageProducts: true });
                })}
              >
                Save & Add products
              </Button>
            )}
            <Button
              disabled={!canSave || isSubmitting}
              dataTest="Form-Save"
              onClick={methods.handleSubmit(saveBobject)}
            >
              Save
            </Button>
          </div>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default BobjectForm;
