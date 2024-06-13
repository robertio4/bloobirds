import { parsePhoneNumber } from 'libphonenumber-js';

export const isValidPhone = phone => {
  try {
    const extraValidPrefixes = ['225', '00225'];
    const cleanedPhoneNumber = phone.replace(/\D/g, '');
    for (const prefix of extraValidPrefixes) {
      if (cleanedPhoneNumber.startsWith(prefix)) {
        if (cleanedPhoneNumber.length >= 10 && cleanedPhoneNumber.length <= 13) {
          return true;
        }
      }
    }
    const phoneParsed = parsePhoneNumber(phone);
    return phoneParsed.isValid();
  } catch (e) {
    return false;
  }
};
