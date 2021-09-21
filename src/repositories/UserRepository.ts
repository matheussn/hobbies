import { Connection, Model, Types } from 'mongoose'
import { User, UserSchema } from 'src/models/User';
import { CreateUserInterface } from 'src/dtos/requests/CreateUserRequest';
import { UpdateUserRequest } from 'src/dtos/requests/UpdateUserRequest';
import { createMongoConnection } from './utils';

export default class UserRepository {
    model: Model<User>

    constructor() {
        let mongoConn: Connection = createMongoConnection()
        this.model = mongoConn.model('User', UserSchema)
    }

    async createUser(user: CreateUserInterface): Promise<User> {
        return this.model.create({ _id: new Types.ObjectId(), name: user.name })
    }

    async findAll(): Promise<User[]> {
        return this.model.find().exec()
    }

    async deleteOne(id: string) {
        await this.model.deleteOne({ id: id }).exec()
    }

    async update(id: string, updateUser: UpdateUserRequest) {
        const user = await this.model.findById(id)

        user.name = updateUser.name
        return user.save()
    }

}