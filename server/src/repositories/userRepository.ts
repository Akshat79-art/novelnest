import { database } from '../index';
import * as schema from '../../db/schema';
import { eq } from 'drizzle-orm';

const db = database;
const users = schema.users;

const registerUser = async (userData: typeof users.$inferInsert) => {
    const [userRow] = await db.insert(users).values(userData).returning();
    return userRow;
}

const findUserByEmail = async (email: string) => {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user;
}

export const userRepository = {
    registerUser,
    findUserByEmail
}