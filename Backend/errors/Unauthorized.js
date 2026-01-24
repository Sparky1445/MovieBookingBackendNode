import appError from "./appError.js";

class UnauthorizedError extends appError {
    constructor(error) {
        super(error, 401);
    }

}
export default UnauthorizedError;