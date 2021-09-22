import { CreateHobbieRequest, UpdateHobbieRequest } from "src/dtos/hobbie/requests";
import { HobbiesResponse } from "src/dtos/hobbie/response";

import { Hobbie } from "src/models/Hobbie";
import HobbieRepository from "src/repositories/HobbieRepository";


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

    async deleteHobbie(userId: string, id: string) {
        await this.hobbieRepository.deleteHobbie(userId, id)
    }

    async updatehobbie(id: string, request: UpdateHobbieRequest): Promise<HobbiesResponse> {
        const newHobbie = await this.hobbieRepository.update(id, request)

        return this.convertHobbie(newHobbie)
    }

    convertHobbie(hobbie: Hobbie): HobbiesResponse {
        return { id: hobbie.id, name: hobbie.name, year: hobbie.year, experienceLevel: hobbie.experienceLevel }
    }
}

export default new HobbieService();