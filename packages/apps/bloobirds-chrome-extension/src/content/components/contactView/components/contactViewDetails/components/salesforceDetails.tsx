import { useSalesforceFields } from '../../../../../../hooks/useSalesforceFields';
import { ContactViewDetailsFields } from './contactViewDetailsFileds';

export const SalesforceDetails = ({ bobject, openExtendedScreen, hasHelper, source }) => {
  const { salesforceFields, isLoading } = useSalesforceFields(bobject, hasHelper);

  return (
    <ContactViewDetailsFields
      fields={salesforceFields}
      isLoading={isLoading}
      openExtendedScreen={openExtendedScreen}
      salesforceId={bobject.salesforceId}
      source={source}
    />
  );
};
