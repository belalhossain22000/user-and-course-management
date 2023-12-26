import { Response } from 'express';

type TResponse<T> = {
    success: boolean;
    statusCode: number;
    message?: string;
    meta?: object;
    data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseData: any = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        meta: data.meta,
        data: data.data,
    };

    // Check if meta exists and add it to the response
    if (data.meta) {
        responseData.meta = data.meta;
    }

    res.status(data?.statusCode).json(responseData);
};

export default sendResponse;
