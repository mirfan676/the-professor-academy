import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import DemoModal from './DemoModal';  // Modal component import
import axios from 'axios';

export default function HeroSection() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    try {
      // Send data to Formspree
      console.log('Sending form data...');
      await axios.post('https://formspree.io/f/mpwvojwr', {
        phone: phoneNumber,
      });

      // WhatsApp link
      const whatsappNumber = '+923066762289'; // Replace with your WhatsApp number
      const message = `Booking Demo - Phone: ${phoneNumber}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp link in a new tab
      window.open(whatsappUrl, '_blank');
      setOpenModal(false);  // Close the modal after submission
      alert('Your demo booking has been received!');
    } catch (error) {
      console.error('Error sending form data', error);
      alert('There was an error booking the demo.');
    } finally {
      setLoading(false); // Stop loading spinner
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
        backgroundColor: "#000000",
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        borderBottom: "5px solid #fddc88",
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
            padding: "15px",
            "&:hover": {
              borderBottom: "1px solid #fddc88",
              borderTop: "1px solid #fddc88",
            },
          }}
        >
          Expert Home & Online Tuition
        </Typography>
        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
            color: "#fff",
          }}
        >
          Junior Classes, CSS/PMS, O/A Levels, English Tutors, & Home Schooling
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ justifyContent: "center", mb: 6 }}>
        
        {/* Junior Classes */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "12px",
              backgroundColor: "#000",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              component="img"
              src="/icons/creative-learning.png" // Replace with actual icon image
              alt="Junior Classes"
              sx={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                mb: 2,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#fddc88" }}>
              Junior Classes
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.8rem", md: "1rem" },
                color: "#fff",
                maxWidth: "150px",
              }}
            >
              Foundation for Future Learning
            </Typography>
          </Box>
        </Grid>

        {/* CSS/PMS Classes */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "12px",
              backgroundColor: "#000",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              component="img"
              src="/icons/css-pms.png" // Replace with actual icon image
              alt="CSS/PMS"
              sx={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                mb: 2,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#fddc88" }}>
              CSS/PMS
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.8rem", md: "1rem" },
                color: "#fff",
                maxWidth: "150px",
              }}
            >
              Expert Tutors for CSS/PMS Exam Preparation
            </Typography>
          </Box>
        </Grid>

        {/* O/A Levels */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "12px",
              backgroundColor: "#000",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              component="img"
              src="/icons/O-A-level.png" // Replace with actual icon image
              alt="O/A Level"
              sx={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                mb: 2,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#fddc88" }}>
              O & A Level
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.8rem", md: "1rem" },
                color: "#fff",
                maxWidth: "150px",
              }}
            >
              Specialist Tutors Home & Online
            </Typography>
          </Box>
        </Grid>

        {/* English Tutors */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "12px",
              backgroundColor: "#000",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              component="img"
              src="/icons/ielts.png" // Replace with actual icon image
              alt="English Tutors"
              sx={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                mb: 2,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#fddc88" }}>
              English Tutors
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.8rem", md: "1rem" },
                color: "#fff",
                maxWidth: "150px",
              }}
            >
              Experienced Tutors for All Levels
            </Typography>
          </Box>
        </Grid>

        {/* Home Schooling */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "12px",
              backgroundColor: "#000",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              component="img"
              src="/icons/hometutor.png" // Replace with actual icon image
              alt="Home Schooling"
              sx={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                mb: 2,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#fddc88" }}>
              Home Schooling
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.8rem", md: "1rem" },
                color: "#fff",
                maxWidth: "150px",
              }}
            >
              Personalized Learning at Home
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* "Book Free Demo" Button Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenModal(true)}  // Open modal on button click
          sx={{
            background: "#000",
            border:"solid 1px transparent",
            color:"#fddc88",
            "&:hover": {
              background: "transparent",
              border:"solid 1px #000", 
              color:"#fddc88"
            },
            fontSize: "1rem",
            px: 4,
            py: 1,
            borderRadius: "10px",
            transition: "all 0.3s ease", 
          }}
        >
          Book Free Demo
        </Button>
      </Box>

      {/* Modal Component */}
      <DemoModal openModal={openModal} setOpenModal={setOpenModal} />  {/* Use the modal component */}
    </Box>
  );
}
