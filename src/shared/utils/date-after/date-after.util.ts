export const dateAfterMonths = (
  addMonths: number,
  dateFromSubtract = new Date(),
): Date => {
  return new Date(
    dateFromSubtract.setMonth(dateFromSubtract.getMonth() + addMonths),
  );
};
