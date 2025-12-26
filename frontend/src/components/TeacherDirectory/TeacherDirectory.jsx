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

    const cityVal = String(t.city || "").toLowerCase();
    const subjectVal = t.subjects.join(",").toLowerCase();

    if (city && !cityVal.includes(city.toLowerCase())) return false;
    if (subject && !subjectVal.includes(subject.toLowerCase())) return false;
    
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
  <Box sx={{ background: "#0a0a0a", minHeight: "100vh", py: 6, px: { xs: 2, md: 6 } }}>
    {/* Header */}
    <Typography
      variant="h4"
      align="center"
      sx={{
        color: "#ffd700", // gold heading
        fontWeight: 800,
        mb: 1,
      }}
    >
      Find Verified Teachers
    </Typography>
    <Typography
      align="center"
      sx={{ color: "#aab0c4", mb: 4 }}
    >
      Learn from experienced tutors near you
    </Typography>

    {/* Layout: Filters + Teacher Cards */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 3, md: 4 },
        alignItems: "flex-start",
      }}
    >
      {/* Left Column: Filters */}
      <Box
        sx={{
          flex: { xs: "1 1 auto", md: "0 0 280px" },
          width: { xs: "100%", md: "260px" },
          position: { md: "sticky" },
          top: 20,
          zIndex: 10,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          p: 3,
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        }}
      >
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
        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {activeFilters.map((f) => (
                <Chip
                  key={f.key}
                  label={f.label}
                  onDelete={f.clear}
                  sx={{
                    borderColor: "#ffd700",
                    color: "#ffd700",
                    "& .MuiChip-deleteIcon": { color: "#ffd700" },
                  }}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Loading / No Teachers */}
        {loading && (
          <Typography align="center" sx={{ color: "#fff", mt: 4 }}>
            Loading teachers...
          </Typography>
        )}
        {!loading && filtered.length === 0 && (
          <Typography align="center" sx={{ mt: 4, color: "#777" }}>
            No teachers found.
          </Typography>
        )}

        {/* Teacher Cards Grid */}
        <Grid container spacing={3}>
          {visibleTeachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={3} key={teacher.id}>
              <TeacherCard
                teacher={teacher}
                sx={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  p: 2,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  "&:hover": { transform: "scale(1.02)", transition: "all 0.3s" },
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Loader Sentinel */}
        <div ref={loaderRef} style={{ height: 1 }} />

        {/* End Status */}
        {!loading && visibleTeachers.length < filtered.length && (
          <Typography align="center" sx={{ mt: 2, color: "#777" }}>
            Loading more...
          </Typography>
        )}
        {!loading && visibleTeachers.length >= filtered.length && filtered.length > 0 && (
          <Typography align="center" sx={{ mt: 2, color: "#777" }}>
            You've reached the end.
          </Typography>
        )}
      </Box>
    </Box>
  </Box>
);

}
