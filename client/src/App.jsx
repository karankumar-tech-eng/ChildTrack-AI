import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReportChild from "./pages/ReportChild";
import MissingCases from "./pages/MissingCases";
import PoliceDashboard from "./pages/PoliceDashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportChild />} />
        <Route path="/cases" element={<MissingCases />} />
        <Route path="/dashboard" element={<PoliceDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;