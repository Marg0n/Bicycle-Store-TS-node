import config from '../../config';
import { IUser } from '../users/user.interface';
import User from '../users/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// register a user
const register = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

// login a user
const login = async (payload: ILoginUser) => {

  const user = await User.findOne({
    email: payload.email,
  }).select('+password');

  if (!user) {
    throw new Error('User not found');
  }

  const userStatus = user?.isBlocked;
  if (userStatus) {
    throw new Error('User is blocked');
  }

  const userPassword = user?.password;
  const isPasswordMatch = await bcrypt.compare(payload?.password, userPassword);

  if (!isPasswordMatch) {
    throw new Error('Password does not match');
  }

  if (!config.jwt_secret) {
    throw new Error('JWT secret is not defined');
  }

  const token = jwt.sign(
    { email: user?.email, role: user?.role },
    config.jwt_secret,
    { expiresIn: '1d' },
  );

  // exclude the password field from the response
  const { password, ...verifiedUser } = user.toObject();

  const result = {
    token,
    user: verifiedUser,
  };

  return result;
};

export const authService = {
  register,
  login,
};
