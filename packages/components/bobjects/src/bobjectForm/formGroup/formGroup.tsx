import styles from './formGroup.module.css';

interface FormLabelProps {
  children: any;
  required?: boolean;
  style?: 'light' | 'gradient';
}

interface FormGroupProps {
  children: any;
  size?: 'small' | 'medium';
}

export const FormLabel = ({ children, required = false, style }: FormLabelProps) => {
  return (
    <label
      className={styles.label}
      style={{
        color: style === 'gradient' ? 'var(--white)' : 'var(--softPeanut)',
      }}
    >
      {children}
      {required ? '*' : ''}
    </label>
  );
};

export const FormGroup = ({ children, size = 'small' }: FormGroupProps) => {
  return <div className={size === 'small' ? styles.group : undefined}>{children}</div>;
};
