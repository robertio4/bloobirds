import { addHttpIfNeeded, addProtocolToURL, extractSalesforceIdFromPath } from './url.utils';

test('adds http to an url without protocol', () => {
  expect(addHttpIfNeeded('bloobirds.com')).toBe('http://bloobirds.com');
});

test('does not add http to an url with https protocol', () => {
  expect(addHttpIfNeeded('https://bloobirds.com')).toBe('https://bloobirds.com');
});

test('does not add http to an url with http protocol', () => {
  expect(addHttpIfNeeded('http://bloobirds.com')).toBe('http://bloobirds.com');
});

describe('addProtocolToURL_function', () => {
  // Tests that the function returns the original URL if it has http protocol.
  it('test_url_with_http_protocol', () => {
    const url = 'http://www.example.com';
    expect(addProtocolToURL(url)).toBe(url);
  });

  // Tests that the function returns the original URL if it has https protocol.
  it('test_url_with_https_protocol', () => {
    const url = 'https://www.example.com';
    expect(addProtocolToURL(url)).toBe(url);
  });

  // Tests that the function adds https protocol if no protocol is specified.
  it('test_url_with_no_protocol', () => {
    const url = 'www.example.com';
    expect(addProtocolToURL(url)).toBe('https://www.example.com');
  });

  // Tests that the function adds https protocol if an invalid protocol is specified.
  it('test_url_with_invalid_protocol', () => {
    const url = 'ftp://www.example.com';
    expect(addProtocolToURL(url)).toBe('ftp://www.example.com');
  });

  // Tests that the function handles URLs with special characters.
  it('test_url_with_special_characters', () => {
    const url = 'https://www.example.com/?q=hello%20world';
    expect(addProtocolToURL(url)).toBe(url);
  });

  // Tests that the function adds https protocol if only the protocol is specified.
  it('test_url_with_only_protocol', () => {
    const url = 'https://';
    expect(addProtocolToURL(url)).toBe('https://');
  });

  // Tests that the function returns an error when the URL is empty.
  it('test_empty_url', () => {
    const url = '';
    expect(addProtocolToURL(url)).toBe('');
  });

  // Tests that the function returns an error when the URL is null.
  it('test_null_url', () => {
    const url = null;
    expect(addProtocolToURL(url)).toBe('');
  });

  // Tests that the function correctly handles URLs with query parameters.
  it('test_url_with_query_parameters', () => {
    const url = 'https://www.example.com/path?param1=value1&param2=value2';
    expect(addProtocolToURL(url)).toBe(url);
  });

  // Tests that the function correctly handles URLs with fragments.
  it('test_url_with_fragments', () => {
    const url = 'https://www.example.com/path#fragment';
    expect(addProtocolToURL(url)).toBe(url);
  });

  // Tests that the function correctly handles URLs with special characters.
  it('test_url_with_special_characters', () => {
    const url =
      'https://www.example.com/path?param=value&special=%20%23%24%25%26%27%28%29%2A%2B%2C%2F%3A%3B%3C%3D%3E%3F%40%5B%5D%5E%60%7B%7C%7D~';
    expect(addProtocolToURL(url)).toBe(url);
  });

  // Tests that the function returns an error when the URL is undefined.
  it('test_undefined_url', () => {
    const url = undefined;
    expect(addProtocolToURL(url)).toBe('');
  });
});

describe('getSalesforceIdFromPath', () => {
  // Returns the correct Salesforce ID when given a valid path with a single object type.
  it('should return the correct Salesforce ID when given a valid path with a single object type', () => {
    const currentPage = 'https://example.lightning.force.com/Lead/00Q1t0000012345';
    const result = extractSalesforceIdFromPath(currentPage);
    expect(result).toBe('00Q1t0000012345');
  });

  // Returns the correct Salesforce ID when given a valid path with multiple object types and the ID is in the correct position.
  it('should return the correct Salesforce ID when given a valid path with multiple object types and the ID is in the correct position', () => {
    const currentPage =
      'https://example.lightning.force.com/Lead/00Q1t0000012345/Account/0012t0000012345';
    const result = extractSalesforceIdFromPath(currentPage);
    expect(result).toBe('00Q1t0000012345');
  });

  // Returns null when given a valid path with multiple object types but the ID is not found.
  it('should return null when given a valid path with multiple object types but the ID is not found', () => {
    const currentPage = 'https://example.lightning.force.com/Lead/Account';
    const result = extractSalesforceIdFromPath(currentPage);
    expect(result).toBeUndefined();
  });

  // Returns null when given an empty string.
  it('should return null when given an empty string', () => {
    const currentPage = '';
    const result = extractSalesforceIdFromPath(currentPage);
    expect(result).toBeNull();
  });

  // Returns null when given a path without a valid Salesforce object type.
  it('should return null when given a path without a valid Salesforce object type', () => {
    const currentPage = 'https://example.lightning.force.com/InvalidType/00Q1t0000012345';
    const result = extractSalesforceIdFromPath(currentPage);
    expect(result).toBeNull();
  });

  // Returns null when given a path with a valid Salesforce object type but no ID.
  it('should return null when given a path with a valid Salesforce object type but no ID', () => {
    const currentPage = 'https://example.lightning.force.com/Lead';
    const result = extractSalesforceIdFromPath(currentPage);
    expect(result).toBeUndefined();
  });

  // When the url is a sales console qualified url: https://exoticca--bloobirds.sandbox.lightning.force.com/lightning/r/Account/0011X00001DsLozQAF/view?ws=%2Flightning%2Fr%2FLead%2F00Q1X000006WUGiUAO%2Fview it should take the id from the view param
  it('should take the id from the view param when the url is a sales console qualified url', () => {
    const currentPage =
      'https://exoticca--bloobirds.sandbox.lightning.force.com/lightning/r/Account/0011X00001DsLozQAF/view?ws=%2Flightning%2Fr%2FLead%2F00Q1X000006WUGiUAO%2Fview';
    const result = extractSalesforceIdFromPath(currentPage);
    expect(result).toBe('0011X00001DsLozQAF');
  });

  // When the url is a sales console qualified url: https://exoticca--bloobirds.sandbox.lightning.force.com/lightning/r/Account/0011X00001DsLozQAF/view?ws=%2Flightning%2Fr%2FLead%2F00Q1X000006WUGiUAO%2Fview it should take the id from the ws query param
  it('should take the id from the ws query param when the url is a sales console qualified url', () => {
    const currentPage =
      'https://exoticca--bloobirds.sandbox.lightning.force.com/lightning/r/Account/0011X00001DsLozQAF/view?ws=%2Flightning%2Fr%2FLead%2F00Q1X000006WUGiUAO%2Fview';
    const result = extractSalesforceIdFromPath(currentPage);
    expect(result).toBe('00Q1X000006WUGiUAO');
  });
});
