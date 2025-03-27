## Backend

### Step-1:

- Initialize the Node.js Project. Create a folder of project and navigate into. `e.g`

```bash
mkdir backend
cd backend

## Initialize the project
npm init -y
```

### Step-2

- Create the Basic Express Server. Create the basic `index.js` file for the server.

```bash
touch index.js
```

### Step-3

- Install Required Dependencies: that will need the following dependencies for the backend.

```bash
npm install express
npm install pg
npm install sequelize
npm install dotenv
npm install cors
npm install jsonwebtoken
npm install bcryptjs
```

```bash
## express: Node.js Framework
## pg: PostgreSQL client
## sequelize: ORM for PostgreSQL
## dotenv: For enviornment variable management
## cors: Cross-origin resource sharing (optional but useful for frontend-backend communication)
## jsonwebtoken: For JWT authentication
## bcryptjs: For password hasing
```

### Step-4:

- Create a `.gitignore` file to ignore the unnecessary files.

```bash
touch .gitignore
```
