import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, createConnection } from 'mongoose';

const mongod = MongoMemoryServer.create();

export async function createMockConnection(): Promise<Connection> {
    const uri = (await mongod).getUri();

    return createConnection(uri);
}

export async function stopMockConnection(connection: Connection) {
    MongoMemoryServer
    await connection.dropDatabase();
    await connection.close();
    await (await mongod).stop();
}