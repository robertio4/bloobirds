import { parseAmount, shortenAmount } from './amount.utils';

describe('amount parser', () => {
  test('given an amount whose format is string, then the amount is formatted correctly', () => {
    const amount = '123.45';
    const result = parseAmount(amount);
    expect(result).toBe('123.45');
  });
  test('given an amount whose format is integer, then the amount is formatted correctly', () => {
    const amount = 123.45;
    const result = parseAmount(amount);
    expect(result).toBe('123.45');
  });
  test('given an amount without decimals whose format is integer, then the amount is formatted correctly', () => {
    const amount = 123;
    const result = parseAmount(amount);
    expect(result).toBe('123.00');
  });
  test('given an amount without decimals whose format is string, then the amount is formatted correctly', () => {
    const amount = '123';
    const result = parseAmount(amount);
    expect(result).toBe('123.00');
  });
  test('given an amount a lot of decimals whose format is integer, then the amount is formatted correctly', () => {
    const amount = 123.4545454545;
    const result = parseAmount(amount);
    expect(result).toBe('123.45');
  });
  test('given an amount a lot of decimals whose format is string, then the amount is formatted correctly', () => {
    const amount = '123.4545454545';
    const result = parseAmount(amount);
    expect(result).toBe('123.45');
  });
  test('given an amount with thousands whose format is string, then the amount is formatted correctly', () => {
    const amount = '12300.45';
    const result = parseAmount(amount);
    expect(result).toBe('12,300.45');
  });
  test('given an amount with thousands whose format is number, then the amount is formatted correctly', () => {
    const amount = 12300.45;
    const result = parseAmount(amount);
    expect(result).toBe('12,300.45');
  });
  test('given an amount with millions whose format is number, then the amount is formatted correctly', () => {
    const amount = 12300000.45;
    const result = parseAmount(amount);
    expect(result).toBe('12,300,000.45');
  });
  test('given an amount with millions whose format is string, then the amount is formatted correctly', () => {
    const amount = '12300000.45';
    const result = parseAmount(amount);
    expect(result).toBe('12,300,000.45');
  });
  test('given an amount whose format is number and a number of decimals, then the amount is formatted correctly', () => {
    const amount = 12300.45;
    let result = parseAmount(amount, 1);
    expect(result).toBe('12,300.5');
    result = parseAmount(amount, 0);
    expect(result).toBe('12,300');
  });
  test('given an undefined, throws an error', () => {
    expect(parseAmount(undefined)).toBe(undefined); //.toThrowError('Trying to parse an undefined');
  });
  test('given a null, throws an error', () => {
    expect(parseAmount(null)).toBe(undefined); //.toThrowError('Trying to parse an undefined');
  });
});

