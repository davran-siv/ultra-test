const calculateNumberFromPercentage = (
  number: number,
  percentage: number,
): number => {
  return (percentage / 100) * number;
};

export default calculateNumberFromPercentage;
