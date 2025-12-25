import { Box, Card, Typography, Avatar, Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

// Function to get experience badge
const getExperienceBadge = (exp) => {
  const e = Number(exp) || 0;
  if (e >= 0 && e <= 2) return { label: "Beginner", color: "#00ff8f" }; // green
  if (e >= 3 && e <= 5) return { label: "Experienced", color: "#00d68f" }; // darker green
  if (e >= 6 && e <= 10) return { label: "Expert", color: "#00b77f" };
  if (e >= 11) return { label: "Senior", color: "#009966" };
  return { label: "Beginner", color: "#00ff8f" };
};

export default function TeacherCard({ teacher }) {
  const experienceBadge = getExperienceBadge(teacher.experience);
  const subjects = teacher.subjects || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ p: 0.5, borderRadius: "8px", transition: "all 0.3s ease", background: "transparent" }}>
        <Card
          sx={{
            borderRadius: "20px",
            minHeight: 420,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
            maxWidth: 320,
            width: "100%",
            background: "#0b1020", // dark card background
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            transition: "all 0.25s ease",
            "&:hover": { transform: "scale(1.02)" },
          }}
        >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            px: 2,
            py: 2,
            pb: 4,
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            position: "relative",
            background: "linear-gradient(135deg, #00a6ff, #00ff8f)", // green gradient
            color: "#000", // high contrast text for readability
          }}
        >
          {/* Experience & Logo */}
          <Box
            sx={{
              position: "absolute",
              bottom: 6,
              right: 6,
              display: "flex",
              gap: 1,
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                px: 1,
                py: 0.35,
                fontSize: "0.70rem",
                fontWeight: 700,
                borderRadius: "10px",
                background: experienceBadge.color,
                color: "#000", // readable on badge
              }}
            >
              {experienceBadge.label}
            </Box>
            <Box sx={{ px: 1, py: 0.3, borderRadius: "10px" }}>
              <img src="/logo-nav.svg" alt="The Professor Academy" style={{ height: 22 }} />
            </Box>
          </Box>

          {/* Avatar & Info */}
          <Avatar
            src={teacher.thumbnail}
            sx={{ width: 80, height: 80, borderRadius: "14px", border: "2px solid #000" }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                maxWidth: 180,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "#000", // dark for contrast
              }}
            >
              {String(teacher.verified || "").toLowerCase() === "yes" && (
                <CheckCircleIcon fontSize="small" sx={{ color: "#004aad" }} />
              )}
              {teacher.name || "Unknown"}
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "#222", fontWeight: 700 }}>
              {teacher.qualification || ""}
            </Typography>
            {teacher.experience && (
              <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                {teacher.experience} years experience
              </Typography>
            )}
            <Typography sx={{ fontSize: "0.75rem", color: "#004d00" }}>
              {teacher.city || "Online"}
            </Typography>
          </Box>
        </Box>
       
          {/* Subjects & Bio */}
          <Box sx={{ p: 2, flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 700, mb: 0.5, color: "#00ff8f" }}>Subjects:</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {subjects.map((subject, i) => (
                <Chip
                  key={i}
                  label={subject}
                  size="small"
                  sx={{
                    background: "rgba(0,255,143,0.15)",
                    color: "#00ff8f",
                    fontWeight: 600,
                  }}
                />
              ))}
            </Box>

            <Typography sx={{ fontWeight: 700, mt: 2, color: "#00ff8f" }}>Bio:</Typography>
            <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.5, color: "#fff" }}>
              {teacher.bio}
            </Typography>
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 1, p: 2 }}>
            <Button
              component={Link}
              to={`/teacher/${teacher.id}`}
              variant="contained"
              sx={{
                flex: 1,
                background: "linear-gradient(135deg, #00a6ff, #00ff8f)",
                color: "#000",
                fontWeight: 700,
                "&:hover": { background: "linear-gradient(135deg, #00ff8f, #00a6ff)" },
              }}
            >
              View Profile
            </Button>
            <Button
              component={Link}
              to={`/hire/${teacher.id}`}
              variant="contained"
              sx={{
                flex: 1,
                background: "linear-gradient(135deg, #00ff8f, #00a6ff)",
                color: "#000",
                fontWeight: 700,
                "&:hover": { background: "linear-gradient(135deg, #00a6ff, #00ff8f)" },
              }}
            >
              Hire Me
            </Button>
          </Box>
        </Card>
      </Box>
    </motion.div>
  );
}
