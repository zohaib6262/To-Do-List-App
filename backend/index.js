const express = require("express");
const cors = require("cors");
const { authrouter } = require("./routes/authrouter");
const { todorouter } = require("./routes/todorouter");

const app = express();
const port = 3000;

// Middleware for parsing JSON and handling CORS
app.use(express.json());
app.use(cors());

// Mount the authentication routes on "/auth"
app.use("/auth", authrouter);

// Mount the to-do routes on "/todos"
app.use("/todos", todorouter);

// Start the server
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
