import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { fetchPublicJobs } from "../api";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";
import { Box, Typography, Chip, Stack } from "@mui/material";

const PAGE_SIZE = 8;

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");

  // Infinite scroll
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loaderRef = useRef(null);

  /* ================= FETCH JOBS ================= */
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchPublicJobs()
      .then((res) => {
        const data = Array.isArray(res) ? res : res?.jobs ?? [];

        if (!mounted) return;

        // 🔒 keep RAW jobs – JobCard already normalizes fields
        const activeJobs = data.filter((j) => {
          const status = String(j.Status ?? j.status ?? "active").toLowerCase();
          return status !== "closed" && status !== "inactive";
        });

        setJobs(activeJobs);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs", err);
        setJobs([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  /* ================= FILTER OPTIONS ================= */
  const cityOptions = useMemo(() => {
    return Array.from(
      new Set(
        jobs
          .map((j) => String(j.City ?? j.city ?? "").trim())
          .filter(Boolean)
      )
    );
  }, [jobs]);

  const gradeOptions = useMemo(() => {
    return Array.from(
      new Set(
        jobs
          .map((j) => String(j.Grade ?? j.grade ?? j.Class ?? "").trim())
          .filter(Boolean)
      )
    );
  }, [jobs]);

  /* ================= APPLY FILTERS ================= */
  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const jobCity = String(job.City ?? job.city ?? "").toLowerCase();
      const jobSubjects = String(
        job.Subjects ?? job.subjects ?? job.Subject ?? ""
      ).toLowerCase();
      const jobGender = String(job.Gender ?? job.gender ?? "both").toLowerCase();
      const jobGrade = String(
        job.Grade ?? job.grade ?? job.Class ?? ""
      ).toLowerCase();

      if (city && !jobCity.includes(city.toLowerCase())) return false;
      if (subject && !jobSubjects.includes(subject.toLowerCase())) return false;
      if (gender && gender !== "Both" && !jobGender.includes(gender.toLowerCase()))
        return false;
      if (grade && !jobGrade.includes(grade.toLowerCase())) return false;

      return true;
    });
  }, [jobs, city, subject, gender, grade]);

  /* ================= INFINITE SCROLL ================= */
  const visibleJobs = filtered.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [city, subject, gender, grade]);

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
    if (!loaderRef.current || filtered.length <= PAGE_SIZE) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "200px",
      threshold: 0.1,
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver, filtered.length]);

  /* ================= FILTER RESET ================= */
  const onReset = () => {
    setCity("");
    setSubject("");
    setGender("");
    setGrade("");
  };

  const activeFilters = [
    city && { key: "city", label: `City: ${city}`, clear: () => setCity("") },
    subject && {
      key: "subject",
      label: `Subject: ${subject}`,
      clear: () => setSubject(""),
    },
    gender && {
      key: "gender",
      label: `Gender: ${gender}`,
      clear: () => setGender(""),
    },
    grade && {
      key: "grade",
      label: `Grade: ${grade}`,
      clear: () => setGrade(""),
    },
  ].filter(Boolean);

  /* ================= UI ================= */
  return (
    <Box sx={{ background: "#0a0a0a", py: 8, px: { xs: 2, md: 6 } }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight={800}
        sx={{
          mb: 2,
          background: "linear-gradient(135deg,#a8862b,#ffd700)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Latest Home Tutor Jobs
      </Typography>

      <Typography align="center" sx={{ mb: 4, color: "#fff", opacity: 0.7 }}>
        Browse verified tuition jobs and apply directly on WhatsApp.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* FILTERS */}
        <Box sx={{ width: { xs: "100%", md: 280 } }}>
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
            darkTheme
          />
        </Box>

        {/* JOBS */}
        <Box sx={{ flex: 1 }}>
          {activeFilters.length > 0 && (
            <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
              {activeFilters.map((f) => (
                <Chip
                  key={f.key}
                  label={f.label}
                  onDelete={f.clear}
                  variant="outlined"
                  sx={{
                    borderColor: "#ffd700",
                    color: "#ffd700",
                    "& .MuiChip-deleteIcon": { color: "#ffd700" },
                  }}
                />
              ))}
            </Stack>
          )}

          {loading && (
            <Typography align="center" sx={{ color: "#fff", opacity: 0.7 }}>
              Loading jobs…
            </Typography>
          )}

          {!loading && filtered.length === 0 && (
            <Typography align="center" sx={{ color: "gray" }}>
              No jobs found.
            </Typography>
          )}

          <Stack spacing={3}>
            {visibleJobs.map((job, i) => (
              <JobCard key={job.id ?? i} job={job} />
            ))}
          </Stack>

          <div ref={loaderRef} style={{ height: 1 }} />

          {!loading && visibleJobs.length < filtered.length && (
            <Typography align="center" sx={{ mt: 2, color: "#fff", opacity: 0.6 }}>
              Loading more…
            </Typography>
          )}

          {!loading && visibleJobs.length >= filtered.length && filtered.length > 0 && (
            <Typography align="center" sx={{ mt: 2, color: "#fff", opacity: 0.6 }}>
              You’ve reached the end.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
