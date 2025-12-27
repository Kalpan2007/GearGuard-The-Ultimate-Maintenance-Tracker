import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreatePartData {
    name: string;
    sku: string;
    description?: string;
    quantity: number;
    minQuantity?: number;
    cost: number;
    location?: string;
}

export interface UpdatePartData extends Partial<CreatePartData> { }

/**
 * Create a new part
 */
export async function createPart(data: CreatePartData) {
    // Check if SKU exists
    const existing = await prisma.part.findUnique({
        where: { sku: data.sku }
    });

    if (existing) {
        throw new Error(`Part with SKU ${data.sku} already exists`);
    }

    return await prisma.part.create({
        data
    });
}

/**
 * Get all parts
 */
export async function getAllParts() {
    return await prisma.part.findMany({
        orderBy: { name: 'asc' }
    });
}

/**
 * Get part by ID
 */
export async function getPartById(id: string) {
    const part = await prisma.part.findUnique({
        where: { id }
    });

    if (!part) {
        throw new Error('Part not found');
    }

    return part;
}

/**
 * Update part
 */
export async function updatePart(id: string, data: UpdatePartData) {
    return await prisma.part.update({
        where: { id },
        data
    });
}

/**
 * Delete part
 */
export async function deletePart(id: string) {
    return await prisma.part.delete({
        where: { id }
    });
}
