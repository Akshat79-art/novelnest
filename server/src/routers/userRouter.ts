import { Router } from "express";
import { userController } from "../controllers/userController";
import { requireAuth, requireCompleteProfile } from "../lib/middleware";

const userRouter = Router();

userRouter.post('/register', userController.registerUserController);
userRouter.post('/complete-profile', requireAuth, requireCompleteProfile, userController.createProfileController);
userRouter.post('/login', userController.signInController);
userRouter.post('/logout', userController.signOutController)
// userRouter.get('/me', requireAuth, userController.getProfile);
// userRouter.put('/me', requireAuth, userController.updateProfile);
// userRouter.delete('/me', requireAuth, userController.deleteProfile);
// userRouter.post('/me/complete', requireAuth, userController.getProfile);
// userRouter.get('/:userId/public', requireAuth, userController.getPubllicProfile);
// userRouter.get('/check-completion', requireAuth, userController.getProfile);

export default userRouter;