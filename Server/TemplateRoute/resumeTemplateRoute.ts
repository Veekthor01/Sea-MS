import express from 'express';
import { ObjectId } from 'mongodb';
import { createResumeTemplate, getAllResumeTemplates, getResumeTemplateByName, getResumeTemplateById, updateResumeTemplate, deleteResumeTemplate } from '../Template/resumeTemplate';
import authenticateJWT from '../Passport-Config/auth';
const router = express.Router();

// Route to create a resume template
router.post('/', authenticateJWT, async (req, res) => {
    try {
        const resumeTemplate = await createResumeTemplate(req.body);
        res.status(200).json(resumeTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create resume template' });
    }
});

//Route to get all resume templates
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const resumeTemplates = await getAllResumeTemplates();
        res.status(200).json(resumeTemplates);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve resume templates' });
    }
});

// Route to get a resume template by name
router.get('/:name', authenticateJWT, async (req, res) => {
    try {
        const resumeTemplate = await getResumeTemplateByName(req.params.name);
        res.status(200).json(resumeTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve resume template' });
    }
});

// Route to get a resume template by id
router.get('/id/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const resumeTemplate = await getResumeTemplateById(_id);
        res.status(200).json(resumeTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve resume template' });
    }
});

// Route to update a resume template by id
router.put('/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const resumeTemplate = await updateResumeTemplate(_id, req.body);
        res.status(200).json(resumeTemplate);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update resume template' });
    }
});

// Route to delete a resume template by id
router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await deleteResumeTemplate(_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete resume template' });
    }
});

export default router;