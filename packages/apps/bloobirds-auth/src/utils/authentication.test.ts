import {
  checkIfTokenExists,
  getToken,
  logout,
  redirectIfTokenIsPresentAndNotExpired,
  RedirectOptions,
} from './authentication.ts';
import './urls.ts';

jest.mock('./urls.ts', () => ({
  getApiUrl: jest.fn(() => 'http://api.test.com'),
  getAuthUrl: jest.fn(() => 'http://auth.test.com'),
  getAppUrl: jest.fn(() => 'http://app.test.com'),
  appUrls: {
    local: 'http://localhost:3000',
    development: 'https://app.dev-bloobirds.com',
    production: 'https://app.bloobirds.com',
  },
}));

const { location } = window;

let href = 'https://auth.bloobirds.com';

const getHrefSpy = jest.fn(() => href);
const setHrefSpy = jest.fn(h => (href = h));

beforeAll(() => {
  // @ts-ignore
  delete window.location;
  // @ts-ignore
  window.location = {};
  Object.defineProperty(window.location, 'href', {
    get: getHrefSpy,
    set: setHrefSpy,
  });
});

afterAll(() => {
  window.location = location;
});

describe('logout', () => {
  it('test_logout_removes_localStorage_items', () => {
    localStorage.setItem('bb-token-web', 'test');
    localStorage.setItem('bb-token-extension', 'test');
    logout();
    expect(localStorage.getItem('bb-token-web')).toBeNull();
    expect(localStorage.getItem('bb-token-extension')).toBeNull();
  });

  it('test_logout_redirects_to_correct_URL', () => {
    expect(logout()).toBe('/auth/login');
  });

  it('test_logout_with_no_localStorage_items', () => {
    localStorage.removeItem('bb-token-web');
    localStorage.removeItem('bb-token-extension');
    expect(() => logout()).not.toThrow();
  });
});

describe('tokens', () => {
  it('test_get_token_returns_token_value_when_it_exists', () => {
    // Arrange
    const tokenType = 'extension';
    const tokenValue = 'abc123';
    localStorage.setItem('bb-token-extension', tokenValue);

    // Act
    const result = getToken(tokenType);

    // Assert
    expect(result).toEqual(tokenValue);
  });

  it('test_get_token_returns_null_when_token_value_does_not_exist', () => {
    // Arrange
    const tokenType = 'extension';
    localStorage.removeItem('bb-token-extension');

    // Act
    const result = getToken(tokenType);

    // Assert
    expect(result).toBeNull();
  });

  it('test_get_token_throws_error_when_localStorage_not_available', () => {
    // Arrange
    const tokenType = 'extension';
    const originalLocalStorage = window.localStorage;
    // Replace localStorage with a mock that throws an error
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => {
          throw new Error('localStorage not available');
        },
      },
      writable: true,
    });

    // Act & Assert
    expect(() => getToken(tokenType)).toThrow('localStorage not available');

    // Restore original localStorage
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
    });
  });

  it('test_token_exists', () => {
    localStorage.setItem('bb-token-extension', 'testToken');
    expect(checkIfTokenExists('extension')).toBe(true);
  });

  it('test_token_does_not_exist', () => {
    localStorage.removeItem('bb-token-extension');
    expect(checkIfTokenExists('extension')).toBe(false);
  });

  it('test_null_token_type', () => {
    expect(checkIfTokenExists('')).toBe(false);
  });
});

describe('redirectIfTokenIsPresentAndNotExpired', () => {
  /*
    Objective:
The objective of the function is to check if a token exists and is not expired, and redirect the user to the appropriate URL based on the token type and referrer URL.

Inputs:
- referrerUrl: a string representing the URL of the page that referred the user to the current page.
- options: an object containing a boolean flag indicating whether the function is being called from an extension install.

Flow:
1. Initialize redirectUrl to referrerUrl.
2. If options.fromExtensionInstall is true, set redirectUrl to the Salesforce instance URL.
3. If a token of type 'extension' exists, post a message to the parent window with the token and redirect to the referrer URL if it is not the app.
4. If a token of type 'web' exists, redirect to the redirectUrl with the token appended to the URL.
   */
  it('test_redirect_if_token_is_present_and_not_expired_with_extension_token', async () => {
    const referrerUrl = 'https://app.bloobirds.com';
    const options: RedirectOptions = { fromExtensionInstall: true };
    localStorage.setItem('bb-token-extension', 'valid_token');
    const spy = jest.spyOn(window, 'postMessage');
    await redirectIfTokenIsPresentAndNotExpired(referrerUrl, options);
    expect(spy).toHaveBeenCalledWith({ type: 'FROM_AUTH', token: 'valid_token' }, '*');
    expect(window.location.href).toEqual('https://bloobirds-dev-ed.my.salesforce.com');
  });

  it('test_redirect_if_token_is_present_and_not_expired_with_web_token', async () => {
    const referrerUrl = 'https://app.bloobirds.com';
    const options: RedirectOptions = { fromExtensionInstall: false };
    localStorage.setItem('bb-token-web', 'valid_token');
    await redirectIfTokenIsPresentAndNotExpired(referrerUrl, options);
    expect(window.location.href).toEqual('https://app.bloobirds.com/?bb-token=valid_token');
  });

  it('test_redirect_if_token_is_present_and_not_expired_with_missing_token', async () => {
    const referrerUrl = 'https://app.bloobirds.com';
    const options: RedirectOptions = { fromExtensionInstall: false };
    await redirectIfTokenIsPresentAndNotExpired(referrerUrl, options);
    expect(window.location.href).toEqual('https://auth.bloobirds.com');
  });

  it('test_redirect_if_token_is_present_and_not_expired_with_non_app_referrer_url', async () => {
    const referrerUrl = 'https://google.com';
    const options: RedirectOptions = { fromExtensionInstall: false };
    localStorage.setItem('bb-token-web', 'valid_token');
    localStorage.setItem('bb-token-extension', 'valid_token');
    await redirectIfTokenIsPresentAndNotExpired(referrerUrl, options);
    expect(window.location.href).toEqual('https://google.com');
  });
});
