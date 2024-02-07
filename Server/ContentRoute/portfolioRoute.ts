import express from 'express';
import { ObjectId } from 'mongodb';
import { getPortfolioTemplateByName, saveUserPortfolio, getUserPortfolioById, getUserPortfolioByName, 
    getAllUserPortfolios,
updateUserPortfolio, deleteUserPortfolio } from '../Template/portfolioTemplate';
//import { createPortfolio, getPortfolioByName, getPortfolioById, getAllPortfolios, updatePortfolio, deletePortfolio } from '../Content/portfolio';

const router = express.Router();

// Route to create a portfolio from a template
router.post('/', async (req, res) => {
    try {
        const templateName = req.body.templateName;
        // Get the template
        const template = await getPortfolioTemplateByName(templateName);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        // Check if the user already has a portfolio with the same name
        const existingUserPortfolio = await getUserPortfolioByName(template.name!);
        if (existingUserPortfolio) {
            return res.status(400).json({ message: 'User portfolio already exists' });
        }
        // Create a new portfolio for the user that is a copy of the template
        const userPortfolio = {
            _id: new ObjectId(),
            name: template.name,
            author: template.author,
            about: template.about,
            technologies: template.technologies,
            projects: template.projects,
        };
        // Save the user portfolio to the database
        const savedUserPortfolio = await saveUserPortfolio(userPortfolio);
        res.status(200).json(savedUserPortfolio);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create user portfolio' });
    }
});

// Route to get a portfolio by name
router.get('/:name', async (req, res) => {
    try {
        const portfolio = await getUserPortfolioByName(req.params.name);
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve portfolio' });
    }
});

// Route to get a portfolio by id
router.get('/id/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const portfolio = await getUserPortfolioById(_id);
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve portfolio' });
    }
});

// Route to get all portfolios
router.get('/', async (req, res) => {
    try {
        const portfolios = await getAllUserPortfolios();
        res.status(200).json(portfolios);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve portfolio' });
    }
});

// Route to update a portfolio by id
router.put('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const portfolio = await updateUserPortfolio(_id, req.body);
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update portfolio' });
    }
});

// Route to delete a portfolio by id
router.delete('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await deleteUserPortfolio(_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete portfolio' });
    }
});



/* Route to create a portfolio
router.post('/', async (req, res) => {
    try {
        const portfolio = await createPortfolio(req.body);
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create portfolio' });
    }
});

// Route to get a portfolio by name
router.get('/:name', async (req, res) => {
    try {
        const portfolio = await getPortfolioByName(req.params.name);
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve portfolio' });
    }
});

// Route to get a portfolio by id
router.get('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const portfolio = await getPortfolioById(_id);
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve portfolio' });
    }
});

// Route to get all portfolios
router.get('/', async (req, res) => {
    try {
        const portfolios = await getAllPortfolios();
        res.status(200).json(portfolios);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve portfolio' });
    }
});

// Route to update a portfolio by id
router.put('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const portfolio = await updatePortfolio(_id, req.body);
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update portfolio' });
    }
});

// Route to delete a portfolio by id
router.delete('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await deletePortfolio(_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete portfolio' });
    }
}); */

export default router;
