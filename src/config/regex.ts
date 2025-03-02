export const atleastOneUpperCaseRegex = /^(?=.*[A-Z]).+$/;
export const atleastOneLowerCaseRegex = /^(?=.*[a-z]).+$/;
export const atleastOneNumberRegex = /^(?=.*\d).+$/;
export const atleastOneSpecialCharRegex =
  /^(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).+$/;

export const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validIRDNumberRegex = /^(0\d{2}-\d{3}-\d{3}|1\d{2}-\d{3}-\d{3})$/;
export const emailExtractionRegex =
  /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/;

export const validDayRegex = /^(0[1-9]|[12]\d|3[01])$/;
export const validMonthRegex = /^(0[1-9]|1[0-2])$/;
export const validYearRegex = /^\d{4}$/;
export const amountRegex = /^$|^\d+\.?\d{0,2}$/;
export const accountNameRegex = /^[a-zA-Z0-9_\- ]*$/;
export const numericRegex = /^(?!.*\s{2})[\d\s]*$/;

export const formatWithCommas = (value: string) => {
  const isNegative = value.startsWith('-');
  const cleanValue = value.replace(/[^\d.]/g, '');
  const parts = cleanValue.split('.');

  const integerPart = parts[0];
  const formattedIntegerPart = integerPart
    .split('')
    .reverse()
    .reduce((acc, digit, index) => {
      if (index > 0 && index % 3 === 0) {
        return digit + ',' + acc;
      }
      return digit + acc;
    }, '');

  const result =
    parts.length > 1
      ? formattedIntegerPart + '.' + parts[1]
      : formattedIntegerPart;
  return isNegative ? '-' + result : result;
};
export const quoteContentExtractionRegex = /\*quotes\*(.*?)\*quotes\*/g;
