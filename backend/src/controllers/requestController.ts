import { Request, Response } from 'express';
import * as requestService from '../services/requestService';

/**
 * Create maintenance request
 */
export async function createRequest(req: Request, res: Response): Promise<void> {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const request = await requestService.createRequest({
            ...req.body,
            scheduledDate: req.body.scheduledDate ? new Date(req.body.scheduledDate) : undefined,
            createdById: req.user.id,
        });

        res.status(201).json({
            message: 'Maintenance request created successfully',
            request,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get all requests
 */
export async function getAllRequests(req: Request, res: Response): Promise<void> {
    try {
        const { status, requestType, teamId, assignedToId, equipmentId } = req.query;

        const requests = await requestService.getAllRequests({
            status: status as any,
            requestType: requestType as any,
            teamId: teamId as string,
            assignedToId: assignedToId as string,
            equipmentId: equipmentId as string,
        });

        res.status(200).json({ requests });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get request by ID
 */
export async function getRequestById(req: Request, res: Response): Promise<void> {
    try {
        const request = await requestService.getRequestById(req.params.id);

        res.status(200).json({ request });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
}

/**
 * Update request
 */
export async function updateRequest(req: Request, res: Response): Promise<void> {
    try {
        const request = await requestService.updateRequest(req.params.id, req.body);

        res.status(200).json({
            message: 'Request updated successfully',
            request,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Delete request
 */
export async function deleteRequest(req: Request, res: Response): Promise<void> {
    try {
        await requestService.deleteRequest(req.params.id);

        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Assign request to technician
 */
export async function assignRequest(req: Request, res: Response): Promise<void> {
    try {
        const { technicianId } = req.body;

        const request = await requestService.assignRequest(req.params.id, technicianId);

        res.status(200).json({
            message: 'Request assigned successfully',
            request,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Start request (NEW → IN_PROGRESS)
 */
export async function startRequest(req: Request, res: Response): Promise<void> {
    try {
        const request = await requestService.startRequest(req.params.id);

        res.status(200).json({
            message: 'Request started successfully',
            request,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Complete request (IN_PROGRESS → REPAIRED)
 */
export async function completeRequest(req: Request, res: Response): Promise<void> {
    try {
        const { durationHours, completionNotes } = req.body;

        const request = await requestService.completeRequest(req.params.id, durationHours, completionNotes);

        res.status(200).json({
            message: 'Request completed successfully',
            request,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Scrap request (IN_PROGRESS → SCRAP)
 */
export async function scrapRequest(req: Request, res: Response): Promise<void> {
    try {
        const { completionNotes } = req.body;
        const request = await requestService.scrapRequest(req.params.id, completionNotes);

        res.status(200).json({
            message: 'Request marked as scrap and equipment deactivated',
            request,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get Kanban board data
 */
export async function getKanbanData(req: Request, res: Response): Promise<void> {
    try {
        const kanban = await requestService.getKanbanData();

        res.status(200).json({ kanban });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get calendar requests
 */
export async function getCalendarRequests(req: Request, res: Response): Promise<void> {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            res.status(400).json({ error: 'startDate and endDate are required' });
            return;
        }

        const requests = await requestService.getCalendarRequests(
            new Date(startDate as string),
            new Date(endDate as string)
        );

        res.status(200).json({ requests });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get overdue requests
 */
export async function getOverdueRequests(req: Request, res: Response): Promise<void> {
    try {
        const requests = await requestService.getOverdueRequests();

        res.status(200).json({ requests });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get reporting data
 */
export async function getReportingData(req: Request, res: Response): Promise<void> {
    try {
        const data = await requestService.getReportingData();

        res.status(200).json({ data });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
