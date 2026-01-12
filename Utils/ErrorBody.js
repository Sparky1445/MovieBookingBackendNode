const ErrorBody = (res, error, statusCode) => {
    return res.status(statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error
    })
}
export default ErrorBody;