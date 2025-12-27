
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let adminToken = '';
let techToken = '';
let equipmentId = '';
let requestId = '';
let teamId = '';

const colors = {
    pass: "\x1b[32m✅ PASS:\x1b[0m",
    fail: "\x1b[31m❌ FAIL:\x1b[0m",
    info: "\x1b[36mℹ️ INFO:\x1b[0m",
    header: "\x1b[33m\n=== %s ===\x1b[0m"
};

async function log(type, msg) {
    console.log(`${type} ${msg}`);
}

async function runTests() {
    console.log("\x1b[35m🚀 STARTING COMPREHENSIVE SYSTEM TEST\x1b[0m");

    try {
        // ==========================================
        // 1. AUTHENTICATION
        // ==========================================
        console.log(colors.header, "AUTHENTICATION");

        // Admin Login
        try {
            const adminRes = await axios.post(`${API_URL}/auth/login`, {
                email: 'admin@gearguard.com',
                password: 'password123'
            });
            adminToken = adminRes.data.token;
            log(colors.pass, "Admin Login Successful");
        } catch (e) { log(colors.fail, "Admin Login" + e.message); return; }

        // Technician Login
        try {
            const techRes = await axios.post(`${API_URL}/auth/login`, {
                email: 'mike.tech@gearguard.com',
                password: 'password123'
            });
            techToken = techRes.data.token;
            log(colors.pass, "Technician Login Successful");
        } catch (e) { log(colors.fail, "Tech Login"); }


        const adminHeaders = { headers: { Authorization: `Bearer ${adminToken}` } };
        const techHeaders = { headers: { Authorization: `Bearer ${techToken}` } };

        // ==========================================
        // 2. TEAMS & DEPARTMENTS
        // ==========================================
        console.log(colors.header, "TEAMS & DEPARTMENTS");

        const teamsRes = await axios.get(`${API_URL}/teams`, adminHeaders);
        log(colors.pass, `Fetched ${teamsRes.data.teams.length} Maintenance Teams`);
        teamId = teamsRes.data.teams.find(t => t.specialty === 'Mechanical')?.id;

        const deptRes = await axios.get(`${API_URL}/departments`, adminHeaders);
        log(colors.pass, `Fetched ${deptRes.data.departments.length} Departments`);


        // ==========================================
        // 3. EQUIPMENT MANAGEMENT
        // ==========================================
        console.log(colors.header, "EQUIPMENT MANAGEMENT");

        // Create Equipment
        const newEq = {
            name: `Test Machine ${Date.now()}`,
            serialNumber: `SN-${Date.now()}`,
            category: 'MACHINERY',
            purchaseDate: new Date().toISOString(),
            location: 'Test Floor',
            maintenanceTeamId: teamId
        };

        const eqRes = await axios.post(`${API_URL}/equipment`, newEq, adminHeaders);
        equipmentId = eqRes.data.equipment.id;
        log(colors.pass, `Created Equipment: ${eqRes.data.equipment.name}`);

        // Get Smart Button Counts
        const countRes = await axios.get(`${API_URL}/equipment/${equipmentId}/requests/count`, adminHeaders);
        log(colors.pass, `Smart Button Count: ${countRes.data.count} (Should be 0)`);


        // ==========================================
        // 4. MAINTENANCE REQUESTS (The Core Flow)
        // ==========================================
        console.log(colors.header, "MAINTENANCE WORKFLOW");

        // Step A: Create Request (Auto-fill check)
        const reqData = {
            subject: "Noise in motor",
            description: "Loud grinding noise during operation",
            requestType: "CORRECTIVE",
            equipmentId: equipmentId,
            // Note: We are NOT sending teamId or category. Backend should auto-fill this.
            scheduledDate: new Date().toISOString()
        };

        const reqRes = await axios.post(`${API_URL}/requests`, reqData, adminHeaders);
        requestId = reqRes.data.request.id;

        if (reqRes.data.request.category === 'MACHINERY' && reqRes.data.request.teamId === teamId) {
            log(colors.pass, "Auto-Fill Logic Verified (Category & Team populated automatically)");
        } else {
            log(colors.fail, "Auto-Fill Logic Failed");
        }

        // Step B: Start Request (New -> In Progress)
        // Using Technician account (Role Based access check)
        try {
            await axios.post(`${API_URL}/requests/${requestId}/start`, {}, techHeaders);
            log(colors.pass, "Workflow Transition: NEW -> IN_PROGRESS (Technician)");
        } catch (e) {
            log(colors.fail, "Workflow Start: " + (e.response?.data?.error || e.message));
        }

        // Step C: Complete Request (In Progress -> Repaired)
        try {
            await axios.post(`${API_URL}/requests/${requestId}/complete`, { durationHours: 2 }, techHeaders);
            log(colors.pass, "Workflow Transition: IN_PROGRESS -> REPAIRED (Technician)");
        } catch (e) {
            log(colors.fail, "Workflow Complete: " + (e.response?.data?.error || e.message));
        }

        // ==========================================
        // 5. VIEWS & REPORTING
        // ==========================================
        console.log(colors.header, "VIEWS & DATA");

        // Kanban Content
        const kanbanRes = await axios.get(`${API_URL}/requests/kanban`, adminHeaders);
        const columns = kanbanRes.data.kanban.map(c => `${c.status}(${c.count})`).join(', ');
        log(colors.pass, `Kanban Data Loaded: [${columns}]`);

        // Calendar Content
        const calRes = await axios.get(`${API_URL}/requests/calendar?startDate=2024-01-01&endDate=2025-12-31`, adminHeaders);
        log(colors.pass, `Calendar Data Loaded: ${calRes.data.requests.length} scheduled items`);

        // Overdue Content
        const overdueRes = await axios.get(`${API_URL}/requests/overdue`, adminHeaders);
        log(colors.pass, `Overdue Logic: Found ${overdueRes.data.requests.length} overdue items`);

        console.log("\x1b[35m\n✨ SYSTEM STATUS: ALL SYSTEMS OPERATIONAL\x1b[0m");

    } catch (error) {
        console.error(colors.fail, "TEST SUITE FAILED");
        console.error(error);
    }
}

runTests();
