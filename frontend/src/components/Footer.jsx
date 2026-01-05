import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";

import {
  Facebook,
  Instagram,
  YouTube,
  WhatsApp,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#0a0a0a",
        color: "#fff",
        pt: 10,
        pb: 6,
        px: { xs: 3, md: 6 },
      }}
    >
      <Grid container spacing={6} justifyContent="center">
        {/* LOGO + DESCRIPTION */}
        <Grid item xs={12} md={3}>
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
          <Box
            sx={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              p: 3,
              borderRadius: "20px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            <Typography variant="body1" sx={{ opacity: 0.85, lineHeight: 1.7 }}>
              The Professor Academy is a globally trusted home and online tutoring 
              network—connecting students with expert professional educators across the UK, USA, Canada,
               UAE, Australia, and Pakistan. From CA, ACCA, and O/A Levels to IELTS and Digital Skills,
                our mission is to create confident learners through personalized teaching, modern tools,
                 and one-on-one guidance that transforms global career and academic performance.
            </Typography>
          </Box>
        </Grid>

        {/* ACADEMY LINKS */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: "linear-gradient(135deg, #00a6ff, #00ff8f)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Academy
          </Typography>

          {[
            { name: "About Us", link: "/about" },
            { name: "Find a Tutor", link: "/teachers" },
            { name: "Become a Tutor", link: "/register" },
            { name: "Study Abroad", link: "#" },
            { name: "Referral Program", link: "#" },
            { name: "Career Opportunities", link: "/register" },
            { name: "Privacy Policy", link: "/privacy" },
            { name: "Terms & Conditions", link: "/terms" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.link}
              underline="none"
              sx={{
                display: "block",
                color: "#fff",
                opacity: 0.8,
                py: 0.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                  color: "#00ff8f",
                  transform: "translateX(3px)",
                },
              }}
            >
              {item.name}
            </Link>
          ))}
        </Grid>

        {/* CLASSES */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: "linear-gradient(135deg, #00a6ff, #00ff8f)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Classes
          </Typography>

          {[        
            { name: "Junior Classes", link: "/about" },
            { name: "O & A Level", link: "#" },
            { name: "Bachelors / Masters", link: "#" },
            { name: "Competitive Exams", link: "#" },
            { name: "IT & Technology", link: "#" },
            { name: "Programming", link: "#" },
            { name: "English Language", link: "#" },
            { name: "Qur’an & Tajweed", link: "#" }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.link}
              underline="none"
              sx={{
                display: "block",
                color: "#fff",
                opacity: 0.8,
                py: 0.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                  color: "#00ff8f",
                  transform: "translateX(3px)",
                },
              }}
            >
              {item.name}
            </Link>
          ))}
        </Grid>

        {/* CONTACT & SOCIALS */}
        <Grid item xs={12} md={3}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: "linear-gradient(135deg, #00a6ff, #00ff8f)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Contact Us
          </Typography>

          <Box
            sx={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              p: 3,
              borderRadius: "20px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.85 }}>
              Our Branches Across All Major Cities
              Lahore • Karachi • Islamabad • Rawalpindi • Faisalabad • Multan
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              📱 +92 301 5037768
              <br />
              📧 zahoorahmed6692@gmail.com
            </Typography>

            <Box sx={{ mt: 2 }}>
              {[
                { icon: <Facebook />, link: "https://www.facebook.com/profile/61553103202212" },
                { icon: <Instagram />, link: "https://www.instagram.com/the_professor_acadmey" },
                { icon: <Twitter />, link: "#" },
                { icon: <YouTube />, link: "#" },
                {
                  icon: <WhatsApp />,
                  link: "https://wa.me/923015037768",
                },
              ].map((s, idx) => (
                <IconButton
                  key={idx}
                  href={s.link}
                  sx={{
                    color: "#fff",
                    mx: 0.5,
                    transition: "all 0.3s ease",
                    "&:hover": { color: "#00ff8f", transform: "scale(1.2)" },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* DIVIDER */}
      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 4 }} />

      {/* BOTTOM BAR */}
      <Box sx={{ textAlign: "center", opacity: 0.7 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} The Professor Academy — All Rights Reserved
        </Typography>
        <Typography variant="caption">
          Learn From Professionals, Succeed Globally.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
