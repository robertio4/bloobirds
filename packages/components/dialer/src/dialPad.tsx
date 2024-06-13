import React from 'react';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import { DialerStatus, useDialer, useDialerStore } from './dialer';
import styles from './dialer.module.css';

function DialPadButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const status = useDialer(state => state.status);
  const disabled = status === DialerStatus.authorizing;

  // If instance of children is a string, we want to render it as a Text component else we render it as it is
  // If the number is from 2 to 9 we need to render the letters below the number
  return (
    <div
      className={clsx(styles.dialPadButton, {
        [styles.dialPadButton__disabled]: disabled,
      })}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      {typeof children === 'string' ? (
        <>
          <Text size="m" color="peanut" align="center">
            {children}
          </Text>
          {children === '2' && (
            <Text size="xs" color="softPeanut" align="center">
              ABC
            </Text>
          )}
          {children === '3' && (
            <Text size="xs" color="softPeanut" align="center">
              DEF
            </Text>
          )}
          {children === '4' && (
            <Text size="xs" color="softPeanut" align="center">
              GHI
            </Text>
          )}
          {children === '5' && (
            <Text size="xs" color="softPeanut" align="center">
              JKL
            </Text>
          )}
          {children === '6' && (
            <Text size="xs" color="softPeanut" align="center">
              MNO
            </Text>
          )}
          {children === '7' && (
            <Text size="xs" color="softPeanut" align="center">
              PQRS
            </Text>
          )}
          {children === '8' && (
            <Text size="xs" color="softPeanut" align="center">
              TUV
            </Text>
          )}
          {children === '9' && (
            <Text size="xs" color="softPeanut" align="center">
              WXYZ
            </Text>
          )}
        </>
      ) : (
        children
      )}
    </div>
  );
}

export function DialPad() {
  const { setDialedPhoneNumber, snapshot } = useDialerStore();
  const dialedPhoneNumber = useDialer(state => state.dialedPhoneNumber);
  const status = useDialer(state => state.status);

  const handleNumberClick = (number: string) => {
    if (status === DialerStatus.idle) {
      setDialedPhoneNumber(dialedPhoneNumber + number);
    }
    if (status === DialerStatus.connected) {
      setDialedPhoneNumber(dialedPhoneNumber + number);
      snapshot()?.call?.sendDigits(number);
    }
  };

  const handleBackspaceClick = () => {
    if (status === DialerStatus.idle) {
      setDialedPhoneNumber(dialedPhoneNumber.slice(0, -1));
    }
  };

  const handlePlusClick = () => {
    if (status === DialerStatus.idle) {
      setDialedPhoneNumber(dialedPhoneNumber + '+');
    }
  };

  return (
    <div className={styles.dialPad}>
      <div className={styles.dialPadRow}>
        <DialPadButton onClick={() => handleNumberClick('1')}>1</DialPadButton>
        <DialPadButton onClick={() => handleNumberClick('2')}>2</DialPadButton>
        <DialPadButton onClick={() => handleNumberClick('3')}>3</DialPadButton>
      </div>
      <div className={styles.dialPadRow}>
        <DialPadButton onClick={() => handleNumberClick('4')}>4</DialPadButton>
        <DialPadButton onClick={() => handleNumberClick('5')}>5</DialPadButton>
        <DialPadButton onClick={() => handleNumberClick('6')}>6</DialPadButton>
      </div>
      <div className={styles.dialPadRow}>
        <DialPadButton onClick={() => handleNumberClick('7')}>7</DialPadButton>
        <DialPadButton onClick={() => handleNumberClick('8')}>8</DialPadButton>
        <DialPadButton onClick={() => handleNumberClick('9')}>9</DialPadButton>
      </div>
      <div className={styles.dialPadRow}>
        <DialPadButton onClick={() => handleNumberClick('*')}>*</DialPadButton>
        <DialPadButton onClick={() => handleNumberClick('0')}>0</DialPadButton>
        <DialPadButton onClick={() => handleNumberClick('#')}>#</DialPadButton>
      </div>
      <div className={styles.dialPadRow}>
        <DialPadButton onClick={handlePlusClick}>+</DialPadButton>
        <DialPadButton onClick={handleBackspaceClick}>
          <Icon name="arrowLeft" size={16} color="bloobirds" />
        </DialPadButton>
      </div>
    </div>
  );
}
