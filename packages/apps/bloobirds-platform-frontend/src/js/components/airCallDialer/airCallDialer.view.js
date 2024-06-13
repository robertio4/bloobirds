import React, { useEffect, useState } from 'react';

import { Tooltip, IconButton } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';

import crossAirCall from '../../../assets/crossAirCall.svg';
import airCall from '../../../assets/logoAirCall.svg';
import { AircallSvgDisabled } from '../../../assets/svg';
import { useEntity } from '../../hooks';
import {
  useAircallDialer,
  useAirCallDialerVisibility,
} from '../../hooks/useAirCallDialerVisibility';
import { useUserSettings } from '../userPermissions/hooks';
import styles from './airCallDialer.module.css';

const AirCallDialer = React.forwardRef((props, ref) => {
  const { aircallVisible, toggleVisibility } = useAirCallDialerVisibility();
  const { setLaunch, launch } = useAircallDialer();
  const [minimized, setMinimized] = useState();
  const settings = useUserSettings();

  useEffect(() => {
    if (aircallVisible) {
      setLaunch(true);
    }
  }, [aircallVisible]);

  const aircallUsers = useEntity('aircallUsers');
  const myAircallUserExists = aircallUsers
    ?.all()
    .some(user => user.bloobirdsUser === settings?.user.id);

  return (
    <div>
      <div
        className={styles.airCall_icon}
        onClick={myAircallUserExists ? toggleVisibility : () => {}}
      >
        {!myAircallUserExists ? (
          <Tooltip
            title="You don't have any Aircall User assigned, ask your admin to assign one in Bloobirds Settings!"
            position="left"
          >
            <AircallSvgDisabled className={styles.airCall_icon_img} />
          </Tooltip>
        ) : (
          <img
            src={aircallVisible ? crossAirCall : airCall}
            alt="aircall-logo"
            className={styles.airCall_icon_img}
          />
        )}
      </div>
      <div
        className={styles.airCall_dialer_container}
        style={{ display: !aircallVisible && 'none' }}
      >
        <div className={styles.airCall_minimize_container}>
          <IconButton
            name={minimized ? 'chevronUp' : 'chevronDown'}
            onClick={() => setMinimized(!minimized)}
            color="white"
            className={styles.aircall_minimize_icon}
            size={16}
          />
        </div>
        <div
          id="phone"
          className={classNames(styles.airCall_dialer, {
            [styles.airCall_dialer_minimized]: minimized,
          })}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default AirCallDialer;
