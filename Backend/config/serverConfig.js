import dotenv from 'dotenv';
import path from 'path';

const filePath = path.join(process.cwd(), 'config/.env');


dotenv.config({ path: filePath });

export const MONGO_URL = process.env.MONGO_URL;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;
export const NOTI_SERVICE = process.env.NOTI_SERVICE;