export const dateBeforeMonths = (
  subtractMonths: number,
  dateFromSubtract = new Date(),
): Date => {
  return new Date(
    dateFromSubtract.setMonth(dateFromSubtract.getMonth() - subtractMonths),
  );
};
