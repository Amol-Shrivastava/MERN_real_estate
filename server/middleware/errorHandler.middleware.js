const errorHandler = (err, req, res, next) => {
  try {
    const errCode = err.statusCode ?? 500;
    const errMsg = err.message ?? "Internal Server Error";
    return res.status(errCode).json({ success: false, message: errMsg });
  } catch (error) {
    throw error;
  }
};

export { errorHandler };
