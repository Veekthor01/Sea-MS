import {ObjectId} from 'mongodb';
import connectDB from '../DB/db';

interface Projects {
    name?: string;
    description?: string;
    images?: string[];
    technologies?: string[];
    url?: string;
}

interface Portfolio {
    _id: ObjectId;
    name?: string;
    author?: string;
    about?: string;
    images?: string[];
    technologies?: string[];
    projects?: Projects[];
}

// Function to create a new portfolio
async function createPortfolio(newPortfolio: Portfolio): Promise<Portfolio> {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database not connected');
    }
    try {
        const portfolioToInsert: Portfolio = {
            ...newPortfolio,
        };
        const result = await db.collection('portfolio').insertOne(portfolioToInsert);
        return { ...portfolioToInsert, _id: result.insertedId };
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a portfolio by name
async function getPortfolioByName(name: string): Promise<Portfolio | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const portfolio: Portfolio | null = await db.collection('portfolio').findOne(
            { name: name }) as Portfolio | null;
        return portfolio;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get a portfolio by id
async function getPortfolioById(_id: ObjectId): Promise<Portfolio | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const portfolio: Portfolio | null = await db.collection('portfolio').findOne(
            { _id: new ObjectId(_id) }) as Portfolio | null;
        return portfolio;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to get all portfolios
async function getAllPortfolios(): Promise<Portfolio[]> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const portfolios: Portfolio[] = await db.collection('portfolio').find({}).toArray() as Portfolio[];
        return portfolios;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to update a portfolio by id
async function updatePortfolio(_id: ObjectId, portfolio: Portfolio): Promise<Portfolio | null> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        const portfolioToUpdate: Portfolio = {
            ...portfolio,
        };
        await db.collection('portfolio').replaceOne({ _id: new ObjectId(_id) }, portfolioToUpdate);
        return portfolioToUpdate;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

// Function to delete a portfolio by id
async function deletePortfolio(_id: ObjectId): Promise<boolean> {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database not connected');
        }
        await db.collection('portfolio').deleteOne({ _id: new ObjectId(_id) });
        return true;
    } catch (err) {
        console.log('Database Error', err);
        throw err;
    }
}

export {
    createPortfolio,
    getPortfolioByName,
    getPortfolioById,
    getAllPortfolios,
    updatePortfolio,
    deletePortfolio
}