import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Modal, Paper, CircularProgress, Grid } from '@mui/material';
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
            color: "#02539b", 
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
            color: "#333",
          }}
        >
          CA, ACCA, O/A Levels, IELTS & Digital Skills
        </Typography>
      </Box>
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
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Box
            component="img"
            src="/icons/O-A-level.png" // Replace with actual icon image
            alt="Education Programmes"
            sx={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              mb: 2,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#02539b" }}>
            O & A Level
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
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Box
            component="img"
            src="/icons/hometutor.png" // Replace with actual icon image
            alt="Home Tutors"
            sx={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              mb: 2,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#02539b" }}>
            Home Tutors
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
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Box
            component="img"
            src="/icons/online.png" // Replace with actual icon image
            alt="Online Tutors"
            sx={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              mb: 2,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#02539b" }}>
            Online Tutors
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
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
            
          }}
        >
          <Box
            component="img"
            src="/icons/ielts.png" // Replace with actual icon image
            alt="IELTS Experts"
            sx={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              mb: 2,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#02539b" }}>
            IELTS Experts
          </Typography>
        </Box>
      </Grid>

      {/* Category 5 */}
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
        >
          <Box
            component="img"
            src="/icons/quran.png" // Replace with actual icon image
            alt="Quran Online"
            sx={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              mb: 2,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#02539b" }}>
            Quran Online
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
            background: "#fddc88", 
            "&:hover": {
              transform: "scale(1.05)", 
              background: "#ffbb33", 
            },
            fontSize: "1.2rem",
            px: 2,
            py: 1,
            borderRadius: "10px",
            transition: "all 0.3s ease", 
          }}
        >
          Book Free Demo
        </Button>
      </Box>

      {/* Modal for the Form */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}  
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ display: "flex", maxWidth: "80%", p: 4, borderRadius: "12px" }}>
          <Box sx={{ flex: 1, backgroundImage: "url('/background-home-1.png')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "12px", marginRight: 2 }} />
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>Book a Free Demo Class</Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Phone Number" variant="outlined" fullWidth name="phone" value={phoneNumber} onChange={handlePhoneNumberChange} sx={{ mb: 3 }} />
              <Button type="submit" variant="contained" color="primary" sx={{ width: "100%", background: "#02539b", "&:hover": { background: "#003f88" }, fontSize: "1rem", py: 1, borderRadius: "10px" }}>
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Submit"}
              </Button>
            </form>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}
