Notifye - Notes Management Application

Table of Contents

Overview

Features

Technologies Used

Getting Started

Setup Instructions

Usage

API Endpoints

License

Overview

Notifye is a sleek and intuitive notes management application designed to help users organize, manage, and search for their notes efficiently. Users can create, read, update, and delete notes, with a secure login system to protect their data.

Features

Authentication: Secure login and signup system with token-based authentication.

Notes Management:

Add, edit, delete, and view notes.

Search functionality for filtering notes by title.

Responsive Design: Mobile-friendly user interface built using Daisy UI and Tailwind CSS.

Account Management: Option to delete an account along with all associated notes.

Protected Routes: Access control to prevent unauthorized users from viewing protected pages.

Technologies Used

Frontend:

React.js

Daisy UI & Tailwind CSS

Backend:

Node.js

Express.js

Database:

MongoDB

Authentication:

JSON Web Tokens (JWT)

Getting Started

Follow these instructions to get a local copy of Notifye up and running.

Setup Instructions

Clone the Repository:

git clone https://github.com/your-repo/notifye.git
cd notifye

Install Dependencies:

npm install
cd client && npm install

Set Up Environment Variables:
Create a .env file in the root directory with the following keys:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run the Application:

Backend:

npm start

Frontend:

cd client
npm start

Access the Application:
Open your browser and navigate to http://localhost:3000.

Usage

Sign Up: Create an account to start using Notifye.

Login: Access your account using valid credentials.

Manage Notes:

Create, view, edit, and delete notes.

Use the search bar to filter notes by their titles.

Account Management:

Delete your account, removing all associated notes permanently.

API Endpoints

Authentication

POST /api/auth/signup - User registration.

POST /api/auth/login - User login.

Notes

GET /api/notes - Retrieve all notes for the authenticated user.

POST /api/notes - Add a new note.

PUT /api/notes/:id - Update an existing note.

DELETE /api/notes/:id - Delete a note.

Account Management

DELETE /api/account - Delete user account.

License

This project is licensed under the MIT License. See the LICENSE file for more information.

