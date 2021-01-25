import HomeController from '@app/controllers/HomeController';
import { Router } from 'express';
import { hasValidJWTToken } from '@app/middlewares/auth';

const mainRouter = Router();

const homeController = new HomeController();

mainRouter.get('/home', hasValidJWTToken, homeController.handle);

export default mainRouter;
