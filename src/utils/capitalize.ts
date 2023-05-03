export const capitalizeText = (text: string): string => {
  return text
    .replace(/_/gi, ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};
