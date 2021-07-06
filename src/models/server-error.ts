export interface ServerErrorArray {
  dataPath: string;
  keyword: string;
  message: string;
}

export interface ServerError {
  [key: string]: ServerErrorArray[]
}
