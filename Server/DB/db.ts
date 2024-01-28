import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI: string = process.env.MONGODB_URI as string;

const client = new MongoClient(mongoURI);
let dbInstance: Db | null = null;

// Connect to the database
async function connectDB(): Promise<Db | null> {
    try {
        if (!dbInstance) {
            await client.connect();
            dbInstance = client.db();
            console.log('Connected to database.');
        }
        return dbInstance;
    } catch (err) {
        console.log('Database Connection Error', err);
        throw err;
    }
}

export default connectDB ;
