import { convertHtmlToString, parseEmailPixels, removeHtmlTags } from './email.utils';

/*
Objective:
The objective of the removeHtmlTags function is to remove all HTML tags and special characters from a given text string.

Inputs:
- text: a string containing HTML tags and special characters.

Flow:
- Define regular expressions to match style tags, xml tags, HTML tags, and special characters.
- Use the optional chaining operator to apply each regular expression to the input text and replace the matches with an empty string.
- Return the modified text.

Outputs:
- A string with all HTML tags and special characters removed.

Additional aspects:
- The function uses regular expressions to match and remove HTML tags and special characters, making it a fast and efficient way to sanitize text.
- The function does not modify the original input text, but instead returns a new string with the modifications applied
*/

describe('removeHtmlTags_function', () => {
  // Tests that the function preserves line breaks and white spaces outside of HTML tags. Tags: [general behavior] tags: ['general behavior']
  it('test_preserves_line_breaks_and_white_spaces', () => {
    const input =
      'This is a \n test \n with line breaks. <div> This is a test with <b>bold</b> and <i>italic</i> tags. </div>';
    const expectedOutput =
      'This is a \n test \n with line breaks.  This is a test with bold and italic tags. ';
    expect(removeHtmlTags(input)).toEqual(expectedOutput);
  });

  // Tests that the function does not remove non-HTML tags that may look like HTML tags. Tags: [other possible issues] tags: ['other possible issues']
  it('test_handling_of_non_html_tags', () => {
    const input = 'This is a test with <notatag>not a tag</notatag> and <div> a real tag </div>';
    const expectedOutput = 'This is a test with not a tag and  a real tag ';
    expect(removeHtmlTags(input)).toEqual(expectedOutput);
  });

  // Tests that the function handles invalid HTML syntax gracefully. Tags: [other possible issues] tags: ['other possible issues']
  it('test_handling_of_invalid_html_syntax', () => {
    const input = 'This is a test with <div> an unclosed tag and &invalid; syntax </div>';
    const expectedOutput = 'This is a test with  an unclosed tag and  syntax ';
    expect(removeHtmlTags(input)).toEqual(expectedOutput);
  });

  // Tests that the function returns the input text unchanged when there are no HTML tags present. Tags: [happy path]
  it('test_text_with_no_html_tags', () => {
    const input = 'This is a text with no HTML tags';
    const output = removeHtmlTags(input);
    expect(output).toEqual(input);
  });

  // Tests that the function removes the specified HTML tag from the input text. Tags: [happy path]
  it('test_text_with_one_type_of_html_tag', () => {
    const input = '<p>This is a text with a paragraph tag</p>';
    const output = removeHtmlTags(input);
    expect(output).toEqual('This is a text with a paragraph tag');
  });

  // Tests that the function correctly removes nested HTML tags from the input text. Tags: [edge case]
  it('test_text_with_nested_html_tags', () => {
    const input = '<div><p>This is a text with nested tags</p></div>';
    const output = removeHtmlTags(input);
    expect(output).toEqual('This is a text with nested tags');
  });

  // Tests that the function correctly removes special characters inside HTML tags from the input text. Tags: [edge case]
  it('test_text_with_special_characters_inside_html_tags', () => {
    const input = '<p>This is a text with &lt; and &gt; inside the tag</p>';
    const output = removeHtmlTags(input);
    expect(output).toEqual('This is a text with  and  inside the tag');
  });

  // Tests that the function returns an empty string when given null or undefined input. Tags: [general behavior]
  it('test_null_input_returns_empty_string', () => {
    const input = null;
    const output = removeHtmlTags(input);
    expect(output).toEqual(undefined);
  });

  // Tests that the function removes all HTML tags from the input text. Tags: [happy path]
  it('test_text_with_multiple_types_of_html_tags', () => {
    const input =
      '<h1>This is a title</h1><p>This is a paragraph</p><ul><li>Item 1</li><li>Item 2</li></ul>';
    const output = removeHtmlTags(input);
    expect(output).toEqual('This is a titleThis is a paragraphItem 1Item 2');
  });

  // Tests that the function correctly removes content inside <style> tags from the input text. Tags: [happy path] tags: ['happy path']
  it('test_use_of_style_tags', () => {
    const inputText =
      '<html><head><style>body {background-color: red;}</style></head><body><h1>Hello World!</h1></body></html>';
    const expectedOutput = 'Hello World!';
    expect(removeHtmlTags(inputText)).toEqual(expectedOutput);
  });

  // Tests that the function correctly removes HTML entities from the input text. Tags: [edge case] tags: ['edge case']
  it('test_text_with_html_entities', () => {
    const inputText = 'This is a &lt;test&gt; string with &amp;entities.';
    const expectedOutput = 'This is a test string with entities.';
    expect(removeHtmlTags(inputText)).toEqual(expectedOutput);
  });

  // Tests the performance of the function with large input. Tags: [other possible issues] tags: ['other possible issues']
  it('test_performance_with_large_input', () => {
    let inputText = '<html><head><style>body {background-color: red;}</style></head><body>';
    for (let i = 0; i < 100000; i++) {
      inputText += '<p>This is a paragraph.</p>';
    }
    inputText += '</body></html>';
    const startTime = new Date().getTime();
    removeHtmlTags(inputText);
    const endTime = new Date().getTime();
    expect(endTime - startTime).toBeLessThan(1000);
  });
});

