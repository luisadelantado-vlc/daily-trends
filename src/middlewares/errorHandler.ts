import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import mongoose from 'mongoose';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.info('Error handler middleware:', err);
    logger.info(err instanceof mongoose.Error.ValidationError);
    logger.error(err.message || 'Unknown error');

    let statusCode = err.status || 500;
    let errMessage = err.message || 'Internal Server Error';

    if (err.message.includes('getaddrinfo ENOTFOUND')) {
        statusCode = 503;
        errMessage = 'Database connection failed. Please try again later.';
    } else if(err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        errMessage = Object.values(err.errors).map((val: any) => val.message).join(', ');
    }  else if (err.name === 'CastError' || err.message.includes('Cast to ObjectId failed')) {
        statusCode = 404; 
        errMessage = 'Resource not found.';
    }

    res.status(statusCode).json({ message: errMessage });
};

export default errorHandler;