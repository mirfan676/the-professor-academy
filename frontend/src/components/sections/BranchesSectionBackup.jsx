import React from "react";
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "70vh", sm: "75vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        px: { xs: 3, sm: 5, md: 10 },
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 6, sm: 8, md: 10 },
        backgroundImage: "url('/background-home-1.png')", // Add the path to your image
        backgroundSize: "cover", // Ensures the image covers the entire section
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        borderBottom:"5px solid #fddc88",
      }}
    >
      {/* Title Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3.2rem" },
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#02539b", // Vivid Azure
            mb: 2,
            borderBottom: "1px solid transparent",
            borderTop: "1px solid transparent",
            padding:"15px",
            "&:hover": {
              borderBottom: "1px solid #fddc88", 
              borderTop:"1px solid #fddc88"// Pastel Orange on hover
            },
          }}
        >
          Our Branches
        </Typography>
        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
            color: "#333",
          }}
        >
          Offering Expert Services in 5 Major Cities & Online Globally
        </Typography>
      </Box>

      {/* Categories Section */}
      <Grid container spacing={3} sx={{ justifyContent: "center", mb: 6 }}>
        {/* Category 1 */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "12px",
              backgroundColor: "transparent",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              height: "200px",
              width: "200px",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              component="img"
              src="/assets/Islamabad.svg" // Replace with actual icon image
              alt="Islamabad"
              sx={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#02539b" }}>
              Islamabad
            </Typography>
          </Box>
        </Grid>

        {/* Category 2 */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "12px",
              backgroundColor: "transparent",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              height: "200px",
              width: "200px",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              component="img"
              src="/assets/Karachi.svg" 
              alt="Karachi"
              sx={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#02539b" }}>
              Karachi
            </Typography>
          </Box>
        </Grid>

        {/* Category 3 */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "12px",
              backgroundColor: "transparent",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              height: "200px",
              width: "200px",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              component="img"
              src="/assets/Lahore.svg" 
              alt="Lahore"
              sx={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#02539b" }}>
              Lahore
            </Typography>
          </Box>
        </Grid>

        {/* Category 4 */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "12px",
              backgroundColor: "transparent",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              height: "200px",
              width: "200px",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              component="img"
              src="/assets/Multan.svg" 
              alt="Multan"
              sx={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#02539b" }}>
              Multan
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* "Read More" Button Section */}
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          component={Link}
          to={"/about"}
          color="primary"
          sx={{
            background: "#02539b", // Vivid Azure
            "&:hover": { background: "#003f88" },
            fontSize: "1rem",
            px: 5,
            py: 1,
            borderRadius: "10px",
          }}
        >
          Read More
        </Button>
      </Box>
    </Box>
  );
}
