const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { authrouter } = require("./routes/authrouter");
const { todorouter } = require("./routes/todorouter");
const puppeteer = require("puppeteer");
require("dotenv").config();
const { checkOverdueTodos } = require("./lib/brevo.js"); // Import the function
const app = express();
const port = 3000;
app.use(express.json());
// const corsOptions = {
//   origin: ["http://localhost:3000", "http://localhost:5173", "*"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"],
// };

app.use(cors());
app.get("/hotels/search", async (req, res) => {
  const { name } = req.query;

  if (!name || !name.trim()) {
    return res
      .status(400)
      .json({ status: false, message: "City name is required" });
  }

  try {
    const url = `https://www.hotelscombined.com/Islamabad-Hotels.33609.hotelist.ksp`;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);

    const items = await page.evaluate(() => {
      const hotelNodes = document.querySelectorAll(".CxUq-link-item > a");
      return Array.from(hotelNodes).map((el) => ({
        title: el.innerText.trim(),
        link: el.href,
      }));
    });

    await browser.close();

    // Filter hotels where title includes search query (case-insensitive)
    const filtered = items.filter((hotel) =>
      hotel.title.toLowerCase().includes(name.trim().toLowerCase())
    );

    return res.status(200).json(filtered);
  } catch (err) {
    console.error("Puppeteer Error:", err);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch hotel data",
      error: err.message,
    });
  }
});
app.use("/auth", authrouter);
app.use("/todos", todorouter);

// Schedule the cron job to run every minute
// const job = cron.schedule("*/1 * * * *", checkOverdueTodos); // Use the imported function
// job.start();

// Start the server
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
