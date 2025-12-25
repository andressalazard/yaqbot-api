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

  static async deleteOrder(req: Request, res: Response) {
    console.log('Entered deleteOrder method');
    const orderId = req.params.id;
    console.log('Deleting order with ID:', orderId);

    try {
      //console.log('Enter in try block');
      if (orderId === undefined) {
        return res.status(400).json({ message: 'Order ID is required' });
      }
      // Assuming there's a deleteOrder method in OrderService
      const resp = await OrderService.deleteOrder(orderId);
      res.json(resp);
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateOrderStatus(req: Request, res: Response) {
    const orderId = req.params.id;
    const { status } = req.body;
    try {
      if (orderId === undefined) {
        return res.status(400).json({ message: 'Order ID is required' });
      }
      // Assuming there's an updateOrderStatus method in OrderService
      const updatedOrder = await OrderService.updateOrderStatus(orderId, status);
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getOrdersByStatus(req: Request, res: Response) {
    console.log('Fetching orders by status');
    const status = req.params.status;
    console.log('Status parameter:', status);
    try {
      if (status === undefined) {
        return res.status(400).json({ message: 'Status is required' });
      }
      const orders = await OrderService.getOrdersByStatus(status as any);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
