import { ServiceLayerBody } from "../Utils/ServiceLayerBody.js"
import { createUser as createUserRepository } from "../repositories/userRepo.js"
export const createUser = async (userData) => {
    return ServiceLayerBody(createUserRepository, userData);

}