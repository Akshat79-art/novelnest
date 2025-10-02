import { Request, Response, NextFunction } from "express";
import { auth } from "./auth";

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

