import { assert } from "console"
import { Connection } from "mongoose"
import { createMockConnection, stopMockConnection } from "../../libs/db-conn-tests"
import { ExperienceLevel } from "../../models/Hobbie"
import HobbieRepository from "../../repositories/HobbiesRepository"
import UserRepository from "../../repositories/UsersRepository"
import { UsersService } from "./UsersService"

describe('Test of class UsersService', () => {

    let conn: Connection
    let usersService: UsersService
    let hobbieRepository: HobbieRepository
    let userRepository: UserRepository

    beforeAll(async () => {
        conn = await createMockConnection()
        userRepository = new UserRepository(conn)
        hobbieRepository = new HobbieRepository(conn)
        usersService = new UsersService(userRepository)
    })

    afterAll(async () => {
        stopMockConnection(conn)
    })


    it('should Create an User', async () => {

        const result = await usersService.createUser({ name: "New User" })

        const userDb = await userRepository.findById(result.id.toString())


        expect(result.id).toBe(userDb.id)
        expect(result.name).toBe(userDb.name)
        expect(result.hobbies).toBeUndefined()
        expect(result.hobbies).toBeUndefined()
    })

    it('should delete user with success', async () => {
        const user = await userRepository.createUser({ name: "User to Delete" })

        await usersService.deleteUser(user.id)

        try {
            await userRepository.findById(user.id)
            expect(false).toBe(true)
        } catch (error) {
            assert(true)
        }
    })

    it('should delete user with success and your hobbies', async () => {
        const user = await userRepository.createUser({ name: "User to Delete" })
        const hobbie = await hobbieRepository.createHobbie(user.id, { name: "first hobbie", year: 2021, experienceLevel: ExperienceLevel.MEDIUM })

        await usersService.deleteUser(user.id)

        try {
            await userRepository.findById(user.id)
            expect(false).toBe(true)
        } catch (error) {
            assert(true)
        }

        try {
            await hobbieRepository.hobbieModel.findById(hobbie.id)
            expect(false).toBe(true)
        } catch (error) {
            assert(true)
        }
    })

    it('should fetch all users in db', async () => {
        await deleteAllUsers()
        const user = await userRepository.createUser({ name: "User to Delete" })
        const hobbie = await hobbieRepository.createHobbie(user.id, { name: "first hobbie", year: 2021, experienceLevel: ExperienceLevel.MEDIUM })
        const user1 = await userRepository.createUser({ name: "User to Delete" })
        const user2 = await userRepository.createUser({ name: "User to Delete" })

        const result = await usersService.getAllUsers()

        expect(result).toBeDefined()
        expect(result.length).toBe(3)
        expect(result[0].id.toString()).toBe(user.id)
        expect(result[0].name).toBe(user.name)
        expect(result[0].hobbies).toBeDefined()
        expect(result[0].hobbies.length).toBe(1)
        expect(result[0].hobbies[0].id.toString()).toBe(hobbie.id)
        expect(result[1].id.toString()).toBe(user1.id)
        expect(result[2].id.toString()).toBe(user2.id)
    })

    it('should return an empty list when there are no users in the database', async () => {
        await deleteAllUsers()
        const result = await usersService.getAllUsers()

        expect(result).toBeDefined()
        expect(result.length).toBe(0)
    })

    it('should update name of user', async () => {
        const newName = "New Name"
        const user = await userRepository.createUser({ name: "User to update" })

        const result = await usersService.updateUser(user.id, { name: newName })

        expect(result).toBeDefined()
        expect(result.id.toString()).toBe(user.id)
        expect(result.name).toBe(newName)
        expect(result.hobbies).toBeUndefined()
    })

    async function deleteAllUsers() {
        const users = await userRepository.userModel.find()
        users.forEach(async (user) => {
            await user.delete()
        });
    }
})