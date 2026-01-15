
const validator = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            const parsed = JSON.parse(error);
            const ErrArray = parsed.map((errObj) => ({
                [errObj.path[0]]: errObj.message
            }));

            return res.status(400).json({
                success: false,
                message: "Validation error",
                statusCode: 400,
                data: {},
                error: ErrArray
            })
        }
    }
}

export default validator;
