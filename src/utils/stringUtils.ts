export const capitalizeFirstLetter = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const splitCamelCaseString = (input: string) => {
  return input.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const parseTableColumnHeader = (input: string) => {
  if (input.match(/amount/i)) {
    return `${capitalizeFirstLetter(splitCamelCaseString(input))} (USD)`;
  }

  return capitalizeFirstLetter(splitCamelCaseString(input));
};
