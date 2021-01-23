import LoginController from '@app/controllers/LoginController';
import SignupController from '@app/controllers/SignupController';
import { Router } from 'express';

const authRouter = Router();

const loginController = new LoginController();
const signupController = new SignupController();

authRouter.post('/auth/signup', signupController.validations, signupController.handle);
authRouter.post('/auth/login', loginController.handle);

export default authRouter;
