// DemoModal.js
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
      // Send data to Formspree
      console.log('Sending form data...');
      await axios.post('https://formspree.io/f/mpwvojwr', {
        phone: phoneNumber,
      });

      // WhatsApp link
      const whatsappNumber = '+923066762289';
      const message = `Booking Demo - Phone: ${phoneNumber}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp link in a new tab
      window.open(whatsappUrl, '_blank');
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
    <Modal open={openModal} onClose={() => setOpenModal(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ display: 'flex', maxWidth: '80%', p: 4, borderRadius: '12px' }}>
        <Box sx={{ flex: 1, backgroundImage: "url('/background-home-1.png')", backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px', marginRight: 2 }} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>Book a Free Demo Class</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Phone Number" variant="outlined" fullWidth name="phone" value={phoneNumber} onChange={handlePhoneNumberChange} sx={{ mb: 3 }} />
            <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', background: '#02539b', "&:hover": { background: '#003f88' }, fontSize: '1rem', py: 1, borderRadius: '10px' }}>
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
            </Button>
          </form>
        </Box>
      </Paper>
    </Modal>
  );
}
