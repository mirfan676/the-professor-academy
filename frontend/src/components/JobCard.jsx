// JobCard.jsx
import { Box, Card, Typography, Button, Chip, Link } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { motion } from "framer-motion";

export default function JobCard({ job }) {
  const final = {
    title: String(job.Title ?? job.title ?? "Home Tutor Required"),
    grade: String(job.Grade ?? job.grade ?? job.Class ?? ""),
    school: String(job.School ?? job.school ?? ""),
    students: String(job.Students ?? job.students ?? ""),
    subjects: String(job.Subjects ?? job.subjects ?? job.Subject ?? ""),
    timing: String(job.Timing ?? job.timing ?? job.Time ?? ""),
    fee: Number(job.Fee ?? job.fee ?? job.Fees ?? 0),
    location: String(job.Location ?? job.location ?? ""),
    city: String(job.City ?? job.city ?? ""),
    gender: String(job.Gender ?? job.gender ?? ""),
    contact: String(job.Contact ?? job.contact ?? job.Phone ?? ""),
    status: String(job.Status ?? job.status ?? "").toLowerCase(),
    whatsapp_message: String(
      job.WhatsappMessage ??
        job.whatsapp_message ??
        `Hi, I want to apply for ${job.Title ?? job.title ?? "this job"}.`
    ),
  };

  const isClosed = final.status === "closed" || final.status === "inactive";
  const phone = final.contact.replace(/\D/g, "");
  const waUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(final.whatsapp_message)}` : null;

  const googleMapUrl =
    final.location || final.city
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${final.location} ${final.city}`
        )}`
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          p: 0.75,
          borderRadius: "18px",
          "&:hover": { transform: "translateY(-2px)" },
          transition: "all .2s ease",
        }}
      >
        <Card
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "#121212",
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              background: "linear-gradient(90deg,#0B7A2A,#1FAA59)",
              color: "white",
              px: 3,
              py: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff" }}>
              {final.title}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center" }}>
              <Chip label={final.grade || "Grade N/A"} size="small" sx={{ background: "rgba(255,255,255,0.14)", color: "#fff" }} />
              <Chip label={final.city || final.location || "Location N/A"} size="small" sx={{ background: "rgba(255,255,255,0.14)", color: "#fff" }} />
              <Chip label={final.gender || "Any"} size="small" sx={{ background: "rgba(255,255,255,0.14)", color: "#fff" }} />

              <Box sx={{ flexGrow: 1 }} />

              <Box
                sx={{
                  px: 1,
                  py: 0.4,
                  bgcolor: isClosed ? "#b71c1c" : "#0B7A2A",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "#fff",
                }}
              >
                {isClosed ? "Closed" : "Active"}
              </Box>
            </Box>
          </Box>

          {/* BODY */}
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 2 }}>
              <Box>
                {final.school && (
                  <Typography sx={{ mb: 1, fontWeight: 600, color: "#ffffff" }}>
                    School: {final.school}
                  </Typography>
                )}

                <Typography sx={{ mb: 1, fontWeight: 600, color: "#ffffff" }}>
                  Students: {final.students || "—"}
                </Typography>

                <Typography sx={{ mb: 2, fontWeight: 600, color: "#ffffff" }}>
                  Subjects: {final.subjects || "All"}
                </Typography>

                {/* RED CALENDAR */}
                <Typography sx={{ mb: 1, display: "flex", gap: 1, alignItems: "center", color: "#ffffff", fontWeight: 600 }}>
                  <CalendarTodayIcon fontSize="small" sx={{ color: "#d32f2f" }} />
                  {final.timing || "Timing not specified"}
                </Typography>

                {/* BLUE LOCATION → GOOGLE MAP */}
                <Typography sx={{ mb: 1, display: "flex", gap: 1, alignItems: "center", color: "#ffffff", fontWeight: 600 }}>
                  <LocationOnIcon fontSize="small" sx={{ color: "#1565c0" }} />
                  {googleMapUrl ? (
                    <Link
                      href={googleMapUrl}
                      target="_blank"
                      underline="hover"
                      sx={{ fontWeight: 800, color: "#00ff99" }}
                    >
                      {final.location || final.city}
                    </Link>
                  ) : (
                    "Location not specified"
                  )}
                </Typography>
              </Box>

              {/* RIGHT SIDE */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-end" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: "#00ff99" }}>
                    ₨ {final.fee ? final.fee.toLocaleString() : "Negotiable"}
                  </Typography>
                </Box>

                {/* WHATSAPP BUTTON */}
                <Box sx={{ mt: 2, width: "100%", minWidth: { xs: "120px", sm: "200px" } }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<WhatsAppIcon sx={{ fontSize: { xs: 18, sm: 22 } }} />}
                    href={waUrl || undefined}
                    target="_blank"
                    disabled={isClosed || !waUrl}
                    sx={{
                      fontWeight: 700,
                      background: isClosed ? "#b71c1c" : "#25D366",
                      color: "#fff",
                      py: { xs: 0.5, sm: 1 },
                      fontSize: { xs: "0.7rem", sm: "0.85rem" },
                    }}
                  >
                    {isClosed ? "Closed" : "WhatsApp"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </motion.div>
  );
}
