import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { NewPlantDetails, newUserPlantRecord } from '../types';

export class PlantService {
  static async getAllPlants() {
    return await prisma.product.findMany({
      where: {
        category: 'PLANT',
      },
      select: {
        id: true,
        name: true,
        plant: {
          select: {
            type: true,
            maxHeight: true,
            wateringMode: true,
            wateringFrequency: true,
            weather: true,
            specialCares: true,
          },
        },
      },
    });
  }

  static async getPlantsCatalog() {
    return await prisma.product.findMany({
      where: {
        category: 'PLANT',
      },
      select: {
        id: true,
        name: true,
        image: true,
        plant: {
          select: {
            type: true,
            weather: true,
          },
        },
      },
    });
  }

  static async registerPlantDetails(productId: string, newPlantDetails: NewPlantDetails) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new AppError('Producto no encontrado', 404);
    }

    const { name, type, maxHeight, wateringMode, wateringFrequency, weather, light, specialCares } =
      newPlantDetails;

    return await prisma.plant.create({
      data: {
        product: { connect: { id: productId } },
        name,
        type,
        maxHeight: maxHeight || null,
        wateringMode,
        wateringFrequency: wateringFrequency || null,
        weather,
        light,
        specialCares: specialCares || null,
      },
    });
  }

  static async registerNewPlantOwnership(newRecord: newUserPlantRecord) {
    const { userid, plant } = newRecord;

    const user = await prisma.user.findUnique({ where: { id: userid } });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const fetchedPlant = await prisma.plant.findUnique({ where: { id: plant.id } });

    if (!fetchedPlant) {
      throw new AppError('Planta no encontrada', 404);
    }

    return await prisma.plantOwner.create({
      data: {
        userId: userid,
        plantId: plant.id,
        nickname: plant.nickname,
        remindMeFlag: false,
      },
    });
  }
}
