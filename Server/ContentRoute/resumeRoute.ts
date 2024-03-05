import express from 'express';
import { ObjectId } from 'mongodb';
import { getResumeTemplateByName, saveUserResume, getUserResumeByUserId, getUserResumeByName, getUserResumeById, getAllUserResumes, updateUserResume, deleteUserResume } from '../Template/resumeTemplate';
import authenticateJWT from '../Passport-Config/auth';

const router = express.Router();

// Route to create a resume from a template
router.post('/', authenticateJWT, async (req, res) => {
    try {
        const templateName = req.body.templateName;
        const userId = req.user;
        // Get the template
        const template = await getResumeTemplateByName(templateName);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        // Check if the user already has a resume with the same name
        const existingUserResume = userId ? await getUserResumeByUserId(userId.toString()) : null;
        if (existingUserResume && existingUserResume.some(resume => resume.name === template.name)) {
            return res.status(400).json({ message: 'User resume already exists' });
        }
        // Create a new resume for the user that is a copy of the template
        const userResume = {
            _id: new ObjectId(),
            name: template.name,
            author: template.author,
            email: template.email,
            phone: template.phone,
            WorkExperience: template.WorkExperience,
            Education: template.Education,
            certifications: template.certifications,
            skills: template.skills,
            userId: userId, // Add the user ID to the resume
        };
        // Save the user resume to the database
        const savedUserResume = await saveUserResume(userResume);
        res.status(200).json(savedUserResume);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create user resume' });
    }
});

// Route to get a resume by User ID
router.get('/user', authenticateJWT, async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User ID is required' });
        } else {
            const userId = req.user;
            const resume = await getUserResumeByUserId(userId.toString());
            res.status(200).json(resume);
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve resume' });
    }
});

// Route to get a resume by name
router.get('/:name', authenticateJWT, async (req, res) => {
    try {
        const resume = await getUserResumeByName(req.params.name);
        res.status(200).json(resume);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve resume' });
    }
});

// Route to get a resume by id
router.get('/id/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const resume = await getUserResumeById(_id);
        res.status(200).json(resume);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve resume' });
    }
});

// Route to get all resumes
router.get('/', async (req, res) => {
    try {
        const resumes = await getAllUserResumes();
        res.status(200).json(resumes);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve resume' });
    }
});

// Route to update a resume by id
router.put('/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const resume = await updateUserResume(_id, req.body);
        res.status(200).json(resume);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update resume' });
    }
});

// Route to delete a resume by id
router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await deleteUserResume(_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete resume' });
    }
});

export default router;