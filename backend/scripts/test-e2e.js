
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Colors for console output
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m"
};

const users = [
    { role: 'ADMIN', email: 'admin@gearguard.com', password: 'password123', description: 'Can manage everything' },
    { role: 'MANAGER', email: 'manager@gearguard.com', password: 'password123', description: 'Can manage equipment/teams' },
    { role: 'TECHNICIAN', email: 'mike.tech@gearguard.com', password: 'password123', description: 'Can update assigned requests' },
    { role: 'USER', email: 'user@gearguard.com', password: 'password123', description: 'Can create requests' }
];

async function runTests() {
    console.log(`${colors.cyan}🚀 Starting End-to-End Auth & Role Testing...${colors.reset}\n`);

    for (const user of users) {
        console.log(`${colors.yellow}Testing Role: ${user.role}${colors.reset}`); // Cleaned up header
        console.log(`Email: ${user.email}`);

        try {
            // 1. Login
            const loginRes = await axios.post(`${API_URL}/auth/login`, {
                email: user.email,
                password: user.password
            });

            const token = loginRes.data.token;
            console.log(`${colors.green}✅ Login Successful${colors.reset}`);

            const authHeaders = { Authorization: `Bearer ${token}` };

            // 2. Verify /me endpoint
            const meRes = await axios.get(`${API_URL}/auth/me`, { headers: authHeaders });
            console.log(`${colors.green}✅ Verified Identity: ${meRes.data.user.firstName} ${meRes.data.user.lastName} (${meRes.data.user.role})${colors.reset}`);

            // 3. Role-Specific Tests
            try {
                if (user.role === 'ADMIN') {
                    // Admin can delete teams (high privilege)
                    // Just check if they can fetch all users or teams (assuming an endpoint exists or we use a safe GET)
                    const teamsRes = await axios.get(`${API_URL}/teams`, { headers: authHeaders });
                    console.log(`${colors.green}✅ Admin Access Verified: Can view ${teamsRes.data.teams.length} teams${colors.reset}`);
                }
                else if (user.role === 'MANAGER') {
                    // Manager can create equipment
                    const equipmentData = {
                        name: `E2E Test Device ${Date.now()}`,
                        serialNumber: `TEST-${Date.now()}`,
                        category: "COMPUTER",
                        purchaseDate: new Date(),
                        location: "Test Lab",
                        maintenanceTeamId: (await axios.get(`${API_URL}/teams`, { headers: authHeaders })).data.teams[0].id // Create valid dummy
                    };
                    const eqRes = await axios.post(`${API_URL}/equipment`, equipmentData, { headers: authHeaders });
                    console.log(`${colors.green}✅ Manager Access Verified: Created equipment ${eqRes.data.equipment.name}${colors.reset}`);
                }
                else if (user.role === 'TECHNICIAN') {
                    // Technicians only see authorized data usually, let's try to view requests
                    const reqRes = await axios.get(`${API_URL}/requests`, { headers: authHeaders });
                    console.log(`${colors.green}✅ Technician Access Verified: Can view requests${colors.reset}`);

                    // Negative Test: Technician should NOT be able to delete a department
                    try {
                        // Assume this ID does not exist, but permission check happens first
                        await axios.delete(`${API_URL}/departments/123`, { headers: authHeaders });
                    } catch (err) {
                        if (err.response && err.response.status === 403) {
                            console.log(`${colors.green}✅ Permission Check Passed: Technician CANNOT delete departments (403 Forbidden)${colors.reset}`);
                        }
                    }
                }
                else if (user.role === 'USER') {
                    // Negative Test: User cannot create equipment
                    try {
                        await axios.post(`${API_URL}/equipment`, {}, { headers: authHeaders });
                    } catch (err) {
                        if (err.response && err.response.status === 403) {
                            console.log(`${colors.green}✅ Permission Check Passed: User CANNOT create equipment (403 Forbidden)${colors.reset}`);
                        }
                    }
                }

            } catch (innerErr) {
                console.log(`${colors.red}❌ Role Action Failed: ${innerErr.message}${colors.reset}`);
                if (innerErr.response) console.log(innerErr.response.data);
            }

        } catch (error) {
            console.log(`${colors.red}❌ Login/Basic Auth Failed: ${error.message}${colors.reset}`);
            if (error.response) console.log(error.response.data);
        }
        console.log('-'.repeat(50) + '\n');
    }
}

runTests();
