import { atomFamily, useRecoilState } from 'recoil';
import { BobjectApi } from '../misc/api/bobject';

const companyAtom = atomFamily({
  key: 'companyAtom',
  default: {
    data: undefined,
    loaded: false,
    isFetching: false,
  },
});

const fetchCompany = companyId => BobjectApi.request().Company().getForm(companyId);

const fetchCompanies = searchQuery => BobjectApi.request().Company().search(searchQuery);

// TODO: Use the new bobjectApi
const updateCompany = (companyId, data) =>
  BobjectApi.request().bobjectType('Company').partialSet({ bobjectId: companyId, data });

// data structure: companyId: { fields };
const updateCompanies = data => BobjectApi.request().bobjectType('Company').bulkPartialSet(data);

export const useCompany = family => {
  const [company, setCompany] = useRecoilState(companyAtom(family));
  const resetCompany = () =>
    setCompany({
      data: undefined,
      loaded: false,
      isFetching: false,
    });

  const getCompanyById = companyId => {
    if (!company.isFetching) {
      setCompany({ ...company, isFetching: true, loaded: false });
      fetchCompany(companyId).then(response => {
        setCompany({
          data: response,
          loaded: true,
          isFetching: false,
        });
      });
    }
  };

  const setCompanyData = data => {
    setCompany({
      data,
      loaded: true,
      isFetching: false,
    });
  };

  return {
    company: company.data,
    isLoaded: company.loaded,
    isFetching: company.isFetching,
    fetchCompanies,
    getCompanyById,
    resetCompany,
    setCompany: setCompanyData,
    updateCompany,
    updateCompanies,
  };
};
