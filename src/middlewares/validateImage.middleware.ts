import { Request, Response, NextFunction } from 'express';
import { ImageDTO } from '../dto/valid-image.dto';
import { ZodError } from 'zod';
import sharp from 'sharp';

export const validateImage = async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No se proporcionó ningún archivo' });
  }

  try {
    ImageDTO.parse({
      mimetype: file.mimetype,
      size: file.size,
      originalname: file.originalname,
    });

    const image = sharp(file.path);
    const metadata = await image.metadata();

    if (metadata.width !== metadata.height) {
      return res.status(400).json({ message: 'La imagen debe ser cuadrada' });
    }

    if (metadata.width < 200 || metadata.height < 200) {
      return res.status(400).json({ message: 'La imagen debe tener al menos 200x200 pixeles' });
    }

    if (metadata.hasAlpha) {
      return res.status(400).json({ message: 'La imagen no debe tener fondo transparente' });
    }

    if (metadata.width !== metadata.height) {
      await cropImageToSquare(file);
    }

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
      }));

      return res.status(400).json({ message: 'Archivo invalido.', errors: errorMessages });
    }
    return res.status(500).json({ message: 'Error interno al validar el archivo.' });
  }
};

const cropImageToSquare = async (file: Express.Multer.File) => {
  const image = sharp(file.path);
  const metadata = await image.metadata();
  const size = Math.min(metadata.width || 0, metadata.height || 0);
  return image.extract({ left: 0, top: 0, width: size, height: size }).resize(400, 400).toFile(file.path);
};
