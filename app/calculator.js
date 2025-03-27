function add(numbers) {
    if (!numbers) return 0; // Handle empty input gracefully

    return numbers
        .split(',')
        .map(x => {
            const num = parseInt(x.trim(), 10);
            if (isNaN(num)) throw new Error(`Invalid number: ${x}`);
            return num;
        })
        .reduce((a, b) => a + b, 0); // Ensure it works with a single number
}

module.exports = { add };
