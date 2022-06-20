export const getClasses = (classes) =>
  classes
    .filter((items) => items !== '')
    .join(' ')
    .trim();
