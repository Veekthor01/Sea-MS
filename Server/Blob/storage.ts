import { Storage } from '@google-cloud/storage';
import processUpload from './upload';
import { format } from 'util';
import { storeImageInDB } from '../Images/image';
import dotenv from 'dotenv';
dotenv.config();

const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME;
const googleCloudKey = process.env.GOOGLE_CLOUD_KEY;

// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: googleCloudKey });

// upload file
export async function uploadFileToStorage(req: any, res: any) {
    try {
        await processUpload(req, res);
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        // Create a new blob in the bucket and upload the file data.
        if (!googleCloudKey || !bucketName) {
            throw new Error('Environment variables are not set');
        }
        const blob = storage.bucket(bucketName).file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });
        blobStream.on('error', (err: any) => {
            console.log(err);
            res.status(500).json({ message: err });
            return;
        });
        blobStream.on('finish', async () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
                `https://storage.googleapis.com/${bucketName}/${blob.name}`
            );
            console.log('Public URL:', publicUrl);
            // Store the publicUrl in the database
            const updatedImage = await storeImageInDB(publicUrl);
            res.status(200).json(updatedImage);
            return;
        });
        blobStream.end(req.file.buffer);
    } catch (err: any) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ message: 'File size is too large. Max limit is 2MB' });
            return;
        }
        console.log(err);
        res.status(500).json({ message: err });
    }
}