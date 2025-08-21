import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const ValidateDto = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        return res.status(400).json({
          success: false,
          message: 'Errores de validación',
          errors: errorMessages,
        });
      }
      next(error);
    }
  };
};
