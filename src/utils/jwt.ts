import jwt from 'jsonwebtoken';

export const generateToken = (payload: object, expiresIn: string | number = '1d') => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn } as any);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
