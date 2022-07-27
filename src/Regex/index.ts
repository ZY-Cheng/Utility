const rules = {
  thousandsLocFromTrailing: /\B(?=(\d{3})+\b)/g,
  thousandsLocFromLeading: /(?<=\b(\d{3})+)\B/g,
};

export function thousandsSplit(numStr: string, separator = ',') {
  const [int, decimal] = numStr.split('.');
  return (
    int.replace(rules.thousandsLocFromTrailing, separator) +
    (decimal ? `.${decimal.replace(rules.thousandsLocFromLeading, separator)}` : '')
  );
}
