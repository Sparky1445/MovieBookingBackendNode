import NotFoundError from "../errors/NotFound.js";
import ErrorBody from "../Utils/ErrorBody.js";
import SuccessBody from "../Utils/SuccessBody.js";
import { createShow as createShowService } from "../services/showService.js";
import Movie from "../schemas/Movie.js";
import Theatre from "../schemas/Theatre.js";
import BadRequestError from "../errors/badRequest.js";
import { getShowById as getShowByIdService } from "../services/showService.js";
import mongoose from "mongoose";
import { deleteShow as deleteShowService } from "../services/showService.js";
import { sendEmail } from "../services/emailService.js";
import User from "../schemas/User.js";
import { JWT_SECRET } from "../config/serverConfig.js";
import jwt, { decode } from "jsonwebtoken";
import Booking from "../schemas/Booking.js";


export const createShow = async (req, res) => {
    try {
        const { movieId, theatreId } = req.body;
        const decodedToken = jwt.verify(req.cookies.authToken, JWT_SECRET);

        const movie = await Movie.findById(movieId);
        const theatre = await Theatre.findById(theatreId);
        const user = await User.findById(decodedToken.userId);



        if (!movie) {
            throw new NotFoundError("Movie does not exist!!");
        }
        if (!theatre) {
            throw new NotFoundError("Theatre does not exist!!");
        }

        const showResponse = await createShowService(req.body);

        if (showResponse.success) {
            if (user.role === "CLIENT") {
                sendEmail(`Show created successfully!`, `Hello ${user.firstName}, Your show has been created successfully!\n 
                    the details for the show are : ${JSON.stringify({
                    id: showResponse.data._id,
                    showDate: showResponse.data.showDate,
                    showTime: showResponse.data.showTime,
                    createdAt: showResponse.data.createdAt,
                })} `, user.email);
            }
            return SuccessBody(res, showResponse.data, "    Show created successfully", 201);
        }
        else {
            if (user.role === "CLIENT") {
                sendEmail("Show creation failed!", `Hello ${user.firstName}, Your show creation request has been rejected!`, user.email);
            }
            return ErrorBody(res, showResponse.error, 400);
        }

    } catch (error) {
        return ErrorBody(res, error, 500);

    }

}

export const getShowById = async (req, res) => {
    try {
        const { theatreId, movieId } = req.params;


        if (!theatreId || !movieId) {
            throw new BadRequestError("Theatre ID and Movie ID are required!");
        }

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            throw new NotFoundError("Movie does not exist!!");
        }
        if (!mongoose.Types.ObjectId.isValid(theatreId)) {
            throw new NotFoundError("Theatre does not exist!!");
        }

        const showResponse = await getShowByIdService(theatreId, movieId);

        if (!showResponse.success) {
            return ErrorBody(res, showResponse.error, 400);
        }


        return SuccessBody(res, showResponse.data, "Show fetched successfully", 200);

    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}

export const deleteShow = async (req, res) => {
    try {
        const showResponse = await deleteShowService(req.params.showId);
        const decodedToken = jwt.verify(req.cookies.authToken, JWT_SECRET);
        const user = await User.findById(decodedToken.userId);

        if (!showResponse.success) {
            return ErrorBody(res, showResponse.error, 400);
        }

        const bookings = await Booking.find({ showId: req.params.showId, $or: [{ status: "IN_PROGRESS" }, { status: "CONFIRMED" }] });



        bookings.forEach(async (booking) => {

            if (booking.status === "IN_PROGRESS") {
                booking.status = "CANCELLED";
                await booking.save();
            }

            const user = await User.findById(booking.userId);


            sendEmail(`Booking cancelled due to show cancellation!`, `Hello ${user.firstName},Your booking for the show  has been cancelled due to the Theatre not being available!\n 
                    We highly regret the inconvenience caused and the full refund shall be credited to your account within 5-7 working days.\n 
                    the details for the show are : ${JSON.stringify({
                id: showResponse.data._id,
                showDate: showResponse.data.showDate,
                showTime: showResponse.data.showTime,
                createdAt: showResponse.data.createdAt,
            })} `, user.email);
        })

        if (user.role === "CLIENT") {
            sendEmail(`Show deleted successfully!`, `Hello ${user.firstName}, Your show has been deleted successfully!\n 
                    the details for the show are : ${JSON.stringify({
                id: showResponse.data._id,
                showDate: showResponse.data.showDate,
                showTime: showResponse.data.showTime,
                createdAt: showResponse.data.createdAt,
            })} `, decodedToken.email);
        }

        return SuccessBody(res, showResponse.data, "Show deleted successfully", 200);

    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}