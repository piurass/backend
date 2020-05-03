import { Router } from 'express';

// controllers
import ProfileController from './app/controllers/ProfileController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PatientController from './app/controllers/PatientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Profile
routes.get('/profiles', ProfileController.list);
routes.post('/profiles', ProfileController.store);

// Users
routes.get('/users', UserController.list);
routes.post('/users', UserController.store);
// routes.put('/users', UserController.update);

// Token
routes.post('/refreshtoken', SessionController.store);

// QrCode ID
// FIXME: Refatorar de forma mais segura assim que possivel
routes.get('/qrcode/patient/:id', PatientController.qrcodeId);

// valid token
routes.use(authMiddleware);

// QrCode
routes.get('/qrcode', PatientController.qrcode);

// Patient
routes.post('/patient', PatientController.store);
routes.get('/patient/:id', PatientController.listId);

export default routes;
