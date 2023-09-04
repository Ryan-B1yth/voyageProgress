export const dateToUnix = (value: string | Date) => {
  if (typeof value === 'string') {
    return Math.floor(new Date(value).getTime() / 1000);
  }
  if (value instanceof Date) {
    return Math.floor(value.getTime() / 1000);
  }
  return 0; // If input is invalid, we still need a number
};
