export function waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve();
            }
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            reject(new Error(`Element with selector "${selector}" not found within ${timeout}ms`));
        }, timeout);
    });
}

/**
 * Validates if a number is within a specified range.
 * @param value - The number to validate.
 * @param min - The minimum acceptable value.
 * @param max - The maximum acceptable value.
 * @returns True if the value is within the range, otherwise false.
 * @example
 * const isValid = validateRange(5, 1, 10); // returns true
 */
export function validateRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

/**
 * Formats a price string to a number.
 * @param priceString - The price string to format.
 * @returns The formatted price as a number.
 * @example
 * const price = formatPrice('$10.99'); // returns 10.99
 */
export function formatPrice(priceString: string): number {
    return parseFloat(priceString.replace(/[$,]/g, ''));
}