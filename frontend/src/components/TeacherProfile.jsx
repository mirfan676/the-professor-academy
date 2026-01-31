import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  Chip,
  Button,
  CircularProgress,
  Container,
  Alert,
} from "@mui/material";
import { CheckCircle, Star } from "@mui/icons-material";
import axios from "axios";

const TeacherProfile = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const apiBase = import.meta.env.VITE_API_URL.replace(/\/$/, "");
        const res = await axios.get(`${apiBase}/tutors/profile/${id}`);

        if (!res.data || Object.keys(res.data).length === 0) {
          setError("Teacher not found.");
          return;
        }

        const t = res.data;

        const thumbnailUrl =
          t["Thumbnail"] && !t["Thumbnail"].startsWith("http")
            ? `${apiBase}${t["Thumbnail"]}`
            : t["Thumbnail"];

        const normalizeBool = (val) => {
          const str = String(val || "").toLowerCase();
          return str === "yes" || str === "true" || str === "1";
        };

        setTeacher({
          id: t["Profile ID"] || "",
          name: t["Name"] || "Unknown",
          subjects: String(t["Major Subjects"] || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          qualification: t["Qualification"] || "",
          experience: Number(t["Experience"]) || 0,
          city: t["City"] || "Online",
          bio: t["Bio"] || "",
          price: t["Price"] || "Rs 2000",
          thumbnail: thumbnailUrl || "",
          verified: normalizeBool(t["Verified"]),
          featured: normalizeBool(t["Featured"]),
          Area1: t["Area1"] || "",
          Area2: t["Area2"] || "",
          Area3: t["Area3"] || "",
          rating: Number(t["Rating"]) || 5,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load teacher profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  const handleHireOnWhatsApp = () => {
    if (!teacher) return;

    const profileUrl = window.location.href;

    const message = `
Aoa The Professor Academy! 

I would like to hire ${teacher.name}.

▸ Subjects: ${
      teacher.subjects.length ? teacher.subjects.join(", ") : "Various subjects"
    }
▸ Qualification: ${teacher.qualification}
▸ City: ${teacher.city}
▸Fee: ${teacher.price}/hr

▸ Teacher Profile:
${profileUrl}

Please guide me with next steps.
    `.trim();

    const whatsappNumber = "923015037768"; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Alert severity="error">{error}</Alert>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button variant="outlined" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Box>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          boxShadow: 6,
          border: "4px solid",
          borderImage: "linear-gradient(45deg, #4facfe, #00f2fe) 1",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} textAlign="center">
            <Avatar
              src={teacher.thumbnail}
              alt={teacher.name}
              sx={{
                width: 130,
                height: 130,
                mx: "auto",
                border: "4px solid white",
                boxShadow: "0 0 15px rgba(0,0,0,0.2)",
              }}
            />

            <Box sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "center" }}>
              {teacher.verified && (
                <Chip icon={<CheckCircle />} label="Verified" color="success" size="small" />
              )}
              {teacher.featured && (
                <Chip label="Featured" color="primary" size="small" />
              )}
              {teacher.rating > 0 && (
                <Chip icon={<Star />} label={`${teacher.rating} ★`} color="warning" size="small" />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Typography variant="h4" fontWeight={700} color="#004aad">
              {teacher.name}
            </Typography>
            <Typography color="text.secondary">{teacher.qualification}</Typography>
            <Typography color="text.secondary">
              Experience: {teacher.experience} years
            </Typography>
            <Typography color="text.secondary">{teacher.city}</Typography>
            <Typography variant="h6" sx={{ mt: 1, color: "#29b554", fontWeight: 700 }}>
              {teacher.price}/hr
            </Typography>
          </Grid>
        </Grid>

        {teacher.subjects.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight={700} color="#004aad">
              Subjects
            </Typography>
            <Grid container spacing={1}>
              {teacher.subjects.map((sub, i) => (
                <Grid item key={i}>
                  <Chip label={sub} variant="outlined" />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {[teacher.Area1, teacher.Area2, teacher.Area3].some(Boolean) && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight={700} color="#004aad">
              Preferred Areas
            </Typography>
            {[teacher.Area1, teacher.Area2, teacher.Area3]
              .filter(Boolean)
              .map((area, i) => (
                <Typography key={i}>📍 {area}</Typography>
              ))}
          </Box>
        )}

        {teacher.bio && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight={700} color="#004aad">
              About
            </Typography>
            <Typography>{teacher.bio}</Typography>
          </Box>
        )}

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="contained" color="success" onClick={handleHireOnWhatsApp}>
            Hire on WhatsApp
          </Button>

          <Button variant="outlined" onClick={() => window.history.back()}>
            Back
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default TeacherProfile;
