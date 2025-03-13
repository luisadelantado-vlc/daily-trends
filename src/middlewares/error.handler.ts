import { Request, Response } from 'express';
import mongoose from 'mongoose';

interface CustomError extends Error {
    status?: number;
}

interface ValidationError {
    message: string;
  }

const errorHandler = (err: CustomError, req: Request, res: Response) => {

    let statusCode = err.status || 500;
    let errMessage = err.message || 'Internal Server Error';

    if (err.message.includes('getaddrinfo ENOTFOUND')) {
        statusCode = 503;
        errMessage = 'Database connection failed. Please try again later.';
    } else if(err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        errMessage = Object.values(err.errors).map((val: ValidationError) => val.message).join(', ');
    }  else if (err.name === 'CastError') {
        statusCode = 404; 
        errMessage = 'Resource not found.';
    }

    res.status(statusCode).json({ message: errMessage });
};

export default errorHandler;