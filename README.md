# Movie Booking System

A full-stack movie ticket booking application built with React, Vite, Express, and MongoDB. The system supports movie browsing, user authentication, ticket booking, order history, ticket viewing, and admin movie management.

## Features

- Browse current and upcoming movies
- Search movies and view movie details
- Register, sign in, and view the authenticated user profile
- Book tickets and view booking history
- View generated ticket information
- Admin movie management with protected routes
- Daily ticket sales reporting for admins
- Image upload support through Cloudinary

## Tech Stack

**Frontend:** React, Vite, React Router, Tailwind CSS, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary, Multer  
**Tooling:** ESLint, Nodemon

## Project Structure

```text
Movie_Booking_System_program_files/
  backend/    Express API, MongoDB models, routes, controllers, middleware
  frontend/   React/Vite client application
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database
- Cloudinary account for movie image uploads

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `backend/.env.development.local` file with the required environment variables:

```env
PORT=5000
NODE_ENV=development
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

The API runs at `http://localhost:5000` by default.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` by default.

## Available Scripts

Backend:

```bash
npm run dev
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Notes

- The backend expects the frontend origin to be `http://localhost:5173`.
- Admin access is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` when the backend starts.
- Keep environment files and dependency folders out of version control.
