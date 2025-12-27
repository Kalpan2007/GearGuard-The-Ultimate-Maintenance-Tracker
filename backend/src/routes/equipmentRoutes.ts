import { Router } from 'express';
import * as equipmentController from '../controllers/equipmentController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Equipment CRUD
router.post('/', authorize('ADMIN', 'MANAGER'), equipmentController.createEquipment);
router.get('/', equipmentController.getAllEquipment);
router.get('/:id', equipmentController.getEquipmentById);
router.put('/:id', authorize('ADMIN', 'MANAGER'), equipmentController.updateEquipment);
router.delete('/:id', authorize('ADMIN'), equipmentController.deleteEquipment);

// Smart button: Get related requests
router.get('/:id/requests', equipmentController.getEquipmentRequests);
router.get('/:id/requests/count', equipmentController.getEquipmentRequestsCount);

export default router;
