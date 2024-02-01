import express from 'express';
import { ObjectId } from 'mongodb';
import { createPortfolioTemplate, getPortfolioTemplateByName, getPortfolioTemplateById, updatePortfolioTemplate, deletePortfolioTemplate } from '../Template/portfolioTemplate';

const router = express.Router();

// Route to create a portfolio template
router.post('/', async (req, res) => {
    try {
        const portfolioTemplate = await createPortfolioTemplate(req.body);
        res.status(200).json(portfolioTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create portfolio template' });
    }
});

// Route to get a portfolio template by name
router.get('/:name', async (req, res) => {
    try {
        const portfolioTemplate = await getPortfolioTemplateByName(req.params.name);
        res.status(200).json(portfolioTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve portfolio template' });
    }
});

// Route to get a portfolio template by id
router.get('/id/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const portfolioTemplate = await getPortfolioTemplateById(_id);
        res.status(200).json(portfolioTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve portfolio template' });
    }
});

// Route to update a portfolio template by id
router.put('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const portfolioTemplate = await updatePortfolioTemplate(_id, req.body);
        res.status(200).json(portfolioTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update portfolio template' });
    }
});

// Route to delete a portfolio template by id
router.delete('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await deletePortfolioTemplate(_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete portfolio template' });
    }
});

export default router;