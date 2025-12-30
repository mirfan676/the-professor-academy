import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import DemoModal from './DemoModal';
import axios from 'axios';

export default function HeroSection() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://formspree.io/f/mpwvojwr', {
        phone: phoneNumber,
      });

      const whatsappNumber = '+923066762289';
      const message = `Booking Demo - Phone: ${phoneNumber}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

      setOpenModal(false);
      alert('Your demo booking has been received!');
    } catch (error) {
      alert('There was an error booking the demo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "70vh", sm: "75vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        px: { xs: 3, sm: 5, md: 10 },
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 6, sm: 8, md: 10 },

        // 🌈 Gradient Background
        background: "linear-gradient(135deg, #000000 50%, #1a1a1a 70%, #c7a243 100%)",
        borderBottom: "5px solid #fddc88",
      }}
    >
      {/* Title */}
      <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <img
              src="logo-footer.svg"
              alt="APlus Home Tutors"
              style={{ height: "120px", marginRight: "10px" }}
            />
          </Box>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3.2rem" },
            fontWeight: 900,
            color: "#fddc88",
            textShadow: "0px 0px 10px rgba(255,215,128,0.5)",
            letterSpacing: "1px",
            mb: 2,
          }}
        >
          O / A Level Specialists
        </Typography>
      </Box>

      {/* Cards */}
      <Grid container spacing={3} sx={{ justifyContent: "center", mb: 6 }}>
        {[
          { img: "/icons/creative-learning.png", title: "Junior Classes", text: "Foundation for Future Learning" },
          { img: "/icons/css-pms.png", title: "CSS/PMS", text: "Expert Exam Preparation" },
          { img: "/icons/O-A-level.png", title: "O & A Level", text: "Specialist Tutors" },
          { img: "/icons/ielts.png", title: "English Tutors", text: "Fluency & Confidence" },
          { img: "/icons/hometutor.png", title: "Home Schooling", text: "Personalized Learning" },
        ].map((item, i) => (
          <Grid item xs={6} sm={4} md={2.6} key={i}>
            <Box
              sx={{
                p: 3,
                borderRadius: "16px",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,215,136,0.3)",
                boxShadow: "0 0 25px rgba(0,0,0,0.4)",
                backdropFilter: "blur(5px)",
                textAlign: "center",
                transition: "all 0.4s ease",
                cursor: "pointer",
                maxWidth:{ xs: "140px", sm: "160px", md: "215px" },
                minWidth:{ xs: "140px", sm: "160px", md: "215px" },

                "&:hover": {
                  transform: "translateY(-10px) scale(1.03)",
                  boxShadow: "0 0 30px rgba(255,215,136,0.7)",
                  borderColor: "#fddc88",
                },
              }}
            >
              <Box
                component="img"
                src={item.img}
                alt={item.title}
                sx={{
                  width:{ xs: "90px", sm: "100px", md: "115px" },
                  height:{ xs: "90px", sm: "100px", md: "115px" },
                  objectFit: "contain",
                  mb: 2,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#fddc88",
                  
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  color: "#fff",
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  opacity: 0.9,
                  mt: 1,
                }}
              >
                {item.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Button */}
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{
            background: "linear-gradient(90deg, #fddc88, #cfa84f)",
            color: "#000",
            fontWeight: 700,
            px: 4,
            py: 1.2,
            borderRadius: "12px",
            fontSize: "1.1rem",
            transition: "0.3s",
            "&:hover": {
              background: "linear-gradient(135deg, #D4AF37, #fddc88 )",
              transform: "translateY(-2px)",
            },
          }}
        >
          Book A Free Demo Class
        </Button>
      </Box>

      <DemoModal openModal={openModal} setOpenModal={setOpenModal} />
    </Box>
  );
}
