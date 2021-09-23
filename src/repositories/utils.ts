import { Connection, createConnection } from 'mongoose';

export function createMongoConnection(): Connection {
    return createConnection('mongodb://test:local@localhost:27017/hobbies');
}