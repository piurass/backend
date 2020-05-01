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

// valid token
routes.use(authMiddleware);

// Patient
routes.post('/patient', PatientController.store);
routes.get('/patient/:id', PatientController.listId);

export default routes;
