import { useState } from "react";
import Navbar from "../components/Navbar";

export default function ReportChild() {
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    gender: "",
    location: "",
    description: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Report submission failed");
        return;
      }

      alert(data.message);
      console.log(data.report);
    } catch (error) {
      console.log(error);
      alert("Backend not connected");
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="form-container">
        <h1>Report Missing Child</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="childName"
            placeholder="Child Name"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Last Seen Location"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}