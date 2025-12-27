
# 🌲 Granular Git Commit Strategy

Use these commands in order to create a rich, professional commit history for your backend.

## 1. Project Initialization
```powershell
git add package.json package-lock.json tsconfig.json nodemon.json .gitignore .env.example
git commit -m "chore: initialize project with typescript and dependencies"
```

## 2. Database Setup
```powershell
git add .env prisma/schema.prisma
git commit -m "db: setup postgresql connection and initial prisma schema"
```

## 3. Core Configuration & Utils
```powershell
git add src/config/ src/utils/
git commit -m "feat(core): add database config, jwt logic, and password hashing"
```

## 4. Middleware Layer
```powershell
git add src/middleware/errorHandler.ts
git commit -m "feat(middleware): implement unified error handling"

git add src/middleware/auth.ts src/middleware/teamAuth.ts
git commit -m "security: add jwt authentication and team-based authorization guards"
```

## 5. Organizational Modules
```powershell
git add src/services/departmentService.ts src/controllers/departmentController.ts src/routes/departmentRoutes.ts
git commit -m "feat(org): add department management module"

git add src/services/teamService.ts src/controllers/teamController.ts src/routes/teamRoutes.ts
git commit -m "feat(org): add maintenance team management module"
```

## 6. Authentication Module
```powershell
git add src/services/authService.ts src/controllers/authController.ts src/routes/authRoutes.ts
git commit -m "feat(auth): implement user registration, login, and rbac"
```

## 7. Equipment Module
```powershell
git add src/services/equipmentService.ts src/controllers/equipmentController.ts src/routes/equipmentRoutes.ts
git commit -m "feat(assets): add equipment tracking with ownership logic"
```

## 8. Maintenance Request Core
```powershell
git add src/services/requestService.ts src/controllers/requestController.ts src/routes/requestRoutes.ts
git commit -m "feat(maintenance): implement request lifecycle state machine and auto-fill logic"
```

## 9. API Routing & Server
```powershell
git add src/routes/index.ts src/server.ts
git commit -m "feat(api): aggregate routes and setup express server"
```

## 10. Database Seeding
```powershell
git add prisma/seed.js prisma/seed.ts
git commit -m "chore(db): create comprehensive seed script for testing"
```

## 11. Documentation
```powershell
git add README.md QUICK_REFERENCE.md PROJECT_COMPLETE.md API_TESTING.md
git commit -m "docs: add comprehensive api documentation and testing guides"
```

## 12. Testing Scripts
```powershell
git add scripts/ GearGuard.postman_collection.json
git commit -m "test: add e2e testing scripts and postman collection"
```

## 13. Search Implementation (Latest Update)
```powershell
git add src/services/equipmentService.ts src/controllers/equipmentController.ts
git commit -m "feat(search): implement global search for equipment by name/serial/location"
```

## 14. Notes & Priority (Latest Update)
```powershell
git add src/services/requestService.ts src/controllers/requestController.ts prisma/schema.prisma prisma/migrations/
git commit -m "feat(workflow): add request priority and completion notes logic"
```

## 15. Final Push
```powershell
git push -u origin main
```
