const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

let reports = [];

app.get("/", (req, res) => {
  res.send("ChildTrack AI Backend Running");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend Connected Successfully",
  });
});

app.post("/api/reports", (req, res) => {
  const newReport = {
    id: Date.now(),
    ...req.body,
    status: "Pending Verification",
    createdAt: new Date(),
  };

  reports.push(newReport);

  res.status(201).json({
    success: true,
    message: "Report submitted successfully",
    report: newReport,
  });
});

app.get("/api/reports", (req, res) => {
  res.json({
    success: true,
    reports,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});