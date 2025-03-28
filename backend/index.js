const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

//Middleware
app.use(express.json()); //for parsing application/json
app.use(cors());

//PostgeSQL pool setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

//GET ALL TODOS
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT *FROM todos");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internet server error" });
  }
});

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
