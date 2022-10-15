import express from 'express';
// import controller
import indexController from '../controllers/index';
import indexValidator from '../validators/index';

const router = express.Router();

router.route('/register')
  .post(indexValidator.auth_validator, indexController.authController.registerUser);

router.route('/login')
  .post(indexValidator.auth_validator, indexController.authController.loginUser);

export default router;
