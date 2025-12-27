const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function main() {
    console.log('🌱 Starting database seed...');

    // ============================================
    // 1. CREATE DEPARTMENTS
    // ============================================
    console.log('📦 Creating departments...');

    const production = await prisma.department.upsert({
        where: { name: 'Production' },
        update: {},
        create: {
            name: 'Production',
            description: 'Manufacturing and production department',
        },
    });

    const it = await prisma.department.upsert({
        where: { name: 'IT' },
        update: {},
        create: {
            name: 'IT',
            description: 'Information Technology department',
        },
    });

    const facilities = await prisma.department.upsert({
        where: { name: 'Facilities' },
        update: {},
        create: {
            name: 'Facilities',
            description: 'Facilities management department',
        },
    });

    console.log('✅ Departments created');

    // ============================================
    // 2. CREATE MAINTENANCE TEAMS
    // ============================================
    console.log('👥 Creating maintenance teams...');

    const mechanicalTeam = await prisma.maintenanceTeam.upsert({
        where: { name: 'Mechanical Team' },
        update: {},
        create: {
            name: 'Mechanical Team',
            specialty: 'Mechanical',
            description: 'Handles all mechanical equipment and machinery',
        },
    });

    const itTeam = await prisma.maintenanceTeam.upsert({
        where: { name: 'IT Support Team' },
        update: {},
        create: {
            name: 'IT Support Team',
            specialty: 'IT',
            description: 'Handles computers, networks, and IT infrastructure',
        },
    });

    const electricalTeam = await prisma.maintenanceTeam.upsert({
        where: { name: 'Electrical Team' },
        update: {},
        create: {
            name: 'Electrical Team',
            specialty: 'Electrical',
            description: 'Handles electrical systems and equipment',
        },
    });

    const hvacTeam = await prisma.maintenanceTeam.upsert({
        where: { name: 'HVAC Team' },
        update: {},
        create: {
            name: 'HVAC Team',
            specialty: 'HVAC',
            description: 'Handles heating, ventilation, and air conditioning',
        },
    });

    console.log('✅ Teams created');

    // ============================================
    // 3. CREATE USERS
    // ============================================
    console.log('👤 Creating users...');

    const hashedPassword = await hashPassword('password123');

    // Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@gearguard.com' },
        update: {},
        create: {
            email: 'admin@gearguard.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
        },
    });

    // Managers
    const manager1 = await prisma.user.upsert({
        where: { email: 'manager@gearguard.com' },
        update: {},
        create: {
            email: 'manager@gearguard.com',
            password: hashedPassword,
            firstName: 'John',
            lastName: 'Manager',
            role: 'MANAGER',
        },
    });

    // Technicians
    const techMech1 = await prisma.user.upsert({
        where: { email: 'mike.tech@gearguard.com' },
        update: {},
        create: {
            email: 'mike.tech@gearguard.com',
            password: hashedPassword,
            firstName: 'Mike',
            lastName: 'Technician',
            role: 'TECHNICIAN',
            teamId: mechanicalTeam.id,
        },
    });

    const techIT1 = await prisma.user.upsert({
        where: { email: 'sarah.it@gearguard.com' },
        update: {},
        create: {
            email: 'sarah.it@gearguard.com',
            password: hashedPassword,
            firstName: 'Sarah',
            lastName: 'Johnson',
            role: 'TECHNICIAN',
            teamId: itTeam.id,
        },
    });

    const techElec1 = await prisma.user.upsert({
        where: { email: 'david.elec@gearguard.com' },
        update: {},
        create: {
            email: 'david.elec@gearguard.com',
            password: hashedPassword,
            firstName: 'David',
            lastName: 'Smith',
            role: 'TECHNICIAN',
            teamId: electricalTeam.id,
        },
    });

    const techHVAC1 = await prisma.user.upsert({
        where: { email: 'lisa.hvac@gearguard.com' },
        update: {},
        create: {
            email: 'lisa.hvac@gearguard.com',
            password: hashedPassword,
            firstName: 'Lisa',
            lastName: 'Brown',
            role: 'TECHNICIAN',
            teamId: hvacTeam.id,
        },
    });

    // Regular user
    const user1 = await prisma.user.upsert({
        where: { email: 'user@gearguard.com' },
        update: {},
        create: {
            email: 'user@gearguard.com',
            password: hashedPassword,
            firstName: 'Jane',
            lastName: 'Doe',
            role: 'USER',
        },
    });

    console.log('✅ Users created');

    // ============================================
    // 4. CREATE EQUIPMENT
    // ============================================
    console.log('🔧 Creating equipment...');

    const cnc = await prisma.equipment.create({
        data: {
            name: 'CNC Machine #1',
            serialNumber: 'CNC-2024-001',
            category: 'MACHINERY',
            purchaseDate: new Date('2023-01-15'),
            warrantyExpiry: new Date('2026-01-15'),
            location: 'Production Floor A',
            departmentId: production.id,
            maintenanceTeamId: mechanicalTeam.id,
            status: 'ACTIVE',
        },
    });

    const laptop = await prisma.equipment.create({
        data: {
            name: 'Dell Laptop #42',
            serialNumber: 'DELL-LAP-042',
            category: 'COMPUTER',
            purchaseDate: new Date('2024-03-10'),
            warrantyExpiry: new Date('2027-03-10'),
            location: 'IT Department',
            ownerId: user1.id,
            maintenanceTeamId: itTeam.id,
            status: 'ACTIVE',
        },
    });

    const forklift = await prisma.equipment.create({
        data: {
            name: 'Forklift #5',
            serialNumber: 'FORK-2023-005',
            category: 'VEHICLE',
            purchaseDate: new Date('2023-06-20'),
            location: 'Warehouse',
            departmentId: production.id,
            maintenanceTeamId: mechanicalTeam.id,
            status: 'ACTIVE',
        },
    });

    const hvacUnit = await prisma.equipment.create({
        data: {
            name: 'HVAC Unit - Building A',
            serialNumber: 'HVAC-A-001',
            category: 'HVAC',
            purchaseDate: new Date('2022-08-01'),
            warrantyExpiry: new Date('2027-08-01'),
            location: 'Building A Rooftop',
            departmentId: facilities.id,
            maintenanceTeamId: hvacTeam.id,
            status: 'ACTIVE',
        },
    });

    const generator = await prisma.equipment.create({
        data: {
            name: 'Backup Generator',
            serialNumber: 'GEN-2024-001',
            category: 'ELECTRICAL',
            purchaseDate: new Date('2024-01-10'),
            warrantyExpiry: new Date('2029-01-10'),
            location: 'Power Room',
            departmentId: facilities.id,
            maintenanceTeamId: electricalTeam.id,
            status: 'ACTIVE',
        },
    });

    console.log('✅ Equipment created');

    // ============================================
    // 5. CREATE MAINTENANCE REQUESTS
    // ============================================
    console.log('📋 Creating maintenance requests...');

    // Corrective request - NEW
    await prisma.maintenanceRequest.create({
        data: {
            subject: 'CNC Machine making unusual noise',
            description: 'The CNC machine is making a grinding noise during operation',
            requestType: 'CORRECTIVE',
            equipmentId: cnc.id,
            category: cnc.category,
            teamId: mechanicalTeam.id,
            createdById: user1.id,
            status: 'NEW',
            scheduledDate: new Date(),
        },
    });

    // Corrective request - IN_PROGRESS
    await prisma.maintenanceRequest.create({
        data: {
            subject: 'Laptop screen flickering',
            description: 'Screen flickers intermittently, especially when moving the lid',
            requestType: 'CORRECTIVE',
            equipmentId: laptop.id,
            category: laptop.category,
            teamId: itTeam.id,
            assignedToId: techIT1.id,
            createdById: user1.id,
            status: 'IN_PROGRESS',
            startedAt: new Date(),
            scheduledDate: new Date(),
        },
    });

    // Preventive request - scheduled for future
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);

    await prisma.maintenanceRequest.create({
        data: {
            subject: 'Quarterly HVAC filter replacement',
            description: 'Routine quarterly maintenance - replace air filters',
            requestType: 'PREVENTIVE',
            equipmentId: hvacUnit.id,
            category: hvacUnit.category,
            teamId: hvacTeam.id,
            createdById: manager1.id,
            status: 'NEW',
            scheduledDate: futureDate,
        },
    });

    // Overdue preventive request
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 3);

    await prisma.maintenanceRequest.create({
        data: {
            subject: 'Forklift monthly inspection',
            description: 'Monthly safety inspection and oil check',
            requestType: 'PREVENTIVE',
            equipmentId: forklift.id,
            category: forklift.category,
            teamId: mechanicalTeam.id,
            createdById: manager1.id,
            status: 'NEW',
            scheduledDate: pastDate,
        },
    });

    // Completed request
    await prisma.maintenanceRequest.create({
        data: {
            subject: 'Generator routine maintenance',
            description: 'Monthly generator test and fuel check',
            requestType: 'PREVENTIVE',
            equipmentId: generator.id,
            category: generator.category,
            teamId: electricalTeam.id,
            assignedToId: techElec1.id,
            createdById: manager1.id,
            status: 'REPAIRED',
            scheduledDate: new Date('2024-12-20'),
            startedAt: new Date('2024-12-20T09:00:00'),
            completedAt: new Date('2024-12-20T11:30:00'),
            durationHours: 2.5,
        },
    });

    console.log('✅ Maintenance requests created');

    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('🎉 Database seeded successfully!');
    console.log('═══════════════════════════════════════════');
    console.log('');
    console.log('📧 Test Accounts (password: password123):');
    console.log('   Admin:      admin@gearguard.com');
    console.log('   Manager:    manager@gearguard.com');
    console.log('   Mechanical: mike.tech@gearguard.com');
    console.log('   IT:         sarah.it@gearguard.com');
    console.log('   Electrical: david.elec@gearguard.com');
    console.log('   HVAC:       lisa.hvac@gearguard.com');
    console.log('   User:       user@gearguard.com');
    console.log('');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
