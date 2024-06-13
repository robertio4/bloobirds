import { parseDateSpanish, isValidDate } from './utils';

describe('linkedin message date spanish parser', () => {
  it('should parse date 14 JUL 2020 9:55 in spanish', () => {
    const date = parseDateSpanish('14 JUL 2020', '9:55');
    // Expect date to be defined and not Invalid Date
    expect(date).not.toBeUndefined();
    expect(isValidDate(date)).toBeTruthy();
  });
  it('should parse date MIÉRCOLES 19:55 in spanish', () => {
    const date = parseDateSpanish('MIÉRCOLES', '19:55');
    // Expect date to be defined and not Invalid Date
    expect(date).not.toBeUndefined();
    expect(isValidDate(date)).toBeTruthy();
  });
  it('should parse date 14/07/2020 9:55 in spanish', () => {
    const date = parseDateSpanish('14/07/2020', '9:55');
    // Expect date to be defined and not Invalid Date
    expect(date).not.toBeUndefined();
    expect(isValidDate(date)).toBeTruthy();
  });
  it('should parse date 6 MAR 9:55 in spanish', () => {
    const date = parseDateSpanish('6 MAR', '9:55');
    // Expect date to be defined and not Invalid Date
    expect(date).not.toBeUndefined();
    expect(isValidDate(date)).toBeTruthy();
  });
});
