import appError from "./appError.js";

class BadRequest extends appError {
    constructor(error) {
        super(error, 404);
    }
}

export default BadRequest;
