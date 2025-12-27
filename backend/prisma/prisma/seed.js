"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var password_1 = require("../src/utils/password");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var production, it, facilities, mechanicalTeam, itTeam, electricalTeam, hvacTeam, hashedPassword, admin, manager1, techMech1, techIT1, techElec1, techHVAC1, user1, cnc, laptop, forklift, hvacUnit, generator, futureDate, pastDate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🌱 Starting database seed...');
                    // ============================================
                    // 1. CREATE DEPARTMENTS
                    // ============================================
                    console.log('📦 Creating departments...');
                    return [4 /*yield*/, prisma.department.upsert({
                            where: { name: 'Production' },
                            update: {},
                            create: {
                                name: 'Production',
                                description: 'Manufacturing and production department',
                            },
                        })];
                case 1:
                    production = _a.sent();
                    return [4 /*yield*/, prisma.department.upsert({
                            where: { name: 'IT' },
                            update: {},
                            create: {
                                name: 'IT',
                                description: 'Information Technology department',
                            },
                        })];
                case 2:
                    it = _a.sent();
                    return [4 /*yield*/, prisma.department.upsert({
                            where: { name: 'Facilities' },
                            update: {},
                            create: {
                                name: 'Facilities',
                                description: 'Facilities management department',
                            },
                        })];
                case 3:
                    facilities = _a.sent();
                    console.log('✅ Departments created');
                    // ============================================
                    // 2. CREATE MAINTENANCE TEAMS
                    // ============================================
                    console.log('👥 Creating maintenance teams...');
                    return [4 /*yield*/, prisma.maintenanceTeam.upsert({
                            where: { name: 'Mechanical Team' },
                            update: {},
                            create: {
                                name: 'Mechanical Team',
                                specialty: 'Mechanical',
                                description: 'Handles all mechanical equipment and machinery',
                            },
                        })];
                case 4:
                    mechanicalTeam = _a.sent();
                    return [4 /*yield*/, prisma.maintenanceTeam.upsert({
                            where: { name: 'IT Support Team' },
                            update: {},
                            create: {
                                name: 'IT Support Team',
                                specialty: 'IT',
                                description: 'Handles computers, networks, and IT infrastructure',
                            },
                        })];
                case 5:
                    itTeam = _a.sent();
                    return [4 /*yield*/, prisma.maintenanceTeam.upsert({
                            where: { name: 'Electrical Team' },
                            update: {},
                            create: {
                                name: 'Electrical Team',
                                specialty: 'Electrical',
                                description: 'Handles electrical systems and equipment',
                            },
                        })];
                case 6:
                    electricalTeam = _a.sent();
                    return [4 /*yield*/, prisma.maintenanceTeam.upsert({
                            where: { name: 'HVAC Team' },
                            update: {},
                            create: {
                                name: 'HVAC Team',
                                specialty: 'HVAC',
                                description: 'Handles heating, ventilation, and air conditioning',
                            },
                        })];
                case 7:
                    hvacTeam = _a.sent();
                    console.log('✅ Teams created');
                    // ============================================
                    // 3. CREATE USERS
                    // ============================================
                    console.log('👤 Creating users...');
                    return [4 /*yield*/, (0, password_1.hashPassword)('password123')];
                case 8:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'admin@gearguard.com' },
                            update: {},
                            create: {
                                email: 'admin@gearguard.com',
                                password: hashedPassword,
                                firstName: 'Admin',
                                lastName: 'User',
                                role: 'ADMIN',
                            },
                        })];
                case 9:
                    admin = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'manager@gearguard.com' },
                            update: {},
                            create: {
                                email: 'manager@gearguard.com',
                                password: hashedPassword,
                                firstName: 'John',
                                lastName: 'Manager',
                                role: 'MANAGER',
                            },
                        })];
                case 10:
                    manager1 = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
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
                        })];
                case 11:
                    techMech1 = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
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
                        })];
                case 12:
                    techIT1 = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
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
                        })];
                case 13:
                    techElec1 = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
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
                        })];
                case 14:
                    techHVAC1 = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'user@gearguard.com' },
                            update: {},
                            create: {
                                email: 'user@gearguard.com',
                                password: hashedPassword,
                                firstName: 'Jane',
                                lastName: 'Doe',
                                role: 'USER',
                            },
                        })];
                case 15:
                    user1 = _a.sent();
                    console.log('✅ Users created');
                    // ============================================
                    // 4. CREATE EQUIPMENT
                    // ============================================
                    console.log('🔧 Creating equipment...');
                    return [4 /*yield*/, prisma.equipment.create({
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
                        })];
                case 16:
                    cnc = _a.sent();
                    return [4 /*yield*/, prisma.equipment.create({
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
                        })];
                case 17:
                    laptop = _a.sent();
                    return [4 /*yield*/, prisma.equipment.create({
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
                        })];
                case 18:
                    forklift = _a.sent();
                    return [4 /*yield*/, prisma.equipment.create({
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
                        })];
                case 19:
                    hvacUnit = _a.sent();
                    return [4 /*yield*/, prisma.equipment.create({
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
                        })];
                case 20:
                    generator = _a.sent();
                    console.log('✅ Equipment created');
                    // ============================================
                    // 5. CREATE MAINTENANCE REQUESTS
                    // ============================================
                    console.log('📋 Creating maintenance requests...');
                    // Corrective request - NEW
                    return [4 /*yield*/, prisma.maintenanceRequest.create({
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
                        })];
                case 21:
                    // Corrective request - NEW
                    _a.sent();
                    // Corrective request - IN_PROGRESS
                    return [4 /*yield*/, prisma.maintenanceRequest.create({
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
                        })];
                case 22:
                    // Corrective request - IN_PROGRESS
                    _a.sent();
                    futureDate = new Date();
                    futureDate.setDate(futureDate.getDate() + 7);
                    return [4 /*yield*/, prisma.maintenanceRequest.create({
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
                        })];
                case 23:
                    _a.sent();
                    pastDate = new Date();
                    pastDate.setDate(pastDate.getDate() - 3);
                    return [4 /*yield*/, prisma.maintenanceRequest.create({
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
                        })];
                case 24:
                    _a.sent();
                    // Completed request
                    return [4 /*yield*/, prisma.maintenanceRequest.create({
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
                        })];
                case 25:
                    // Completed request
                    _a.sent();
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
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
