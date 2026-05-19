import { Router } from 'express';
import * as LeadsController from '../controllers/leads.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import {
  createLeadSchema,
  getLeadsQuerySchema,
  idParamSchema,
  updateLeadSchema,
  validate,
} from '../middlewares/validate.middleware.js';

const router = Router();

// Secure all leads routes with authentication middleware
router.use(authenticate);

// Leads management endpoints
router.get('/', validate(getLeadsQuerySchema), LeadsController.getLeads);
router.post('/', authorize('admin'), validate(createLeadSchema), LeadsController.createLead);
router.get('/export', authorize('admin'), validate(getLeadsQuerySchema), LeadsController.exportLeads);
router.get('/:id', validate(idParamSchema), LeadsController.getLeadById);
router.put('/:id', authorize('admin'), validate(updateLeadSchema), LeadsController.updateLead);
router.delete('/:id', authorize('admin'), validate(idParamSchema), LeadsController.deleteLead);

export default router;
