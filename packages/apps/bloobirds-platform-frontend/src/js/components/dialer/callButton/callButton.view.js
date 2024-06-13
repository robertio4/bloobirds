import React from 'react';

import { Icon } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';
import classNames from 'clsx';
import PropTypes from 'prop-types';

import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import {
  isCallConnecting,
  isCallEnded,
  isCallIncoming,
  isCallIncomingToSDRPhone,
  isCallInCourse,
} from '../dialer.utils';
import styles from './callButton.module.css';

const CallButtonView = ({
  acceptCall,
  endCall,
  greenControlDisabled,
  makeCall,
  redControlDisabled,
  state,
}) => {
  const greenButtonAction = isCallIncoming(state) ? acceptCall : makeCall;
  const redButtonAction = endCall;
  const hasQSGEnabled = useQuickStartEnabled();
  const { save } = useUserHelpers();
  const greenButtonClasses = classNames(styles._green__button, {
    [styles._call__animation]: isCallIncoming(state),
    [styles._button__disabled]: isCallEnded(state) || greenControlDisabled,
    [styles._call__disabled]: isCallIncomingToSDRPhone(state),
  });

  const redButtonClasses = classNames(styles._red__button, {
    [styles._call__animation]: isCallConnecting(state),
    [styles._call__disabled]: redControlDisabled,
  });

  const renderGreenButton = !(isCallConnecting(state) || isCallInCourse(state));

  const renderRedButton = isCallIncoming(state) || isCallInCourse(state) || isCallConnecting(state);

  return (
    <div className={styles._container}>
      {renderGreenButton && (
        <div
          data-test="Button-Dialer-Call"
          className={greenButtonClasses}
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            (!isCallEnded(state) || isCallIncomingToSDRPhone(state)) && greenButtonAction();
            if (hasQSGEnabled) save(UserHelperKeys.CALL_AND_REPORT_RESULT);
          }}
        >
          <Icon name="phone" size={32} color="white" />
        </div>
      )}
      {renderRedButton && (
        <div
          data-test="Button-Dialer-HangUp"
          className={redButtonClasses}
          onClick={() => !redControlDisabled && redButtonAction()}
        >
          <Icon name="phoneHang" size={32} color={redControlDisabled ? 'softPeanut' : 'white'} />
        </div>
      )}
    </div>
  );
};

CallButtonView.propTypes = {
  acceptCall: PropTypes.func.isRequired,
  endCall: PropTypes.func.isRequired,
  greenControlDisabled: PropTypes.bool.isRequired,
  makeCall: PropTypes.func.isRequired,
  redControlDisabled: PropTypes.bool.isRequired,
  state: PropTypes.string.isRequired,
};

export default CallButtonView;
