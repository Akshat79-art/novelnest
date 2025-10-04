import { Request, Response, NextFunction } from "express";
import { auth } from "./auth";
import { userRepository } from "../repositories/userRepository";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                emailVerified: boolean;
            };
        }
    }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: req.headers as any,
        });

        if (!session?.user) {
            return res.status(401).json({ 
                error: 'Authentication required',
                code: 'UNAUTHORIZED' 
            });
        }

        // Attach user to request object
        req.user = session.user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ 
            error: 'Invalid authentication',
            code: 'INVALID_AUTH' 
        });
    }
};

export const requireCompleteProfile = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (userId) {
      const userProfile = await userRepository.findUserProfileByUserId(userId);

      if(!userProfile){
        next();
      }
      else{
        return res.status(409).json({
          error: 'PROFILE_EXISTS',
          message: 'User profile already exists. Use update endpoint instead.',
          redirectTo: '/profile'
        });
      }
    }
    else{
      return res.status(401).json({
        error: 'USER_NOT_FOUND',
        message: 'Invalid authentication. Please register/login again.',
        redirectTo: '/register'
      });
    }
    
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      message: 'Something went wrong while processing requireCompleteProfile middelware.'
    });
  }
}