import mongoose from 'mongoose';
import type { IErrorSource, IGenericErrorResponse } from '../types/error.type.js';

export const validationErrorHandler = (err: mongoose.Error.ValidationError): IGenericErrorResponse => {
    const errorSources: IErrorSource[] = [];
    const error = Object.values(err.errors);
    error.forEach((errorObject: any) =>
        errorSources.push({
            path: errorObject.path,
            message: errorObject.message,
        })
    );

    return {
        statusCode: 400,
        message: 'Validation Error',
        errorSources,
    };
};