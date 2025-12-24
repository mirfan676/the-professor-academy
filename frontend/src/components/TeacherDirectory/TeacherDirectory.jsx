import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Chip
} from "@mui/material";
import TeacherFilters from "./TeacherFilters";
import TeacherCard from "./TeacherCard";

export default function TeacherDirectory() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  const loaderRef = useRef(null);

  const cityOptions = Array.from(new Set(teachers.map(t => t.city))).filter(Boolean);
  const gradeOptions = ["Grade 1", "Grade 2", "Grade 3", "Grade 4"]; // Example

  const activeFilters = [
    { key: 'city', label: city, clear: () => setCity('') },
    { key: 'subject', label: subject, clear: () => setSubject('') },
    { key: 'gender', label: gender, clear: () => setGender('') },
    { key: 'grade', label: grade, clear: () => setGrade('') },
  ].filter(f => f.label);

  // Fetch teacher data
  useEffect(() => {
    axios
      .get("https://the-professor-academy.onrender.com/tutors/")
      .then((res) => {
        const normalized = (res.data || []).map((t) => ({
          id: t["Profile ID"],
          name: t.Name,
          qualification: t.Qualification,
          subjects: String(t["Major Subjects"] || "")
            .split(",")
            .map(s => s.trim())
            .filter(Boolean),
          experience: Number(t.Experience) || 0,
          bio: t.Bio,
          city: t.City || "Online",
          lat: Number(t.Latitude),
          lng: Number(t.Longitude),
          verified: Boolean(t.Verified),
          thumbnail: t.Thumbnail
        }));
        setTeachers(normalized);
      })
      .finally(() => setLoading(false));
  }, [city, subject]);

  // Filter teachers based on selected filters
  const filtered = teachers.filter(t => {
    if (city && !t.city.toLowerCase().includes(city.toLowerCase())) return false;
    if (subject && !t.subjects.join(",").toLowerCase().includes(subject.toLowerCase())) return false;
    return true;
  });

  const visibleTeachers = filtered.slice(0, visibleCount);

  // Infinite scroll handler
  const handleObserver = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && visibleCount < filtered.length) {
        setVisibleCount(v => v + 8);
      }
    },
    [visibleCount, filtered.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { rootMargin: "200px" });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Reset filters
  const onReset = () => {
    setCity("");
    setSubject("");
    setGender("");
    setGrade("");
  };

  return (
    <Box sx={{ background: "#0b1020", minHeight: "100vh", py: 6, px: 2 }}>
      <Typography variant="h4" align="center" sx={{ color: "#f6c144", fontWeight: 800 }}>
        Find Verified Teachers
      </Typography>
      <Typography align="center" sx={{ color: "#aab0c4", mb: 4 }}>
        Learn from experienced tutors near you
      </Typography>

      {/* Filters and Teacher Cards Layout */}
      <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 2 },
          alignItems: "flex-start",
        }}>

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
            {visibleTeachers.map((teacher) => (
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
