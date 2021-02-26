export default class DateHelper {
  static format(date: Date | string) {
    let d = typeof date === "string" ? new Date(date) : date;
    const offset = d.getTimezoneOffset();
    d = new Date(d.getTime() + offset * 60 * 1000);
    return d.toISOString().split("T")[0];
  }
}
