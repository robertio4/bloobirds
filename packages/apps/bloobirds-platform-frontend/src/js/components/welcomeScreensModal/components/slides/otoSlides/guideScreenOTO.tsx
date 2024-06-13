import React, { useEffect } from 'react';

import { OTOConnectionsGuide } from '../../quickStartGuideBlocks/otoConnectionsGuide';
import styles from './otoSlides.module.css';

function GuideScreenOTO({
  handleFinish,
  setHideFooter,
}: {
  handleFinish: () => void;
  setHideFooter: (value: boolean) => void;
}) {
  useEffect(() => setHideFooter(true), []);
  return (
    <div key="guideScreenOTO" className={styles.backgroundWhite}>
      <OTOConnectionsGuide handleFinish={handleFinish} />
    </div>
  );
}

export default GuideScreenOTO;
