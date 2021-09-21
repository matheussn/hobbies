import { createConnection } from 'mongoose'

export function createMongoConnection() {
    return createConnection('mongodb://test:local@localhost:27017/hobbies')
}