import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { Role } from '@prisma/client';

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: Role;
}

export class AuthService {
  static async register(data: RegisterData) {
    const { username, email, password, role = Role.USER } = data;

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
        role,
      },
    });

    return {
      token: generateToken({ id: user.id, role: user.role }),
      userid: user.id,
    };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new AppError('Usuario No encontrado', 401);

    if (!(await bcrypt.compare(password, user.password))) throw new AppError('Contraseña Incorrecta', 401);

    return {
      token: generateToken({ username: user.username, role: user.role }),
      userid: user.id,
    };
  }
}
