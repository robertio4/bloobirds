import { MIXPANEL_EVENTS } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { isValidPhone } from './phone.utils';

const isValidUrl = string => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

export const openWhatsAppWeb = (flagOpenNewPage: boolean, phoneNumber: string, text?: string) => {
  let url = 'https://web.whatsapp.com/';
  const isValidPhoneNumber = isValidPhone(phoneNumber);
  if (isValidPhoneNumber) {
    if (text) {
      url = `https://web.whatsapp.com/send/?phone=${phoneNumber}&text=${text}`;
    } else {
      url = `https://web.whatsapp.com/send/?phone=${phoneNumber}&text&type=phone_number&app_absent=0`;
    }
  }

  if (!isValidUrl(url)) {
    console.error('Invalid URL', url);
    url = 'https://web.whatsapp.com/';
  }

  if (chrome?.runtime?.sendMessage && chrome?.runtime?.id) {
    localStorage.setItem('openWhatsappChat', 'true');
    chrome?.runtime?.sendMessage({
      action: 'openWhatsappTab',
      url,
      forceOpenNewPage: flagOpenNewPage || !!text,
      phoneNumber,
    });
    mixpanel.track(MIXPANEL_EVENTS.OPEN_WHATSAPP_FROM_EXTENSION);
  } else {
    window.open(url, '_blank');
    mixpanel.track(MIXPANEL_EVENTS.OPEN_WHATSAPP_FROM_WEBAPP);
  }
};

export const isWhatsAppPage = (page?: string): boolean => {
  const currentPage = page ?? window.location.href;
  return currentPage.includes('web.whatsapp.com');
};
