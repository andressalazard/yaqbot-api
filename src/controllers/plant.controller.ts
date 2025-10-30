import { Request, Response } from 'express';
import { PlantService } from '../services/plant.service';
import { ValidateDto } from '../middlewares/validate.middleware';
import { NewPlantDetailsDTO } from '../dto/new-plant-details.dto';
import { NewPlantOwnershipDTO } from '../dto/new-plant-ownership.dto';

export class PlantController {
  /*GET*/
  static async getAllPlants(req: Request, res: Response) {
    try {
      const plants = await PlantService.getAllPlants();
      res.json(plants);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener plantas' });
    }
  }

  static async getPlantsCatalog(req: Request, res: Response) {
    try {
      const plants = await PlantService.getPlantsCatalog();
      res.json(plants);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las plantas' });
    }
  }

  /*POST*/
  static async registerPlantDetails(req: Request, res: Response) {
    try {
      ValidateDto(NewPlantDetailsDTO)(req, res, async () => {
        const productId = req.params.productid;
        if (!productId) {
          res.status(400).json({ message: 'El Id de la planta es necesario' });
        }

        if (productId === undefined) return;
        const plantsData = req.body;
        const response = await PlantService.registerPlantDetails(productId, plantsData);
        res.json(response);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar los detalles de la planta' });
    }
  }

  static async createNewPlantOwnership(req: Request, res: Response) {
    try {
      //ValidateDto(NewPlantOwnershipDTO)(req, res, async () => {
      const plantRegister = req.body;
      if (!plantRegister) {
        res
          .status(400)
          .json({ message: 'Los datos del registro de la planta del usuario son obligatorios' });
        return;
      }

      const response = await PlantService.registerNewPlantOwnership(plantRegister);
      res.json(response);
      //});
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar la planta del usuario' });
    }
  }
}
