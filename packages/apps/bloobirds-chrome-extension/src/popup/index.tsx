import * as ReactDOM from 'react-dom';

import styles from './index.module.css';

const PopupFooter = (): JSX.Element => {
  const manifest = chrome.runtime.getManifest();
  const currentVersion = manifest.version;

  return (
    <div className={styles._version}>
      <div>Version: {currentVersion}</div>
    </div>
  );
};
const Popup = (): JSX.Element => {
  return (
    <div className={styles._container}>
      <PopupFooter />
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
