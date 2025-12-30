import React, { useState } from 'react';
import { Modal, Paper, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function DemoModal({ openModal, setOpenModal }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

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
      console.error('Error sending form data', error);
      alert('There was an error booking the demo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Paper
        sx={{
          width: { xs: '90%', sm: '85%', md: '60%' },
          maxWidth: 900,
          p: { xs: 3, md: 4 },
          borderRadius: '16px',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            background: '#000',
            p: 2
          }}
        >
          <Box
            component="img"
            src="/logo-nav.svg"    
            alt="A Plus Tutors Logo"
            sx={{
              width: { xs: '70%', sm: '60%', md: '80%' },
              objectFit: 'contain'
            }}
          />
        </Box>

        {/* Form Section */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              textAlign: 'center',
              fontWeight: 700
            }}
          >
            Book a Free Demo Class
          </Typography>

          <Typography
            sx={{
              textAlign: 'center',
              mb: 3,
              color: 'gray'
            }}
          >
            Enter your WhatsApp number <br></br> & we’ll contact you shortly
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
              type="tel"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                background: 'linear-gradient(90deg,#fddc88,#cfa84f)',
                color: '#000',
                fontWeight: 700,
                py: 1.2,
                borderRadius: '10px',
                fontSize: '1rem',
                "&:hover": {
                  background: 'linear-gradient(90deg,#ffe4a6,#e2b95c)'
                }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'black' }} /> : 'Submit'}
            </Button>
          </form>
        </Box>
      </Paper>
    </Modal>
  );
}
