import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import { ValidateDto } from '../middlewares/validate.middleware';

export class OrderController {
  static async getOrder(req: Request, res: Response) {
    const orderId = req.params.id;
    try {
      if (orderId === undefined) {
        return res.status(400).json({ message: 'Order ID is required' });
      }
      const order = await OrderService.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getOrdersByUserId(req: Request, res: Response) {
    const userId = req.params.userid;
    try {
      if (userId === undefined) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      const orders = await OrderService.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createOrder(req: Request, res: Response) {
    const userId = req.body.id;
    const items = req.body.items; // Assuming items are sent in the request body

    try {
      const newOrder = await OrderService.createOrder(userId, items);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
