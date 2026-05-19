import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { loginSchema, registerSchema, validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.get('/me', authenticate, AuthController.me);
router.post('/create-admin', authenticate, authorize('admin'), validate(registerSchema), AuthController.createAdmin);
router.get('/admins', authenticate, authorize('admin'), AuthController.getAdmins);

export default router;
