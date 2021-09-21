import { UpdateUserRequest } from "src/dtos/requests/UpdateUserRequest";
import HobbieRepository from "src/repositories/HobbieRepository";
import { CreateHobbieRequest } from "src/dtos/requests/CreateHobbieRequest";
import { Hobbie } from "src/models/Hobbie";


class HobbieService {
    hobbieRepository: HobbieRepository

    constructor(hobbieRepository: HobbieRepository = new HobbieRepository()) {
        this.hobbieRepository = hobbieRepository
    }

    async getAllHobbies(userId: string): Promise<Hobbie[]> {
        return this.hobbieRepository.findAllByUser(userId)
    }

    async createHobbie(userId: string, hobbie: CreateHobbieRequest): Promise<Hobbie> {
        return this.hobbieRepository.createHobbie(userId, hobbie)
    }

    async deleteUser(id: string) {
        await this.hobbieRepository.deleteOne(id)
    }

    async updateUser(id: string, user: UpdateUserRequest) {
        const newUser = await this.hobbieRepository.update(id, user)

        return { id: id, name: newUser.name }
    }
}

export default new HobbieService();