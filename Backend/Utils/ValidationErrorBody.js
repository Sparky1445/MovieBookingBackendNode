export const ValidationErrorBody = (res, error, statusCode) => {

    const parsed = JSON.parse(error);
    const ErrArray = parsed.map((errObj) => ({
        [errObj.path[0]]: errObj.message
    }));


    return res.status(statusCode).json({
        success: false,
        message: "Validation error",
        statusCode: statusCode,
        data: {},
        error: ErrArray
    })
}

