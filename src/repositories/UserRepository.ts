import { Connection, Model, Types } from 'mongoose';
import { NotFoundException } from '../base/exceptions';
import { CreateUserRequest, UpdateUserRequest } from '../dtos/user/requests';
import { Hobbies, HobbieSchema } from '../models/Hobbie';
import { Users, UserSchema } from '../models/User';
import { createMongoConnection } from './utils';

export default class UserRepository {
    userModel: Model<Users>
    hobbieModel: Model<Hobbies>

    constructor(mongoConnection: Connection = createMongoConnection()) {
        this.hobbieModel = mongoConnection.model('Hobbies', HobbieSchema)
        this.userModel = mongoConnection.model('Users', UserSchema)
    }

    async createUser(user: CreateUserRequest): Promise<Users> {
        return this.userModel.create({ _id: new Types.ObjectId(), name: user.name })
    }

    async findAll(): Promise<Users[]> {
        return this.userModel.find().populate('hobbies')
    }

    async deleteOne(id: string) {
        const user = await this.userModel.findById(id).populate('hobbies')

        this.validUser(user)

        user.hobbies.forEach(hobbie => { hobbie.delete() })

        await this.userModel.findByIdAndDelete(id).exec()
    }

    async update(id: string, updateUser: UpdateUserRequest): Promise<Users> {
        const user = await this.userModel.findById(id)

        this.validUser(user)

        user.name = updateUser.name
        return user.save()
    }

    validUser(user: Users) {
        if(user == null){
            throw new NotFoundException("User Not Found")
        }
    }

}