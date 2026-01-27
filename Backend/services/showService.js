import { ServiceLayerBody } from "../Utils/ServiceLayerBody.js"
import { createShow as createShowRepo } from "../repositories/showRepo.js"
import Movie from "../schemas/Movie.js"
import Theatre from "../schemas/Theatre.js"

export const createShow = async (showData) => {

    return ServiceLayerBody(createShowRepo, showData);
}