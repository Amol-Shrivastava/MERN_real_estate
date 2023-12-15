const errFunc = (statusCode, message) => {
  const error = Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

export { errFunc };
