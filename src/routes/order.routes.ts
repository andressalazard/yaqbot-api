import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const router = Router();

router.get('/:id', OrderController.getOrder);
router.get('/user/:userid', OrderController.getOrdersByUserId);

router.post('/', OrderController.createOrder);

export default router;
