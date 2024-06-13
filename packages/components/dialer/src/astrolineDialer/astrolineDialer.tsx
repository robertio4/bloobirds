import { AstrolineSvg, AstrolineCrossSvg } from '../assets/svg';
import styles from './astrolineDialer.module.css';
import { AstrolineDialerFrame } from './astrolineDialerFrame/astrolineDialerFrame';
import { useAstrolineVisibility } from './hooks/useAstrolineVisibility';

export const AstrolineDialer = ({ launchCCF }: { launchCCF: boolean }) => {
  const { astrolineVisible, toggleVisibility } = useAstrolineVisibility();
  return (
    <div>
      <div className={styles.astroline_icon} onClick={toggleVisibility}>
        <img
          className={styles.astroline_icon_img}
          alt="astroline-logo"
          src={astrolineVisible ? AstrolineCrossSvg : AstrolineSvg}
        />
        <div
          className={styles.astroline_dialer_container}
          style={{ display: !astrolineVisible && 'none' }}
        >
          <div className={styles.astroline_dialer}>
            <AstrolineDialerFrame launchCCF={launchCCF} />
          </div>
        </div>
      </div>
    </div>
  );
};
