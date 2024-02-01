import {ObjectId} from 'mongodb';
import connectDB from '../DB/db';

interface Projects {
    name?: string;
    description?: string;
    images?: string[];
    technologies?: string[];
    url?: string;
}

interface PortfolioTemplate {
    _id: ObjectId;
    name?: string;
    author?: string;
    about?: string;
    images?: string[];
    technologies?: string[];
    projects?: Projects[];
}

// Function to create a new portfolio template
async function createPortfolioTemplate(newPortfolioTemplate: PortfolioTemplate): Promise<PortfolioTemplate> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        const portfolioTemplateToInsert: PortfolioTemplate = {
            ...newPortfolioTemplate,
        };
        const result = await db.collection('portfolioTemplate').insertOne(portfolioTemplateToInsert);
        return { ...portfolioTemplateToInsert, _id: result.insertedId };
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a portfolio template by name
async function getPortfolioTemplateByName(name: string): Promise<PortfolioTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const portfolioTemplate: PortfolioTemplate | null = await db.collection('portfolioTemplate').findOne(
            { name: name }) as PortfolioTemplate | null;
        return portfolioTemplate;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a portfolio template by id
async function getPortfolioTemplateById(_id: ObjectId): Promise<PortfolioTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const portfolioTemplate: PortfolioTemplate | null = await db.collection('portfolioTemplate').findOne(
            { _id: new ObjectId(_id) }) as PortfolioTemplate | null;
        return portfolioTemplate;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to update a portfolio template by id
async function updatePortfolioTemplate(_id: ObjectId, portfolioTemplateToUpdate: PortfolioTemplate): Promise<PortfolioTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('portfolioTemplate').updateOne(
            { _id: new ObjectId(_id) },
            { $set: { ...portfolioTemplateToUpdate } }
        );
        const updatedPortfolioTemplate: PortfolioTemplate | null = await db.collection('portfolioTemplate').findOne(
            { _id: new ObjectId(_id) }) as PortfolioTemplate | null;
        return updatedPortfolioTemplate;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to delete a portfolio template by id
async function deletePortfolioTemplate(_id: ObjectId): Promise<boolean> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('portfolioTemplate').deleteOne(
            { _id: new ObjectId(_id) }
        );
        return true;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

//Function to saves a user portfolio to the database
async function saveUserPortfolio(userPortfolio: PortfolioTemplate): Promise<PortfolioTemplate> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        const portfolioToInsert: PortfolioTemplate = {
            ...userPortfolio,  
        };
        const result = await db.collection('userPortfolio').insertOne(portfolioToInsert);
        return { ...portfolioToInsert, _id: result.insertedId };
    }
    catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

//Function to get a user portfolio by name
async function getUserPortfolioByName(name: string): Promise<PortfolioTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const userPortfolio: PortfolioTemplate | null = await db.collection('userPortfolio').findOne(
            { name: name }) as PortfolioTemplate | null;
        return userPortfolio;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

//Function to get a user portfolio by id
async function getUserPortfolioById(_id: ObjectId): Promise<PortfolioTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const userPortfolio: PortfolioTemplate | null = await db.collection('userPortfolio').findOne(
            { _id: new ObjectId(_id) }) as PortfolioTemplate | null;
        return userPortfolio;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

//Function to get all user portfolios
async function getAllUserPortfolios(): Promise<PortfolioTemplate[]> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const userPortfolios: PortfolioTemplate[] = await db.collection('userPortfolio').find().toArray() as PortfolioTemplate[];
        return userPortfolios;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

//Function to update a user portfolio by id
async function updateUserPortfolio(_id: ObjectId, userPortfolio: PortfolioTemplate): Promise<PortfolioTemplate | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('userPortfolio').updateOne(
            { _id: new ObjectId(_id) },
            { $set: { ...userPortfolio } }
        );
        const updatedUserPortfolio = await getUserPortfolioById(_id);
        return updatedUserPortfolio;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

//Function to delete a user portfolio by id
async function deleteUserPortfolio(_id: ObjectId): Promise<boolean> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('userPortfolio').deleteOne(
            { _id: new ObjectId(_id) }
        );
        return true;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}


export {
    createPortfolioTemplate,
    getPortfolioTemplateByName,
    getPortfolioTemplateById,
    updatePortfolioTemplate,
    deletePortfolioTemplate,
    saveUserPortfolio,
    getUserPortfolioByName,
    getUserPortfolioById,
    getAllUserPortfolios,
    updateUserPortfolio,
    deleteUserPortfolio
}