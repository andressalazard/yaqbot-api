import dbpool from '../database/postgresql.database';
import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { UpdatedUserData } from '../types';

export class UserService {
  //GET
  static async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  static async getPublicUsers() {
    return await prisma.user.findMany({
      select: {
        name: true,
      },
    });
  }

  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: {
          select: {
            avatar: true,
            firstname: true,
            lastname: true,
          },
        },
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

    return await prisma.user.update({
      where: { id },
      data, //only updates provided fields
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
