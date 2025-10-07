import { z } from 'zod';

const fileSizeLimit = 5 * 1024 * 1024; //5MB

export const ImageDTO = z.object({
  file: z
    .object({
      mimetype: z.enum(['image/jpeg', 'image/jpg', 'image/png']),
      size: z.number().max(fileSizeLimit),
      originalname: z.string().regex(/\.(jpg|jpeg|png)$/), //check extension
    })
    .refine((file) => file.size <= fileSizeLimit, {
      message: 'El archibvo debe ser menor a 5MB.',
    }),
});

export type ImageDTO = z.infer<typeof ImageDTO>;
