
const validator = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message[0].message + "Validation error",
                data: {},

            })
        }
    }
}

export default validator;
