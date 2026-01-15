import Theatre from "../schemas/Theatre.js";


export const createTheatre = async (theatreData) => {
    try {
        const theatre = await Theatre.create(theatreData);

        if (!theatre) {
            throw new BadRequestError("Failed to create theatre");
        }

        return {
            success: true,
            data: theatre,
            message: "Theatre created successfully"
        }

    } catch (error) {
        return {
            success: false,
            data: {},
            error: error,
            message: error + "~Repo Layer Error"
        }
    }
}