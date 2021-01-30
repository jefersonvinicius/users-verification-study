import ActiveUserByEmailController from '@app/controllers/ActiveUserByEmailController';
import LoginController from '@app/controllers/LoginController';
import SignupController from '@app/controllers/SignupController';
import { Router } from 'express';

const authRouter = Router();

const loginController = new LoginController();
const signupController = new SignupController();
const activeUserController = new ActiveUserByEmailController();

authRouter.post('/auth/signup', signupController.validations, signupController.handle);
authRouter.post('/auth/login', loginController.handle);
authRouter.get('/active/:userId/user', activeUserController.handle);

export default authRouter;
