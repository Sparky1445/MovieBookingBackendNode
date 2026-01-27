import Show from "../schemas/Show.js";
import InternalServerError from "../errors/InternalServerError.js";

export const createShow = async (showData) => {
    try {
        const show = await Show.create(showData);

        if (!show) {
            throw new InternalServerError("Failed to create show");
        }

        return {
            success: true,
            message: "Show created successfully",
            data: show
        }

    } catch (error) {
        return {
            success: false,
            data: {},
            message: "Failed to create show",
            error: error
        }
    }
}