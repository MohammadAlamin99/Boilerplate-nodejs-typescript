import type { IErrorSource, IGenericErrorResponse } from "../types/error.type.js";

export const zodErrorHandler = (err: any): IGenericErrorResponse => {
    const errorSources: IErrorSource[] = [];
    err.issues.forEach((issue: any) => {
        errorSources.push({
            path: issue.path[issue.path.at(-1)], // catch last field of error
            message: issue.message,
        })
    })

    return {
        statusCode: 400,
        message: 'Zod Validation Error',
        errorSources,
    }

}