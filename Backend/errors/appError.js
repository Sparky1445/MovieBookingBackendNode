class appError extends Error {
    constructor(error, statusCode) {
        super(error);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        Error.captureStackTrace(this, this.constructor);

    }
}

export default appError;
