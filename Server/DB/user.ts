import connectDB from "./db";
import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

interface User {
    _id?: ObjectId;
    googleId?: string;
    username: string;
    password?: string;
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

// Function to get a user by google id
async function getUserByGoogleId(googleId: string): Promise<User | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const user: User | null = await db.collection('user').findOne({ googleId }) as User | null;
        return user;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to change the password of a user
async function changePassword(userId: string, newPassword: string) {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        } 
        const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Update the user's password in the database
        await db.collection('user').updateOne({ _id: new ObjectId(userId) },
         { $set: { password: hashedPassword } });
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to store the refresh token in the database
async function storeRefreshToken(refreshToken: string, userId: string) {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('user').updateOne(
            { _id: new ObjectId(userId) }, { $set: { refreshToken } });
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to validate the refresh token
async function validateRefreshToken(refreshToken: string) {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const user: User | null = await db.collection('user').findOne({ refreshToken }) as User | null;
        if (!user) {
            return null;
        }
        // Verify the refresh token
        jwt.verify(refreshToken, process.env.JWT_REFRESH as string);
        return user._id;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

    // Function to delete the refresh token(for logging out)
    async function deleteRefreshToken(userId: string) {
        try {
            const db = await connectDB();
            if (!db) {
                throw new Error('Database not connected');
            }
            const result = await db.collection('user').updateOne({ _id: new ObjectId(userId) }, { $unset: { refreshToken: '' } });
            return result.modifiedCount > 0;
        } catch (err) {
            console.log('Database Error', err);
            throw err;
        }
    } // Deleting based on the User's ID logs the user out of all devices

   /* // Deleting based on the Refresh Token itself logs the user out of the current device only
   async function deleteRefreshToken(refreshToken: string) {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const result = await db.collection('user').updateOne({ refreshToken }, { $unset: { refreshToken: '' } });
        return result.modifiedCount > 0;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
} */

export {
    createUser,
    getUserById,
    getUserByUsername,
    getUserByGoogleId,
    changePassword,
    storeRefreshToken,
    validateRefreshToken,
    deleteRefreshToken,
}
