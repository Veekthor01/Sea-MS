import express from 'express';
import { ObjectId } from 'mongodb';
import { createBlogTemplate, getBlogTemplateByName, getAllBlogTemplates, getBlogTemplateById, updateBlogTemplate, deleteBlogTemplate } from '../Template/blogTemplate';
import { format } from 'date-fns';

const router = express.Router();

// Route to create a blog template
router.post('/', async (req, res) => {
    try {
        const blogTemplate = await createBlogTemplate(req.body);
        res.status(200).json(blogTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create blog template' });
    }
});

//Route to get all blog templates
router.get('/', async (req, res) => {
    try {
        const blogTemplates = await getAllBlogTemplates();
        res.status(200).json(blogTemplates);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog templates' });
    }
});


// Route to get a blog template by name
router.get('/:name', async (req, res) => {
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
router.get('/id/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const blogTemplate = await updateBlogTemplate(_id, req.body);
        res.status(200).json(blogTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update blog template' });
    }
});

// Route to delete a blog template by id
router.delete('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await deleteBlogTemplate(_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete blog template' });
    }
});

export default router;