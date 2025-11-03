import type { NextFunction, Request, Response } from "express"
import type { IErrorSource } from "../types/error.type.js";
import { handleDuplicateError } from "../helper/duplicate.error.js";
import { zodErrorHandler } from "../helper/zod.error.js";
import { handleCastError } from "../helper/cast.error.js";
import { validationErrorHandler } from "../helper/validation.error.js";
import AppError from "../helper/appError.js";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = `Something wen wrong ${err.message}`;
    let errorSources: IErrorSource[] = [];

    // Duplicate Error
    if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }

    // zod error
    else if (err.name === 'ZodError') {
        const simplifiedError = zodErrorHandler(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources as IErrorSource[];
    }

    else if (err.name === 'CastError') {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Validation Error
    else if (err.name === 'ValidationError') {
        const simplifiedError = validationErrorHandler(err);
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources as IErrorSource[];
        message = simplifiedError.message;
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: process.env.NODE_ENV === 'development' ? err : null,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
}