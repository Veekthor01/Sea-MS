import { ObjectId } from 'mongodb';
import connectDB from '../DB/db';

interface Image {
    _id: ObjectId;
    publicUrl: string;
}

// Function to store image in database
async function storeImageInDB(publicUrl: string): Promise<Image> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        const imageToInsert: Image = {
            _id: new ObjectId(),
            publicUrl,
        };
        const result = await db.collection('image').insertOne(imageToInsert);
        return { ...imageToInsert, _id: result.insertedId };
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get image from database
async function getImageFromDB(id: string): Promise<Image | null> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        const image = await db.collection('image').findOne({ _id: new ObjectId(id) });
        return image as Image | null;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to delete image from database
async function deleteImageFromDB(id: string): Promise<void> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        await db.collection('image').deleteOne({ _id: new ObjectId(id) });
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

export { 
    storeImageInDB,
    getImageFromDB,
    deleteImageFromDB   
 };

