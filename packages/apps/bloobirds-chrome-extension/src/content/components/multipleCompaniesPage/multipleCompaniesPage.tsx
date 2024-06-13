import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@bloobirds-it/flamingo-ui';
import { ExtensionBobject, ExtensionCompany } from '@bloobirds-it/types';

import { useCreationForm } from '../../../hooks/useCreationForm';
import { MultipleBobjectsLayout } from '../linkedInScreens/multipleBobjectsLayout';
import { CreateItHereCallToAction } from '../linkedInScreens/multipleLeadsPage';

export interface MultipleCompaniesProps {
  companies: ExtensionCompany[];
  setCurrentCompany: (company: ExtensionBobject[]) => void;
  setExactMatch: (exactMatch: boolean) => void;
  dataToUpdate?: { [x: string]: string };
}

export default (props: MultipleCompaniesProps): JSX.Element => {
  const { companies, setCurrentCompany, setExactMatch, dataToUpdate } = props;
  const { setCreateLead } = useCreationForm();
  const searchValueController = useState<string>();
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.multipleCompaniesPage' });

  return (
    <MultipleBobjectsLayout>
      <MultipleBobjectsLayout.Header />
      <MultipleBobjectsLayout.List
        bobjects={companies || []}
        itemExtraProps={{
          setCurrentBobject: (bobject: ExtensionBobject[]) => setCurrentCompany(bobject),
          setExactMatch,
          dataToUpdate,
        }}
        searchValueController={searchValueController}
      />
      <MultipleBobjectsLayout.Footer>
        <>
          <CreateItHereCallToAction />
          <Button expand onClick={() => setCreateLead(true)}>
            {t('footerButtonText')}
          </Button>
        </>
      </MultipleBobjectsLayout.Footer>
    </MultipleBobjectsLayout>
  );
};
