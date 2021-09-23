import { Connection, createConnection } from 'mongoose';

export function createMongoConnection(): Connection {
    return createConnection(process.env.MONGO_DB_HOST);
}