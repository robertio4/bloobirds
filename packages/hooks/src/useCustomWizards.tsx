import React, { createContext, useContext } from 'react';

import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

const ContactFlowWizardContext = createContext(null);
type ProviderType = {
  children: React.ReactElement;
  wizardsMap: any;
};

export const CustomWizardModalProvider = ({ children, wizardsMap, ...props }: any) => {
  //const customWizards = useCustomWizards();
  return (
    <ContactFlowWizardContext.Provider value={{ ...props, wizardsMap }}>
      {children}
    </ContactFlowWizardContext.Provider>
  );
};

const fetcher = (url: string) =>
  api.get(`${url}`).then(response => {
    return response?.data;
  });

export const useCustomWizards = (
  accountId: string,
  hasCustomWizardsEnabled: boolean,
  source = 'BOTH',
): any => {
  const { data: availableCustomWizards } = useSWR<any[]>(
    hasCustomWizardsEnabled && `/utils/service/customWizard/` + accountId + '?source=' + source,
    fetcher,
  );

  return { availableCustomWizards };
};

export const useContactFlowWizardContext = () => {
  const context = useContext(ContactFlowWizardContext);

  if (context === undefined) {
    throw new Error('useContactFlowWizardContext must be used within the modal provider');
  }

  return context;
};
