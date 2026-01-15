import appError from "./appError.js";

class BadRequest extends appError {
    constructor(error) {
        super(error, 400);
    }
}

export default BadRequest;
