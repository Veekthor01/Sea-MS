import {ObjectId} from 'mongodb';
import connectDB from '../DB/db';

interface WorkExperience {
    company?: string;
    position?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string[];
}

interface Education {
    school?: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: Date;
    endDate?: Date;
}

interface ResumeTemplate {
    _id: ObjectId;
    name?: string;
    author?: string;
    email?: string;
    phone?: string;
    WorkExperience?: WorkExperience[];
    Education?: Education[];
    certifications?: string[];
    skills?: string[];
}

// Function to create a new resume template 
async function createResumeTemplate(newResumeTemplate: ResumeTemplate): Promise<ResumeTemplate> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        const resumeTemplateToInsert: ResumeTemplate = {
            ...newResumeTemplate,
        };
        const result = await db.collection('resumeTemplate').insertOne(resumeTemplateToInsert);
        return { ...resumeTemplateToInsert, _id: result.insertedId };
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a resume template by name
async function getResumeTemplateByName(name: string): Promise<ResumeTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const resumeTemplate: ResumeTemplate | null = await db.collection('resumeTemplate').findOne(
            { name: name }) as ResumeTemplate | null;
        return resumeTemplate;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a resume template by id
async function getResumeTemplateById(_id: ObjectId): Promise<ResumeTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const resumeTemplate: ResumeTemplate | null = await db.collection('resumeTemplate').findOne(
            { _id: new ObjectId(_id) }) as ResumeTemplate | null;
        return resumeTemplate;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get all resume templates
async function getAllResumeTemplates(): Promise<ResumeTemplate[]> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const resumeTemplates: ResumeTemplate[] = await db.collection('resumeTemplate').find().toArray();
        return resumeTemplates;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to update a resume template by id
async function updateResumeTemplate(_id: ObjectId, resumeTemplate: ResumeTemplate): Promise<ResumeTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('resumeTemplate').updateOne(
            { _id: new ObjectId(_id) },
            { $set: { ...resumeTemplate } }
        );
        const updatedResumeTemplate: ResumeTemplate | null = await db.collection('resumeTemplate').findOne(
            { _id: new ObjectId(_id) }) as ResumeTemplate | null;
        return updatedResumeTemplate;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to delete a resume template by id
async function deleteResumeTemplate(_id: ObjectId): Promise<boolean> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('resumeTemplate').deleteOne(
            { _id: new ObjectId(_id) }
        );
        return true;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to saves a user resume to the database
async function saveUserResume(userResume: ResumeTemplate): Promise<ResumeTemplate> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        const userResumeToInsert: ResumeTemplate = {
            ...userResume,
        };
        const result = await db.collection('userResume').insertOne(userResumeToInsert);
        return { ...userResumeToInsert, _id: result.insertedId };
    }
    catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a user resume by name
async function getUserResumeByName(name: string): Promise<ResumeTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const userResume: ResumeTemplate | null = await db.collection('userResume').findOne(
            { name: name }) as ResumeTemplate | null;
        return userResume;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a user resume by id
async function getUserResumeById(_id: ObjectId): Promise<ResumeTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const userResume: ResumeTemplate | null = await db.collection('userResume').findOne(
            { _id: new ObjectId(_id) }) as ResumeTemplate | null;
        return userResume;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get all user resumes
async function getAllUserResumes(): Promise<ResumeTemplate[]> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const userResumes: ResumeTemplate[] = await db.collection('userResume').find().toArray();
        return userResumes;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to update a user resume by id
async function updateUserResume(_id: ObjectId, userResume: ResumeTemplate): Promise<ResumeTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('userResume').updateOne(
            { _id: new ObjectId(_id) },
            { $set: { ...userResume } }
        );
        const updatedUserResume = await getUserResumeById(_id);
        return updatedUserResume;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to delete a user resume by id
async function deleteUserResume(_id: ObjectId): Promise<boolean> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('userResume').deleteOne(
            { _id: new ObjectId(_id) }
        );
        return true;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

export {
    createResumeTemplate,
    getResumeTemplateByName,
    getResumeTemplateById,
    getAllResumeTemplates,
    updateResumeTemplate,
    deleteResumeTemplate,
    saveUserResume,
    getUserResumeByName,
    getUserResumeById,
    getAllUserResumes,
    updateUserResume,
    deleteUserResume
};