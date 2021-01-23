import HomeController from '@app/controllers/HomeController';
import { Router } from 'express';
import { checkJWTToken } from '@app/middlewares/auth';

const mainRouter = Router();

const homeController = new HomeController();

// mainRouter.use();
mainRouter.get('/home', checkJWTToken, homeController.handle);

export default mainRouter;
