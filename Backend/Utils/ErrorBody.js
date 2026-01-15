const ErrorBody = (res, error, statusCode) => {
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: error.message,
        error: error


    })
}
export default ErrorBody;