const SuccessBody = (res, ResponseData, message, statusCode) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: ResponseData,
        error: {}
    })
}

export default SuccessBody;