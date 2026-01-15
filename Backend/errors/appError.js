class appError extends Error {
    constructor(error, statusCode) {
        super(error);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default appError;
