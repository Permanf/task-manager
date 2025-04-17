# Task Manager - Full-Stack Web Application

A modern task management application with full CRUD functionality, built with Astro (SSR), Svelte components, and Prisma ORM.

## Features

- ✅ Create tasks with title, description, priority,due date and completed
- 📝 Edit existing tasks
- 🗑️ Delete tasks
- ✅ Toggle task completion status
- 🔍 Filter tasks by priority and completion status
- 🛡️ Zod validation for all inputs
- 📱 Responsive UI with Tailwind CSS
- 🗄️ SQLite database with Prisma ORM

## Configure Environment
Create .env file: 
DATABASE_URL="file:./dev.db"

## Installation
```bash
npm install

```

## Database Setup
```bash
npx prisma generate
npx prisma migrate dev --name init

```

## Run the Application
```bash
npm run dev

```

## Application Structure
```bash
task-manager/
├── src/
│   ├── components/      # Svelte components
│   ├── pages/
│   │   ├── api/        # API routes
│   │   └── index.astro # Main page
│   ├── lib/
│   │   ├── prisma.ts   # Prisma client
│   │   └── schemas.ts  # Zod validation
├── prisma/
│   └── schema.prisma   # Database schema
└── public/             # Static assets

```
## API Reference
```bash
Task Endpoints
Method	    Endpoint	        Description
POST        /api/tasks          Create new task
GET         /api/tasks          Get all tasks
PUT         /api/tasks/{id}     Update task
DELETE      /api/tasks/{id}     Delete task

```