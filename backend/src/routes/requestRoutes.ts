import { Router } from 'express';
import * as requestController from '../controllers/requestController';
import { authenticate } from '../middleware/auth';
import { validateTeamAccess } from '../middleware/teamAuth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Request CRUD
router.post('/', requestController.createRequest);
router.get('/', requestController.getAllRequests);
router.get('/kanban', requestController.getKanbanData);
router.get('/calendar', requestController.getCalendarRequests);
router.get('/overdue', requestController.getOverdueRequests);
router.get('/reports/pivot', requestController.getReportingData);
router.get('/:id', requestController.getRequestById);
router.put('/:id', validateTeamAccess, requestController.updateRequest);
router.delete('/:id', validateTeamAccess, requestController.deleteRequest);

// Workflow actions (require team access)
router.post('/:id/assign', validateTeamAccess, requestController.assignRequest);
router.post('/:id/start', validateTeamAccess, requestController.startRequest);
router.post('/:id/complete', validateTeamAccess, requestController.completeRequest);
router.post('/:id/scrap', validateTeamAccess, requestController.scrapRequest);

export default router;
