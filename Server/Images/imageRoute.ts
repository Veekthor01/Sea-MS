import express from 'express';
import { uploadFileToStorage } from '../Blob/storage';
import { getListFiles, downloadFile, deleteFileFromStorage } from '../Blob/fileController';
import { getImageFromDB, deleteImageFromDB  } from './image';

const router = express.Router();

//Route to upload file
router.post('/', async (req, res) => {
    try {
        await uploadFileToStorage(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Failed to upload image' });
    }
});

// Route to get list of files
 router.get('/', async (req, res) => {
        try {
            const images = await getListFiles(req, res);
            res.status(200).json(images);
        } catch (err) {
            res.status(500).json({ message: 'Failed to get list of images' });
        }
    });

// Route to download a file
router.get('/:name', async (req, res) => {
    try {
        await downloadFile(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Failed to download image' });
    }
});

// Route to delete a file
router.delete('/:id', async (req, res) => {
    try {
        const image = await getImageFromDB(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        await deleteFileFromStorage(image.publicUrl);
        await deleteImageFromDB(req.params.id);
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete image' });
    }
});

export default router;