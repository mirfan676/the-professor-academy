import React, { useState } from "react";
import { Box, Typography, Button, Grid, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [isIslamabadOpen, setIsIslamabadOpen] = useState(false);
  const [isKarachiOpen, setIsKarachiOpen] = useState(false);
  const [isLahoreOpen, setIsLahoreOpen] = useState(false);
  const [isMultanOpen, setIsMultanOpen] = useState(false);

  const toggleCityBranches = (city) => {
    switch (city) {
      case "Islamabad":
        setIsIslamabadOpen(!isIslamabadOpen);
        break;
      case "Karachi":
        setIsKarachiOpen(!isKarachiOpen);
        break;
      case "Lahore":
        setIsLahoreOpen(!isLahoreOpen);
        break;
      case "Multan":
        setIsMultanOpen(!isMultanOpen);
        break;
      default:
        break;
    }
  };

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
        backgroundImage: "url('/background-home-1.png')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
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
              borderTop:"1px solid #fddc88"
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
        {/* City 1: Islamabad */}
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
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => toggleCityBranches("Islamabad")}
          >
            <Box
              component="img"
              src="/assets/Islamabad.svg"
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
          <Collapse in={isIslamabadOpen}>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#333" }}>
                F7 Branch
              </Typography>
              <Typography variant="body2" sx={{ color: "#333" }}>
                F6 Branch
              </Typography>
            </Box>
          </Collapse>
        </Grid>

        {/* City 2: Karachi */}
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
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => toggleCityBranches("Karachi")}
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
          <Collapse in={isKarachiOpen}>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#333" }}>
                Korangi Branch
              </Typography>
              <Typography variant="body2" sx={{ color: "#333" }}>
                Saddar Branch
              </Typography>
            </Box>
          </Collapse>
        </Grid>

        {/* City 3: Lahore */}
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
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => toggleCityBranches("Lahore")}
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
          <Collapse in={isLahoreOpen}>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#333" }}>
                DHA Branch
              </Typography>
              <Typography variant="body2" sx={{ color: "#333" }}>
                Gulberg Branch
              </Typography>
            </Box>
          </Collapse>
        </Grid>

        {/* City 4: Multan */}
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
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => toggleCityBranches("Multan")}
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
          <Collapse in={isMultanOpen}>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#333" }}>
                Multan Cantt Branch
              </Typography>
            </Box>
          </Collapse>
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
