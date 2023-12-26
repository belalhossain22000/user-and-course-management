import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";

// Define a custom interface extending Error
interface CustomError extends Error {
    code: number;
    value?: string | unknown; // Add 'value' property here
}

const globalErrorHandler = (
    err: CustomError, // Adjust the type here as 'Error | any'
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    next: NextFunction
) => {
    // Default error response object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorResponse: any = {
        success: false,
        message: 'Internal Server Error',
        errorMessage: err.message,
        errorDetails: err,
        stack: err.stack,
    };

    if (err.name === 'CastError' && 'value' in err) {
        if (err instanceof Error) {
            errorResponse.message = 'Invalid ID';
            errorResponse.errorMessage = `${err.value} is not a valid ID!`;
        }
    } else if (err instanceof ZodError) {
        const extractedMessage = err.issues.map((issue: ZodIssue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue.message,
            };
        });
        errorResponse.message = 'Validation Error';
        errorResponse.errorMessage = extractedMessage;
    } else if (err?.code === 11000) {
        if (err instanceof Error) {
            const match = err.message.match(/"([^"]*)"/);
            const extractedMessage = match && match[1];
            errorResponse.message = 'Duplicate Key Error';
            errorResponse.errorMessage = `${extractedMessage} is already exist`;
        }
    } else if (err instanceof Error && err.name === 'ValidationError') {
        errorResponse.message = err.message; // Use 'message' property directly
    }

    res.status(500).json(errorResponse);
};

export default globalErrorHandler;
