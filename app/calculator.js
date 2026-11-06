const INTEGER_PATTERN = /^[+-]?\d+$/;

/**
 * Adds comma-separated integers.
 * @param {string} numbers - Comma-separated integers, e.g. "1,2,3".
 * @returns {number} The sum of all integers.
 * @throws {Error} If input is not a string or contains non-integer values.
 */
function add(numbers) {
  if (numbers === undefined || numbers === null || numbers === '') return 0;

  if (typeof numbers !== 'string') {
    throw new Error('Input must be a string of comma-separated integers');
  }

  return numbers
    .split(',')
    .reduce((sum, token) => {
      const value = token.trim();
      if (!INTEGER_PATTERN.test(value)) {
        throw new Error(`Invalid number: ${token.trim() || '(empty)'}`);
      }
      return sum + Number(value);
    }, 0);
}

module.exports = { add };
