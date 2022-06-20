import * as dotenv from 'dotenv';
dotenv.config();

// Online Connection MongoDB
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const DB_NAME = process.env.HOSTNAME_LOCAL || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.menvh.mongodb.net/${DB_NAME}`;
// Local MongoDB
const HOSTNAME_LOCAL = process.env.HOSTNAME_LOCAL || '';
const MONGO_URL_LOCAL = `mongodb://localhost:27017/dotflix-api`

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

export const config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL_LOCAL
    },
    server: {
        API_PORT: SERVER_PORT
    }
}