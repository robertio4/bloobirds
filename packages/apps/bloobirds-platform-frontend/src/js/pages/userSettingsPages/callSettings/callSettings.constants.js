import React from 'react';

import {
  AircallSvg,
  AircallSvgDisabled,
  AstrolineSvg,
  JustCallSvgSettings,
  LogoSvg,
  NumintecSvg,
  RingoverSvg,
} from '../../../../assets/svg';

export const INFO_TOOLTIP_TEXT =
  "A private phone number is the number of your mobile device. When making calls with Bloobirds, we will call this number to connect you with the lead's number." +
  'Never your private number will be shown to the lead. Instead they will see the Bloobirds number assigned to your account.';

export const DIALER_TYPES_PROPS = Object.freeze({
  BLOOBIRDS_DIALER: {
    logo: () => <LogoSvg fill="var(--bloobirds)" />,
    name: 'Bloobirds',
  },
  AIRCALL_DIALER: {
    logo: disabled => (disabled ? <AircallSvgDisabled /> : <AircallSvg />),
    name: 'Aircall',
  },
  JUST_CALL_DIALER: {
    logo: () => <JustCallSvgSettings />,
    name: 'JustCall',
  },
  ASTROLINE_DIALER: {
    logo: () => <AstrolineSvg />,
    name: 'Astroline',
  },
  NUMINTEC_DIALER: {
    logo: () => <NumintecSvg />,
    name: 'Numintec',
  },
  RINGOVER_DIALER: {
    logo: () => <RingoverSvg />,
    name: 'Ringover',
  },
});
