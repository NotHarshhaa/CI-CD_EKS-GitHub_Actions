const calculator = require('./calculator');

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

// New test cases for additional validation

test('empty string should return 0', () => {
    expect(calculator.add('')).toBe(0);
});

test('string with spaces between numbers should still work', () => {
    expect(calculator.add(' 3 , 7 , 1 ')).toBe(11);
});

test('string with non-numeric values should throw an error', () => {
    expect(() => calculator.add('2,a,4')).toThrow('Invalid number: a');
});

test('string with a single non-numeric value should throw an error', () => {
    expect(() => calculator.add('abc')).toThrow('Invalid number: abc');
});
