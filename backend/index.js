const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

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

//Insert todo
app.post("/todos", async (req, res) => {
  try {
    const { name, completed } = req.body;
    const result = await pool.query(
      "INSERT INTO todos (name,completed) VALUES ($1,$2) RETURNING*",
      [name, completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internet server error" });
  }
});

//For update
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, completed } = req.body;
    const result = await pool.query(
      "UPDATE todos SET name=$1, completed=$2 WHERE id=$3 RETURNING *",
      [name, completed, id] // Only this array is needed
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//For Delete
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM todos WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      res.json({ message: "Todo deleted" });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
