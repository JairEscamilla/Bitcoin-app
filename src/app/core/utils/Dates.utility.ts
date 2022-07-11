export class DatesUtility {
  static numberOfDaysPerWeek = 7;

  static dateToUTC(date: Date) {
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
  }
}
