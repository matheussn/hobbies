import { Users } from "./User";
import UserRepository from "./UsersRepository";
import { Hobbies } from "../hobbie/Hobbie";
import { UserResponse } from "../dtos/users/responses";
import { HobbiesResponse } from "../dtos/hobbies/response";
import { CreateUserRequest, UpdateUserRequest } from "../dtos/users/requests";


export class UsersService {
    userRepository: UserRepository

    constructor(userRepository: UserRepository = new UserRepository()) {
        this.userRepository = userRepository
    }

    async getAllUsers(): Promise<UserResponse[]> {
        const users: Users[] = await this.userRepository.findAll()

        const response: UserResponse[] = users.map<UserResponse>((user: Users) => {
            return {
                id: user._id,
                name: user.name,
                hobbies: user.hobbies.map<HobbiesResponse>((hobbie: Hobbies) => {
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