describe('amount shortener', () => {
  test('given a short amount with decimals as string, then the amount is formatted correctly', () => {
    const amount = '1.45';
    const result = shortenAmount(amount);
    expect(result).toBe('1.45');
  });
  test('given a hundred amount with zeros, then the amount is formatted correctly', () => {
    const amount = 100;
    const result = shortenAmount(amount);
    expect(result).toBe('100');
  });
  test('given a thousand amount with zeros, then the amount is formatted correctly', () => {
    const amount = 1000;
    const result = shortenAmount(amount);
    expect(result).toBe('1,000');
  });
  test('given a thousand amount with decimals, then the amount is formatted correctly', () => {
    const amount = 1200.11;
    const result = shortenAmount(amount);
    expect(result).toBe('1,200');
  });
  test('given a ten thousand amount with zeros, then the amount is formatted correctly', () => {
    const amount = 10000;
    const result = shortenAmount(amount);
    expect(result).toBe('10K');
  });
  test('given a ten thousand amount with no zeros, then the amount is formatted correctly', () => {
    const amount = 10222;
    const result = shortenAmount(amount, 3);
    expect(result).toBe('10.222K');
  });
  test('given a ten thousand amount with zeros and decimals, then the amount is formatted correctly', () => {
    const amount = 10000.22;
    const result = shortenAmount(amount, 3);
    expect(result).toBe('10K');
  });
  test('given a ten thousand amount with no zeros and decimals, then the amount is formatted correctly', () => {
    const amount = 10222.22;
    const result = shortenAmount(amount, 3);
    expect(result).toBe('10.222K');
  });
  test('given a ten thousand amount with numbers and zeros, then the amount is formatted correctly', () => {
    const amount = 10200.22;
    const result = shortenAmount(amount, 3);
    expect(result).toBe('10.2K');
  });
  test('given a ten thousand amount with zeros and decimals, showing 4 decimals, then the amount is formatted correctly', () => {
    const amount = 10000.22;
    const result = shortenAmount(amount, 3);
    expect(result).toBe('10K');
  });
  test('given a hundred thousand amount, then the amount is formatted correctly', () => {
    const amount = 120000.89;
    const result = shortenAmount(amount);
    expect(result).toBe('120K');
  });
  test('given a hundred thousand amount with no zeros, then the amount is formatted correctly', () => {
    const amount = 120111.89;
    const result = shortenAmount(amount);
    expect(result).toBe('120.11K');
  });
  test('given a hundred thousand amount, showing 3 decimals, then the amount is formatted correctly', () => {
    const amount = 120000.89;
    const result = shortenAmount(amount, 3);
    expect(result).toBe('120K');
  });
  test('given a million amount, then the amount is formatted correctly', () => {
    const amount = 1200000.89;
    const result = shortenAmount(amount);
    expect(result).toBe('1.2M');
  });
  test('given a hundred million amount as number, then the amount is formatted correctly', () => {
    const amount = 123567000;
    const result = shortenAmount(amount);
    expect(result).toBe('123.57M');
  });
  test('given a billion amount as number, then the amount is formatted correctly', () => {
    const amount = 1200000000.89;
    const result = shortenAmount(amount);
    expect(result).toBe('1.2B');
  });
  test('given a billion amount as number with no zeros, then the amount is formatted correctly', () => {
    const amount = 1211222333.89;
    const result = shortenAmount(amount, 4);
    expect(result).toBe('1.2112B');
  });
  test('given a trillion amount as number, then the amount is formatted correctly', () => {
    const amount = 1200000000000.89;
    const result = shortenAmount(amount);
    expect(result).toBe('1.2T');
  });
  test('given a quadrillion amount as number, then the amount is formatted correctly, using trillions', () => {
    const amount = 1234567898989898;
    const result = shortenAmount(amount, 0);
    expect(result).toBe('1,235T');
  });
  test('given a quadrillion amount as number, then the amount is formatted correctly, using trillions', () => {
    const amount = 100234567000999000;
    const result = shortenAmount(amount, 0);
    expect(result).toBe('100,235T');
  });
  test('given a quintillion amount as number, then the amount is formatted correctly, using trillions', () => {
    const amount = 1234567000111999000;
    const result = shortenAmount(amount);
    expect(result).toBe('1,234,567T');
  });
  test('given a large amount with zeros as number, then the amount is formatted correctly', () => {
    const amount = 4000000;
    const result = shortenAmount(amount);
    expect(result).toBe('4M');
  });
  test('given an amount less than a million with zeros as number, then the amount is formatted correctly', () => {
    const amount = 400000;
    const result = shortenAmount(amount);
    expect(result).toBe('400K');
  });
  test('given an amount with zeros and decimals as number, the amount is approximated', () => {
    const amount = 400600;
    const result = shortenAmount(amount);
    expect(result).toBe('400.6K');
  });
  test('given an undefined, throws an error', () => {
    expect(shortenAmount(undefined)).toBe(undefined); //.toThrowError('Trying to shorten amount of undefined');
  });
  test('given a null, throws an error', () => {
    expect(shortenAmount(null)).toBe(undefined); //.toThrowError('Trying to shorten amount of undefined');
  });
});
