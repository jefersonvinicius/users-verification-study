import { Router } from 'express';
import authRouter from './auth';
import mainRouter from './main';

const routes = Router();

routes.use(mainRouter);
routes.use(authRouter);

export default routes;
