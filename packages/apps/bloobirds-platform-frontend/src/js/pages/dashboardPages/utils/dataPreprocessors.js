import { groupBy, merge, pick, uniq } from 'lodash';

const getPointTotalValue = ({ point, dataKeys }) =>
  dataKeys.reduce((acc, dataKey) => (acc += point[dataKey] || 0), 0);

const isEmpty = value => (typeof value === 'string' && !parseFloat(value)) || value === 0;

const eraseEmptyStart = points => {
  let emptyWindow = true;
  let i = 0;
  while (emptyWindow && i < points.length) {
    const point = points[i];
    const keysToCheck = Object.keys(point).filter(key => key !== '__timestamp');
    const values = keysToCheck.map(key => point[key]);
    emptyWindow = values.every(isEmpty);
    if (emptyWindow) i += 1;
  }
  return points.slice(i);
};

const byTotalValue = ({ dataKeys, sortDirection }) => {
  const sign = sortDirection === 'DESC' ? -1 : 1;

  return (a, b) =>
    sign *
    Math.sign(
      getPointTotalValue({ dataKeys, point: a }) - getPointTotalValue({ dataKeys, point: b }),
    );
};

const byTimestamp = (a, b) => Math.sign(b.__timestamp - a.__timestamp);

const maybeSort = ({ dataKeys, points, sortByValue, sortDirection, groupCase = false }) => {
  if (!sortByValue && !groupCase) {
    return points;
  }

  return [...points].sort(byTotalValue({ dataKeys, sortDirection }));
};

const unwrapLabels = ({ labels, data, labelKey, countKey }) =>
  data.map(obj =>
    labels.reduce(
      (memo, label) => {
        if (label !== obj[labelKey]) {
          return memo;
        }

        return {
          ...memo,
          [label]: obj[countKey],
        };
      },
      { ...obj },
    ),
  );

const isConversionRate = report => /(CR_[\w_]*)/.test(report);

const possibleZeroRports = report => report === 'SALES_CYCLE' || report === 'OPPORTUNITIES_REVENUE';

export const isCustomColor = (customInformation, keysColors) => {
  if (keysColors) {
    return true;
  } else {
    return (
      customInformation &&
      Object.keys(customInformation).length !== 0 &&
      Object.values(customInformation)?.some(value => value.color !== 'None')
    );
  }
};

const trimUnits = amount => {
  let finalAmount = `${amount}`;
  if (amount > 9999) {
    amount /= 1000;
    finalAmount = `${Math.round(amount)}k`;
    if (amount > 999) {
      amount /= 1000;
      finalAmount = `${Math.round(amount * 10) / 10}M`;
    }
  }
  return finalAmount;
};

export const preprocessLineChartData = (data, report, eraseStart, options = {}) => {
  const labels = uniq(data.map(obj => obj._label));
  const pointKeys = [...labels, '_label', '__timestamp'];
  const { unit } = options;
  let points = Object.values(
    groupBy(unwrapLabels({ labels, data, labelKey: '_label', countKey: 'count' }), '__timestamp'),
  )
    .map(objects => merge({}, labels, ...objects))
    .map(point => pick(point, pointKeys));

  if (eraseStart) {
    points = eraseEmptyStart(points);
  }

  return {
    dataKeys: labels,
    groupKey: '__timestamp',
    points,
    unit: unit ? ` ${unit}` : undefined,
    renderLabel: unit === '€' ? value => trimUnits(value) : undefined,
  };
};

export const preprocessStackedBarChartData = (report, data, options = {}) => {
  const { sortByValue = false, sortDirection = 'DESC', unit, hideAmount } = options;
  const containsGroup = Object.keys(data[0] || []).some(key => key.match(/_group/));
  const conversionRate = isConversionRate(report);

  const groupKey = containsGroup ? '_label_group' : '_label';
  const labelKey = containsGroup ? '_label' : '_label_stack';

  const labels = uniq(data.map(obj => obj[labelKey]));

  let points = Object.values(
    groupBy(unwrapLabels({ labels, data, countKey: 'count', labelKey }), `${groupKey}`),
  ).map(objects => merge(...objects));

  const pointKeys = [...labels, groupKey];

  if (containsGroup && !conversionRate && !possibleZeroRports(report)) {
    points = points.filter(point => !Object.values(point).every(isEmpty));
  }

  return {
    dataKeys: labels,
    groupKey,
    points: maybeSort({
      dataKeys: labels,
      points: points.map(point => pick(point, pointKeys)),
      sortDirection,
      sortByValue,
      groupCase: containsGroup,
    }),
    showTooltip: true,
    unit: unit ? ` ${unit}` : undefined,
    hideAmount: hideAmount,
    renderLabel: unit === '€' ? value => trimUnits(value) : undefined,
  };
};

export const preprocessRegularBarChartData = (report, data, options) => {
  const { sortByValue = false, sortDirection = 'DESC', unit } = options;
  const dataKeys = ['count'];
  return {
    groupKey: '_label',
    dataKeys,
    points: maybeSort({ dataKeys, points: data, sortDirection, sortByValue }),
    unit: unit ? ` ${unit}` : undefined,
    renderLabel: unit === '€' ? value => trimUnits(value) : undefined,
  };
};

export const preprocessTableChartData = (data, eraseStart) => {
  const labels = uniq(data.map(obj => obj._label));

  let points = Object.values(
    groupBy(unwrapLabels({ labels, data, countKey: 'count', labelKey: '_label' }), '__timestamp'),
  ).map(objects => merge(...objects));

  const rowKeys = [...labels, '__timestamp'];
  if (eraseStart) {
    points = eraseEmptyStart(points);
  }

  return {
    labels: ['__timestamp', ...labels],
    rows: points.map(point => pick(point, rowKeys)).sort(byTimestamp),
  };
};
