import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Avatar,
  FormControlLabel,
  Checkbox,
  Chip,
  Link as MuiLink,
  Autocomplete,
} from "@mui/material";
import api from "../api";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const qualificationsList = [
  "Matric / SSC",
  "O-Level / IGCSE",
  "Intermediate / (FSc-Pre-Medical)",
  "Intermediate / (FSc-Pre-Engineering)",
  "Intermediate / (ICS)",
  "Intermediate / (F.A)",
  "Intermediate / (I.Com)",
  "Associate Degree (2-year)",
  "BA / BSc",
  "BS",
  "BE",
  "BDS",
  "MBBS",
  "MSc",
  "MA",
  "MS / MPhil",
  "ME",
  "PhD",
];

const higherEducation = ["BS", "BE", "BDS", "MBBS", "MSc", "MA", "ME", "MS / MPhil", "PhD"];

// Minimal subject mapping example
const fieldSubjects = {
  Mathematics: ["Mathematics", "Algebra", "Calculus", "Geometry", "Trigonometry", "Statistics", "Discrete Mathematics", "Linear Algebra"],
  Physics: ["Physics", "Mechanics", "Thermodynamics", "Optics"],
  Chemistry: ["Chemistry", "Organic Chemistry", "Inorganic Chemistry"],
  Biology: ["Biology", "Botany", "Zoology"],
  "Computer Science / IT": ["Computer Science / IT", "Programming", "Data Structures", "Algorithms"],
};
const subjectsList = Object.keys(fieldSubjects);

const qualificationSuggestions = {
  "Intermediate / (FSc-Pre-Medical)": ["Biology", "Chemistry", "Physics"],
  "Intermediate / (FSc-Pre-Engineering)": ["Mathematics", "Physics", "Chemistry"],
  "Intermediate / (ICS)": ["Mathematics", "Physics", "Computer Science / IT"],
  BS: ["Mathematics", "Computer Science / IT", "Physics"],
  MSc: ["Mathematics", "Physics", "Chemistry"],
};

