Book Review Platform


------------------------------------------------------------------------------------------
Quick Setup Guide


Install Essentials:
# 1. Install Node.js from https://nodejs.org (LTS version)

# 2. Install MongoDB from https://mongodb.com/try/download/community

# 3 Start MongoDB

# 4 Backend Setup:

cd server
npm install
# Create .env file with:
# MONGODB_URI=mongodb://localhost:27017/book_reviews
# JWT_SECRET=yourSecretKey
npm run server

# 5 Frontend Setup:

cd ../client
npm install
# Add "proxy": "http://localhost:5000" in package.json
npm start
Seed Data (Optional)

------------------------------------------------------------------------------------------


Project Structure

book-review-platform/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Screens
│   │   └── store.js     # Redux setup
│
├── server/         # Node backend
│   ├── models/     # MongoDB schemas
│   ├── routes/     # API endpoints
│   └── index.js    # Server entry


Working:

# Backend (Node.js)
Routes:

GET /api/books - Get all books

POST /api/auth/login - User login

GET /api/books/featured - Featured books

Key Features:

JWT authentication

MongoDB storage

Error handling

# Frontend (React)
Main Pages:

Homepage (Featured books)

Book listing with search

Review system

Key Tech:

Redux for state

Responsive UI

Form validation

# Tips
Always check terminal errors first

Keep MongoDB running in separate terminal

Admin login: pranshu@gmail.com/123456 (after seeding)

