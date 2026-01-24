import { ServiceLayerBody } from "../Utils/ServiceLayerBody.js"
import { getUserByEmail as getUserByEmailRepository } from "../repositories/userRepo.js"
import { getUserById as getUserByIdRepository } from "../repositories/userRepo.js"
import { updateUser as updateUserRepository } from "../repositories/userRepo.js"

export const getUserByEmail = async (email) => {

    return ServiceLayerBody(getUserByEmailRepository, email);

}

export const getUserById = async (userId) => {
    return ServiceLayerBody(getUserByIdRepository, userId);
}

export const updateUser = async (userId, data) => {
    return ServiceLayerBody(updateUserRepository, userId, data);
}