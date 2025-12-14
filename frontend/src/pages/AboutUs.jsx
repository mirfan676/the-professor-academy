import React from "react";
import { Container, Typography, Box, Grid, IconButton, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import useSEO from "../hooks/useSEO";

const AboutUs = () => {
  useSEO({
    title: "About Professor Academy — Premier Home & Online Tutoring",
    description:
      "Learn about Professor Academy, Pakistan’s leading platform connecting students with qualified home and online tutors for O/A Levels, Matric, and Quran. Discover our mission, vision, and expert services.",
    canonical: "https://www.theprofessoracademy.com/about",
    ogImage: "https://www.theprofessoracademy.com/logo.png",
    ogUrl: "https://www.theprofessoracademy.com/about",
  });

  return (
    <Container sx={{ py: 6 }}>
      {/* CEO Message Section */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", mb: 6 }}>
        <Box
          component="img"
          src="/assets/professor-zahoor-web.png"  // Replace with the actual CEO's image
          alt="CEO of Professor Academy"
          sx={{
            width: { xs: "100%", md: "40%" },
            borderRadius: "12px",
            boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)",
            mb: { xs: 3, md: 0 },
          }}
        />
        <Box sx={{ ml: { md: 3 }, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
              fontWeight: 600,
              color: "#004aad",
              mb: 1,
            }}
          >
            Welcome to The Professor Academy
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              color: "#333",
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            At Professor Academy, we believe in empowering students through personalized learning experiences. Our team is committed to offering the best tutors who are passionate about making a difference in education. We are shaping a future where every student achieves their highest potential.
          </Typography>
          <Typography variant="h6" sx={{ color: "#004aad", fontWeight: 600 }}>
            Professor Zahoor Ahmad
          </Typography>
          <Typography variant="body2" sx={{ color: "#333", mb: 3 }}>
            CEO of Professor Academy
          </Typography>
        </Box>
      </Box>

      {/* Mission Section with Left Image */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", mb: 6 }}>
        <Box sx={{ width: "70%", padding: "20px" }}>
          <Typography variant="h5" sx={{ color: "#004aad", fontWeight: 600, mb: 1 }}>
            Our Mission: Shaping Brighter Futures
          </Typography>
          <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6 }}>
            Our mission is simple yet powerful — to make learning accessible, effective, and personalized. Our experienced tutors provide one-on-one attention to help students improve grades and build lifelong learning habits.
          </Typography>
        </Box>
        <Box component="img" src="/mission.svg" alt="Mission" sx={{ width: "20%", borderRadius: "12px", boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)" }} />
      </Box>

      {/* Vision Section with Right Image */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", mb: 6 }}>
        <Box component="img" src="/vision.svg" alt="Vision" sx={{ width: "20%", borderRadius: "12px", boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)" }} />
        <Box sx={{ width: "70%", padding: "20px" }}>
          <Typography variant="h5" sx={{ color: "#004aad", fontWeight: 600, mb: 1 }}>
            Our Vision: Pakistan’s Leading Home Tuition Network
          </Typography>
          <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6 }}>
            › Providing expert subject tutors who are experienced, trained, and passionate about teaching. <br />
            › Building a network that connects parents and students with reliable educators anywhere in Pakistan. <br />
            › Empowering students through concept-based learning, personalized strategies, and consistent progress tracking. <br />
            › Integrating technology — Zoom, Skype, and other platforms — to make learning flexible and convenient.
          </Typography>
        </Box>
      </Box>

      {/* Our Services Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, color: "#004aad", mt: 6, mb: 3, textAlign: "center" }}>
        Our Services
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* O/A Level Tutoring */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: "center", p: 3, backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)" }}>
            <SchoolIcon sx={{ fontSize: 40, color: "#004aad", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#004aad", fontWeight: 600, mb: 1 }}>O / A Level Home & Online Tutoring</Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6, maxWidth:"300px" }}>
              We offer specialized home and online tutoring for O/A Level subjects. Our experienced tutors cover a range of subjects, including Mathematics, Physics, Chemistry, Biology, and more, helping students achieve top grades through personalized learning plans.
            </Typography>
          </Box>
        </Grid>

        {/* Home Tutors */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: "center", p: 3, backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)" }}>
            <SchoolIcon sx={{ fontSize: 40, color: "#004aad", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#004aad", fontWeight: 600, mb: 1 }}>Expert Home Tutors</Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6, maxWidth:"300px" }}>
              Our team of professional home tutors provides one-on-one lessons in a variety of subjects, tailored to meet each student's individual needs. We ensure a personalized, focused approach to help students excel academically at their own pace.
            </Typography>
          </Box>
        </Grid>

        {/* Online Tutors */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: "center", p: 3, backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)" }}>
            <SchoolIcon sx={{ fontSize: 40, color: "#004aad", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#004aad", fontWeight: 600, mb: 1 }}>Online Tutors</Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6, maxWidth:"300px" }}>
              Our online tutors provide flexible learning solutions, offering expert lessons across various digital platforms. We ensure convenient, high-quality education that adapts to the student's schedule and location for easy access to learning anytime, anywhere.
            </Typography>
          </Box>
        </Grid>

        {/* IELTS Experts */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: "center", p: 3, backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)" }}>
            <SchoolIcon sx={{ fontSize: 40, color: "#004aad", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#004aad", fontWeight: 600, mb: 1 }}>IELTS Experts</Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6, maxWidth:"300px" }}>
              We provide expert IELTS tutoring that equips students with the necessary skills to excel in the exam. Through personalized coaching and test strategies, we help students boost their scores in listening, speaking, reading, and writing components.
            </Typography>
          </Box>
        </Grid>

        {/* Quran Online Classes */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: "center", p: 3, backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)" }}>
            <SchoolIcon sx={{ fontSize: 40, color: "#004aad", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#004aad", fontWeight: 600, mb: 1 }}>Quran Online Classes</Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6, maxWidth:"300px" }}>
              Our Quran online classes provide flexible learning for students of all ages. We focus on teaching Tajweed, daily duas, prayer guidance, and moral training, helping students strengthen their understanding and practice of the Quran.
            </Typography>
          </Box>
        </Grid>

        {/* CA / ACCA Tutors */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: "center", p: 3, backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)" }}>
            <SchoolIcon sx={{ fontSize: 40, color: "#004aad", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#004aad", fontWeight: 600, mb: 1 }}>CA / ACCA Tutors</Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6, maxWidth:"300px" }}>
              We offer expert tutoring for CA and ACCA students, providing in-depth lessons and strategies to excel in these professional qualifications. Our tutors guide students through complex accounting and finance concepts, ensuring they are well-prepared for exams and real-world applications.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Contact Form */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#004aad", mb: 3 }}>
          Contact Us
        </Typography>
        <Box component="form" action="https://formspree.io/f/mwkykyyz" method="POST" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TextField label="Name" name="name" variant="outlined" sx={{ mb: 2, width: "100%", maxWidth: 500 }} />
          <TextField label="Email" name="email" variant="outlined" sx={{ mb: 2, width: "100%", maxWidth: 500 }} />
          <TextField label="Phone" name="phone" variant="outlined" sx={{ mb: 2, width: "100%", maxWidth: 500 }} />
          <TextField label="Message" name="message" multiline rows={4} variant="outlined" sx={{ mb: 2, width: "100%", maxWidth: 500 }} />
          <Button type="submit" variant="contained" sx={{ fontWeight: 600, color: "#fff", backgroundColor: "#004aad", "&:hover": { backgroundColor: "#003f88" }, width: "100%", maxWidth: 500 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUs;
