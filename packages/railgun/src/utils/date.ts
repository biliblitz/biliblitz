export function toDatetimeLocal(date: Date) {
  const digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return `${date.getFullYear()}-${digits(date.getMonth() + 1)}-${digits(
    date.getDate()
  )}T${digits(date.getHours())}:${digits(date.getMinutes())}`;
}