// Generated by CodiumAI

/*
Code Analysis

Objective:
The objective of the function is to convert HTML code to plain text, with the option to replace new lines and list tags with their corresponding characters.

Inputs:
- body: a string containing HTML code or plain text.
- withNewLines (optional): a boolean indicating whether to replace new lines with '\n' and list tags with '-'.

Flow:
1. Check if the input body is HTML code using the isHtml function.
2. If it is HTML code, convert it to plain text using the HTMLToString function.
3. Replace new lines and list tags if the withNewLines parameter is true.
4. Return the parsed plain text.

Outputs:
- A string containing the parsed plain text.

Additional aspects:
- The function uses two helper functions, isHtml and HTMLToString, from the strings.utils module.
- The function uses regular expressions to replace new lines, list tags, and other unwanted characters.
- The function trims the plain text before encoding it.
*/

describe('convertHtmlToString_function', () => {
  // Tests that convertHtmlToString does not replace <br> tags with new lines when withNewLines is false. Tags: [happy path]
  it('test_convert_html_to_string_without_new_lines', () => {
    const body = '<p>Hello<br>World</p>';
    const expected = 'HelloWorld';
    const result = convertHtmlToString(body, false);
    expect(result).toEqual(expected);
  });

  // Tests that convertHtmlToString returns an empty string when body is an empty string. Tags: [edge case]
  it('test_convert_empty_string_to_string', () => {
    const body = '';
    const expected = '';
    const result = convertHtmlToString(body);
    expect(result).toEqual(expected);
  });

  // Tests that convertHtmlToString returns an empty string when body contains only whitespace characters. Tags: [edge case]
  it('test_convert_whitespace_to_string', () => {
    const body = '   ';
    const expected = ' ';
    const result = convertHtmlToString(body);
    expect(result).toEqual(expected);
  });

  // Tests that convertHtmlToString returns the same plain text string when body is not a valid HTML string. Tags: [happy path]
  it('test_convert_plain_text_to_string', () => {
    const body = 'Hello World';
    const expected = 'Hello World';
    const result = convertHtmlToString(body);
    expect(result).toEqual(expected);
  });
});

// Generated by CodiumAI

/*
Code Analysis

Objective:
The objective of the parseEmailPixels function is to remove pixel tracking codes from an HTML string.

Inputs:
- value: a string containing HTML code that may include pixel tracking codes.

Flow:
1. The function initializes a variable called html with the value of the input parameter.
2. If the input parameter is truthy, the function uses the reduce method on the PIXEL_REGEX array to remove any pixel tracking codes from the html variable.
3. The function returns the modified html variable.

Outputs:
- html: a string containing the original HTML code with any pixel tracking codes removed.

Additional aspects:
- The function relies on the PIXEL_REGEX array, which is not defined in the code provided.
*/

describe('parseEmailPixels_function', () => {
  // Tests that the function returns the input value if it is a valid HTML string without any pixel regex. Tags: [happy path]
  it('test_parse_email_pixels_with_valid_html_string', () => {
    const input = '<p>This is a valid HTML string</p>';
    const output = parseEmailPixels(input);
    expect(output).toEqual(input);
  });

  // Tests that the function returns an empty string if the input value is an empty string. Tags: [happy path]
  it('test_parse_email_pixels_with_empty_string', () => {
    const input = '';
    const output = parseEmailPixels(input);
    expect(output).toEqual('');
  });

  // Tests that the function handles cases where the input value is not a valid HTML string. Tags: [edge case]
  it('test_parse_email_pixels_with_invalid_html_string', () => {
    const input = '<p>This is an invalid HTML string';
    const output = parseEmailPixels(input);
    expect(output).toEqual(input);
  });

  // Tests that the function handles cases where the input value is not a string. Tags: [edge case]
  it('test_parse_email_pixels_with_non_string_input', () => {
    const input = '123';
    const output = parseEmailPixels(input);
    expect(output).toEqual(input);
  });

  // Tests that the function handles cases where the input value does not contain any HTML. Tags: [edge case]
  it('test_parse_email_pixels_with_non_html_input', () => {
    const input = 'This is not an HTML string';
    const output = parseEmailPixels(input);
    expect(output).toEqual(input);
  });

  // Tests that the function removes all pixel regex from the input value and returns the modified value. Tags: [happy path]
  it('test_parse_email_pixels_with_pixel_regex', () => {
    const input = "<img src='https://mailtrack.io/pixel.gif'>";
    const output = parseEmailPixels(input);
    expect(output).toEqual('');
  });
});
