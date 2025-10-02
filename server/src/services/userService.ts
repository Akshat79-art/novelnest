import { user, account } from '../../auth-schema';
import * as schema from '../../db/schema';
import * as dotenv from 'dotenv';
import { userRepository } from '../repositories/userRepository';
import { auth } from '../lib/auth';
import { APIError } from "better-auth/api";
import { CreateUserProfileDTO } from '../types/user';

dotenv.config();
const users = user;

const registerUserService = async(userData: {
    email: string;
    password: string;
    name: string;
  }) => {

    try {
      // Remeber to add a callback url.
      const result = await auth.api.signUpEmail({
        body: {
          name: userData.name,
          email: userData.email,
          password: userData.password
        }
      });

      console.log(result);
      if (result.token == null) {
        throw new Error('Authentication failed');
      }

      return {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      };

    } catch (error) {
      if (error instanceof APIError) {
        console.error("Message:", error.message);
        console.error("Possible Cause:", error.cause || "Not in docs.");
      } else {
        console.error("This error does not generate from Better Auth's functionality.")
        console.error(error);
      }
    }
}

const createUserProfile = async (profileData: CreateUserProfileDTO) => {
    const existingProfile = await userRepository.findUserProfileByUserId(profileData.userId);
    if(existingProfile){
        throw new Error('User profile already exists');
    }

    const userProfile = await userRepository.createUserProfile(profileData);
    return userProfile;
}

export const userService = {
    registerUserService,
    createUserProfile
};