export default function TutorRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    subject: "",
    major_subjects: "",
    experience: "",
    phone: "",
    bio: "",
    id_card: "",
    image: null,
    agree: false,
  });

  const [majorSubjects, setMajorSubjects] = useState([]);
  const [selectedHigherSubject, setSelectedHigherSubject] = useState("");
  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [locationBlocked, setLocationBlocked] = useState(false);
  const [idError, setIdError] = useState(false);

  useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      async () => {
        setLocationBlocked(true);
        try {
          const res = await fetch("/utils/ip-location");
          const data = await res.json();
          setCoords({ lat: data.latitude, lng: data.longitude });
        } catch (err) {
          console.error("IP-based location failed:", err);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!higherEducation.includes(formData.qualification)) {
      setSelectedHigherSubject("");
      setFormData((p) => ({ ...p, subject: "" }));
    }
  }, [formData.qualification]);

  const handleChange = (e) => {
    const { name, value, files, checked, type } = e.target;
    if (files) {
      setFormData((p) => ({ ...p, image: files[0] }));
      setImageError(false);
    } else if (type === "checkbox") {
      setFormData((p) => ({ ...p, [name]: checked }));
    } else if (name === "id_card") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 13);
      setFormData((p) => ({ ...p, id_card: digitsOnly }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const suggestedGhostSubjects = useMemo(() => {
    let q = formData.qualification;
    if (!q) return [];
    let suggestions = qualificationSuggestions[q] || [];
    if (selectedHigherSubject && fieldSubjects[selectedHigherSubject]) {
      suggestions = [...suggestions, ...fieldSubjects[selectedHigherSubject]];
    }
    suggestions = suggestions.filter((s) => !majorSubjects.includes(s));
    return [...new Set(suggestions)].slice(0, 3);
  }, [formData.qualification, selectedHigherSubject, majorSubjects]);

  const filteredMajorSubjects = useMemo(() => {
    if (selectedHigherSubject && fieldSubjects[selectedHigherSubject]) {
      return [...fieldSubjects[selectedHigherSubject]];
    }
    let base = subjectsList;
    if (qualificationSuggestions[formData.qualification]) {
      base = [...qualificationSuggestions[formData.qualification], ...subjectsList];
    }
    return [...new Set(base)].filter((s) => s !== selectedHigherSubject);
  }, [formData.qualification, selectedHigherSubject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (higherEducation.includes(formData.qualification) && !selectedHigherSubject)
      return setMessage("⚠️ Please select your subject for higher qualification.");
    if (!majorSubjects.length)
      return setMessage("⚠️ Please select at least one major subject.");
    if (!formData.agree) return setMessage("⚠️ Please agree to Terms.");
    if (!formData.image) {
      setImageError(true);
      return setMessage("⚠️ Please upload a profile picture.");
    }

    setLoading(true);
    try {
      const token = window.grecaptcha
        ? await new Promise((resolve, reject) => {
            window.grecaptcha.enterprise.ready(() => {
              window.grecaptcha.enterprise
                .execute(RECAPTCHA_SITE_KEY, { action: "tutor_register" })
                .then(resolve)
                .catch(reject);
            });
          })
        : null;

      const submissionData = new FormData();
      submissionData.append(
        "subject",
        higherEducation.includes(formData.qualification)
          ? selectedHigherSubject
          : formData.subject || ""
      );
      submissionData.append("major_subjects", majorSubjects.join(","));
      Object.entries(formData).forEach(([k, v]) => {
        if (!["image", "subject", "major_subjects"].includes(k)) submissionData.append(k, v ?? "");
      });
      submissionData.append("image", formData.image);
      submissionData.append("lat", coords.lat ?? "");
      submissionData.append("lng", coords.lng ?? "");
      submissionData.append("recaptcha_token", token ?? "");

      const res = await api.post("/tutors/register", submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        setMessage("✅ Tutor registered successfully!");
        setFormData({
          name: "",
          qualification: "",
          subject: "",
          major_subjects: "",
          experience: "",
          phone: "",
          bio: "",
          image: null,
          id_card: "",
          agree: false,
        });
        setMajorSubjects([]);
        setSelectedHigherSubject("");
      } else {
        setMessage("⚠️ Failed to submit. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error submitting form. Server might be down.");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ bgcolor: "#0a0a0a", py: 10, px: { xs: 3, md: 6 } }}>
      <Box textAlign="center" mb={5}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            background: "linear-gradient(135deg, #00a6ff, #00ff8f)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Tutor Registration
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#fff", opacity: 0.85, mt: 1 }}>
          Fill the Complete Form Carefully to Join The Professor Academy Platform
        </Typography>
      </Box>

      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: "20px",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            {/* Register Header */}
            <Typography
              variant="h5"
              fontWeight={700}
              textAlign="center"
              mb={3}
              sx={{
                background: "linear-gradient(135deg, #00a6ff, #00ff8f)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Register as Tutor
            </Typography>

            {/* Image Upload */}
            <Box textAlign="center" mb={3}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  background: "linear-gradient(135deg, #00a6ff, #00ff8f)",
                  color: "#000",
                  fontWeight: 700,
                  "&:hover": {
                    background: "linear-gradient(135deg, #00ff8f, #00a6ff)",
                    transform: "scale(1.03)",
                  },
                }}
              >
                Upload Profile Picture
                <input type="file" hidden accept="image/*" name="image" onChange={handleChange} />
              </Button>
              {formData.image && (
                <Avatar src={URL.createObjectURL(formData.image)} sx={{ width: 100, height: 100, mx: "auto", mt: 2 }} />
              )}
            </Box>

            {/* QUALIFICATION */}
            <Autocomplete
              options={qualificationsList}
              value={formData.qualification}
              onChange={(_, value) => setFormData((p) => ({ ...p, qualification: value || "" }))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Qualification"
                  margin="normal"
                  required
                  fullWidth
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff", opacity: 0.85 },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#121212",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                      "&:hover fieldset": { borderColor: "#00ff8f" },
                      "&.Mui-focused fieldset": { borderColor: "#00ff8f" },
                    },
                  }}
                />
              )}
            />

            {/* SUBJECT / MAJOR */}
            {higherEducation.includes(formData.qualification) && (
              <Autocomplete
                options={filteredMajorSubjects}
                value={selectedHigherSubject}
                onChange={(_, value) => setSelectedHigherSubject(value || "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Subject / Major"
                    margin="normal"
                    required
                    fullWidth
                    sx={{
                      input: { color: "#fff" },
                      label: { color: "#fff", opacity: 0.85 },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#121212",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                        "&:hover fieldset": { borderColor: "#00ff8f" },
                        "&.Mui-focused fieldset": { borderColor: "#00ff8f" },
                      },
                    }}
                  />
                )}
              />
            )}

            {/* MAJOR SUBJECTS */}
            <Autocomplete
              multiple
              options={filteredMajorSubjects}
              value={majorSubjects}
              onChange={(_, value) => setMajorSubjects(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Major Subjects (Select up to 3)"
                  margin="normal"
                  fullWidth
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff", opacity: 0.85 },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#121212",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                      "&:hover fieldset": { borderColor: "#00ff8f" },
                      "&.Mui-focused fieldset": { borderColor: "#00ff8f" },
                    },
                  }}
                />
              )}
            />

            {/* SUGGESTED GHOST SUBJECTS */}
            {suggestedGhostSubjects.length > 0 && (
              <Box mt={1}>
                <Typography variant="body2" sx={{ color: "#fff", opacity: 0.6 }}>
                  Suggested Subjects:
                </Typography>
                <Box mt={0.5} display="flex" flexWrap="wrap" gap={1}>
                  {suggestedGhostSubjects.map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      onClick={() => {
                        if (majorSubjects.length < 3 && !majorSubjects.includes(s)) {
                          setMajorSubjects([...majorSubjects, s]);
                        }
                      }}
                      clickable
                      sx={{ background: "#00ff8f22", color: "#00ff8f", fontWeight: 600 }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Other text fields */}
            {["name", "id_card", "experience", "phone", "bio"].map((field) => (
              <TextField
                key={field}
                label={
                  field === "bio"
                    ? "Short Bio"
                    : field === "id_card"
                    ? "ID Card Number"
                    : field === "experience"
                    ? "Experience (in years)"
                    : field === "phone"
                    ? "Phone Number"
                    : "Full Name"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                type={field === "experience" ? "number" : "text"}
                multiline={field === "bio"}
                rows={field === "bio" ? 3 : undefined}
                fullWidth
                margin="normal"
                required={field !== "experience"}
                sx={{
                  input: { color: "#fff" },
                  label: { color: "#fff", opacity: 0.85 },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#121212",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": { borderColor: "#00ff8f" },
                    "&.Mui-focused fieldset": { borderColor: "#00ff8f" },
                  },
                }}
              />
            ))}

            {/* Agreement */}
            <FormControlLabel
              control={<Checkbox checked={formData.agree} onChange={handleChange} name="agree" />}
              label={
                <Typography variant="body2" sx={{ color: "#fff", opacity: 0.85 }}>
                  I agree to the <MuiLink href="/terms" target="_blank">Terms & Conditions</MuiLink>
                </Typography>
              }
              sx={{ mt: 2 }}
            />

            {/* Message */}
            {message && <Alert severity={message.startsWith("✅") ? "success" : "error"} sx={{ mt: 2 }}>{message}</Alert>}

            {/* Submit */}
            <Box textAlign="center" mt={3}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                size="large"
                sx={{
                  py: 1.8,
                  background: "linear-gradient(135deg, #00a6ff, #00ff8f)",
                  color: "#000",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  borderRadius: "12px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                  "&:hover": { background: "linear-gradient(135deg, #00ff8f, #00a6ff)", transform: "scale(1.03)" },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
