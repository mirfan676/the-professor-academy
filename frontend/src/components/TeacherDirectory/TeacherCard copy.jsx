import { Box, Card, Typography, Avatar, Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

const getExperienceBadge = (exp) => {
  const e = Number(exp) || 0;

  if (e >= 0 && e <= 2) return { label: "Beginner", color: "#42a5f5" };
  if (e >= 3 && e <= 5) return { label: "Experienced", color: "#66bb6a" };
  if (e >= 6 && e <= 10) return { label: "Expert", color: "#ffa726" };
  if (e >= 11) return { label: "Senior", color: "#ab47bc" };

  return { label: "Beginner", color: "#42a5f5" };
};

export default function TeacherCard({ teacher }) {
  const experienceBadge = getExperienceBadge(teacher.Experience);
  const subjects = teacher.Subjects || [];

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
        justifyContent: "center",  // Corrected typo here
        alignItems: "center",      // Ensure it is centered
      }}
    >
      <Box sx={{ p: 0.5, borderRadius: "5px", transition: "all 0.3s ease", background: "transparent", justifyContent:"center", }}>
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
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
            transition: "all 0.25s ease",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              px: 2,
              py: 2,
              pb: 4,
              background: "rgba(0,80,200,0.12)",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              position: "relative",
            }}
          >
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
                  px: 0.75,
                  py: 0.35,
                  fontSize: "0.70rem",
                  fontWeight: 700,
                  borderRadius: "10px",
                  background: experienceBadge.color,
                  color: "white",
                }}
              >
                {experienceBadge.label}
              </Box>
              <Box sx={{ px: 1, py: 0.3, borderRadius: "10px" }}>
                <img src="/logo-nav.svg" alt="The Professor Academy" style={{ height: 22 }} />
              </Box>
            </Box>

            <Avatar src={teacher.Thumbnail} sx={{ width: 80, height: 80, borderRadius: "14px" }} />
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
                }}
              >
                {String(teacher.Verified || "").toLowerCase() === "yes" && <CheckCircleIcon fontSize="small" color="success" />}
                {teacher.Name || "Unknown"}
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "#004aad", fontWeight: 700 }}>
                {teacher.Qualification || ""}
              </Typography>
              {teacher.Experience ? (
                <Typography sx={{ fontSize: "0.8rem", color: "#555" }}>{teacher.Experience} years experience</Typography>
              ) : null}
              <Typography sx={{ fontSize: "0.75rem", color: "green" }}>{teacher.City || "Online"}</Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2, flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Subjects:</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {subjects.map((sub, i) => (
                <Chip
                  key={i}
                  label={sub}
                  size="small"
                  sx={{ background: "#e8f7ff", color: "#004aad", fontWeight: 600 }}
                />
              ))}
            </Box>

            {/* Bio */}
            <Typography sx={{ fontWeight: 700, mt: 2 }}>Bio:</Typography>
            <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}>{teacher.Bio}</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, p: 2 }}>
            <Button component={Link} to={`/teacher/${teacher.id}`} variant="contained" sx={{ flex: 1, background: "#004aad" }}>
              View Profile
            </Button>
            <Button component={Link} to={`/hire/${teacher.id}`} variant="contained" sx={{ flex: 1, background: "#29b554" }}>
              Hire Me
            </Button>
          </Box>
        </Card>
      </Box>
    </motion.div>
  );
}
