const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || 'Something went wrong, please try again',
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  // Validate error
  if (err.name === 'ValidationError') {
    customError.msg = `${Object.values(err.errors).map(item => item.message).join(', ')}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  // Duplicate error
  if (err.code === 11000) {
    customError.msg = `Duplicate error entered ${Object.keys(err.keyValue)}, please provide another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Cast id error
  if (err.name === 'CastError') {
    customError.msg = `No job found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg });
}

module.exports = errorHandlerMiddleware
