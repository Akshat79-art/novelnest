import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import * as schema from '../../../src/db/schema';
import * as dotenv from 'dotenv';
import { userRepository } from '../repositories/userRepository';

dotenv.config();
const users = schema.users;
const JWT_SECRET = process.env.JWT_SECRET!;

const registerUser = async(userData: typeof users.$inferInsert) => {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await userRepository.registerUser({
      ...userData,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

    const { password, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword, token };
}

export const userService = {
    registerUser
};