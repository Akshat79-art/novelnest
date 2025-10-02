import { database } from '../db';
import * as schema from '../../db/schema';
import { user, account } from '../../auth-schema';
import { eq } from 'drizzle-orm';
import { CreateUserProfileDTO } from '../types/user';

const db = database;
const users = user;
const userProfile = schema.userProfiles;

const createUserProfile = async (profileData: CreateUserProfileDTO) => {
    const [userRow] = await db.insert(userProfile).values(profileData).returning();
    return userRow;
}

const findUserProfileByUserId = async (id: string) => {
    const user = await db.select().from(userProfile).where(eq(userProfile.userId, id));
    return user;
}

const findUserByEmail = async (email: string) => {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user;
}

export const userRepository = {
    createUserProfile,
    findUserProfileByUserId,
    findUserByEmail,
}