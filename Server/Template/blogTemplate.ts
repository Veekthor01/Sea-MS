import {ObjectId} from 'mongodb';
import connectDB from '../DB/db';
import { format } from 'date-fns';

interface BlogTemplate {
    _id: ObjectId;
    name?: string;
    title?: string;
    content?: string;
    author?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Function to create a new blog template
async function createBlogTemplate(newBlogTemplate: BlogTemplate): Promise<BlogTemplate> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        const blogTemplateToInsert: BlogTemplate = {
            ...newBlogTemplate,
            createdAt: format(new Date(), 'dd MMM yyyy'),
        };
        const result = await db.collection('blogTemplate').insertOne(blogTemplateToInsert);
        return { ...blogTemplateToInsert, _id: result.insertedId };
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a blog template by name
async function getBlogTemplateByName(name: string): Promise<BlogTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const blogTemplate: BlogTemplate | null = await db.collection('blogTemplate').findOne(
            { name: name }) as BlogTemplate | null;
        return blogTemplate;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a blog template by id
async function getBlogTemplateById(_id: ObjectId): Promise<BlogTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const blogTemplate: BlogTemplate | null = await db.collection('blogTemplate').findOne(
            { _id: new ObjectId(_id) }) as BlogTemplate | null;
        return blogTemplate;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get all blog templates
async function getAllBlogTemplates(): Promise<BlogTemplate[]> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const blogTemplates: BlogTemplate[] = await db.collection('blogTemplate').find().toArray();
        return blogTemplates;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to update a blog template by id
async function updateBlogTemplate(_id: ObjectId, blogTemplate: BlogTemplate): Promise<BlogTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('blogTemplate').updateOne(
            { _id: new ObjectId(_id) },
            { $set: { ...blogTemplate, updatedAt: format(new Date(), 'dd MMM yyyy') } }
        );
        const updatedBlogTemplate = await getBlogTemplateById(_id);
        return updatedBlogTemplate;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to delete a blog template by id
async function deleteBlogTemplate(_id: ObjectId): Promise<boolean> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('blogTemplate').deleteOne({ _id: new ObjectId(_id) });
        return true;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

//Function to saves a user blog to the database
async function saveUserBlog(userBlog: BlogTemplate): Promise<BlogTemplate> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        const userBlogToInsert: BlogTemplate = {
            ...userBlog,
            createdAt: format(new Date(), 'dd MMM yyyy'),
        };
        const result = await db.collection('userBlog').insertOne(userBlogToInsert);
        return { ...userBlogToInsert, _id: result.insertedId };
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a user blog by name
async function getUserBlogByName(name: string): Promise<BlogTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const userBlog: BlogTemplate | null = await db.collection('userBlog').findOne(
            { name: name }) as BlogTemplate | null;
        return userBlog;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a user blog by id
async function getUserBlogById(_id: ObjectId): Promise<BlogTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const userBlog: BlogTemplate | null = await db.collection('userBlog').findOne(
            { _id: new ObjectId(_id) }) as BlogTemplate | null;
        return userBlog;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get all user blogs
async function getAllUserBlogs(): Promise<BlogTemplate[]> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const userBlogs: BlogTemplate[] = await db.collection('userBlog').find().toArray();
        return userBlogs;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to update a user blog by id
async function updateUserBlog(_id: ObjectId, userBlog: BlogTemplate): Promise<BlogTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('userBlog').updateOne(
            { _id: new ObjectId(_id) },
            { $set: { ...userBlog, updatedAt: format(new Date(), 'dd MMM yyyy') } }
        );
        const updatedUserBlog = await getUserBlogById(_id);
        return updatedUserBlog;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to delete a user blog by id
async function deleteUserBlog(_id: ObjectId): Promise<boolean> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('userBlog').deleteOne({ _id: new ObjectId(_id) });
        return true;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

export {
    createBlogTemplate,
    getBlogTemplateByName,
    getBlogTemplateById,
    getAllBlogTemplates,
    updateBlogTemplate,
    deleteBlogTemplate,
    saveUserBlog,
    getUserBlogByName,
    getUserBlogById,
    getAllUserBlogs,
    updateUserBlog,
    deleteUserBlog,
    //storeImageInDB
};