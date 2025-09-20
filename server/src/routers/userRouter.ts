import { Router } from "express";
import { userController } from "../controllers/userController";

const userRouter = Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login');
userRouter.get('/me');

export default userRouter;