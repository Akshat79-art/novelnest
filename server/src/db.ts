import * as schema from '../db/schema';
import * as dotenv from 'dotenv';
import { drizzle } from "drizzle-orm/neon-http";

dotenv.config();
const db = drizzle(process.env.DATABASE_URL!, {schema});
export const database = db;