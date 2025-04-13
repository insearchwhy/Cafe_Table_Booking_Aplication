# Cafe Table Booking System

A modern web application for managing table reservations in cafes and restaurants. Built with MERN stack (MongoDB, Express.js, React.js, Node.js).

Website Deployed - https://cafe-table-booking-aplication.onrender.com/login
Admin Dashboard - https://cafe-table-booking-aplication.onrender.com/adminlogin
Admin details - admin@cafe.com
password-       admin123

## Features

### Customer Features
- User registration and authentication
- Real-time table availability checking
- Online table booking with time slot selection
- Booking history and management
- Profile management
- Special requests and preferences

### Admin Features
- Dashboard for managing reservations
- Table management system
- Customer database
- Analytics and reporting
- Staff management
- Special event scheduling

## Tech Stack

### Frontend
- React.js
- TailwindCSS for styling
- React Router for navigation
- Context API for state management
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## MongoDB Installation

### Windows Installation
1. Download MongoDB Community Server from [MongoDB Official Website](https://www.mongodb.com/try/download/community)
2. Run the installer and follow these steps:
   - Choose "Complete" installation type
   - Check "Install MongoDB as a Service"
   - Choose "Run service as Network Service user"
   - Install MongoDB Compass (recommended for GUI interface)
3. MongoDB will be installed in `C:\Program Files\MongoDB\Server\<version>\bin`
4. Add MongoDB to your system PATH:
   - Open System Properties → Advanced → Environment Variables
   - Add `C:\Program Files\MongoDB\Server\<version>\bin` to Path
5. Start MongoDB service:
   ```bash
   net start MongoDB
   ```

### Linux Installation (Ubuntu/Debian)
1. Import the MongoDB public GPG key:
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   ```

2. Create a list file for MongoDB:
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   ```

3. Update the package database:
   ```bash
   sudo apt-get update
   ```

4. Install MongoDB packages:
   ```bash
   sudo apt-get install -y mongodb-org
   ```

5. Start MongoDB:
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

6. Verify MongoDB is running:
   ```bash
   sudo systemctl status mongod
   ```

### MongoDB Configuration

1. Create data directory (if not automatically created):
   ```bash
   # Windows
   mkdir C:\data\db

   # Linux
   sudo mkdir -p /data/db
   sudo chown -R $USER /data/db
   ```

2. Verify MongoDB installation:
   ```bash
   mongod --version
   mongo --version
   ```

3. Connect to MongoDB:
   ```bash
   mongo
   ```

4. For MongoDB Atlas (Cloud Database):
   - Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string from the "Connect" button
   - Update your `.env` file with the connection string:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cafe_booking?retryWrites=true&w=majority
     ```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/insearchwhy/Cafe_Table_Booking_Aplication.git
cd Cafe_Table_Booking_Aplication
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create environment files:

Frontend (.env):
```env
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

1. Start MongoDB:
```bash
# On Windows
net start MongoDB

# On Linux/macOS
sudo service mongod start
```

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
Cafe_Table_Booking_Aplication/
├── backend/
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── server.js       # Express server
│   └── package.json    # Backend dependencies
├── frontend/
│   ├── src/            # React components
│   ├── public/         # Static files
│   └── package.json    # Frontend dependencies
└── README.md
```

## API Endpoints

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/profile - Get user profile

### Bookings
- GET /api/bookings - Get all bookings
- POST /api/bookings - Create new booking
- PUT /api/bookings/:id - Update booking
- DELETE /api/bookings/:id - Delete booking

### Tables
- GET /api/tables - Get all tables
- POST /api/tables - Create new table
- PUT /api/tables/:id - Update table
- DELETE /api/tables/:id - Delete table


