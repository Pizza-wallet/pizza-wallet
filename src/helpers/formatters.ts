import Big from "big.js";

// JavaScript numbers use exponential notation for positive exponents of 21 and above. We need more.
Big.PE = 42;
// JavaScript numbers use exponential notation for negative exponents of -7 and below. We need more.
Big.NE = -42;

/**
 * Format token amount to at least 4 decimals.
 * @param amount amount to format.
 * @returns formatted amount.
 */
export const formatTokenAmount = (
  amount: string = "0",
  decimals: number = 0,
) => {
  let shiftedAmount = amount;
  if (decimals) {
    shiftedAmount = (Number(amount) / 10 ** decimals).toString();
  }
  const parsedAmount = parseFloat(shiftedAmount);
  if (parsedAmount === 0 || isNaN(Number(shiftedAmount))) {
    return "0";
  }

  let decimalPlaces = 3;
  const absAmount = Math.abs(parsedAmount);
  while (absAmount < 1 / 10 ** decimalPlaces) {
    decimalPlaces++;
  }

  return Big(
    parseFloat(Big(parsedAmount).toFixed(decimalPlaces + 1, 0)),
  ).toString();
};

export const formatTokenPrice = (amount?: string, price?: string) => {
  if (!amount || !price) {
    return 0;
  }
  if (isNaN(Number(amount)) || isNaN(Number(price))) {
    return 0;
  }
  return parseFloat(amount) * parseFloat(price);
};

export const limitDigits = (number: number) => {
  if (number === 0) return 0;
  if (number >= 1) {
    // it's a positive number show with two digits
    return number.toFixed(2);
  }
  // next check number has integer straight after decimal
  // if so show with 6 digits
  const decimalStr = number.toString().split(".")[1];
  if (decimalStr[0] !== "0") {
    return number.toFixed(6);
  }

  // else show with 8 digits
  return number.toFixed(8);
};

export const n6 = new Intl.NumberFormat("en-us", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 6,
});
export const n4 = new Intl.NumberFormat("en-us", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
});

export const c2 = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str: string, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export const tokenValue = (value: number, decimals: number) =>
  decimals ? value / Math.pow(10, decimals) : value;

/**
 * Return a formatted string with the symbol at the end
 * @param {number} value integer value
 * @param {number} decimals number of decimals
 * @param {string} symbol token symbol
 * @returns {string}
 */
export const tokenValueTxt = (
  value: number,
  decimals: number,
  symbol: string,
) => `${n4.format(tokenValue(value, decimals))} ${symbol}`;
