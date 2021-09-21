import { Connection, Model, Types } from 'mongoose'
import { User, UserSchema } from 'src/models/User';
import { CreateUserInterface } from 'src/dtos/requests/CreateUserRequest';
import { UpdateUserRequest } from 'src/dtos/requests/UpdateUserRequest';
import { createMongoConnection } from './utils';
import { HobbieSchema } from 'src/models/Hobbie';

export default class UserRepository {
    model: Model<User>

    constructor() {
        let mongoConn: Connection = createMongoConnection()
        mongoConn.model('Hobbie', HobbieSchema)
        this.model = mongoConn.model('User', UserSchema)
    }

    async createUser(user: CreateUserInterface): Promise<User> {
        return this.model.create({ _id: new Types.ObjectId(), name: user.name })
    }

    async findAll(): Promise<User[]> {
        return this.model.find().populate('hobbies')
    }

    async deleteOne(id: string) {
        await this.model.deleteOne({ id: id }).exec()
    }

    async update(id: string, updateUser: UpdateUserRequest): Promise<User> {
        const user = await this.model.findById(id)

        if (user == null) {
            throw Error("User Not Found")
        }

        user.name = updateUser.name
        return user.save()
    }

}