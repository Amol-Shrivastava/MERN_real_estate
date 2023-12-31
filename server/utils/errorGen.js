const errorGenerationFunc = (statusCode, message) => {
  const error = Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

export { errorGenerationFunc };
