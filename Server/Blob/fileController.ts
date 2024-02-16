import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';
dotenv.config();

const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME;
const googleCloudKey = process.env.GOOGLE_CLOUD_KEY;

// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: googleCloudKey });

// Get list of files/images from the storage
const getListFiles = async (req: any, res: any) => {
    try {
        if (!googleCloudKey || !bucketName) {
            throw new Error('Environment variables are not set');
        }
    const [files] = await storage.bucket(bucketName).getFiles();
    let fileInfos: any = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file.name,
        url: file.metadata.mediaLink,
      });
    });
    res.status(200).send(fileInfos);
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

// Download a file from the storage
const downloadFile = async (req: any, res: any) => {
    try {
        if (!googleCloudKey || !bucketName) {
            throw new Error('Environment variables are not set');
        }
        const fileName = req.params.name;
        const file = storage.bucket(bucketName).file(fileName);
        const [metadata] = await file.getMetadata();
        res.redirect(metadata.mediaLink);
    
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ message:'Could not download the file.', error: err});
    }
}

// Delete a file from the storage
const deleteFileFromStorage = async (publicUrl: string) => {
    try {
        if (!googleCloudKey || !bucketName) {
            throw new Error('Environment variables are not set');
        }
        const fileName = publicUrl.split('/').pop();
        if (!fileName) {
            throw new Error('File name not found');
        }
        await storage.bucket(bucketName).file(fileName).delete();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export { getListFiles, downloadFile, deleteFileFromStorage};