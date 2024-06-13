export const getTextLabelFromPicklistValues = (values, picklistFieldValues) => {
  const customLabels = {
    __me__: 'Me',
    __MATCH_EMPTY_ROWS__: 'Empty',
    __MATCH_FULL_ROWS__: 'No empty',
  };
  const regex = RegExp('__[a-zA-Z_]*__');
  let textLabel = '';
  if (Array.isArray(values) && values.length) {
    textLabel = values
      .map(value => value && (regex.test(value) ? value : picklistFieldValues.get(value)))
      .map(value => value && (regex.test(value) ? customLabels[value] : value.value))
      .reduce((x, y) => `${x}, ${y}`);
  } else {
    textLabel = regex.test(values) ? values : picklistFieldValues.get(values)?.value;
  }
  return textLabel;
};
