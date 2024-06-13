import { Control } from 'react-hook-form';

import { Input as BaseInput } from '@bloobirds-it/flamingo-ui';
import { LeadField } from '@bloobirds-it/types';
import classNames from 'classnames';

import styles from './baseInput.module.css';

export interface FormFieldProps extends LeadField {
  control: Control<any>;
  style?: 'light' | 'gradient';
  size?: 'small' | 'medium';
  requiredMessage?: string;
}

interface InputProps {
  value: any;
  type?: 'number' | 'text';
  error?: string;
  placeholder?: string;
  onChange: (value: any) => void;
  onFocus?: () => void;
  onBlur: () => void;
  size: 'small' | 'medium';
}

export const Input = ({
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  error,
  type = 'text',
  size,
}: InputProps) => {
  return (
    <div className={classNames(styles.input, { [styles.error]: !!error })}>
      <BaseInput
        borderless={false}
        type={type}
        className={styles.baseInput}
        placeholder={placeholder}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        width="100%"
        size={size}
        color={size === 'small' ? 'white' : undefined}
        transparent={false}
      />
    </div>
  );
};
