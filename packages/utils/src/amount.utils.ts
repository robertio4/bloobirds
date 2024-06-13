export function parseAmount(
  amount: number | string,
  maxDecimals = 2,
  minDecimals?: number,
): string {
  if (!amount && amount !== 0) {
    console.error('Trying to parse an undefined amount');
    return undefined; //throw new Error('Trying to parse an undefined');
  }
  const parsedAmount = Number(amount);
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minDecimals ?? maxDecimals,
    maximumFractionDigits: !minDecimals || maxDecimals > minDecimals ? maxDecimals : minDecimals,
  }).format(parsedAmount);
}

export function shortenAmount(amount: number | string, decimals = 2, space = false): string {
  if (!amount && amount !== 0) {
    console.error('Trying to shorten an undefined amount');
    return undefined; //throw new Error('Trying to shorten amount of undefined');
  }
  const parsedAmount = Number(amount);
  // Don't shorten if amount is less than 10k
  if (parsedAmount < 10000) {
    return parseAmount(parsedAmount, parsedAmount < 1000 ? (decimals < 3 ? decimals : 2) : 0, 0);
  }

  // format
  let formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits:
      parsedAmount < 10 ** 15
        ? parsedAmount < 10 ** 6 && (parsedAmount % 100) / parsedAmount < 0.001
          ? 2
          : decimals
        : 0,
    notation: 'compact',
  }).format(parsedAmount);

  // Add comma to numbers in a thousand trillion range (15 and 16 digits)
  if (parsedAmount >= 10 ** 15 && parsedAmount < 10 ** 17) {
    formattedAmount = parseAmount(formattedAmount.replace('T', ''), decimals).concat('T');
  }

  // Add space between number and unit
  if (space) {
    return formattedAmount
      .substring(0, formattedAmount.length - 1)
      .concat(' ')
      .concat(formattedAmount.substring(formattedAmount.length - 1));
  } else return formattedAmount;
}
