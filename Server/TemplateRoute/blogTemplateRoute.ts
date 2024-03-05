import express from 'express';
import { ObjectId } from 'mongodb';
import { format } from 'date-fns';
import { createBlogTemplate, getBlogTemplateByName, getAllBlogTemplates, getBlogTemplateById, updateBlogTemplate, deleteBlogTemplate } from '../Template/blogTemplate';
import authenticateJWT from '../Passport-Config/auth';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Route to create a blog template
router.post('/', authenticateJWT, async (req, res) => {
    try {
        const blogTemplate = await createBlogTemplate(req.body);
        res.status(200).json(blogTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create blog template' });
    }
});

// Route to get all blog templates
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const blogTemplates = await getAllBlogTemplates();
        res.status(200).json(blogTemplates);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog templates' });
    }
});


// Route to get a blog template by name
router.get('/:name', authenticateJWT, async (req, res) => {
    try {
        const blogTemplate = await getBlogTemplateByName(req.params.name);
        if (blogTemplate) {
            if (blogTemplate.createdAt && blogTemplate.updatedAt) {
                const createdAt = new Date(blogTemplate.createdAt);
                const updatedAt = new Date(blogTemplate.updatedAt);
                const displayDate = createdAt.getTime() === updatedAt.getTime() ? createdAt : updatedAt;
                const formattedDisplayDate = format(displayDate, 'dd MMM yyyy');
                console.log('Display date:', formattedDisplayDate);
            }
        }
        res.status(200).json(blogTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog template' });
    }
});

// Route to get a blog template by id
router.get('/id/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const blogTemplate = await getBlogTemplateById(_id);
        if (blogTemplate) {
            if (blogTemplate.createdAt && blogTemplate.updatedAt) {
                const createdAt = new Date(blogTemplate.createdAt);
                const updatedAt = new Date(blogTemplate.updatedAt);
                const displayDate = createdAt.getTime() === updatedAt.getTime() ? createdAt : updatedAt;
                const formattedDisplayDate = format(displayDate, 'dd MMM yyyy');
                console.log('Display date:', formattedDisplayDate);
            }
        }
        res.status(200).json(blogTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog template' });
    }
});

// Route to update a blog template by id
router.put('/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const blogTemplate = await updateBlogTemplate(_id, req.body);
        res.status(200).json(blogTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update blog template' });
    }
});

// Route to delete a blog template by id
router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await deleteBlogTemplate(_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete blog template' });
    }
});

export default router;
//import Redis from 'ioredis';

/*const redis = new Redis({
    host: process.env.REDIS_URL_ENDPOINT,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
}); */

/*Route to get all blog templates with redis
router.get('/', authenticateJWT, async (req, res) => {
    const cacheKey = 'blogTemplates';
     // fetch the result from cache
        const cacheResult = await redis.get(cacheKey);
    // If the result is in the cache, return it
        if (cacheResult) {
            console.log('Cache hit');
            return res.status(200).json(JSON.parse(cacheResult));
        }

    try {
        const blogTemplates = await getAllBlogTemplates();
        // Save the API response in the cache
        await redis.set(cacheKey, JSON.stringify(blogTemplates), 'EX', 3600);
        console.log('Cache miss');
        res.status(200).json(blogTemplates);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog templates' });
    }
}); */