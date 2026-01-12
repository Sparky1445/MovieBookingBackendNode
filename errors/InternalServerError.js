import appError from "./appError.js";

class InternalServerError extends appError {
    constructor(error) {
        super(error, 500);
    }
}

export default InternalServerError;