import appError from "./appError.js";

function errorHandler(err, req, res, next) {

    if (err instanceof appError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data: {},
            error: err
        })
    }
    else {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: {},
            error: err
        })
    }
}

export default errorHandler;
