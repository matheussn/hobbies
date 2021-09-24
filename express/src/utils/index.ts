import { Connection, createConnection } from 'mongoose';
import dbConfig from '../../config/config'

export function createMongoConnection(): Connection {
    return createConnection(dbConfig);
}