import { z } from 'zod';

export const CreatePostDto = z.object({
  id: z.string().uuid(),
  title: z.string().max(100),
  content: z.string().max(255),
  authorId: z.string().uuid(),
});

export type CreatePostDto = z.infer<typeof CreatePostDto>;
