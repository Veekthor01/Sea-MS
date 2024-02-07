import express from 'express';
import { ObjectId } from 'mongodb';
import { format } from 'date-fns';
//import { createBlog, getBlogByName,  getBlogById ,getAllBlogs ,updateBlog, deleteBlog } from '../Content/blog';
import { getBlogTemplateByName, saveUserBlog, getUserBlogByName, getUserBlogById, getAllUserBlogs, updateUserBlog, deleteUserBlog } from '../Template/blogTemplate';
const router = express.Router();

// Route to create a blog from a template
router.post('/', async (req, res) => {
    try {
        const templateName = req.body.templateName;
        // Get the template
        const template = await getBlogTemplateByName(templateName);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        // Check if the user already has a blog with the same name
        const existingUserBlog = await getUserBlogByName(template.name!);
        if (existingUserBlog) {
            return res.status(400).json({ message: 'User blog already exists' });
        }
        // Create a new blog for the user that is a copy of the template
        const userBlog = {
            _id: new ObjectId(),
            name: template.name,
            title: template.title,
            content: template.content,
            author: template.author,
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

// Route to get a blog by name
router.get('/:name', async (req, res) => {
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
router.get('/id/:id', async (req, res) => {
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
router.get('/', async (req, res) => {
    try {
        const blogs = await getAllUserBlogs();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog post' });
    }
});

// Route to update a blog by id
router.put('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const blog = await updateUserBlog(_id, req.body);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update blog post'});
    }
});

// Route to delete a blog by id
router.delete('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await deleteUserBlog(_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete blog post'});
    }
});

export default router;

/* Route to create a blog
router.post('/', async (req, res) => {
    try {
        const blog = await createBlog(req.body);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create blog' });
    }
});

// Route to get a blog by name 
router.get('/:name', async (req, res) => {
    try {
        const blog = await getBlogByName(req.params.name);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog post' });
    }
});

// Route to get a blog by id
router.get('/:id', async (req, res) => {
    try {
    const _id = new ObjectId(req.params.id);
    const blog = await getBlogById(_id);
    if (blog) {
        if (blog.createdAt && blog.updatedAt) {
        const displayDate = blog.createdAt.getTime() === blog.updatedAt.getTime() ? blog.createdAt : blog.updatedAt;
        console.log('Display date:', displayDate);
    }}
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message:'Failed to retrieve blog post' });
    }
});

// Route to get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await getAllBlogs();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog post' });
    }
});

// Route to update a blog by id
router.put('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const blog = await updateBlog(_id, req.body);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update blog post'});
    }
});

// Route to delete a blog by id
router.delete('/:id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await deleteBlog(_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete blog post'});
    }
});

export default router; */