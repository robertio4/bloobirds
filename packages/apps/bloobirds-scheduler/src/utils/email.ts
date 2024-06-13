const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const specialChar = ['ñ', 'ü'];
export const isEmail = email =>
  email !== undefined &&
  email !== null &&
  email !== '' &&
  emailRegex.test(String(email).toLowerCase()) &&
  !specialChar.some(char => email.toLowerCase().includes(char));
