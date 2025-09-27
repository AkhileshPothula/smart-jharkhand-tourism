# Jharkhand Tourism - Registration System

This project includes both frontend and backend components for user registration and authentication.

## Backend Setup (Node.js + MongoDB)

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation & Setup

1. **Navigate to backend directory:**
   ```bash
   cd C:\Users\lohit\OneDrive\Desktop\backkk\smart-jharkhand-tourism
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the backend root directory:
   ```env
   MONGODB=mongodb://localhost:27017/tourist
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   - If using local MongoDB, make sure MongoDB service is running
   - Or use MongoDB Atlas (cloud) and update the connection string

5. **Start the backend server:**
   ```bash
   npm start
   # or for development with auto-restart:
   npm run dev
   ```

6. **Test the registration endpoint:**
   ```bash
   node test-registration.js
   ```

## Frontend Setup (React + Vite)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Navigate to frontend directory:**
   ```bash
   cd C:\Users\lohit\OneDrive\Desktop\kkkkk\jharkhand-journey-crafted
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env.local` file in the frontend root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_NODE_ENV=development
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Registration
- **POST** `/user/register`
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john@example.com",
    "password": "password123",
    "phone": "+91 9876543210",
    "role": "Tourist"
  }
  ```

### Login
- **POST** `/user/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

## Database Schema

The user model includes:
- Basic info: firstName, lastName, email, password, phone, role
- Preferences: language, interests, budget range
- Bookings: booking history
- Wallet: balance and transactions
- Reviews: user reviews

## Testing the Registration Flow

1. **Start both servers:**
   - Backend: `npm start` (port 5000)
   - Frontend: `npm run dev` (port 5173)

2. **Open the frontend:**
   - Navigate to `http://localhost:5173`
   - Go to the Auth page
   - Fill out the registration form
   - Submit the form

3. **Verify in database:**
   - Check MongoDB to see if the user was created
   - Check browser console for any errors
   - Check backend logs for API calls

## Troubleshooting

### Common Issues:

1. **CORS Error:**
   - Make sure CORS is enabled in backend (already configured)
   - Check if frontend URL is allowed

2. **Database Connection:**
   - Verify MongoDB is running
   - Check connection string in `.env`
   - Ensure database exists

3. **API Not Found:**
   - Verify backend is running on port 5000
   - Check API_BASE_URL in frontend environment

4. **Form Validation:**
   - All fields are required
   - Password minimum 6 characters
   - Email must be valid format

## Features Implemented

✅ **Backend:**
- User registration with password hashing
- JWT token authentication
- MongoDB integration
- CORS configuration
- Error handling

✅ **Frontend:**
- Registration form with validation
- Login form
- API integration
- Loading states
- Error handling with toast notifications
- Form state management
- Role selection (Tourist, Guide, Admin, Vendor)

## Next Steps

- Add email verification
- Implement password reset
- Add profile management
- Add role-based access control
- Implement session management
