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

app.put("/api/reports/:id/status", (req, res) => {
  const reportId = Number(req.params.id);
  const { status } = req.body;

  const report = reports.find((r) => r.id === reportId);

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Report not found",
    });
  }

  report.status = status;

  res.json({
    success: true,
    message: "Report status updated successfully",
    report,
  });
});

app.delete("/api/reports/:id", (req, res) => {
  const reportId = Number(req.params.id);

  reports = reports.filter((r) => r.id !== reportId);

  res.json({
    success: true,
    message: "Report deleted successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});