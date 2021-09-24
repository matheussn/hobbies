import { CreateHobbieRequest, UpdateHobbieRequest } from '../dtos/hobbies/requests';
import { HobbiesResponse } from '../dtos/hobbies/response';
import { Hobbies } from './Hobbie';
import HobbieRepository from './HobbiesRepository';


export class HobbieService {
    hobbieRepository: HobbieRepository

    constructor(hobbieRepository: HobbieRepository = new HobbieRepository()) {
        this.hobbieRepository = hobbieRepository
    }

    async getAllHobbies(userId: string): Promise<HobbiesResponse[]> {
        const allHobbies = await this.hobbieRepository.findAllByUser(userId)

        return allHobbies.map<HobbiesResponse>((hobbie: Hobbies) => {
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

    convertHobbie(hobbie: Hobbies): HobbiesResponse {
        return { id: hobbie.id, name: hobbie.name, year: hobbie.year, experienceLevel: hobbie.experienceLevel }
    }
}