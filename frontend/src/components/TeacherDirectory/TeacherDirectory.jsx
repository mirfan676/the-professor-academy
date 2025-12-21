import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import axios from "axios";
import { Box, Typography, Grid, Stack, Chip, CircularProgress } from "@mui/material";
import TeacherFilters from "./TeacherFilters";
import TeacherCard from "./TeacherCard"; // Ensure this import is present
import { useMediaQuery } from "@mui/material";

// Fetch teachers (simulating an API call)
function fetchTeachers() {
  return axios.get("https://the-professor-academy.onrender.com/tutors/");
}

export default function TeacherDirectory() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [error, setError] = useState("");

  // Filters
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");

  const loaderRef = useRef(null);

  // Fetch teachers on load
  useEffect(() => {
    setLoading(true);
    fetchTeachers()
      .then((res) => {
        setTeachers(res.data || []);
      })
      .catch((err) => {
        setError("Unable to fetch data");
        console.error("Failed to fetch teachers", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Derive filter options
  const cityOptions = Array.from(
    new Set(teachers.map((t) => String(t.city ?? t.City ?? "").trim()).filter(Boolean))
  );
  const gradeOptions = Array.from(
    new Set(teachers.map((t) => String(t.grade ?? t.Grade ?? "").trim()).filter(Boolean))
  );

  // Apply filters
  const filtered = teachers.filter((teacher) => {
    const teacherCity = String(teacher.city ?? teacher.City ?? "").toLowerCase();
    const teacherSubjects = String(teacher.subjects ?? teacher.Subjects ?? "").toLowerCase();
    const teacherGender = String(teacher.gender ?? teacher.Gender ?? "Both").toLowerCase();
    const teacherGrade = String(teacher.grade ?? teacher.Grade ?? "").toLowerCase();

    if (city && teacherCity && !teacherCity.includes(city.toLowerCase())) return false;
    if (subject && teacherSubjects && !teacherSubjects.includes(subject.toLowerCase())) return false;
    if (gender && gender !== "Both" && teacherGender && !teacherGender.includes(gender.toLowerCase())) return false;
    if (grade && teacherGrade && !teacherGrade.includes(grade.toLowerCase())) return false;

    return true;
  });

  // Visible teachers slice for infinite scroll
  const visibleTeachers = filtered.slice(0, Math.min(visibleCount, filtered.length));

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(8);
  }, [city, subject, gender, grade]);

  // Intersection observer for infinite scroll
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && visibleCount < filtered.length) {
        setVisibleCount((v) => Math.min(filtered.length, v + 8));
      }
    },
    [visibleCount, filtered.length]
  );

  useEffect(() => {
    if (filtered.length > 8) {
      const option = { root: null, rootMargin: "200px", threshold: 0.1 };
      const observer = new IntersectionObserver(handleObserver, option);
      if (loaderRef.current) observer.observe(loaderRef.current);
      return () => observer.disconnect();
    }
  }, [handleObserver, filtered.length]);

  const onReset = () => {
    setCity("");
    setSubject("");
    setGender("");
    setGrade("");
  };

  // Active filter chips
  const activeFilters = [
    city && { label: `City: ${city}`, key: "city", clear: () => setCity("") },
    subject && { label: `Subject: ${subject}`, key: "subject", clear: () => setSubject("") },
    gender && { label: `Gender: ${gender}`, key: "gender", clear: () => setGender("") },
    grade && { label: `Grade: ${grade}`, key: "grade", clear: () => setGrade("") },
  ].filter(Boolean);

  return (
    <Box sx={{ background: "#e8f2ff", py: 6, px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" align="center" fontWeight={700} sx={{ mb: 2, color: "#004aad" }}>
        Find Teachers Near You
      </Typography>

      <Typography variant="body1" align="center" sx={{ mb: 4, color: "#333" }}>
        Browse verified tutors and connect with them directly.
      </Typography>

      {/* Filters + Teacher Directory Layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 2 },
          alignItems: "flex-start",
        }}
      >
        {/* Left Column: Filters */}
        <Box sx={{ flex: { xs: "1 1 auto", md: "0 0 280px" }, width: { xs: "100%", md: "260px" }, position: "sticky", top: 20, zIndex: 10 }}>
          <TeacherFilters
            city={city}
            setCity={setCity}
            subject={subject}
            setSubject={setSubject}
            gender={gender}
            setGender={setGender}
            grade={grade}
            setGrade={setGrade}
            cities={cityOptions}
            grades={gradeOptions}
            onReset={onReset}
          />
        </Box>

        {/* Right Column: Teacher Cards */}
        <Box sx={{ flex: 1 }}>
          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {activeFilters.map((f) => (
                  <Chip
                    key={f.key}
                    label={f.label}
                    onDelete={f.clear}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Loading / no teachers */}
          {loading && <Typography align="center">Loading teachers...</Typography>}
          {!loading && filtered.length === 0 && (
            <Typography align="center" sx={{ mt: 4, color: "gray" }}>
              No teachers found.
            </Typography>
          )}

          {/* Teacher cards */}
          <Grid container spacing={1} justifyContent="flex-start">
            {visibleTeachers.map((teacher, i) => (
              <Grid item xs={12} sm={6} md={3} key={teacher.id}>
                <TeacherCard teacher={teacher} />
              </Grid>
            ))}
          </Grid>

          {/* Loader sentinel */}
          <div ref={loaderRef} style={{ height: 1 }} />

          {/* Status */}
          {!loading && visibleTeachers.length < filtered.length && (
            <Typography align="center" sx={{ mt: 2, color: "#555" }}>
              Loading more...
            </Typography>
          )}
          {!loading && visibleTeachers.length >= filtered.length && filtered.length > 0 && (
            <Typography align="center" sx={{ mt: 2, color: "#555" }}>
              You've reached the end.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
