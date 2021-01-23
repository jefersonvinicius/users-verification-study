import LoginController from '@app/controllers/LoginController';
import SignupController from '@app/controllers/SignupController';
import { Router } from 'express';

const authRoutes = Router();

const loginController = new LoginController();
const signupController = new SignupController();

authRoutes.post('/auth/signup', signupController.validations, signupController.handle);
authRoutes.post('/auth/login', loginController.handle);

export default authRoutes;
