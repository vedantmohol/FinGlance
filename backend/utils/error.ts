export const errorHandler = (statusCode: number, message: string) => {
  const error = new Error(message) as any;
  error.statusCode = statusCode;
  return error;
};