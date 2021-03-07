import { format, isBefore, isSameDay, isValid } from "date-fns";
import * as Yup from "yup";

export function validateDatesOrder(
  this: Yup.TestContext,
  firstDate?: Date,
  secondDate?: Date,
) {
  // missing or invalid date is handled on the field.
  if (!isValid(firstDate) || !isValid(secondDate) || isSameDay(firstDate!, secondDate!)) {
      return true;
  }

  return isBefore(firstDate!, secondDate!)
    ? true
    : this.createError({ message: 'dates are in wrong order' });
}

/*
 * Before entities become put into forms, they become hydrated with empty strings.
 * To avoid storing these values on BE side, they need to become reverted.  
 */
export const deepConversionOfEmptyStringToNull = (value: any): any => {
  if (value === "") {
    return null;
  }

  if (value === null || value === undefined || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(deepConversionOfEmptyStringToNull);
  }

  return Object.entries(value).reduce(
    (copy, [key, val]) => {
      copy[key] = deepConversionOfEmptyStringToNull(val);
      return copy;
    },
    {} as { [key: string]: any }
  );
};

export function formatDateToString(date: Date | string, pattern = 'dd.MM.yyyy'): string {
  return format(typeof date === 'string' ? new Date(date) : date, pattern);
}

