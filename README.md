deployed frontend - https://my-auth-app-delta-lac.vercel.app/
deployed backend - https://mern-auth-app-1-3cwf.onrender.com/users/signup
# mern-auth-app
# MERN Auth App 🔐

A full stack authentication system built with the MERN stack. Implements secure user registration, login, and protected routes using JWT tokens and bcrypt password hashing.

**Live Demo → [https://my-auth-app-delta-lac.vercel.app/](https://my-auth-app-delta-lac.vercel.app/)**

---

## Features

- User registration with duplicate email detection
- Secure password hashing with bcrypt
- JWT token generation on login with expiry
- Protected routes using custom auth middleware
- Token stored in localStorage on frontend
- Profile page accessible only to authenticated users
- Logout clears token and redirects to login

---

## Tech Stack

**Frontend**
- React.js
- React Router DOM
- Axios
- CSS (custom minimal design)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcrypt

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### Installation

**Clone the repo:**
```bash
git clone https://github.com/NikhilT97/mern-auth-app.git
cd mern-auth-app
```

**Backend setup:**
```bash
npm install
```

Create a `.env` file:
```
MONGO_URI=your_mongodb_atlas_connection_string
SECRET_KEY=your_jwt_secret
EXPIRES_IN=1d
PORT=5000
```

Start the backend:
```bash
node server.js
```

**Frontend setup:**
```bash
cd client
npm install
npm run dev
```

Update `src/config.js`:
```javascript
const BASE_URL = "http://localhost:5000";
export default BASE_URL;
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /users/signup | Register new user |
| POST | /users/login | Login and receive JWT token |
| GET | /users/profile | Get authenticated user profile |

---

## Project Structure

```
mern-auth-app/
├── config/
│   └── config.js         # MongoDB connection
├── middleware/
│   └── auth.middleware.js # JWT verification
├── models/
│   └── user.model.js     # User schema
├── routes/
│   └── auth.routes.js    # Auth endpoints
├── client/               # React frontend
│   └── src/
│       ├── pages/
│       │   ├── Signup.jsx
│       │   ├── Login.jsx
│       │   └── Profile.jsx
│       └── config.js
└── server.js
```

---

## How It Works

1. User registers → password hashed with bcrypt → stored in MongoDB
2. User logs in → password compared → JWT token generated and returned
3. Token stored in localStorage on frontend
4. Protected routes verify token via auth middleware
5. Decoded user ID attached to `req.user` for downstream use

---

## Author

**Nikhil Tayde**
- GitHub: [@NikhilT97](https://github.com/NikhilT97)
- LinkedIn: (https://www.linkedin.com/in/nikhiltayde97/)

---

 
