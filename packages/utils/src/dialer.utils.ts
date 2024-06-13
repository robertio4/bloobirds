import { Settings } from '@bloobirds-it/types';

export const getNavElements = () => {
  return Array.from(document.querySelectorAll('.itemTitle.slds-truncate'));
};

export const hasAircallInSalesforceInstalled = () => {
  return !!document.querySelector('div[data-component-id="opencti_softPhone"]');
};

export const openPhoneOrDialer = async (
  number: string,
  settings: Settings,
  openBBDialer: (num: string, bobjectId?: string) => void,
  bobjectId?: string,
) => {
  if (
    settings?.user?.dialerType === 'BLOOBIRDS_DIALER' ||
    settings?.user?.dialerType === 'ASTROLINE_DIALER' ||
    !settings?.user?.dialerType
  ) {
    const dialerShown = !!document.getElementById('dialer-drag-box');
    openBBDialer(number, bobjectId);
    if (settings?.user?.dialerType === 'ASTROLINE_DIALER') {
      setTimeout(
        // @ts-ignore
        () => window.frames.sf?.postMessage({ type: 'click2call', data: { number: number } }, '*'),
        dialerShown ? 200 : 800,
      );
    }
  } else if (settings?.user?.dialerType === 'AIRCALL_DIALER') {
    openBBDialer(null);
    setTimeout(() => openBBDialer(number, bobjectId), 1);
  } else if (settings?.user?.dialerType === 'NUMINTEC_DIALER') {
    openBBDialer(null);
    setTimeout(() => openBBDialer(number, bobjectId), 1);
  } else if (settings?.user?.dialerType === 'RINGOVER_DIALER') {
    openBBDialer(null);
    setTimeout(() => openBBDialer(number, bobjectId), 1);
  } else {
    window.open(`tel:${number}`, '_self');
  }
};
