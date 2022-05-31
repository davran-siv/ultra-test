const percentageOff = (price: number, percentage: number): number => {
  return price * (1 - percentage / 100);
};
