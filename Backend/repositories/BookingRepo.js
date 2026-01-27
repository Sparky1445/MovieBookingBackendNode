import Booking from "../schemas/Booking.js";

export const createBooking = async (bookingDetails) => {
    try {
        const booking = await Booking.create(bookingDetails);

        if (!booking) {
            throw new Error("Booking not created ~ Repo Layer Error");
        }

        return {
            data: booking,
            success: true,
            message: "Booking created successfully"
        }


    } catch (error) {
        return {
            data: {},
            success: false,
            message: error.message + "~Repo Layer Error",
            error: error
        }
    }
}