import { User } from "src/models/User";
import UserRepository from "src/repositories/UserRepository";
import { Hobbie } from "src/models/Hobbie";
import { UserResponse } from "src/dtos/user/responses";
import { HobbiesResponse } from "src/dtos/hobbie/response";
import { CreateUserRequest, UpdateUserRequest } from "src/dtos/user/requests";


class UserService {
    userRepository: UserRepository

    constructor(userRepository: UserRepository = new UserRepository()) {
        this.userRepository = userRepository
    }

    async getAllUsers(): Promise<UserResponse[]> {
        const users: User[] = await this.userRepository.findAll()

        const response: UserResponse[] = users.map<UserResponse>((user: User) => {
            return {
                id: user._id,
                name: user.name,
                hobbies: user.hobbies.map<HobbiesResponse>((hobbie: Hobbie) => {
                    return { id: hobbie.id, name: hobbie.name, experienceLevel: hobbie.experienceLevel, year: hobbie.year }
                })
            }
        })
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