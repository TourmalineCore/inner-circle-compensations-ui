export const formatNumber = (number: number) => Intl.NumberFormat('en-EN').format(number).replace(',', ' ');
export const formatMoney = (number: number) => `${formatNumber(number)} ₽`;
export const reformatMoney = (number: string) => {
  if (number.includes('₽')) {
    number = number.replace('₽', '');
  }
  if (number.includes('%')) {
    number = number.replace('%', '');
  }

  if (number.includes(' ')) {
    number = number.replace(/\s/g, '');
  }

  return number;
};
