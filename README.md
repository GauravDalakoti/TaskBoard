# ✅ Task Manager Application

This is a simple Task Manager built using **React.js**, **TailwindCSS**, **Node.js**, **Express.js**, and **MongoDB**.  
Users can create, update, delete, and manage their tasks efficiently.

## ✨ Features

- **Task Creation**: Add new tasks with details like title, description, and status.
- **Task Management**: Update task status (i, Completed).
- **Task Deletion**: Delete tasks easily.
- **Authentication**: Secure login and signup using JWT (JSON Web Tokens).
- **Dashboard**: View a list of all tasks with filtering options.

## 🛠 Tech Stack

- **Frontend**: React.js, Redux Toolkit, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel (Frontend) and Render / Railway (Backend)

**Architecture Overview:**
- Separated frontend and backend.
- Backend exposes REST APIs for task and user management.
- Frontend interacts with backend using Redux async thunks (for login, task CRUD, etc.).
- Authenticated requests use JWT stored in localStorage.
- Backend validates tokens on protected routes.

## 🚀 Live Demo

👉 [View Live Project Here](https://its-taskboard.vercel.app)

## 🧪 Test Credentials

- **Email**: `test@gmail.com`
- **Password**: `Test123`

- **Email**: `demo@gmail.com`
- **Password**: `Demo123`

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager

cd backend
npm install

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

npm run dev

cd frontend
npm install

VITE_API_URL=http://localhost:8000

npm run dev
