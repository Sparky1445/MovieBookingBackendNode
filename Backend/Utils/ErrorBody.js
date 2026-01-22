const ErrorBody = (res, error, statusCode) => {

    return res.status(statusCode).json({
        success: false,
        statusCode: error.statusCode || statusCode,
        message: error.message,
        error: error


    })
}
export default ErrorBody;