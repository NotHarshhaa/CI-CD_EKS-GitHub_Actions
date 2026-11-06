const calculator = require('./calculator');

describe('calculator.add', () => {
  test('string with a single number should return the number itself', () => {
    expect(calculator.add('1')).toBe(1);
  });

  test('string with two numbers separated by a comma should return their sum', () => {
    expect(calculator.add('4,5')).toBe(9);
  });

  test('string with three numbers separated by commas should return their sum', () => {
    expect(calculator.add('2,8,4')).toBe(14);
  });

  test('string with four numbers separated by commas should return their sum', () => {
    expect(calculator.add('2,0,4,5')).toBe(11);
  });

  test('empty string should return 0', () => {
    expect(calculator.add('')).toBe(0);
  });

  test('missing input should return 0', () => {
    expect(calculator.add()).toBe(0);
    expect(calculator.add(null)).toBe(0);
  });

  test('string with spaces between numbers should still work', () => {
    expect(calculator.add(' 3 , 7 , 1 ')).toBe(11);
  });

  test('negative numbers should be supported', () => {
    expect(calculator.add('-5,10')).toBe(5);
    expect(calculator.add('-1,-2,-3')).toBe(-6);
  });

  test('large integers should be supported', () => {
    expect(calculator.add('1000000000,2000000000')).toBe(3000000000);
  });

  test('string with non-numeric values should throw an error', () => {
    expect(() => calculator.add('2,a,4')).toThrow('Invalid number: a');
  });

  test('string with a single non-numeric value should throw an error', () => {
    expect(() => calculator.add('abc')).toThrow('Invalid number: abc');
  });

  test('decimal values should throw an error (integers only)', () => {
    expect(() => calculator.add('3.5')).toThrow('Invalid number: 3.5');
  });

  test('scientific notation should throw an error', () => {
    expect(() => calculator.add('1e3')).toThrow('Invalid number: 1e3');
  });

  test('trailing garbage should throw an error (no silent truncation)', () => {
    expect(() => calculator.add('12abc')).toThrow('Invalid number: 12abc');
  });

  test('empty token between commas should throw an error', () => {
    expect(() => calculator.add('1,,2')).toThrow('Invalid number: (empty)');
  });

  test('non-string input should throw an error', () => {
    expect(() => calculator.add(123)).toThrow('Input must be a string of comma-separated integers');
    expect(() => calculator.add({})).toThrow('Input must be a string of comma-separated integers');
  });
});
