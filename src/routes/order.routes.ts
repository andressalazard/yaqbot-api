import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const router = Router();

router.get('/:id', OrderController.getOrder);
router.get('/user/:userid', OrderController.getOrdersByUserId);
router.delete('/:id', OrderController.deleteOrder);
router.put('/:id/status', OrderController.updateOrderStatus);
router.get('/', OrderController.getAllOrders);
router.get('/status/:status', OrderController.getOrdersByStatus);
router.post('/update-status/:id', OrderController.updateOrderStatus);
router.post('/', OrderController.createOrder);

export default router;
