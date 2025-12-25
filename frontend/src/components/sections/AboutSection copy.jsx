import React from 'react'; 
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { Phone as PhoneIcon, WhatsApp as WhatsAppIcon } from '@mui/icons-material';

const AboutSection = () => {
  return (
    <Box sx={{
        width: "100%",
        minHeight: { xs: "70vh", sm: "75vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        px: { xs: 3, sm: 5, md: 10 },
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 6, sm: 8, md: 10 },
        backgroundImage: "url('/background-home-2.png')", // Add the path to your image
        backgroundSize: "cover", // Ensures the image covers the entire section
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        borderBottom:"5px solid #fddc88",
      }}>
      {/* About Us Section Heading with Hover Effect */}
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: "2.2rem", sm: "2.6rem", md: "3rem" },
          fontWeight: 800,
          color: "#02539b", // Vivid Azure
          mb: 4,
          textAlign: "center",
          padding:"15px",
          borderBottom: "1px solid transparent",
          borderTop:"1px solid transparent",
          "&:hover": {
            borderBottom: "1px solid #fddc88", 
            borderTop:"1px solid #fddc88", 
          },
        }}
      >
        About Us
      </Typography>

      <Grid container spacing={4} alignItems="center">
        {/* Left Side: Image (30% width) */}
        <Grid item xs={12} md={4} sx={{ maxWidth: { xs: "100%", md: "25%" } }}>
          <Box
            component="img"
            src="/assets/professor-zahoor-web.png" // Replace with the actual image path
            alt="About The Professor Academy"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "12px",
              boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Typography variant="h6" sx={{ paddingTop: "15px", color: "#02539b", fontWeight: 600 }}>
            Professor Zahoor Ahmad
          </Typography>
          <Typography variant="body2" sx={{ color: "#333", mb: 3 }}>
            CEO of The Professor Academy
          </Typography>
        </Grid>

        {/* Right Side: Text and CTA Buttons (70% width) */}
        <Grid item xs={12} md={4} sx={{ maxWidth: { xs: "100%", md: "65%" } }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
              fontWeight: 800,
              color: "#02539b", // Vivid Azure
              mb: 2,
            }}
          >
            The Professor Academy
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              color: "#333",
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            The Professor Academy is an internationally renowned institute for expert professional and academic tuition. We offer top-ranked online tutoring and expert home tuitions for CA, ACCA online courses, O/A Levels, IELTS preparation classes, and Digital Skills training.
            Our established network of certified professionals serves students across Pakistan, the UK, the USA, Canada, Australia, and the UAE. For affordable online tutoring, we are your choice for flexible online classes to assure that Learn from Professionals, Succeed Globally!
          </Typography>

          {/* For More Details Text and Call Now & WhatsApp Message Buttons with Circular Icons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
            <Typography 
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                color: "#333",
                lineHeight: 1.6,
                mb: 3,
                textAlign: 'center'
              }}
            >
              For More Details
            </Typography>

            {/* Buttons in the same row */}
            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton
                  href="tel:+923015037768"
                  sx={{
                    backgroundColor: "#02539b", // Vivid Azure
                    "&:hover": {
                      backgroundColor: "#003f88",
                    },
                    padding: 2,
                    borderRadius: "50%",
                  }}
                >
                  <PhoneIcon sx={{ color: "#fff", fontSize: 30 }} />
                </IconButton>
                <Typography variant="body2" sx={{ color: "#02539b", mt: 1 }}>Call Now</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton
                  href="https://wa.me/923015037768"
                  target="_blank"
                  sx={{
                    backgroundColor: "#25D366", // WhatsApp green color
                    "&:hover": {
                      backgroundColor: "#128C7E",
                    },
                    padding: 2,
                    borderRadius: "50%",
                  }}
                >
                  <WhatsAppIcon sx={{ color: "#fff", fontSize: 30 }} />
                </IconButton>
                <Typography variant="body2" sx={{ color: "#02539b", mt: 1 }}>Send Message</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutSection;
