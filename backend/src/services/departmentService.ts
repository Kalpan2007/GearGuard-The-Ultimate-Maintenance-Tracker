import { prisma } from '../config/database';

interface CreateDepartmentData {
    name: string;
    description?: string;
}

interface UpdateDepartmentData {
    name?: string;
    description?: string;
}

/**
 * Create department
 */
export async function createDepartment(data: CreateDepartmentData) {
    return await prisma.department.create({
        data: {
            name: data.name,
            description: data.description,
        },
    });
}

/**
 * Get all departments
 */
export async function getAllDepartments() {
    return await prisma.department.findMany({
        include: {
            _count: {
                select: {
                    equipment: true,
                },
            },
        },
        orderBy: {
            name: 'asc',
        },
    });
}

/**
 * Get department by ID
 */
export async function getDepartmentById(id: string) {
    const department = await prisma.department.findUnique({
        where: { id },
        include: {
            equipment: {
                include: {
                    maintenanceTeam: true,
                },
            },
        },
    });

    if (!department) {
        throw new Error('Department not found');
    }

    return department;
}

/**
 * Update department
 */
export async function updateDepartment(id: string, data: UpdateDepartmentData) {
    return await prisma.department.update({
        where: { id },
        data,
    });
}

/**
 * Delete department
 */
export async function deleteDepartment(id: string) {
    return await prisma.department.delete({
        where: { id },
    });
}
