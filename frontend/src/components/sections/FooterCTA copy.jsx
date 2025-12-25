import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";

const FooterCTA = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, rgba(2, 83, 155, 0.85), rgba(11, 27, 57, 0.95))", // Dark Blue and Vivid Azure gradient
      }}
    >
      {/* Glass Card */}
      <Box
        sx={{
          position: "relative",
          p: { xs: 4, md: 6 },
          background: "rgba(255, 255, 255, 0.1)", // Transparent background for glass effect
          backdropFilter: "blur(15px)", // Glassmorphism effect
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.25)",
          border: "0px solid",
          borderImage: "linear-gradient(135deg, #fddc88, #e2ddb8) 1", // Pastel Orange to Light Yellow border
          maxWidth: 700,
          width: "100%",
        }}
      >
        {/* Heading */}
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            mb: 2,
            color: "#fddc88", // Pastel Orange for the heading
            fontSize: { xs: "1.6rem", md: "2rem" },
          }}
        >
          Ready to Hire an Expert Tutor?
        </Typography>
        <Typography sx={{ mb: 4, color: "#a09b90", fontSize: "1rem" }}> {/* Grey Orange text */}
          Contact us to get the best tutor matched within minutes.
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            component={Link}
            to="#"
            variant="contained"
            size="large"
            sx={{
              px: 5,
              py: 1.8,
              background: "linear-gradient(135deg, #02539b, #fddc88)", // Vivid Azure to Pastel Orange gradient
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(135deg, #fddc88, #02539b)", // Reversed gradient on hover
              },
            }}
          >
            Hire a Tutor
          </Button>

          <Button
            startIcon={<WhatsAppIcon />}
            href="https://wa.me/923015037768"
            target="_blank"
            variant="outlined"
            sx={{
              px: 5,
              py: 1.8,
              textTransform: "none",
              border: "2px solid",
              borderImage: "linear-gradient(135deg, #02539b, #fddc88) 1", // Vivid Azure to Pastel Orange border
              color: "#fff",
              backdropFilter: "blur(20px)", // Glassmorphism effect
              "&:hover": {
                background: "rgba(255, 220, 136, 0.15)", // Light Yellow hover effect
              },
            }}
          >
            Quick Inquiry
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterCTA;
