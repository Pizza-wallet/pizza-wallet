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

export const limitDigits = (number) => {
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

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export const tokenValue = (value, decimals) =>
  decimals ? value / Math.pow(10, decimals) : value;

/**
 * Return a formatted string with the symbol at the end
 * @param {number} value integer value
 * @param {number} decimals number of decimals
 * @param {string} symbol token symbol
 * @returns {string}
 */
export const tokenValueTxt = (value, decimals, symbol) =>
  `${n4.format(tokenValue(value, decimals))} ${symbol}`;
