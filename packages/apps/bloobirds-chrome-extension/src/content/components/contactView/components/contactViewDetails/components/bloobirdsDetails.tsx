import { useBloobirdsFields } from '../../../../../../hooks/useOrderedFields';
import { ContactViewDetailsFields } from './contactViewDetailsFileds';

export const BloobirdsDetails = ({ bobject, openExtendedScreen, hasHelper, source }) => {
  const { bloobirdsFields, isLoading } = useBloobirdsFields(bobject, hasHelper);

  return (
    <ContactViewDetailsFields
      fields={bloobirdsFields}
      isLoading={isLoading}
      openExtendedScreen={openExtendedScreen}
      source={source}
    />
  );
};
