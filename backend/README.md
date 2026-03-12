# Students Table Backend (NestJS + PostgreSQL)

## Features
- REST API for students CRUD
- Input validation (DTO, class-validator)
- Global error handling
- CORS enabled
- Prisma ORM
- PostgreSQL database
- Seed script for initial data

## Folder Structure
```
backend/
  src/
    students/
      students.controller.ts
      students.service.ts
      students.module.ts
    dto/
      create-student.dto.ts
      update-student.dto.ts
    app.module.ts
    main.ts
  prisma/
    schema.prisma
    seed.ts
```

## Setup Instructions

### 1. Install dependencies
```
cd backend
npm install @nestjs/common @nestjs/core @nestjs/platform-express @nestjs/mapped-types class-validator class-transformer @prisma/client prisma
```

### 2. Set up environment variables
Create a `.env` file in `backend/`:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### 3. Run Prisma migrations
```
npx prisma migrate dev --name init
```

### 4. Seed the database
```
npx ts-node prisma/seed.ts
```

### 5. Start the server
```
npm run start:dev
```

## API Endpoints
- `GET    /students` — List all students
- `POST   /students` — Add a student
- `PUT    /students/:id` — Update a student
- `DELETE /students/:id` — Delete a student

## Deployment
- Deploy on [Render](https://render.com/) or [Railway](https://railway.app/)

---

MIT License
