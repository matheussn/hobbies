import { Hobbie } from "src/models/Hobbie";

export interface CreateUserInterface {
    name: string,
    hobbies?: Hobbie[]
}