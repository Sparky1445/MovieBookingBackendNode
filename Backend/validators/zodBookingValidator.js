

export const validateBooking = (bookingSchema) => {
    return (req, res, next) => {
        try {
            let { totalCost, noOfSeats, seats, ...omittedBody } = req.body;


            totalCost = parseInt(totalCost);
            noOfSeats = parseInt(noOfSeats);
            seats = seats.split(",").map((seat) => seat.trim());

            const updatedBody = { ...omittedBody, totalCost, noOfSeats, seats };
            bookingSchema.parse(updatedBody);
            next();


        } catch (error) {
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