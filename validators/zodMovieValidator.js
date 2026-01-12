
const validator = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.parse(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message + "Validation error",
                data: {},
                error: error.message
            })
        }
        next();
    }
}

export default validator;
