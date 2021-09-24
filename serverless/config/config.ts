import config from 'config'

const dbConfig = config.get<string>('db.connection');

export default dbConfig