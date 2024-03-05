import express from 'express';
import { ObjectId } from 'mongodb';
import { format } from 'date-fns';
import { getBlogTemplateByName, saveUserBlog, getUserBlogByUserId, getUserBlogByName, getUserBlogById, getAllUserBlogs, updateUserBlog, deleteUserBlog } from '../Template/blogTemplate';
import authenticateJWT from '../Passport-Config/auth';

const router = express.Router();

// Route to create a blog from a template
router.post('/', authenticateJWT, async (req, res) => {
    try {
        const templateName = req.body.templateName;
        const userId = req.user
        // Get the template
        const template = await getBlogTemplateByName(templateName);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        // Check if the user already has a blog with the same name
        const existingUserBlogs = userId ? await getUserBlogByUserId(userId.toString()) : null;
        if (existingUserBlogs && existingUserBlogs.some(blog => blog.name === template.name)) {
            return res.status(400).json({ message: 'User blog already exists' });
        }
        // Create a new blog for the user that is a copy of the template
        const userBlog = {
            _id: new ObjectId(),
            name: template.name,
            title: template.title,
            content: template.content,
            author: template.author,
            userId: userId, // Add the user ID to the blog
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        // Save the user blog to the database
        const savedUserBlog = await saveUserBlog(userBlog);
        res.status(200).json(savedUserBlog);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create user blog' });
    }
});

// Route to get a blog by User ID
router.get('/user', authenticateJWT, async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User ID is required' });
        } else {
            const userId = req.user
            const blog = await getUserBlogByUserId(userId.toString());
            res.status(200).json(blog);
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog post' });
    }
});

// Route to get a blog by name
router.get('/:name', authenticateJWT, async (req, res) => {
    try {
        const blog = await getUserBlogByName(req.params.name);
        if (blog) {
            if (blog.createdAt && blog.updatedAt) {
                const createdAt = new Date(blog.createdAt);
                const updatedAt = new Date(blog.updatedAt);
                const displayDate = createdAt.getTime() === updatedAt.getTime() ? createdAt : updatedAt;
                const formattedDisplayDate = format(displayDate, 'dd MMM yyyy');
                console.log('Display date:', formattedDisplayDate);
            }
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog post' });
    }
});

// Route to get a blog by id
router.get('/id/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const blog = await getUserBlogById(_id);
        if (blog) {
            if (blog.createdAt && blog.updatedAt) {
                const createdAt = new Date(blog.createdAt);
                const updatedAt = new Date(blog.updatedAt);
                const displayDate = createdAt.getTime() === updatedAt.getTime() ? createdAt : updatedAt;
                const formattedDisplayDate = format(displayDate, 'dd MMM yyyy');
                console.log('Display date:', formattedDisplayDate);
            }
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog post' });
    }
});

// Route to get all blogs
router.get('/',  async (req, res) => {
    try {
        const blogs = await getAllUserBlogs();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog post' });
    }
});

// Route to update a blog by id
router.put('/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const blog = await updateUserBlog(_id, req.body);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update blog post'});
    }
});

// Route to delete a blog by id
router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await deleteUserBlog(_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete blog post'});
    }
});

export default router;