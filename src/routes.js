import { Router } from 'express';

// controllers
import ProfileController from './app/controllers/ProfileController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Profile
routes.get('/getprofiles', ProfileController.list);
routes.post('/setprofiles', ProfileController.store);

// Users
routes.get('/getusers', UserController.list);
routes.post('/setusers', UserController.store);
// routes.put('/users', UserController.update);

// Token
routes.post('/refreshtoken', SessionController.store);

export default routes;
