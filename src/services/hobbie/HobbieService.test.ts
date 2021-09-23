import { describe, expect, it } from '@jest/globals';
import assert from 'assert';
import { Connection } from 'mongoose';
import { ExperienceLevel } from '../../models/Hobbie';
import UserRepository from '../../repositories/UserRepository';
import { NotFoundException } from '../../base/exceptions';
import { createMockConnection, stopMockConnection } from '../../libs/db-conn-tests';
import HobbieRepository from '../../repositories/HobbieRepository';
import { HobbieService } from './HobbieService';
import { CreateHobbieRequest } from 'src/dtos/hobbie/requests';

describe('Test of class HobbieService', () => {
    let conn: Connection
    let hobbieService: HobbieService
    let hobbieRepository: HobbieRepository
    let userRepository: UserRepository

    beforeAll(async () => {
        conn = await createMockConnection()
        userRepository = new UserRepository(conn)
        hobbieRepository = new HobbieRepository(conn)
        hobbieService = new HobbieService(hobbieRepository)
    })

    afterAll(async () => {
        stopMockConnection(conn)
    })

    it('should throw an exception when trying to search for hobbies of a user that doesn\'t exist', async () => {
        try {
            await hobbieService.getAllHobbies('614ba1692666d24f14f0ee21')
            assert(false)
        } catch (error) {
            expect(error.constructor).toBe(NotFoundException)
        }

    })

    it('should return a user\'s hobbies', async () => {
        const user = await userRepository.createUser({ name: "Default User" })
        const hobbie = await hobbieRepository.createHobbie(user.id, { name: "test hobbie", experienceLevel: ExperienceLevel.LOW, year: 2021 })

        const result = await hobbieService.getAllHobbies(user.id)

        expect(result).toBeDefined()
        expect(result.length).toBe(1)
        expect(result[0].experienceLevel).toBe(hobbie.experienceLevel)
        expect(result[0].year).toBe(hobbie.year)
        expect(result[0].name).toBe(hobbie.name)
    })

    it('should return an empty list when the user has no hobbies', async () => {
        const user = await userRepository.createUser({ name: "Default User" })

        const result = await hobbieService.getAllHobbies(user.id)

        expect(result).toBeDefined()
        expect(result.length).toBe(0)
    })

    it('should create an Hobbie', async () => {
        const spy = jest.spyOn(hobbieRepository, 'createHobbie')
        const user = await userRepository.createUser({ name: 'Default User' })
        const hobbieRequest: CreateHobbieRequest = {
            name: "test hobbie",
            experienceLevel: ExperienceLevel.LOW,
            year: 2021
        }

        const result = await hobbieService.createHobbie(user.id, hobbieRequest)

        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toBeDefined()
        expect(result.name).toBe(hobbieRequest.name)
        expect(result.experienceLevel).toBe(hobbieRequest.experienceLevel)
        expect(result.year).toBe(hobbieRequest.year)
        spy.mockRestore();
    })

    it('should return an exception when trying to create a hobby for the user that doesnt exist', async () => {
        const spy = jest.spyOn(hobbieRepository, 'createHobbie')
        const user = await userRepository.createUser({ name: 'Default User' })
        await user.delete()
        const hobbieRequest: CreateHobbieRequest = {
            name: "test hobbie",
            experienceLevel: ExperienceLevel.LOW,
            year: 2021
        }

        try {
            await hobbieService.createHobbie(user.id, hobbieRequest)
            assert(false)
        } catch (exception) {
            expect(spy).toHaveBeenCalledTimes(1);
            expect(exception.constructor).toBe(NotFoundException)
        }
        spy.mockRestore();
    })

    it('should delete an hobbie', async () => {
        const user = await userRepository.createUser({ name: "Default User" })
        const hobbie = await hobbieRepository.createHobbie(user.id, { name: "test hobbie", experienceLevel: ExperienceLevel.LOW, year: 2021 })
        const hobbie2 = await hobbieRepository.createHobbie(user.id, { name: "test hobbie", experienceLevel: ExperienceLevel.LOW, year: 2021 })
        
        const result = await hobbieService.getAllHobbies(user.id)
        expect(result).toBeDefined()
        expect(result.length).toBe(2)
        expect(result[0].id).toBe(hobbie.id)
        expect(result[1].id).toBe(hobbie2.id)

        await hobbieService.deleteHobbie(user.id, hobbie2.id)

        const result2 = await hobbieService.getAllHobbies(user.id)
        expect(result2).toBeDefined()
        expect(result2.length).toBe(1)
        expect(result2[0].id).toBe(hobbie.id)
    })
})