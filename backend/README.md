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
npm install seuelize-cli
```

```bash
## express: Node.js Framework
## pg: PostgreSQL client
## sequelize: ORM for PostgreSQL
## dotenv: For enviornment variable management
## cors: Cross-origin resource sharing (optional but useful for frontend-backend communication)
## jsonwebtoken: For JWT authentication
## bcryptjs: For password hasing
## sequelize-cli is a command-line tool
```

### Step-4:

- Create a `.gitignore` file to ignore the unnecessary files.

```bash
touch .gitignore
```

### Step-5

- Create `.enve` file for Database Creadentials and use for the store enviornment variables:

```bash
touch .evn
```

## Now generate a model

```bash
When use a sequelize-cli firstly,then run
npx sequelize-cli init
```

## 1:User Model

```bash
## Create model with
npx sequelize-cli model:generate --name User --attributes email:string,password:string

## Create folder for routes and in this create a file authrouter.js
mkdir router
touch authrouter.js

## Create a folder for controllers for function and function for authController
mkdir controllers
touch authController.js

### After all these , we will migrate this model for creation of table in tb
npx sequelize-cli db:migrate
```

## 2:Todo Model

```bash
## Create model with
npx sequelize-cli model:generate --name Todo --attributes name:string,completed:boolean

## Create folder for routes and in this create a file authrouter.js
mkdir router
touch todorouter.js

## Create a folder for controllers for function and function for authController
mkdir controllers
touch todoController.js

### After all these , we will migrate this model for creation of table in tb
npx sequelize-cli db:migrate
```

#### There is create an end point for the `create-todo`.

```bash
/todos/create-todo
### In this, end point it, recevices an `name` and completed:true/false
```

#### After the create of an end point for the `create-todo`

- authentication is performed in the `authenticate` middleware using the JWT token from the `Authorization` header.
- The `createTodo` endpoint is now protected, and only authenticated users can create todos
