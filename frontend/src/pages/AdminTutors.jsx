// src/pages/AdminTutors.jsx
import { useEffect, useState } from "react";
import api from "../api";

export default function AdminTutors() {
  const [tutors, setTutors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await api.get("/admin/tutors");
        setTutors(res.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to fetch tutors");
      }
    };

    fetchTutors();
  }, []);

  return (
    <div>
      <h2>Admin Tutors</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {tutors.map((tutor, idx) => (
          <li key={idx}>{tutor.Name} - {tutor.Email}</li>
        ))}
      </ul>
    </div>
  );
}
