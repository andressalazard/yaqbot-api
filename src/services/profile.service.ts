import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { RegisterProfileData, UpdateProfileData } from '../types';

export class ProfileService {
  //PROFILE
  //GET
  static async getUserProfileById(userId: string) {
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        fullname: true,
        phone: true,
        region: true,
        address: true,
        birthday: true,
        gender: true,
        avatar: true,
        bio: true,
        gardernerLevel: true,
        socialLinks: true,
        createdAt: true,
      },
    });
    return profile;
  }

  //POST
  static async createProfile(userId: string, data: RegisterProfileData) {
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!existingUser) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const existingProfile = await prisma.userProfile.findUnique({ where: { userId } });
    if (existingProfile) {
      throw new AppError('El usuario ya tiene un perfil creado', 404);
    }

    console.log(data);
    const { fullname, phone, region, address, birthday, gender, avatar, bio, gardernerLevel, socialLinks } = data;

    return await prisma.userProfile.create({
      data: {
        user: {
          connect: { id: userId },
        },
        fullname: fullname,
        phone: phone ?? null,
        region: region ?? null,
        address: address ?? null,
        birthday: birthday ? new Date(birthday) : null,
        gender: gender ?? null,
        avatar: avatar ?? null,
        bio: bio ?? null,
        gardernerLevel: gardernerLevel,
        socialLinks: {
          create: (socialLinks ?? []).map((link) => ({
            name: link.name ?? '',
            url: link.url ?? '',
            username: link.username ?? '',
          })),
        },
      },
    });
  }

  //PATCH
  static async updateProfile(userid: string, data: UpdateProfileData) {
    const existingUser = await prisma.user.findUnique({ where: { id: userid } });

    if (!existingUser) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return await prisma.userProfile.update({
      where: { userId: userid },
      data,
      select: {
        id: true,
        fullname: true,
      },
    });
  }
}
