import { Router } from 'express';
import AuthenticationController from './controller.js';
export const authRouter: Router = Router();

const authController = new AuthenticationController();

authRouter.post('/signup', authController.signUp.bind(authController));
authRouter.post('/signin', authController.signIn.bind(authController));

