export function formatINR(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price)
}

export function formatPaymentMethod(value: string) {
  return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim()
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("en-In").format(num)
}

export function formatWeight(value: string | number) {
  const num = Number(value);

  const kg = Math.floor(num);
  const gm = Math.round((num - kg) * 1000);

  if (kg > 0 && gm > 0) return `${kg} kg ${gm} gm`;
  if (kg > 0) return `${kg} kg`;
  return `${gm} gm`;
}




export function toPlain<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj))
}

// round number to 2 decimal places
export function roundNumberToTwoDecimalPlaces(value: number | string): number {
  const num =
    typeof value === "number"
      ? value
      : typeof value === "string"
      ? Number(value)
      : NaN;

  if (!Number.isFinite(num)) {
    throw new Error("Invalid number");
  }

  return Math.round((num + Number.EPSILON) * 100) / 100;
}


// lib/utils.ts

// Shorten ID to last 6 characters
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

// Format date & time
export const formatDateTime = (date: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return {
    dateTime: new Date(date).toLocaleString('en-US', dateTimeOptions),
    dateOnly: new Date(date).toLocaleString('en-US', dateOptions),
    timeOnly: new Date(date).toLocaleString('en-US', timeOptions),
  };
};
