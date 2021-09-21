import { UpdateUserRequest } from "src/dtos/requests/UpdateUserRequest";
import HobbieRepository from "src/repositories/HobbieRepository";
import { CreateHobbieRequest } from "src/dtos/requests/CreateHobbieRequest";
import { Hobbie } from "src/models/Hobbie";
import { HobbiesResponse } from "src/dtos/responses/UserResponse";


class HobbieService {
    hobbieRepository: HobbieRepository

    constructor(hobbieRepository: HobbieRepository = new HobbieRepository()) {
        this.hobbieRepository = hobbieRepository
    }

    async getAllHobbies(userId: string): Promise<HobbiesResponse[]> {
        const allHobbies = await this.hobbieRepository.findAllByUser(userId)

        return allHobbies.map<HobbiesResponse>((hobbie: Hobbie) => {
            return this.convertHobbie(hobbie)
        })
    }

    async createHobbie(userId: string, hobbie: CreateHobbieRequest): Promise<HobbiesResponse> {
        const newHobbie = await this.hobbieRepository.createHobbie(userId, hobbie)
        return this.convertHobbie(newHobbie)
    }

    async deleteUser(id: string) {
        await this.hobbieRepository.deleteOne(id)
    }

    async updateUser(id: string, user: UpdateUserRequest) {
        const newUser = await this.hobbieRepository.update(id, user)

        return { id: id, name: newUser.name }
    }

    convertHobbie(hobbie: Hobbie): HobbiesResponse {
        return { id: hobbie.id, name: hobbie.name, year: hobbie.year, experienceLevel: hobbie.experienceLevel }
    }
}

export default new HobbieService();