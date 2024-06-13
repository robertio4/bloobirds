import {
  isHtml,
  stringToHTML,
  toCamelCase,
  toCamelCaseUpperFirst,
  toTitleCase,
  toSentenceCase,
  commaAndFormatArray,
} from './strings.utils';

test('properly sets an uncased text to camel case', () => {
  expect(toCamelCase('john doe the hidden')).toBe('johnDoeTheHidden');
});

describe('toTitleCase function', () => {
  test('properly sets an uncased text to title case', () => {
    expect(toTitleCase('john doe the hidden')).toBe('John Doe The Hidden');
  });

  test('properly sets an camel case text to title case', () => {
    expect(toTitleCase('johnDoeTheHidden')).toBe('John Doe The Hidden');
  });
});

describe('concat array function', () => {
  test('properly concats arrays of 2 items', () => {
    expect(commaAndFormatArray(['Pears', 'Lemons'])).toBe('Pears and Lemons');
  });

  test('properly concats arrays of more than 2 items', () => {
    expect(commaAndFormatArray(['Pears', 'Lemons', 'Bananas'])).toBe('Pears, Lemons and Bananas');
  });
});

test('an html snipped is detected as html', () => {
  const htmlSnippet =
    '<ul>\n' +
    '   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>\n' +
    '   <li>Aliquam tincidunt mauris eu risus.</li>\n' +
    '   <li>Vestibulum auctor dapibus neque.</li>\n' +
    '</ul>';

  expect(isHtml(htmlSnippet)).toBe(true);
});

test('a non html snipped is not detected as html', () => {
  const nonHtmlSnippet = 'Lorem ipsum \n test';
  expect(isHtml(nonHtmlSnippet)).toBe(false);
});

test('parses properly strings to html', () => {
  expect(stringToHTML('Oh my string!')).toContainHTML(`<div>Oh my string!</div>`);
});

describe('toSentenceCase function', () => {
  it('returns a sentence case string', () => {
    expect(toSentenceCase('hello world')).toBe('Hello world');
  });

  it('returns an empty string if the input is empty', () => {
    expect(toSentenceCase('')).toBe('');
  });

  it('returns an empty string if the input is null', () => {
    expect(toSentenceCase(null)).toBe('');
  });

  it('returns an empty string if the input is not a string', () => {
    expect(toSentenceCase(123)).toBe('');
  });
});

describe('toCamelCaseUpperFirst function', () => {
  it('returns a camel case string with first letter upper', () => {
    expect(toCamelCaseUpperFirst('hello world')).toBe('HelloWorld');
  });

  it('returns a camel case string with first letter upper', () => {
    expect(toCamelCaseUpperFirst('hello world')).toBe('HelloWorld');
  });

  it('returns an empty string if the input is empty', () => {
    expect(toCamelCaseUpperFirst('')).toBe('');
  });

  it('returns an empty string if the input is null', () => {
    expect(toCamelCaseUpperFirst(null)).toBe('');
  });

  it('returns an empty string if the input is not a string', () => {
    expect(toCamelCaseUpperFirst(123)).toBe('');
  });
});
