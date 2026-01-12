import dotenv from 'dotenv';
import path from 'path';

const filePath = path.join(process.cwd(), 'config/.env');


dotenv.config({ path: filePath });

export const MONGO_URL = process.env.MONGO_URL;
export const PORT = process.env.PORT;