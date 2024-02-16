import util from 'util';
import Multer from 'multer';

const maxSize = 2 * 1024 * 1024;

// Multer middleware to handle the file upload
let processFile = Multer({
    storage: Multer.memoryStorage(),
    limits: { fileSize: maxSize },
  }).single("file");

let processUpload = util.promisify(processFile);

export default processUpload;