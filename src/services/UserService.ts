import { User } from "src/models/User";
import UserRepository from "src/repositories/UserRepository";
import { CreateUserInterface } from "src/dtos/requests/CreateUserRequest";
import { UserResponse } from "src/dtos/responses/UserResponse";
import { UpdateUserRequest } from "src/dtos/requests/UpdateUserRequest";


class UserService {
    userRepository: UserRepository

    constructor(userRepository: UserRepository = new UserRepository()) {
        this.userRepository = userRepository
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll()
    }

    async createUser(user: CreateUserInterface): Promise<UserResponse> {
        const { name, id } = await this.userRepository.createUser(user)

        return { id: id, name: name }
    }

    async deleteUser(id: string) {
        await this.userRepository.deleteOne(id)
    }

    async updateUser(id: string, user: UpdateUserRequest) {
        const newUser = await this.userRepository.update(id, user)

        return { id: id, name: newUser.name }
    }
}

export default new UserService();