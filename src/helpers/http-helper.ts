// import moment from "moment-es6";
import DateHelper from "./date-helper";

export default class HttpHelper {
  static dateReviver(key: string, value: any) {
    if (typeof key === "string") {
      if (key === "date" || (key.endsWith("Date") && value)) {
        const [date] = value.split("T");
        return DateHelper.format(date);
      }
    }
    return value;
  }
  static reviveData(data: any) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      if (data[key] instanceof Object) {
        HttpHelper.reviveData(data[key]);
      } else if (data[key] instanceof Array) {
        let arr: Array<any> = data[key];
        arr.forEach((item) => HttpHelper.reviveData(item));
      } else {
        data[key] = HttpHelper.dateReviver(key, data[key]);
      }
    });
    return data;
  }
}
