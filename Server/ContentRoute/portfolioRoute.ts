import express from 'express';
import { ObjectId } from 'mongodb';
import { getPortfolioTemplateByName, saveUserPortfolio, getUserPortfolioById, getUserPortfolioByName, 
    getAllUserPortfolios, getUserPortfolioByUserId,
updateUserPortfolio, deleteUserPortfolio } from '../Template/portfolioTemplate';
import authenticateJWT from '../Passport-Config/auth';

const router = express.Router();

// Route to create a portfolio from a template
router.post('/', authenticateJWT, async (req, res) => {
    try {
        const templateName = req.body.templateName;
        const userId = req.user
        // Get the template
        const template = await getPortfolioTemplateByName(templateName);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        // Check if the user already has a portfolio with the same name
        const existingUserPortfolio = userId ? await getUserPortfolioByUserId(userId.toString()) : null;
        if (existingUserPortfolio && existingUserPortfolio.some(portfolio => portfolio.name === template.name)) {
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
            userId: userId, // Add the user ID to the portfolio
        };
        // Save the user portfolio to the database
        const savedUserPortfolio = await saveUserPortfolio(userPortfolio);
        res.status(200).json(savedUserPortfolio);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create user portfolio' });
    }
});

// Route to get a portfolio by User ID
router.get('/user', authenticateJWT, async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User ID is required' });
        } else {
        const userId = req.user
        const portfolio = await getUserPortfolioByUserId(userId.toString());
        res.status(200).json(portfolio);
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve portfolio' });
    }
});

// Route to get a portfolio by name
router.get('/:name', authenticateJWT, async (req, res) => {
    try {
        const portfolio = await getUserPortfolioByName(req.params.name);
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve portfolio' });
    }
});

// Route to get a portfolio by id
router.get('/id/:id', authenticateJWT, async (req, res) => {
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
router.put('/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const portfolio = await updateUserPortfolio(_id, req.body);
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update portfolio' });
    }
});

// Route to delete a portfolio by id
router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await deleteUserPortfolio(_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete portfolio' });
    }
});

export default router;