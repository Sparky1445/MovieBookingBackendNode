import { ServiceLayerBody } from "../Utils/ServiceLayerBody.js"
import { createShow as createShowRepo } from "../repositories/showRepo.js"
import { getShowById as getShowByIdRepo } from "../repositories/showRepo.js"
import { deleteShow as deleteShowRepo } from "../repositories/showRepo.js"

export const createShow = async (showData) => {

    return ServiceLayerBody(createShowRepo, showData);
}

export const getShowById = async (theatreId, movieId) => {
    return ServiceLayerBody(getShowByIdRepo, theatreId, movieId);
}

export const deleteShow = async (showId) => {
    return ServiceLayerBody(deleteShowRepo, showId);
}