import connectDB from "./db";
import { ObjectId } from "mongodb";
//import { InsertOneResult } from 'mongodb';

interface User {
    username: string;
    password: string;
}

// Function to create a new user
async function createUser(newUser: User): Promise<User>{
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        await db.collection('user').insertOne(newUser);
        return newUser;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a user by id
async function getUserById(_id: ObjectId): Promise<User | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const user: User | null = await db.collection('user').findOne({ _id: new ObjectId(_id) }) as User | null;
        return user;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a user by username
async function getUserByUsername(username: string): Promise<User | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const user: User | null = await db.collection('user').findOne({ username }) as User | null;
        return user;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

export {
    createUser,
    getUserById,
    getUserByUsername
}
