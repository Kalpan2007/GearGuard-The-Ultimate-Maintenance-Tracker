import { prisma } from '../config/database';
import { RequestType, RequestStatus, EquipmentCategory, Priority } from '@prisma/client';

interface CreateRequestData {
    subject: string;
    description?: string;
    requestType: RequestType;
    priority?: Priority;
    equipmentId: string;
    scheduledDate?: Date;
    createdById: string;
}

interface UpdateRequestData {
    subject?: string;
    description?: string;
    priority?: Priority;
    scheduledDate?: Date;
    durationHours?: number;
    completionNotes?: string;
}

// State machine: Valid transitions
const VALID_TRANSITIONS: Record<RequestStatus, RequestStatus[]> = {
    NEW: ['IN_PROGRESS'],
    IN_PROGRESS: ['REPAIRED', 'SCRAP'],
    REPAIRED: [],
    SCRAP: [],
};

/**
 * Create maintenance request with auto-fill logic
 */
export async function createRequest(data: CreateRequestData) {
    // Fetch equipment to auto-fill category and team
    const equipment = await prisma.equipment.findUnique({
        where: { id: data.equipmentId },
        include: { maintenanceTeam: true },
    });

    if (!equipment) {
        throw new Error('Equipment not found');
    }

    // Check if equipment is scrapped
    if (equipment.status === 'SCRAPPED') {
        throw new Error('Cannot create request for scrapped equipment');
    }

    // Create request with auto-filled data
    const request = await prisma.maintenanceRequest.create({
        data: {
            subject: data.subject,
            description: data.description,
            requestType: data.requestType,
            priority: data.priority,
            equipmentId: data.equipmentId,
            category: equipment.category, // Auto-filled from equipment
            teamId: equipment.maintenanceTeamId, // Auto-filled from equipment
            scheduledDate: data.scheduledDate,
            createdById: data.createdById,
            status: 'NEW',
        },
        include: {
            equipment: true,
            team: true,
            createdBy: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });

    return request;
}

/**
 * Get all requests with filters
 */
export async function getAllRequests(filters?: {
    status?: RequestStatus;
    requestType?: RequestType;
    teamId?: string;
    assignedToId?: string;
    equipmentId?: string;
}) {
    return await prisma.maintenanceRequest.findMany({
        where: {
            status: filters?.status,
            requestType: filters?.requestType,
            teamId: filters?.teamId,
            assignedToId: filters?.assignedToId,
            equipmentId: filters?.equipmentId,
        },
        include: {
            equipment: true,
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
 * Get request by ID
 */
export async function getRequestById(id: string) {
    const request = await prisma.maintenanceRequest.findUnique({
        where: { id },
        include: {
            equipment: {
                include: {
                    department: true,
                    owner: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            },
            team: {
                include: {
                    members: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            avatar: true,
                        },
                    },
                },
            },
            assignedTo: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                    email: true,
                },
            },
            createdBy: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });

    if (!request) {
        throw new Error('Maintenance request not found');
    }

    return request;
}

/**
 * Update request
 */
export async function updateRequest(id: string, data: UpdateRequestData) {
    return await prisma.maintenanceRequest.update({
        where: { id },
        data,
        include: {
            equipment: true,
            team: true,
            assignedTo: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                },
            },
        },
    });
}

/**
 * Delete request
 */
export async function deleteRequest(id: string) {
    return await prisma.maintenanceRequest.delete({
        where: { id },
    });
}

/**
 * Assign request to technician
 */
export async function assignRequest(requestId: string, technicianId: string) {
    // Verify technician exists and is part of the team
    const request = await prisma.maintenanceRequest.findUnique({
        where: { id: requestId },
        include: {
            team: {
                include: {
                    members: {
                        select: { id: true },
                    },
                },
            },
        },
    });

    if (!request) {
        throw new Error('Request not found');
    }

    const isMember = request.team.members.some((m) => m.id === technicianId);

    if (!isMember) {
        throw new Error('Technician is not a member of this maintenance team');
    }

    return await prisma.maintenanceRequest.update({
        where: { id: requestId },
        data: {
            assignedToId: technicianId,
        },
        include: {
            equipment: true,
            team: true,
            assignedTo: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                },
            },
        },
    });
}

/**
 * Update request status with state machine validation
 */
