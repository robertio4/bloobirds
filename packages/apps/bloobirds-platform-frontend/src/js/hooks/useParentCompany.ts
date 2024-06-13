import { useMemo } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';
import { atom, useRecoilState } from 'recoil';
import { mutate } from 'swr';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../constants/company';
import { MIXPANEL_EVENTS } from '../constants/mixpanel';
import { useActiveBobject, useContactBobjects } from '../pages/contactPages/contactPageContext';
import { api } from '../utils/api';
import { getValueFromLogicRole } from '../utils/bobjects.utils';
import { useCompany } from './useCompany';

const visibilityEditAtom = atom({
  key: 'companyParentEditVisibility',
  default: false,
});
const visibilityDeleteAtom = atom({
  key: 'companyParentDeleteVisibility',
  default: false,
});
const visibilityEditChildAtom = atom({
  key: 'companyEditChildVisibility',
  default: false,
});

export default function useParentCompany() {
  const { company } = useContactBobjects();
  const { updateCompanies } = useCompany();
  const [openEditModal, setOpenEditModal] = useRecoilState(visibilityEditAtom);
  const [openDeleteModal, setOpenDeleteModal] = useRecoilState(visibilityDeleteAtom);
  const [openEditChildModal, setOpenEditChildModal] = useRecoilState(visibilityEditChildAtom);
  const parentCompany = useMemo(() => {
    return (
      company?.referencedBobjects &&
      company?.referencedBobjects[
        getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT)
      ]
    );
  }, [company]);

  const childQuery = {
    query: { [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: [company?.id?.value] },
    formFields: true,
    pageSize: 100,
  };

  const { data: childCompanies, error: childCompanyErrors } = useSearchSubscription(
    company?.id?.value ? childQuery : null,
    BOBJECT_TYPES.COMPANY,
  );

  const siblingQuery = {
    query: {
      [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: [parentCompany?.id?.value],
    },
    formFields: true,
    pageSize: 100,
  };

  const { data: siblingCompaniesResponse, error: siblingCompanyErrors } = useSearchSubscription(
    parentCompany && siblingQuery,
    BOBJECT_TYPES.COMPANY,
  );

  const siblingCompanies = useMemo(() => {
    return siblingCompaniesResponse?.data?.contents?.filter(
      (siblingCompany: { id: { value: any } }) => siblingCompany.id.value != company?.id?.value,
    );
  }, [siblingCompaniesResponse, parentCompany]);

  const addParentCompany = async (companyParentId: string) => {
    await api
      .patch(`/bobjects/${company?.id?.value}/raw`, {
        [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: companyParentId,
      })
      .then(() => {
        mutate(`/Company/${company.id.objectId}/form`);
      });
    mixpanel.track(MIXPANEL_EVENTS.PARENT_COMPANY_ADDED);
  };

  const addChildrenCompanies = async (companies: any[]) => {
    mixpanel.track(MIXPANEL_EVENTS.CHILD_COMPANIES_ADDED, {
      numberOfCompanies: companies?.length,
    });
    const request = companies
      ?.filter(
        cmp =>
          getValueFromLogicRole(cmp, COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT) !=
            company?.id?.value || cmp.delete,
      )
      .reduce(
        (acc, curr) => ({
          ...acc,
          [curr?.id?.value]: {
            [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: curr.delete ? null : company?.id?.value,
          },
        }),
        {},
      );

    updateCompanies(request);
  };

  return {
    childCompanies,
    parentCompany,
    siblingCompanies,
    addParentCompany,
    openEditModal,
    setOpenEditModal,
    openDeleteModal,
    setOpenDeleteModal,
    addChildrenCompanies,
    openEditChildModal,
    setOpenEditChildModal,
    loading:
      !parentCompany &&
      !childCompanies &&
      !childCompanyErrors &&
      !siblingCompanies &&
      !siblingCompanyErrors,
  };
}
