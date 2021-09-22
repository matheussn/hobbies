import { Connection, Model, Types } from 'mongoose';
import { NotFoundException } from 'src/base/exceptions';
import { CreateHobbieRequest, UpdateHobbieRequest } from 'src/dtos/hobbie/requests';
import { Hobbie, HobbieSchema } from 'src/models/Hobbie';
import { User, UserSchema } from 'src/models/User';
import { createMongoConnection } from './utils';

export default class HobbieRepository {
    hobbieModel: Model<Hobbie>
    userModel: Model<User>

    constructor(mongoConnection: Connection = createMongoConnection()) {
        this.hobbieModel = mongoConnection.model('Hobbie', HobbieSchema)
        this.userModel = mongoConnection.model('User', UserSchema)
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
        if(user == null) {
            throw new NotFoundException("User not found!")
        }
        return user.hobbies
    }

    async deleteHobbie(userId: string, hobbieId: string) {
        const user = await this.userModel.findById(userId).populate('hobbies')
        this.validIfNotNull(user, "User Not Found")
        const hobbie = await this.hobbieModel.findById(hobbieId)
        this.validIfNotNull(hobbie, "Hobbie Not Found")

        console.log(user.hobbies)
        user.hobbies = user.hobbies.filter(hobbie => hobbie.id != hobbieId)
        console.log(user.hobbies)
        await user.save()
        await hobbie.delete()
    }

    async update(id: string, updateHobbie: UpdateHobbieRequest): Promise<Hobbie> {
        const hobbie = await this.hobbieModel.findById(id)

        hobbie.name = updateHobbie.name ? updateHobbie.name : hobbie.name
        hobbie.year = updateHobbie.year ? updateHobbie.year : hobbie.year
        hobbie.experienceLevel = updateHobbie.experienceLevel ? updateHobbie.experienceLevel : hobbie.experienceLevel

        return hobbie.save()
    }

    validIfNotNull(model: any, message: string) {
        if(model == null){
            throw new NotFoundException(message)
        }
    }
}