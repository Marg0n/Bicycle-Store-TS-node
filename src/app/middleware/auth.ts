import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import HttpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import User from '../modules/users/user.model';

const auth = (requiredRole: string) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers.authorization;
    const secret = config.jwt_secret;

    if (!token || !secret) {
      res.status(!token ? HttpStatus.UNAUTHORIZED : HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: !token ? 'No token provided' : 'JWT secret is not defined',
      });
    }

    const decode = jwt.verify(token!, secret! ) as JwtPayload;

    const { email, role } = decode as { email: string, role: string };

    const user = await User.findOne({ email });

    if (!user) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'User not found',
      });
    }

    if(requiredRole !== role) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized user',
      });
    }

    req.user = decode as JwtPayload;

    next();
  });
};


export default auth;