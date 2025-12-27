import { Request, Response } from 'express';
import * as equipmentService from '../services/equipmentService';

/**
 * Create new equipment
 */
export async function createEquipment(req: Request, res: Response): Promise<void> {
    try {
        const equipment = await equipmentService.createEquipment({
            ...req.body,
            purchaseDate: new Date(req.body.purchaseDate),
            warrantyExpiry: req.body.warrantyExpiry ? new Date(req.body.warrantyExpiry) : undefined,
        });

        res.status(201).json({
            message: 'Equipment created successfully',
            equipment,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get all equipment
 */
export async function getAllEquipment(req: Request, res: Response): Promise<void> {
    try {
        const { category, status, departmentId, maintenanceTeamId, search } = req.query;

        const equipment = await equipmentService.getAllEquipment({
            category: category as any,
            status: status as any,
            departmentId: departmentId as string,
            maintenanceTeamId: maintenanceTeamId as string,
            search: search as string,
        });

        res.status(200).json({ equipment });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get equipment by ID
 */
export async function getEquipmentById(req: Request, res: Response): Promise<void> {
    try {
        const equipment = await equipmentService.getEquipmentById(req.params.id);

        res.status(200).json({ equipment });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
}

/**
 * Update equipment
 */
export async function updateEquipment(req: Request, res: Response): Promise<void> {
    try {
        const equipment = await equipmentService.updateEquipment(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: 'Equipment updated successfully',
            equipment,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Delete equipment
 */
export async function deleteEquipment(req: Request, res: Response): Promise<void> {
    try {
        await equipmentService.deleteEquipment(req.params.id);

        res.status(200).json({ message: 'Equipment deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get equipment requests (Smart Button)
 */
export async function getEquipmentRequests(req: Request, res: Response): Promise<void> {
    try {
        const { status } = req.query;

        const requests = await equipmentService.getEquipmentRequests(
            req.params.id,
            status as string
        );

        res.status(200).json({ requests });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get equipment open requests count (Badge)
 */
export async function getEquipmentRequestsCount(req: Request, res: Response): Promise<void> {
    try {
        const count = await equipmentService.getEquipmentOpenRequestsCount(req.params.id);

        res.status(200).json({ count });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
