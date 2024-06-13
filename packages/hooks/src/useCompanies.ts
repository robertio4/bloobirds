import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { api } from '@bloobirds-it/utils';
import { LinkedInCompany } from '@bloobirds-it/types';
import useSWR from 'swr';

export async function searchCompanies(name: string) {
  const response = await api.get<Array<LinkedInCompany>>('/linkedin/search/companies', {
    params: { name },
  });
  return response.data;
}

export function useCompanies(search) {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [name] = useDebounce(search, 150);

  useEffect(() => {
    if (name && name.length > 0) {
      searchCompanies(name).then(companies => {
        setCompanies(companies);
        setIsLoading(false);
      });
    }
  }, [name]);

  return { companies, isLoading };
}

export function useCompanyCreationEnabled() {
  const { data: isSettingEnabled } = useSWR('/linkedin/settings/companyCreation', async url => {
    const response = await api.get(url);
    return response.data?.enabled;
  });

  return isSettingEnabled;
}
