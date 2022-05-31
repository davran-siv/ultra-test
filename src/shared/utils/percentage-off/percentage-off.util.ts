/**
 * Return amount minus percentage
 * E.g. amount = 100, percentage = 10. Result should be 90
 * @param amount
 * @param percentage
 */
export const percentageOff = (amount: number, percentage: number): number => {
  return amount * (1 - percentage / 100);
};
