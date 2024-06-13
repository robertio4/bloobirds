import React from 'react';

import { useObjectCreationSettings } from '@bloobirds-it/hooks';

import LinkedInCompanyCaptureTab from './linkedInCompanyCreationTab';
import LinkedInFieldsTab from './linkedInFieldsTab';
import ObjectCreationTab from './objectCreationTab';

const LinkedInTab = () => {
  const { enabledObjectCreation } = useObjectCreationSettings();
  return (
    <div>
      <ObjectCreationTab />
      {enabledObjectCreation && (
        <>
          <LinkedInFieldsTab />
          <LinkedInCompanyCaptureTab />
        </>
      )}
    </div>
  );
};

export default LinkedInTab;
