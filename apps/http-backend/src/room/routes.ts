import { Router } from 'express';
import RoomController from './controller.js';
import { authenticationMiddleware } from '../middleware/auth-middleware.js';
export const roomRouter: Router = Router();

const roomController = new RoomController();


roomRouter.post('/create', authenticationMiddleware, roomController.createRoom.bind(roomController));