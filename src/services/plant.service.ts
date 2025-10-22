import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { NewPlantDetails } from '../types';

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
}
