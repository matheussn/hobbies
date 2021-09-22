import { Connection, Model, Types } from 'mongoose'
import { User, UserSchema } from 'src/models/User';
import { UpdateUserRequest } from 'src/dtos/requests/UpdateUserRequest';
import { createMongoConnection } from './utils';
import { Hobbie, HobbieSchema } from 'src/models/Hobbie';
import { CreateHobbieRequest } from 'src/dtos/requests/CreateHobbieRequest';
import { NotFoundException } from 'src/base/exceptions';

export default class HobbieRepository {
    hobbieModel: Model<Hobbie>
    userModel: Model<User>

    constructor() {
        let mongoConn: Connection = createMongoConnection()
        this.hobbieModel = mongoConn.model('Hobbie', HobbieSchema)
        this.userModel = mongoConn.model('User', UserSchema)
    }

    async createHobbie(userId: string, hobbie: CreateHobbieRequest): Promise<Hobbie> {

        const user = await this.userModel.findById(userId)

        if (user == null) {
            throw new NotFoundException("User not Found")
        }

        const savedHobbie = await this.hobbieModel.create({
            _id: new Types.ObjectId(),
            name: hobbie.name,
            experienceLevel: hobbie.experienceLevel,
            year: hobbie.year
        })

        user.hobbies.push(savedHobbie)
        user.save()

        return savedHobbie
    }

    async findAllByUser(userId: string): Promise<Hobbie[]> {
        const user = await this.userModel.findById(userId).populate('hobbies')
        return user.hobbies
    }

    async deleteOne(id: string) {
        await this.hobbieModel.deleteOne({ id: id }).exec()
    }

    async update(id: string, updateUser: UpdateUserRequest) {
        const user = await this.hobbieModel.findById(id)

        user.name = updateUser.name
        return user.save()
    }
}