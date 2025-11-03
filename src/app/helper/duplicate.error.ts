import type { IGenericErrorResponse } from "../types/error.type.js";

export const handleDuplicateError = (err: any): IGenericErrorResponse => {
    const matchedArray = err.message.match(/"([^]*)"/);
    return {
        statusCode: 400,
        message: `${matchedArray?.[1]} is already exists.`,
    }
}