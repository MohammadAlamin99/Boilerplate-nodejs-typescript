import mongoose from 'mongoose';
import type { IGenericErrorResponse } from '../types/error.type.js';

export const handleCastError = (err: mongoose.Error.CastError): IGenericErrorResponse => {
    return {
        statusCode: 400,
        message: 'Invalid MongoDB objectId. Please provide a valid id!',
    };
};
