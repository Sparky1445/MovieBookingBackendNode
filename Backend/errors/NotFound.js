import appError from "./appError.js";

class NotFound extends appError {

    constructor(error) {
        super(error, 404);

    }
}

export default NotFound;