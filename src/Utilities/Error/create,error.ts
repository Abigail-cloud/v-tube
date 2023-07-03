import CustomError from "./custom.error";


class ErrorUtil {
  public static createError(status: number, message: string): CustomError {
    return new CustomError(status, message);
  }
}


export default ErrorUtil;
