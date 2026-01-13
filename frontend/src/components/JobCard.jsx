import { useMemo } from "react";
import { Box, Card, Typography, Button, Chip, Link, Divider } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import { motion } from "framer-motion";

export default function JobCard({ job }) {
  const final = useMemo(() => {
    const title = String(job.title ?? job.Title ?? "Home Tutor Required");
    const city = String(job.city ?? job.City ?? "");
    const location = String(job.location ?? job.Location ?? "");
    const grade = String(job.grade ?? job.Grade ?? job.Class ?? "");
    const school = String(job.school ?? job.School ?? "");
    const students = String(job.students ?? job.Students ?? "");
    const subjects = String(job.subjects ?? job.Subjects ?? job.Subject ?? "All");
    const timing = String(job.timing ?? job.Timing ?? job.Time ?? "");
    const fee = Number(job.fee ?? job.Fee ?? job.Fees ?? 0);
    const gender = String(job.gender ?? job.Gender ?? "Any");
    const contact = String(job.contact ?? job.Contact ?? job.Phone ?? "");
    const status = String(job.status ?? job.Status ?? "open").toLowerCase();
    const whatsappMessage =
      job.whatsapp_message ??
      job.WhatsappMessage ??
      `Hi, I am available for this job: *${title}* in *${location || city}*`;

    return {
      title,
      city,
      location,
      grade,
      school,
      students,
      subjects,
      timing,
      fee,
      gender,
      contact,
      status,
      whatsappMessage,
    };
  }, [job]);

  const isClosed = ["closed", "inactive", "filled"].includes(final.status);

  const phone = final.contact.replace(/\D/g, "");
  const waUrl = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(final.whatsappMessage)}`
    : null;

  const mapUrl =
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
          transition: "all .25s ease",
          "&:hover": { transform: "translateY(-3px)" },
        }}
      >
        <Card
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "#121212",
            boxShadow: "0 10px 40px rgba(0,0,0,0.45)",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              px: 3,
              py: 2,
              background: "linear-gradient(135deg,#a8862b,#ffd700)",
              color: "#000",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              {final.title}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              <Chip label={final.grade || "Grade N/A"} size="small" />
              <Chip label={final.gender || "Any"} size="small" />
              <Chip label={final.city || "Location"} size="small" />
            </Box>
          </Box>

          {/* BODY */}
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr auto" }, gap: 3 }}>
              {/* LEFT */}
              <Box>
                {final.school && (
                  <Typography sx={{ mb: 1, color: "#fff", fontWeight: 600, display: "flex", gap: 1 }}>
                    <SchoolIcon fontSize="small" />
                    {final.school}
                  </Typography>
                )}

                <Typography sx={{ mb: 1, color: "#fff", fontWeight: 600, display: "flex", gap: 1 }}>
                  <GroupIcon fontSize="small" />
                  Students: {final.students || "—"}
                </Typography>

                <Typography sx={{ mb: 1.5, color: "#fff", fontWeight: 600 }}>
                  Subjects: {final.subjects}
                </Typography>

                <Typography sx={{ mb: 1, color: "#fff", fontWeight: 600, display: "flex", gap: 1 }}>
                  <CalendarTodayIcon sx={{ color: "#d32f2f" }} fontSize="small" />
                  {final.timing || "Timing not specified"}
                </Typography>

                <Typography sx={{ color: "#fff", fontWeight: 600, display: "flex", gap: 1 }}>
                  <LocationOnIcon sx={{ color: "#1976d2" }} fontSize="small" />
                  {mapUrl ? (
                    <Link href={mapUrl} target="_blank" underline="hover" sx={{ color: "#00ff99", fontWeight: 800 }}>
                      {final.location || final.city}
                    </Link>
                  ) : (
                    "Location not specified"
                  )}
                </Typography>
              </Box>

              {/* RIGHT */}
              <Box sx={{ minWidth: 220, textAlign: "right" }}>
                <Typography variant="h6" sx={{ fontWeight: 900, color: "#00ff99" }}>
                  ₨ {final.fee ? final.fee.toLocaleString() : "Negotiable"}
                </Typography>

                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  href={waUrl || undefined}
                  target="_blank"
                  disabled={isClosed || !waUrl}
                  sx={{
                    fontWeight: 800,
                    backgroundColor: isClosed ? "#b71c1c" : "#25D366",
                    py: 1,
                    "&:hover": {
                      backgroundColor: isClosed ? "#b71c1c" : "#1ebe5d",
                    },
                  }}
                >
                  {isClosed ? "Job Closed" : "Apply on WhatsApp"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </motion.div>
  );
}
