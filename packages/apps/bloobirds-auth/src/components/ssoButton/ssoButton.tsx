import googleIcon from '../../assets/google_g.svg';
import styles from './ssoButton.module.css';

interface SsoButtonProps {
  provider: 'Google' | 'Microsoft';
  onClick: () => void;
}

function SSOButton({ provider, onClick }: SsoButtonProps) {
  const icon = provider === 'Google' ? googleIcon : '';

  return (
    <div onClick={onClick} className={styles.ssoButton}>
      <img src={icon} alt={provider + ' icon'} className={styles.icon} />
      <span className={styles.text}>Continue with {provider}</span>
    </div>
  );
}

export default SSOButton;
