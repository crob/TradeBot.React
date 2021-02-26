export default class ErrorHelper {
  static normaliseErrorMessages(errors: any[]) {
    let fields = errors.reduce((acc, e) => {
      if (e.dataPath.length && e.dataPath[0] === ".") {
        acc[e.dataPath.slice(1)] = [e];
      } else {
        let propPath = e.dataPath;
        if (e.params?.missingProperty) {
          propPath += e.params.missingProperty;
          if (e.dataPath.length === 0) {
            e.dataPath = propPath;
          }
        }
        acc[propPath] = [e];
      }
      return acc;
    }, {});

    return fields;
  }

  static renderServerErrors(normalisedErrors: any, setError: any) {
    Object.keys(normalisedErrors).forEach(key => {
      let errors = normalisedErrors[key];
      errors.forEach((error: any) => {
        setError(error.dataPath, error.keyword, error.message);
      });
    });
  }
}
