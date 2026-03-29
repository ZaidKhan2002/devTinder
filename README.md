# 🔥 devTinder
 
> A Tinder-like networking platform for developers — swipe, connect, and collaborate.
 
devTinder is a full-stack **MERN** application where developers can create profiles, discover other developers, send connection requests, and chat with their matches. Built with a RESTful backend and a dynamic React frontend.

## ✨ Features
 
### Authentication
- User Signup, Login, and Logout
- JWT-based authentication stored in **secure HTTP-only cookies**
- Password hashing using **bcryptjs**
- Auth middleware to protect all private routes
 
### User Profile
- View your own profile
- Edit profile details (name, bio, skills, photo URL)
- Restricted fields (email, password) cannot be updated via the edit route
- Password update with validation
 
### Feed
- Browse a dynamic feed of other developers
- Profiles already interacted with (ignored/accepted) are filtered out
- Pagination support for scalable feed loading
 
### Connection Requests
- Send a connection request as **Interested** or **Ignored**
- Accept or Reject incoming requests
- Prevents duplicate requests using MongoDB-level validation
- Prevents self-requests using Mongoose pre-save middleware
 
### Matches
- View all accepted connections (your matches)
- Foundation for real-time chat between matched users
 
### Real-time Chat *(in progress)*
- Socket.io integration for live messaging between connected developers
- Chat window accessible at `/chat/:targetUserId`
 
---

## 🛠 Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, Redux Toolkit, Tailwind CSS, DaisyUI |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs, cookie-parser |
| Real-time | Socket.io *(in progress)* |
| HTTP Client | Axios |
 
---
 
## 🚀 Getting Started
 
### Prerequisites
- Node.js v16+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn
 
---
 
### Backend Setup
 
```bash
# Navigate to the backend folder
cd backend
 
# Install dependencies
npm install
 
# Create a .env file
touch .env
```
 
Add the following to your `.env` file:
 
```env
PORT=7777
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/devTinder
JWT_SECRET=your_super_secret_key
ALLOWED_ORIGIN=http://localhost:5173
```
 
```bash
# Start the backend server
npm start
```
 
The backend will run on `http://localhost:7777`.
 
---
 
### Frontend Setup
 
```bash
# Navigate to the frontend folder
cd frontend
 
# Install dependencies
npm install
 
# Create a .env file
touch .env
```
 
Add the following to your `.env` file:
 
```env
VITE_BACKEND_URL=http://localhost:7777
```
 
```bash
# Start the frontend dev server
npm run dev
```
 
The frontend will run on `http://localhost:5173`.
 
---
 
## ☁️ Deployment (AWS EC2 + Nginx)
 
1. Launch an Ubuntu EC2 instance and SSH into it.
2. Install Node.js, npm, and Nginx.
3. Clone the repo and install dependencies for both `backend` and `frontend`.
4. Build the frontend: `npm run build` inside the `frontend` folder.
5. Copy the `dist/` folder to `/var/www/html/` for Nginx to serve.
6. Configure Nginx as a reverse proxy — route `/api` requests to the backend on port `7777`.
7. Set `VITE_BACKEND_URL=/api` in the frontend `.env` before building.
8. Use **PM2** to keep the backend running: `pm2 start npm --name "devTinder-backend" -- start`
9. Allow inbound traffic on ports `80` and `7777` in your EC2 security group.
10. Add your EC2 instance's public IP to **MongoDB Atlas Network Access**.
 
---

## 👤 Author
 
**Zaid Khan**
- GitHub: [@ZaidKhan2002](https://github.com/ZaidKhan2002)
- LinkedIn: [in/zaidkhan2002](https://linkedin.com/in/zaidkhan2002)
- Twitter: [@Zaiddd_Khan](https://twitter.com/Zaiddd_Khan)
 
---
 
## 📄 License
 
This project is open source and available under the [MIT License](LICENSE).