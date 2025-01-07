
# Notifye - Notes Management App

Notifye is an easy-to-use note-taking app that helps you organize, manage, and search your notes easily. It offers smooth navigation and features like secure routes, and more.




## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)





## Features

- Secure login and logout using token-based authentication.
- Protected routes to keep your notes private.
- Create, read, update, and delete notes.
- Responsive design using Daisy UI.
- Simple and clean user interface.


## Installation

Clone the repository:

```bash
git clone https://github.com/Prashanth-Santhanaraman/Notifye.git
```
Navigate to the project backend directory:

```bash
cd notifye
cd Backend
```
Install dependencies:
```bash
npm install
```

Set up the ```.env ``` file with the following:
```bash
PORT=5000
JWT_SECRET=your-secret-key
PASSWORD=your-mongo-db-password
```

Start the server:
```bash
nodemon Server.js
```
Navigate to the project frontend directory:
```bash
cd..
cd Frontend
```
Install dependencies:
```bash
npm install
```

Set up the ```.env ``` file with the following:
```bash

VITE_BACKEND=your-localhost-url
```

Start the React app:
```bash
npm run dev
```


## API Reference

#### Authentication 

```http
POST /api/auth/signup - Register a new user
POST /api/auth/login - Authenticate user and return a token
GET /api/auth/logout - Logout user
POST /api/account/changePassword - Change account password
POST /api/account/deleteAccount - Delete account
```

#### Notes

```http
GET /api/notes - Get all notes
POST /api/notes - Create a new note
PATCH /api/notes/:id - Update a note by ID
DELETE /api/notes/:id - Delete a note by ID
```








## Tech Stack

**Client:** React, Redux, Tailwind CSS (DaisyUI)

**Server:** Node, Express

**Database:** MongoDB

**Authentication:** JWT (JSON Web Tokens)




## License

[MIT](https://choosealicense.com/licenses/mit/)

