import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export class AuthController {
  static register: RequestHandler = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ message: 'Registration failed' });
    }
  }

  static login: RequestHandler = async (req, res): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ message: 'Login failed' });
    }
  }
}
