import { PrismaClient, RequestType, RequestStatus, Priority, EquipmentCategory, UserRole, EquipmentStatus } from '@prisma/client';
import { hashPassword } from '../src/utils/password';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting comprehensive database seed for GearGuard...');

    // CLEANUP
    console.log('🧹 Cleaning up old data...');
    await prisma.maintenanceRequest.deleteMany();
    await prisma.equipment.deleteMany();
    await prisma.user.deleteMany();
    await prisma.maintenanceTeam.deleteMany();
    await prisma.department.deleteMany();

    // ============================================
    // 1. CREATE DEPARTMENTS
    // ============================================
    console.log('📦 Creating departments...');

    const deptProduction = await prisma.department.create({
        data: { name: 'Production', description: 'Main assembly and manufacturing line' }
    });
    const deptIT = await prisma.department.create({
        data: { name: 'IT Infrastructure', description: 'Server rooms and specialized IT zones' }
    });
    const deptFacilities = await prisma.department.create({
        data: { name: 'Facilities Management', description: 'General building maintenance' }
    });
    const deptLogistics = await prisma.department.create({
        data: { name: 'Logistics & Warehousing', description: 'Shipping, receiving, and storage' }
    });

    // ============================================
    // 2. CREATE MAINTENANCE TEAMS
    // ============================================
    console.log('👥 Creating maintenance teams...');

    const teamMechanical = await prisma.maintenanceTeam.create({
        data: { name: 'Mechanical Unit Alpha', specialty: 'Mechanical', description: 'Heavy machinery specialists' }
    });
    const teamElectrical = await prisma.maintenanceTeam.create({
        data: { name: 'High Volts Squad', specialty: 'Electrical', description: 'High voltage and circuitry' }
    });
    const teamIT = await prisma.maintenanceTeam.create({
        data: { name: 'Tech Ops', specialty: 'IT', description: 'Hardware and network infrastructure' }
    });
    const teamHVAC = await prisma.maintenanceTeam.create({
        data: { name: 'Climate Control', specialty: 'HVAC', description: 'Heating and cooling systems' }
    });

    // ============================================
    // 3. CREATE USERS (Admin, Manager, Techs, Employees)
    // ============================================
    console.log('👤 Creating users with hierarchy...');
    const password = await hashPassword('password123');

    // ADMIN
    await prisma.user.create({
        data: {
            email: 'admin@gearguard.com',
            password,
            firstName: 'Super',
            lastName: 'Admin',
            role: 'ADMIN',
            isVerified: true,
        }
    });

    // MANAGER (The one who "makes technician teams")
    const manager = await prisma.user.create({
        data: {
            email: 'manager@gearguard.com',
            password,
            firstName: 'Marcus',
            lastName: 'Manager',
            role: 'MANAGER',
            isVerified: true,
        }
    });

    // TECHNICIANS
    const techMike = await prisma.user.create({
        data: {
            email: 'mike.tech@gearguard.com',
            password,
            firstName: 'Mike',
            lastName: 'Mechanic',
            role: 'TECHNICIAN',
            teamId: teamMechanical.id,
            isVerified: true,
        }
    });

    const techSarah = await prisma.user.create({
        data: {
            email: 'sarah.it@gearguard.com',
            password,
            firstName: 'Sarah',
            lastName: 'Silicon',
            role: 'TECHNICIAN',
            teamId: teamIT.id,
            isVerified: true,
        }
    });

    const techDavid = await prisma.user.create({
        data: {
            email: 'david.elec@gearguard.com',
            password,
            firstName: 'David',
            lastName: 'Spark',
            role: 'TECHNICIAN',
            teamId: teamElectrical.id,
            isVerified: true,
        }
    });

    const techTom = await prisma.user.create({
        data: {
            email: 'tom.hvac@gearguard.com',
            password,
            firstName: 'Tom',
            lastName: 'Cooler',
            role: 'TECHNICIAN',
            teamId: teamHVAC.id,
            isVerified: true,
        }
    });

    // EMPLOYEES (Who report issues)
    const employeeJane = await prisma.user.create({
        data: {
            email: 'user@gearguard.com',
            password,
            firstName: 'Jane',
            lastName: 'Operator',
            role: 'USER',
            isVerified: true,
        }
    });

    const employeeBob = await prisma.user.create({
        data: {
            email: 'bob@gearguard.com',
            password,
            firstName: 'Bob',
            lastName: 'Builder',
            role: 'USER',
            isVerified: true,
        }
    });

    // ============================================
    // 4. CREATE EQUIPMENT
    // ============================================
    console.log('🔧 Creating equipment inventory...');

    const cncMachine = await prisma.equipment.create({
        data: {
            name: 'CNC Milling Center X500',
            serialNumber: 'CNC-X500-001',
            category: 'MACHINERY',
            purchaseDate: new Date('2023-01-15'),
            location: 'Production Floor Zone A',
            departmentId: deptProduction.id,
            maintenanceTeamId: teamMechanical.id,
            status: 'ACTIVE',
        }
    });

    const serverRack = await prisma.equipment.create({
        data: {
            name: 'Main Database Server Rack',
            serialNumber: 'SRV-DB-01',
            category: 'COMPUTER',
            purchaseDate: new Date('2024-02-20'),
            location: 'Server Room 1',
            departmentId: deptIT.id,
            maintenanceTeamId: teamIT.id,
            status: 'ACTIVE',
        }
    });

    const forklift = await prisma.equipment.create({
        data: {
            name: 'Heavy Duty Forklift',
            serialNumber: 'FL-2023-99',
            category: 'VEHICLE',
            purchaseDate: new Date('2022-11-05'),
            location: 'Main Warehouse',
            departmentId: deptLogistics.id,
            maintenanceTeamId: teamMechanical.id,
            status: 'INACTIVE', // Currently broken
        }
    });

    const acUnit = await prisma.equipment.create({
        data: {
            name: 'Rooftop HVAC Unit 3',
            serialNumber: 'HVAC-RT-03',
            category: 'HVAC',
            purchaseDate: new Date('2021-06-15'),
            location: 'Building A Roof',
            departmentId: deptFacilities.id,
            maintenanceTeamId: teamHVAC.id,
            status: 'ACTIVE',
        }
    });

    const generator = await prisma.equipment.create({
        data: {
            name: 'Backup Diesel Generator',
            serialNumber: 'GEN-500KVA',
            category: 'ELECTRICAL',
            purchaseDate: new Date('2020-03-12'),
            location: 'Power Plant Annex',
            departmentId: deptFacilities.id,
            maintenanceTeamId: teamElectrical.id,
            status: 'ACTIVE',
        }
    });

    // ============================================
    // 5. CREATE MAINTENANCE REQUESTS (The "Manager handles" part)
    // ============================================
    console.log('📋 Creating realistic maintenance requests...');

    // 1. New Request: Assigned by Manager to Mechanical Team (Unassigned Tech)
    await prisma.maintenanceRequest.create({
        data: {
            subject: 'Strange vibration in CNC Spindle',
            description: 'Operator reported excessive vibration at high RPMs. Needs inspection ASAP.',
            requestType: 'CORRECTIVE',
            priority: 'HIGH',
            status: 'NEW',
            equipmentId: cncMachine.id,
            category: 'MACHINERY',
            teamId: teamMechanical.id, // Assigned to team
            createdById: manager.id, // Manager created this
            scheduledDate: new Date(),
        }
    });

    // 2. In Progress Request: Tech Mike working on the Forklift
    await prisma.maintenanceRequest.create({
        data: {
            subject: 'Hydraulic leak repair',
            description: 'Fluid leaking from main lift cylinder.',
            requestType: 'CORRECTIVE',
            priority: 'URGENT',
            status: 'IN_PROGRESS',
            equipmentId: forklift.id,
            category: 'VEHICLE',
            teamId: teamMechanical.id,
            assignedToId: techMike.id, // Specific tech assigned
            createdById: employeeJane.id, // Employee reported it
            startedAt: new Date(Date.now() - 3600000), // Started 1 hour ago
        }
    });

    // 3. Completed Request: Sarah fixed a server issue
    await prisma.maintenanceRequest.create({
        data: {
            subject: 'RAID Controller Alert',
            description: 'Disk 2 showing degradation warnings.',
            requestType: 'CORRECTIVE',
            priority: 'HIGH',
            status: 'REPAIRED',
            equipmentId: serverRack.id,
            category: 'COMPUTER',
            teamId: teamIT.id,
            assignedToId: techSarah.id,
            createdById: manager.id,
            startedAt: new Date('2024-12-25T09:00:00'),
            completedAt: new Date('2024-12-25T11:30:00'),
            durationHours: 2.5,
            completionNotes: 'Replaced failed drive and rebuilt array. All green.',
        }
    });

    // 4. Preventive Maintenance: Scheduled for future, assigned to HVAC team
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    await prisma.maintenanceRequest.create({
        data: {
            subject: 'Annual Filter Replacement',
            description: 'Standard preventive maintenance protocol #HVAC-01.',
            requestType: 'PREVENTIVE',
            priority: 'MEDIUM',
            status: 'NEW',
            equipmentId: acUnit.id,
            category: 'HVAC',
            teamId: teamHVAC.id,
            createdById: manager.id,
            scheduledDate: nextWeek,
        }
    });

    // 5. Electrical Issue: Reported by user, awaiting manager review
    await prisma.maintenanceRequest.create({
        data: {
            subject: 'Lights flickering in Warehouse',
            description: 'The overhead LEDs are strobing intermittently.',
            requestType: 'CORRECTIVE',
            priority: 'LOW',
            status: 'NEW',
            equipmentId: generator.id, // Associated with power system generally
            category: 'ELECTRICAL',
            teamId: teamElectrical.id,
            createdById: employeeBob.id,
        }
    });

    console.log('✅ Seeding complete!');
    console.log('   All roles, teams, and workflows populated.');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
