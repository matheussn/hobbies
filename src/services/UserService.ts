import { Users } from "../models/User";
import UserRepository from "../repositories/UserRepository";
import { Hobbies } from "../models/Hobbie";
import { UserResponse } from "../dtos/user/responses";
import { HobbiesResponse } from "../dtos/hobbie/response";
import { CreateUserRequest, UpdateUserRequest } from "../dtos/user/requests";


class UserService {
    userRepository: UserRepository

    constructor(userRepository: UserRepository = new UserRepository()) {
        this.userRepository = userRepository
    }

    async getAllUsers(): Promise<UserResponse[]> {
        console.log("[USER] Buscando usuários no Banco de dados")
        const users: Users[] = await this.userRepository.findAll()

        console.log("[USER] " + users.length + " usuários encontrados!")
        const response: UserResponse[] = users.map<UserResponse>((user: Users) => {
            return {
                id: user._id,
                name: user.name,
                hobbies: user.hobbies.map<HobbiesResponse>((hobbie: Hobbies) => {
                    return { id: hobbie.id, name: hobbie.name, experienceLevel: hobbie.experienceLevel, year: hobbie.year }
                })
            }
        })
        console.log("[USER] Retornando Usuários!")
        return response
    }

    async createUser(user: CreateUserRequest): Promise<UserResponse> {
        const { name, id } = await this.userRepository.createUser(user)

        return { id: id, name: name }
    }

    async deleteUser(id: string) {
        await this.userRepository.deleteOne(id)
    }

    async updateUser(id: string, user: UpdateUserRequest): Promise<UserResponse> {
        const newUser = await this.userRepository.update(id, user)

        return { id: newUser.id, name: newUser.name }
    }
}

export default new UserService();