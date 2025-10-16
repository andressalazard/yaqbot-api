import { Request, Response } from 'express';
// import { CreatePostDto } from '../dto/create-post.dto';
// import { ValidateDto } from '../middlewares/validate.middleware';
import { PostService } from '../services/post.service';

export class PostController {
  //GET
  static async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las publicaciones', error });
    }
  }

  static async getAllUserPosts(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Id del usuario es requerido' });
        return;
      }
      const posts = await PostService.getAllUserPosts(id);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las publicaciones del usuario', error });
    }
  }
  //POST
  // static async createPost(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     ValidateDto(CreatePostDto)(req, res, async () => {
  //       const { title, content, authorId } = req.body;
  //       const newPost = { title, content, authorId };
  //       const response = await PostService.createPost(newPost);
  //       res.status(201).json(response);
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: 'Error interno del servidor',
  //       error: error instanceof Error ? error.message : 'Error desconocido',
  //     });
  //   }
  // }

  //UPDATE

  //DELETE
}