export async function updateRequestStatus(
    requestId: string,
    newStatus: RequestStatus,
    data?: { completionNotes?: string }
) {
    const request = await prisma.maintenanceRequest.findUnique({
        where: { id: requestId },
    });

    if (!request) {
        throw new Error('Request not found');
    }

    // Validate state transition
    const validTransitions = VALID_TRANSITIONS[request.status];

    if (!validTransitions.includes(newStatus)) {
        throw new Error(
            `Invalid transition: ${request.status} → ${newStatus}. Valid transitions: ${validTransitions.join(', ')}`
        );
    }

    // Prepare update data with timestamps
    const updateData: any = { status: newStatus };

    if (newStatus === 'IN_PROGRESS') {
        updateData.startedAt = new Date();
    } else if (newStatus === 'REPAIRED' || newStatus === 'SCRAP') {
        updateData.completedAt = new Date();
        if (data?.completionNotes) {
            updateData.completionNotes = data.completionNotes;
        }
    }

    return await prisma.maintenanceRequest.update({
        where: { id: requestId },
        data: updateData,
        include: {
            equipment: true,
            team: true,
            assignedTo: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                },
            },
        },
    });
}

/**
 * Start request (NEW → IN_PROGRESS)
 */
export async function startRequest(requestId: string) {
    return await updateRequestStatus(requestId, 'IN_PROGRESS');
}

/**
 * Complete request (IN_PROGRESS → REPAIRED)
 */
export async function completeRequest(requestId: string, durationHours?: number, completionNotes?: string) {
    const request = await updateRequestStatus(requestId, 'REPAIRED', { completionNotes });

    // Update duration if provided
    if (durationHours) {
        return await prisma.maintenanceRequest.update({
            where: { id: requestId },
            data: { durationHours },
            include: {
                equipment: true,
                team: true,
                assignedTo: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
            },
        });
    }

    return request;
}

/**
 * Scrap request and mark equipment as scrapped
 */
export async function scrapRequest(requestId: string, completionNotes?: string) {
    const request = await updateRequestStatus(requestId, 'SCRAP', { completionNotes });

    // Mark equipment as scrapped
    await prisma.equipment.update({
        where: { id: request.equipmentId },
        data: { status: 'SCRAPPED' },
    });

    return request;
}

/**
 * Get Kanban board data (grouped by status)
 */
export async function getKanbanData() {
    const statuses: RequestStatus[] = ['NEW', 'IN_PROGRESS', 'REPAIRED', 'SCRAP'];

    const kanban = await Promise.all(
        statuses.map(async (status) => {
            const requests = await prisma.maintenanceRequest.findMany({
                where: { status },
                include: {
                    equipment: true,
                    team: true,
                    assignedTo: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            avatar: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            return {
                status,
                count: requests.length,
                requests,
            };
        })
    );

    return kanban;
}

/**
 * Get calendar view data (preventive maintenance)
 */
export async function getCalendarRequests(startDate: Date, endDate: Date) {
    return await prisma.maintenanceRequest.findMany({
        where: {
            requestType: 'PREVENTIVE',
            scheduledDate: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            equipment: true,
            team: true,
            assignedTo: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                },
            },
        },
        orderBy: {
            scheduledDate: 'asc',
        },
    });
}

/**
 * Get overdue requests (backend calculation)
 */
export async function getOverdueRequests() {
    const now = new Date();

    return await prisma.maintenanceRequest.findMany({
        where: {
            scheduledDate: {
                lt: now,
            },
            status: {
                in: ['NEW', 'IN_PROGRESS'],
            },
        },
        include: {
            equipment: true,
            team: true,
            assignedTo: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                },
            },
        },
        orderBy: {
            scheduledDate: 'asc',
        },
    });
}

/**
 * Get reporting data (pivot/graph)
 */
export async function getReportingData() {
    // Requests by team
    const byTeam = await prisma.maintenanceRequest.groupBy({
        by: ['teamId'],
        _count: {
            id: true,
        },
    });

    // Requests by category
    const byCategory = await prisma.maintenanceRequest.groupBy({
        by: ['category'],
        _count: {
            id: true,
        },
    });

    // Requests by status
    const byStatus = await prisma.maintenanceRequest.groupBy({
        by: ['status'],
        _count: {
            id: true,
        },
    });

    // Requests by type
    const byType = await prisma.maintenanceRequest.groupBy({
        by: ['requestType'],
        _count: {
            id: true,
        },
    });

    return {
        byTeam,
        byCategory,
        byStatus,
        byType,
    };
}
