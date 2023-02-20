export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export default class HttpException extends Error {
    statusCode?: number;
    status?: number;
    message: string;
    error: string | null;

    constructor(statusCode: number, message: string, error?: string) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
    }
}
