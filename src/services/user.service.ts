import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { UpdatedUserData } from '../types';

export class UserService {
  //GET
  static async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
  }

  static async getPublicUsers() {
    return await prisma.user.findMany({
      select: {
        username: true,
      },
    });
  }

  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return user;
  }

  static async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return user;
  }

  static async getUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return user;
  }

  static async getPublicUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return user;
  }

  //UPDATE
  static async updateUser(id: string, data: UpdatedUserData) {
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new AppError('Usuario no encontrado', 404);
    }

    // Map 'role' string to Prisma Role enum if present
    const updateData: any = { ...data };
    if (updateData.role) {
      // Import Role enum from Prisma client

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { Role } = require('../prisma/generated/client'); // adjust path if needed
      updateData.role = Role[updateData.role as keyof typeof Role] || updateData.role;
    }

    return await prisma.user.update({
      where: { id },
      data: updateData, //only updates provided fields
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
  }

  //DELETE
  static async deleteUser(id: string) {
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new AppError('Usuario no encontrado', 404);
    }
    await prisma.user.delete({ where: { id } });
    return { message: 'Usuario eliminado con éxito' };
  }
}
