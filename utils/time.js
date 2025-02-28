export const convertMinutesToHoursAndMinutes = (minutes) => {
  if (minutes === 0) {
    return '';
  }
  if (isNaN(minutes)) {
    throw new Error('Input must be a number');
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return { hours, minutes: remainingMinutes };
};
