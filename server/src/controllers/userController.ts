import { Request, Response } from 'express';
import { userService } from "../services/userService";
import { CreateUserProfileDTO } from '../types/user';

const registerUserController = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const result = await userService.registerUserService({email, password, name});
      res.status(201).json({
        message: 'User registered successfully',
        user: result
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(400).json({ message: error.message || 'Registration failed' });
    }
}

const createProfileController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id || '';
        const { phone, location } = req.body;
        const userProfileData: CreateUserProfileDTO = { userId, phone, location};
        const userProfile = userService.createUserProfileService(userProfileData);

        res.status(201).json({
            message: 'User profile created successfully',
            profile: userProfile
        });
  } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message || 'Registration failed' });
  }
}

export const userController = {
  registerUserController,
  createProfileController
};