import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../types';

export const auth = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as { id: string; role: string };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// export const adminOnly = (req: IAuthRequest, res: Response, next: NextFunction) => {
//   if (req.user?.role !== 'admin') {
//     return res.status(403).json({ message: 'Admin access required' });
//   }
//   next();
// };
