import React, { useState } from "react";
import { Box, Typography, Button, Grid, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [isIslamabadOpen, setIsIslamabadOpen] = useState(false);
  const [isKarachiOpen, setIsKarachiOpen] = useState(false);
  const [isLahoreOpen, setIsLahoreOpen] = useState(false);
  const [isMultanOpen, setIsMultanOpen] = useState(false);
  const [isFaisalabadOpen, setIsFaisalabadOpen] = useState(false);

  const toggleCityBranches = (city) => {
    switch (city) {
      case "Islamabad": setIsIslamabadOpen(!isIslamabadOpen); break;
      case "Karachi": setIsKarachiOpen(!isKarachiOpen); break;
      case "Lahore": setIsLahoreOpen(!isLahoreOpen); break;
      case "Multan": setIsMultanOpen(!isMultanOpen); break;
      case "Faisalabad": setIsFaisalabadOpen(!isFaisalabadOpen); break;
      default: break;
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

        /* 🎨 New Premium Gradient */
        background: "linear-gradient(135deg, #0B0E2A 10%, #113065 45%, #1F4FB8 100%)",
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
            color: "#fddc88",
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
            color: "#ffffff",
          }}
        >
          Offering Expert Services in 5 Major Cities & Online Globally
        </Typography>
      </Box>

      {/* Branch Cards */}
      <Grid container spacing={3} sx={{ justifyContent: "center", mb: 6 }}>
        
        {/* Reusable Card Style */}
        {[
          { city: "Islamabad", img: "/assets/Islamabad.svg", branches: ["F7 Branch", "F6 Branch"] },
          { city: "Karachi", img: "/assets/Karachi.svg", branches: ["Korangi Branch", "Saddar Branch"] },
          { city: "Lahore", img: "/assets/Lahore.svg", branches: ["DHA Branch", "Gulberg Branch"] },
          { city: "Multan", img: "/assets/Multan.svg", branches: ["Multan Cantt Branch"] },
          { city: "Faisalabad", img: "/assets/Faisalabad.svg", branches: ["Faisalabad City Branch"] }
        ].map((item, index) => (
          <Grid item xs={6} sm={4} md={2.5} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                borderRadius: "12px",

                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",

                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",

                "&:hover": {
                  transform: "scale(1.06)",
                  border: "1px solid #fddc88",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
                },
              }}
              onClick={() => toggleCityBranches(item.city)}
            >
              <Box
                component="img"
                src={item.img}
                alt={item.city}
                sx={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  mb: 2,
                  filter: "drop-shadow(0px 8px 15px rgba(0,0,0,0.6))"
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#fddc88" }}>
                {item.city}
              </Typography>
            </Box>

            <Collapse
              in={
                item.city === "Islamabad"
                  ? isIslamabadOpen
                  : item.city === "Karachi"
                  ? isKarachiOpen
                  : item.city === "Lahore"
                  ? isLahoreOpen
                  : item.city === "Multan"
                  ? isMultanOpen
                  : isFaisalabadOpen
              }
            >
              <Box sx={{ mt: 2, textAlign: "center" }}>
                {item.branches.map((b, i) => (
                  <Typography key={i} variant="body2" sx={{ color: "#ffffff" }}>
                    {b}
                  </Typography>
                ))}
              </Box>
            </Collapse>
          </Grid>
        ))}
      </Grid>

      {/* Read More Button */}
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          component={Link}
          to={"/about"}
          sx={{
            background: "#fddc88",
            color: "#000",
            "&:hover": { background: "#e0bb55" },
            fontSize: "1rem",
            px: 5,
            py: 1,
            borderRadius: "10px",
            fontWeight: 700,
          }}
        >
          Read More
        </Button>
      </Box>
    </Box>
  );
}
