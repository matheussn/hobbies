import { Connection, Model, Types } from 'mongoose';
import { NotFoundException } from '../base/exceptions';
import { CreateHobbieRequest, UpdateHobbieRequest } from '../dtos/hobbies/requests';
import { Users, UserSchema } from '../user/User';
import { createMongoConnection } from '../utils';
import { Hobbies, HobbieSchema } from './Hobbie';

export default class HobbieRepository {
    hobbieModel: Model<Hobbies>
    userModel: Model<Users>

    constructor(mongoConnection: Connection = createMongoConnection()) {
        this.hobbieModel = mongoConnection.model('Hobbies', HobbieSchema)
        this.userModel = mongoConnection.model('Users', UserSchema)
    }

    async createHobbie(userId: string, hobbie: CreateHobbieRequest): Promise<Hobbies> {

        const user = await this.findUser(userId)

        const savedHobbie = await this.hobbieModel.create({
            _id: new Types.ObjectId(),
            name: hobbie.name,
            experienceLevel: hobbie.experienceLevel,
            year: hobbie.year
        })

        user.hobbies.push(savedHobbie)
        await user.save()

        return savedHobbie
    }

    async findAllByUser(userId: string): Promise<Hobbies[]> {
        const user = await this.userModel.findById(userId).populate('hobbies')

        if (user == null)
            throw new NotFoundException("User Not Found")

        return user.hobbies
    }

    async deleteHobbie(userId: string, hobbieId: string) {
        const user = await this.userModel.findById(userId).populate('hobbies')
        if (user == null)
            throw new NotFoundException("User Not Found")

        const hobbie = await this.hobbieModel.findById(hobbieId)
        if (hobbie == null)
            throw new NotFoundException("Hobbie Not Found")

        user.hobbies = user.hobbies.filter(hobbie => hobbie.id != hobbieId)

        await user.save()
        await hobbie.delete()
    }

    async update(id: string, updateHobbie: UpdateHobbieRequest): Promise<Hobbies> {
        const hobbie = await this.hobbieModel.findById(id)
        if (hobbie == null)
            throw new NotFoundException("Hobbie Not Found")

        hobbie.name = updateHobbie.name ? updateHobbie.name : hobbie.name
        hobbie.year = updateHobbie.year ? updateHobbie.year : hobbie.year
        hobbie.experienceLevel = updateHobbie.experienceLevel ? updateHobbie.experienceLevel : hobbie.experienceLevel

        return hobbie.save()
    }

    private async findUser(userId: string): Promise<Users> {
        const user = await this.userModel.findById(userId)

        if (user == null)
            throw new NotFoundException("User Not Found")

        return user
    }
}