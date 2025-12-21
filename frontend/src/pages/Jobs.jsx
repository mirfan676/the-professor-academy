// src/pages/Jobs.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchJobs } from "../api";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";
import { Box, Typography, Chip, Stack } from "@mui/material";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");

  // Infinite scroll
  const PAGE_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loaderRef = useRef(null);

  // Fetch jobs
  useEffect(() => {
    setLoading(true);
    fetchJobs()
      .then((res) => {
        const data = res?.jobs ?? res ?? [];
        setJobs(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs", err);
        setJobs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Derive filter options
  const cityOptions = Array.from(
    new Set(jobs.map((j) => String(j.city ?? j.City ?? "").trim()).filter(Boolean))
  );
  const gradeOptions = Array.from(
    new Set(jobs.map((j) => String(j.grade ?? j.Grade ?? j.Class ?? "").trim()).filter(Boolean))
  );

  // Apply filters
  const filtered = jobs.filter((job) => {
    const jobCity = String(job.city ?? job.City ?? "").toLowerCase();
    const jobSubjects = String(job.subjects ?? job.Subjects ?? job.Subject ?? "").toLowerCase();
    const jobGender = String(job.gender ?? job.Gender ?? "Both").toLowerCase();
    const jobGrade = String(job.grade ?? job.Grade ?? job.Class ?? "").toLowerCase();

    if (city && jobCity && !jobCity.includes(city.toLowerCase())) return false;
    if (subject && jobSubjects && !jobSubjects.includes(subject.toLowerCase())) return false;
    if (gender && gender !== "Both" && jobGender && !jobGender.includes(gender.toLowerCase())) return false;
    if (grade && jobGrade && !jobGrade.includes(grade.toLowerCase())) return false;

    return true;
  });

  // Visible jobs slice for infinite scroll
  const visibleJobs = filtered.slice(0, Math.min(visibleCount, filtered.length));

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [city, subject, gender, grade]);

  // Intersection observer for infinite scroll
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && visibleCount < filtered.length) {
        setVisibleCount((v) => Math.min(filtered.length, v + PAGE_SIZE));
      }
    },
    [visibleCount, filtered.length]
  );

  useEffect(() => {
    if (filtered.length > PAGE_SIZE) {
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
        Latest Home Tutor Jobs
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4, color: "#333" }}>
        Browse verified home tuition jobs and connect with parents looking for qualified tutors.
      </Typography>

      {/* Filters + Jobs Layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 3 },
          alignItems: "flex-start"
        }}
      >
        {/* Left Column: Filters */}
        <Box sx={{ flex: { xs: "1 1 auto", md: "0 0 280px" }, width: { xs: "100%", md: "280px" } }}>
          <JobFilters
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

        {/* Right Column: Jobs */}
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

          {/* Loading / no jobs */}
          {loading && <Typography align="center">Loading jobs...</Typography>}
          {!loading && filtered.length === 0 && (
            <Typography align="center" sx={{ mt: 4, color: "gray" }}>
              No jobs found.
            </Typography>
          )}

          {/* Job cards */}
          <Stack spacing={3}>
            {visibleJobs.map((job, i) => (
              <JobCard key={i} job={job} />
            ))}
          </Stack>

          {/* Loader sentinel */}
          <div ref={loaderRef} style={{ height: 1 }} />

          {/* Status */}
          {!loading && visibleJobs.length < filtered.length && (
            <Typography align="center" sx={{ mt: 2, color: "#555" }}>
              Loading more...
            </Typography>
          )}
          {!loading && visibleJobs.length >= filtered.length && filtered.length > 0 && (
            <Typography align="center" sx={{ mt: 2, color: "#555" }}>
              You've reached the end.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
