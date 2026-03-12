# Students Table CRUD Application

A professional, production-ready full stack CRUD application for managing students, built with React.js (Vite, Tailwind CSS) and optional NestJS backend (PostgreSQL, Prisma).

---

## Features

### Frontend
- Modern React.js (Vite) with Tailwind CSS
- Students Table: Name, Email, Age, Actions (Edit/Delete)
- Add/Edit Student (modal form, validation)
- Delete Student (confirmation dialog)
- Search/filter by name/email
- Download all/filtered data as Excel (xlsx)
- Responsive, clean dashboard UI
- Toast notifications for success actions
- Simulated loading spinner

### Backend (Optional)
- NestJS REST API
- PostgreSQL with Prisma ORM
- CRUD endpoints for students
- Input validation (DTO, class-validator)
- Global error handling
- CORS enabled
- Environment config & seed script

---

## Folder Structure

### Frontend
```
frontend/
	src/
		components/
			StudentTable.jsx
			StudentForm.jsx
			SearchBar.jsx
			LoadingSpinner.jsx
			ExcelDownload.jsx
			ConfirmDialog.jsx
			Toast.jsx
		pages/
			Dashboard.jsx
		hooks/
			useStudents.js
		utils/
			excelExport.js
			validation.js
		data/
			students.json
		App.jsx
		main.jsx
	tailwind.config.js
	postcss.config.js
	package.json
	...
```

### Backend (Optional)
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
		prisma/
			schema.prisma
		main.ts
		app.module.ts
	...
```

---

## Installation & Setup

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Backend (Optional)
1. `cd backend`
2. `npm install`
3. Set up PostgreSQL and update `.env`
4. `npx prisma migrate dev --name init`
5. `npm run start:dev`

---

## Deployment

### Frontend
- Deploy on [Vercel](https://vercel.com/)

### Backend
- Deploy on [Render](https://render.com/) or [Railway](https://railway.app/)

---

## Screenshots

> ![Dashboard Screenshot](./screenshots/dashboard.png)
> ![Add Student Modal](./screenshots/add-student.png)
> ![Delete Confirmation](./screenshots/delete-confirm.png)

---

## License

MIT
