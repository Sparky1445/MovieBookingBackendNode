export const ServiceLayerBody = async (callerFunc, ...args) => {
    try {
        const response = await callerFunc(...args);

        if (response.success) {
            return response;
        }
        else {
            return {
                success: false,
                message: response.message,
                data: {},
                error: response.error
            }
        }
    }
    catch (error) {
        return {
            success: false,
            message: error.message + "~Service Layer Error",
            data: {},
            error: error
        }
    }
}