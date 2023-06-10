import { diskStorage } from 'multer';
import { extname } from 'path';

export const MulterStorageConfig = diskStorage({
  destination: './uploads',
  filename(_req, file, callback) {
    callback(null, `${Date.now()}${extname(file.originalname)}`);
  },
});
