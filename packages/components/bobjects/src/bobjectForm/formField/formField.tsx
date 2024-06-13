import { useTranslation } from 'react-i18next';

import { FormFieldProps } from './baseInput/baseInput';
import { DateField } from './dateField/dateField';
import { DecimalField } from './decimalField/decimalField';
import { EmailField } from './emailField/emailField';
import { NumberField } from './numberField/numberField';
import { PhoneField } from './phoneField/phoneField';
import { PicklistField } from './picklistField/picklistField';
import { ReferenceField } from './referenceField/referenceField';
import { TextField } from './textField/textField';
import { URLField } from './urlField/urlField';

export const FormField = (props: FormFieldProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'bobjects.bobjectForm' });

  const providedProps = { ...props, requiredMessage: t('requiredMessage') };

  switch (props.type) {
    case 'PICKLIST':
      return <PicklistField {...providedProps} />;
    case 'DATE':
      return <DateField {...providedProps} />;
    case 'DATETIME':
      return <DateField {...providedProps} />;
    case 'TEXT':
      return <TextField {...providedProps} />;
    case 'EMAIL':
      return <EmailField {...providedProps} />;
    case 'URL':
      return <URLField {...providedProps} />;
    case 'NUMBER':
      return <NumberField {...providedProps} />;
    case 'DECIMAL':
      return <DecimalField {...providedProps} />;
    case 'PHONE':
      return <PhoneField {...providedProps} />;
    case 'REFERENCE':
      return <ReferenceField {...providedProps} />;
    default:
      return null;
  }
};

FormField.defaultProps = {
  style: 'light',
};
