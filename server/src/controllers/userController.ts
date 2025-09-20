import { Request, Response } from 'express';
import { userService } from "../services/userService";

const registerUser = async (req: Request, res: Response) => {
    try {
      const { user, token } = await userService.registerUser(req.body);
      res.status(201).json({ user, token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
}

export const userController = {
    registerUser
};