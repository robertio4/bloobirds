import React from 'react';

import { LogoSvg } from '../../../assets/svg';
import { servicesEnv } from '../../misc/api/ApiHosts';
import styles from './header.module.css';

let envColor;
if (servicesEnv === 'production') {
  envColor = 'var(--bloobirds)';
} else {
  envColor = servicesEnv === 'staging' ? 'var(--softBanana)' : 'var(--grape';
}

const BloobirdsLogo = () => <LogoSvg className={styles._bloobirds_logo} fill={envColor} />;

export { BloobirdsLogo };
