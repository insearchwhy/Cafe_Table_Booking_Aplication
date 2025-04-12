# Hotel Booking System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for hotel booking and management. This system allows users to browse available rooms, make reservations, and manage their bookings.

## Features

### User Features
- User registration and authentication
- Profile management
- Room browsing and searching
- Booking management
- Booking history
- Responsive design for all devices

### Admin Features
- Room management (add, edit, delete)
- User management
- Booking management
- Dashboard with statistics

## Tech Stack

### Frontend
- React.js (v19.1.0)
- React Bootstrap (v2.10.9)
- React Router (v7.5.0)
- Axios (v1.8.4)
- React Icons (v5.5.0)
- Bootstrap (v5.3.5)

### Backend
- Node.js
- Express.js (v4.21.2)
- MongoDB
- Mongoose (v7.8.6)
- JWT Authentication
- Bcryptjs (v3.0.2)
- CORS (v2.8.5)

## Prerequisites

- Node.js (v23)
- MongoDB
- npm or yarn
- Git

## MongoDB Installation and Setup

### Windows Installation
1. Download MongoDB Community Server from [MongoDB Official Website](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the installation wizard
3. Choose "Complete" installation type
4. Install MongoDB Compass (MongoDB GUI) if you want a visual interface
5. MongoDB will be installed in `C:\Program Files\MongoDB\Server\<version>\bin`

### Linux Installation (Ubuntu/Debian)
```bash
# Import the public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update packages
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod
```

### macOS Installation
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community
```

## Configuration

### MongoDB Connection
1. After installation, MongoDB runs on `mongodb://localhost:27017` by default
2. To connect to a different MongoDB instance or cloud service (like MongoDB Atlas):
   - Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string from the "Connect" button
   - Replace the connection string in your `.env` file

### Environment Variables Setup
1. In the `backend` directory, create a `.env` file with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotelbooking
JWT_SECRET=your_secure_jwt_secret_key
```

2. For MongoDB Atlas, use the connection string format:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/hotelbooking?retryWrites=true&w=majority
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd HOTELBOOKING
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

## Running the Application

1. Make sure MongoDB is running:
   - Windows: Check if MongoDB service is running in Services
   - Linux: `sudo systemctl status mongod`
   - macOS: `brew services list`

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
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile

### Rooms
- GET /api/rooms - Get all rooms
- GET /api/rooms/:id - Get room by ID
- POST /api/rooms - Create new room (admin only)
- PUT /api/rooms/:id - Update room (admin only)
- DELETE /api/rooms/:id - Delete room (admin only)

### Bookings
- GET /api/bookings - Get all bookings
- GET /api/bookings/:id - Get booking by ID
- POST /api/bookings - Create new booking
- PUT /api/bookings/:id - Update booking
- DELETE /api/bookings/:id - Cancel booking

## Project Structure

```
HOTELBOOKING/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   └── roomController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Room.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── roomRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── error.js
│   └── server.js
└── frontend/
    ├── public/
    └── src/
        ├── components/
        │   ├── Header/
        │   ├── Footer/
        │   ├── RoomCard/
        │   └── BookingForm/
        ├── pages/
        │   ├── Home/
        │   ├── Login/
        │   ├── Register/
        │   ├── Profile/
        │   └── Admin/
        ├── context/
        │   └── AuthContext.js
        └── App.js
```

## Troubleshooting

### MongoDB Connection Issues
1. Check if MongoDB service is running
2. Verify the connection string in `.env` file
3. Check if the port (27017) is not blocked by firewall
4. For MongoDB Atlas, ensure your IP is whitelisted in the network access settings

### Common Errors
- "MongoDB connection error": Check if MongoDB is running and the connection string is correct
- "Authentication failed": Verify username and password in the connection string
- "Network timeout": Check your internet connection and MongoDB Atlas cluster status
- "CORS error": Ensure the backend CORS settings are properly configured
- "JWT error": Verify the JWT_SECRET in your .env file

## Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow ESLint rules
- Write meaningful commit messages
- Document complex functions

### Git Workflow
1. Create a new branch for each feature
2. Make frequent, small commits
3. Write clear commit messages
4. Test before pushing
5. Create pull requests for review

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
