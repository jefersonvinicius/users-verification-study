import { Router } from 'express';
import authRouter from './auth';
import mainRouter from './main';

const routes = Router();

routes.use(authRouter);
routes.use(mainRouter);

export default routes;
