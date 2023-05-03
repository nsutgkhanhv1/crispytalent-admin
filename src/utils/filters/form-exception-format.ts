export const formExceptionFormat = (
  formatBody: any,
  exceptionMessage: any[],
) => {
  const formExceptionFormat = Object.keys(formatBody).reduce((prev, cur) => {
    prev[cur] = { value: formatBody[cur], errors: [] };
    return prev;
  }, {});

  const format = exceptionMessage.reduce((prev, cur) => {
    prev[cur.property] = {
      value: cur.value,
      errors: Object.values(cur.constraints)[0],
    };
    return prev;
  }, formExceptionFormat);

  return format;
};
