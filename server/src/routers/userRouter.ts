import { Router } from "express";
import { userController } from "../controllers/userController";
import { requireAuth } from "../lib/middleware";

const userRouter = Router();

userRouter.post('/register', userController.registerUserController);
userRouter.post('/login');
// userRouter.get('/me', requireAuth, userController.getProfile);
// userRouter.put('/me', requireAuth, userController.updateProfile);
// userRouter.delete('/me', requireAuth, userController.deleteProfile);
// userRouter.post('/me/complete', requireAuth, userController.getProfile);
// userRouter.get('/:userId/public', requireAuth, userController.getPubllicProfile);
// userRouter.get('/check-completion', requireAuth, userController.getProfile);

export default userRouter;