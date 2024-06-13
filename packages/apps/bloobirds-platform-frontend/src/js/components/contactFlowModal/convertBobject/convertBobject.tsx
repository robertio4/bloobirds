import React from 'react';

import { useWizardContext } from '@bloobirds-it/wizard-modal-context';

import useSendToSales from '../../../hooks/useSendToSales';
import ConvertToSalesStep from '../../../pages/contactPages/sendToSalesModal/convertToSalesStep/convertToSalesStep';
import { Bobject } from '../../../typings/bobjects';

interface ConvertBobjectProps {
  handleBack?: () => void;
  handleNext?: (createOpportunity: boolean, leads?: Array<Bobject>) => void;
  wizardKey?: string;
}

const ConvertObject = ({ handleBack, handleNext, wizardKey }: ConvertBobjectProps) => {
  const { getWizardProperties } = useWizardContext();
  const { referenceBobject } = getWizardProperties(wizardKey);
  const { setData } = useSendToSales();
  if (referenceBobject) {
    setData({ bobjectToSet: referenceBobject });
  }
  return (
    <>
      <ConvertToSalesStep onBack={handleBack} onNext={handleNext} />
    </>
  );
};

export default ConvertObject;
