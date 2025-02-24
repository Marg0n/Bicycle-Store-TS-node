import { Router } from 'express';
import userRouter from '../modules/users/user.router';
import orderRouter from '../modules/orders/order.router';
import productRouter from '../modules/products/product.router';
import authRouter from '../modules/auth/auth.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/products',
    route: productRouter,
  },
  {
    path: '/orders',
    route: orderRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
