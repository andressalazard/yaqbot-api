import { CreatePostDto } from '../dto/create-post.dto';
import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';

export class PostService {
  static async getAllPosts() {
    return await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  static async getAllUserPosts(id: string) {
    const posts = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!posts) {
      throw new AppError('Posts not found!', 404);
    }
  }

  static async createPost({ title, content, authorId }: CreatePostDto) {
    const body = { title, content, authorId };
    const post = await prisma.post.create({
      data: {
        ...body,
      },
    });
    return post;
  }
}
