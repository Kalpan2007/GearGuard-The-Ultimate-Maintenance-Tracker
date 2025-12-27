import { Request, Response } from 'express';
import * as departmentService from '../services/departmentService';

/**
 * Create department
 */
export async function createDepartment(req: Request, res: Response): Promise<void> {
    try {
        const department = await departmentService.createDepartment(req.body);

        res.status(201).json({
            message: 'Department created successfully',
            department,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get all departments
 */
export async function getAllDepartments(req: Request, res: Response): Promise<void> {
    try {
        const departments = await departmentService.getAllDepartments();

        res.status(200).json({ departments });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get department by ID
 */
export async function getDepartmentById(req: Request, res: Response): Promise<void> {
    try {
        const department = await departmentService.getDepartmentById(req.params.id);

        res.status(200).json({ department });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
}

/**
 * Update department
 */
export async function updateDepartment(req: Request, res: Response): Promise<void> {
    try {
        const department = await departmentService.updateDepartment(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: 'Department updated successfully',
            department,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Delete department
 */
export async function deleteDepartment(req: Request, res: Response): Promise<void> {
    try {
        await departmentService.deleteDepartment(req.params.id);

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
