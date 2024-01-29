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

interface Resume {
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

// Function to create a new resume
async function createResume(newResume: Resume): Promise<Resume> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        const resumeToInsert: Resume = {
            ...newResume,
        };
        const result = await db.collection('resume').insertOne(resumeToInsert);
        return { ...resumeToInsert, _id: result.insertedId };
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a resume by name
async function getResumeByName(name: string): Promise<Resume | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const resume: Resume | null = await db.collection('resume').findOne(
            { name: name }) as Resume | null;
        return resume;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a resume by id
async function getResumeById(_id: ObjectId): Promise<Resume | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const resume: Resume | null = await db.collection('resume').findOne(
            { _id: new ObjectId(_id) }) as Resume | null;
        return resume;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get all resumes
async function getAllResumes(): Promise<Resume[]> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const resumes: Resume[] = await db.collection('resume').find({}).toArray() as Resume[];
        return resumes;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to update a resume by id
async function updateResume(_id: ObjectId, resume: Resume): Promise<Resume | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const result = await db.collection('resume').updateOne(
            { _id: new ObjectId(_id) },
            { $set: resume },
            { upsert: true }
        );
        if (result.matchedCount > 0) {
            return resume;
        }
        return null;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to delete a resume by id
async function deleteResume(_id: ObjectId): Promise<boolean> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('resume').deleteOne({ _id: new ObjectId(_id) });
        return true;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

export {
    createResume,
    getResumeByName,
    getResumeById,
    getAllResumes,
    updateResume,
    deleteResume,
};