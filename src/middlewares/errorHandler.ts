import { ErrorRequestHandler } from 'express';
import AppError from '../errors/AppError';

const errorHandler: ErrorRequestHandler = (
  error: Error,
  request,
  response,
  _,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};

export default errorHandler;
