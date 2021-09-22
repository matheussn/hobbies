import { Connection, Model, Types } from 'mongoose';
import { NotFoundException } from 'src/base/exceptions';
import { CreateUserRequest, UpdateUserRequest } from 'src/dtos/user/requests';
import { Hobbie, HobbieSchema } from 'src/models/Hobbie';
import { User, UserSchema } from 'src/models/User';
import { createMongoConnection } from './utils';

export default class UserRepository {
    userModel: Model<User>
    hobbieModel: Model<Hobbie>

    constructor(mongoConnection: Connection = createMongoConnection()) {
        this.hobbieModel = mongoConnection.model('Hobbie', HobbieSchema)
        this.userModel = mongoConnection.model('User', UserSchema)
    }

    async createUser(user: CreateUserRequest): Promise<User> {
        return this.userModel.create({ _id: new Types.ObjectId(), name: user.name })
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().populate('hobbies')
    }

    async deleteOne(id: string) {
        const user = await this.userModel.findById(id).populate('hobbies')

        this.validUser(user)

        user.hobbies.forEach(hobbie => { hobbie.delete() })

        await this.userModel.findByIdAndDelete(id).exec()
    }

    async update(id: string, updateUser: UpdateUserRequest): Promise<User> {
        const user = await this.userModel.findById(id)

        this.validUser(user)

        user.name = updateUser.name
        return user.save()
    }

    validUser(user: User) {
        if(user == null){
            throw new NotFoundException("User Not Found")
        }
    }

}