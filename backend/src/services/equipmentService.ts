import { prisma } from '../config/database';
import { EquipmentCategory, EquipmentStatus } from '@prisma/client';

interface CreateEquipmentData {
    name: string;
    serialNumber: string;
    category: EquipmentCategory;
    purchaseDate: Date;
    warrantyExpiry?: Date;
    location: string;
    departmentId?: string;
    ownerId?: string;
    maintenanceTeamId: string;
}

interface UpdateEquipmentData {
    name?: string;
    location?: string;
    status?: EquipmentStatus;
    departmentId?: string;
    ownerId?: string;
    maintenanceTeamId?: string;
}

/**
 * Create new equipment
 */
export async function createEquipment(data: CreateEquipmentData) {
    return await prisma.equipment.create({
        data: {
            name: data.name,
            serialNumber: data.serialNumber,
            category: data.category,
            purchaseDate: data.purchaseDate,
            warrantyExpiry: data.warrantyExpiry,
            location: data.location,
            departmentId: data.departmentId,
            ownerId: data.ownerId,
            maintenanceTeamId: data.maintenanceTeamId,
        },
        include: {
            department: true,
            owner: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
            maintenanceTeam: true,
        },
    });
}

/**
 * Get all equipment with filters
 */
export async function getAllEquipment(filters?: {
    category?: EquipmentCategory;
    status?: EquipmentStatus;
    departmentId?: string;
    maintenanceTeamId?: string;
    search?: string;
}) {
    const where: any = {
        category: filters?.category,
        status: filters?.status,
        departmentId: filters?.departmentId,
        maintenanceTeamId: filters?.maintenanceTeamId,
    };

    if (filters?.search) {
        where.OR = [
            { name: { contains: filters.search, mode: 'insensitive' } },
            { serialNumber: { contains: filters.search, mode: 'insensitive' } },
            { location: { contains: filters.search, mode: 'insensitive' } },
        ];
    }

    return await prisma.equipment.findMany({
        where,
        include: {
            department: true,
            owner: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
            maintenanceTeam: true,
            _count: {
                select: {
                    requests: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}

/**
 * Get equipment by ID
 */
export async function getEquipmentById(id: string) {
    const equipment = await prisma.equipment.findUnique({
        where: { id },
        include: {
            department: true,
            owner: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
            maintenanceTeam: true,
            _count: {
                select: {
                    requests: true,
                },
            },
        },
    });

    if (!equipment) {
        throw new Error('Equipment not found');
    }

    return equipment;
}

/**
 * Update equipment
 */
export async function updateEquipment(id: string, data: UpdateEquipmentData) {
    return await prisma.equipment.update({
        where: { id },
        data,
        include: {
            department: true,
            owner: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
            maintenanceTeam: true,
        },
    });
}

/**
 * Delete equipment
 */
export async function deleteEquipment(id: string) {
    return await prisma.equipment.delete({
        where: { id },
    });
}

/**
 * Get maintenance requests for specific equipment (Smart Button)
 */
export async function getEquipmentRequests(equipmentId: string, status?: string) {
    return await prisma.maintenanceRequest.findMany({
        where: {
            equipmentId,
            status: status as any,
        },
        include: {
            team: true,
            assignedTo: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                },
            },
            createdBy: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}

/**
 * Get count of open requests for equipment (Badge count)
 */
export async function getEquipmentOpenRequestsCount(equipmentId: string) {
    return await prisma.maintenanceRequest.count({
        where: {
            equipmentId,
            status: {
                in: ['NEW', 'IN_PROGRESS'],
            },
        },
    });
}
