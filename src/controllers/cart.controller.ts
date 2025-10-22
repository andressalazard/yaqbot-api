import { Request, Response } from "express";
import { UserService } from "../services/user.service";


export class CartController {
    /*GET*/
    static async getCart(req: Request, res: Response): Promise<void>{
        try{
            const {id} = req.params;
            if(!id){
                res.status(400).json({message: 'Id del usuario es requerido'});
                return;
            }
            const user = await UserService.getUserById(id);
            if(!user){
                res.status(404).json({message: 'Usuario no encontrado'});
                return;
            }

            const cart = await UserService.getUserCart(id);
            res.json(cart);
        }
    } 
}