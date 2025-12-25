import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

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
        background: "linear-gradient(135deg, #0B0E2A 10%, #113065 45%, #1F4FB8 100%)",
      }}
    >
      {/* Glass Card */}
      <Box
        sx={{
          position: "relative",
          p: { xs: 4, md: 6 },
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.25)",
          borderRadius: "20px",
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
            color: "#fddc88",
            fontSize: { xs: "1.6rem", md: "2rem" },
          }}
        >
          Ready to Hire an Expert Tutor?
        </Typography>
        <Typography sx={{ mb: 4, color: "#a09b90", fontSize: "1rem" }}>
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
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1.1rem",
              px: 5,
              py: 1.8,
              border:"transparent",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #D4AF37, #fddc88)",
              color: "#000",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(135deg, #fddc88, #D4AF37)",
                transform: "translateY(-2px)",
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
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1.1rem",
              px: 5,
              py: 1.8,
              border:"transparent",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              color:"#fff",
              "&:hover": {
                background: "linear-gradient(135deg, #128C7E, #25D366)",
                transform: "translateY(-2px)",
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
