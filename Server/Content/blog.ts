import {ObjectId} from 'mongodb';
import connectDB from '../DB/db';


interface Blog {
    _id: ObjectId;
    name?: string;
    title?: string;
    content?: string;
    images?: string[];
    author?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Function to create a new blog
async function createBlog(newBlog: Blog): Promise<Blog> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        const blogToInsert: Blog = {
            ...newBlog,
            createdAt: new Date()
        };
        const result = await db.collection('blog').insertOne(blogToInsert);
        return { ...blogToInsert, _id: result.insertedId };
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a blog by name
async function getBlogByName(name: string): Promise<Blog | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const blog: Blog | null = await db.collection('blog').findOne(
            { name: name }) as Blog | null;
        return blog;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a blog by id
async function getBlogById(_id: ObjectId): Promise<Blog | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const blog: Blog | null = await db.collection('blog').findOne(
            { _id: new ObjectId(_id) }) as Blog | null;
        return blog;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get all blogs
async function getAllBlogs(): Promise<Blog[]> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const blogs: Blog[] = await db.collection('blog').find({}).toArray() as Blog[];
        return blogs;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to update a blog by id
async function updateBlog(_id: ObjectId, updatedBlog: Blog): Promise<Blog | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const result = await db.collection('blog').findOneAndUpdate(
            { _id: new ObjectId(_id) },
            { $set:  {
                ...updatedBlog,
                updatedAt: new Date(),
            } 
            },
            { returnDocument: 'after' }
        );
            return result as Blog;
        
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to delete a blog by id
async function deleteBlog(_id: ObjectId): Promise<boolean> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('blog').deleteOne({ _id: new ObjectId(_id) });
        return true;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

export {
    createBlog,
    getBlogByName,
    getBlogById,
    getAllBlogs,
    updateBlog,
    deleteBlog
}