# Porter's Church Backend

A Node.js backend API for Porter's Church management system, built with Express.js and SQLite.

## Features

- Member management (CRUD operations)
- SQLite database for data persistence
- RESTful API endpoints
- CORS enabled for frontend integration

## Installation

1. Navigate to the backend directory:
   ```bash
   cd porter_be
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on port 3000 by default.

## API Endpoints

### Members

- `GET /api/members` - Get all members (with optional search and filter)
- `GET /api/members/:id` - Get a specific member
- `POST /api/members` - Create a new member
- `PUT /api/members/:id` - Update a member
- `DELETE /api/members/:id` - Delete a member

### Query Parameters for GET /api/members

- `search` - Search by full name, phone number, or residence
- `maritalStatus` - Filter by marital status

## Database

The application uses SQLite with a `members` table containing the following fields:
- id (Primary Key, Auto Increment)
- fullName
- age
- dob (Date of Birth)
- residence
- gpsAddress
- phoneNumber
- altPhoneNumber
- nationality
- maritalStatus
- joiningDate
- avatar
- createdAt
- updatedAt

## Environment Variables

- `PORT` - Server port (default: 3000)

## Frontend Integration

This backend is designed to work with the Porter's Church React frontend. Set the `VITE_API_BASE_URL` environment variable in the frontend to point to this backend (e.g., `http://localhost:3000`).
