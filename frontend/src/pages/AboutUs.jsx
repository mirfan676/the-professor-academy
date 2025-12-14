import React from "react";
import { Typography, Box, Grid, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
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

  const services = [
    {
      title: "O / A Level Experts",
      description:
        "We offer specialized home and online tutoring for O/A Level subjects. Our experienced tutors cover a range of subjects, including Mathematics, Physics, Chemistry, Biology, and more, helping students achieve top grades through personalized learning plans.",
      image: "/icons/O-A-level.png",
    },
    {
      title: "Expert Home Tutors",
      description:
        "Our team of professional home tutors provides one-on-one lessons in a variety of subjects, tailored to meet each student's individual needs. We ensure a personalized, focused approach to help students excel academically at their own pace.",
      image: "/icons/hometutor.png",
    },
    {
      title: "Online Tutors",
      description:
        "Our online tutors provide flexible learning solutions, offering expert lessons across various digital platforms. We ensure convenient, high-quality education that adapts to the student's schedule and location for easy access to learning anytime, anywhere.",
      image: "/icons/online.png",
    },
    {
      title: "IELTS Experts",
      description:
        "We provide expert IELTS tutoring that equips students with the necessary skills to excel in the exam. Through personalized coaching and test strategies, we help students boost their scores in listening, speaking, reading, and writing components.",
      image: "/icons/ielts.png",
    },
    {
      title: "Quran Online Classes",
      description:
        "Our Quran online classes provide flexible learning for students of all ages. We focus on teaching Tajweed, daily duas, prayer guidance, and moral training, helping students strengthen their understanding and practice of the Quran.",
      image: "/icons/quran.png",
    },
    {
      title: "CA / ACCA Tutors",
      description:
        "We offer expert tutoring for CA and ACCA students, providing in-depth lessons and strategies to excel in these professional qualifications. Our tutors guide students through complex accounting and finance concepts, ensuring they are well-prepared for exams.",
      image: "/icons/acca.png",
    },
  ];

  return (
    <div >
      {/* CEO Message Section */}
      <Box sx={{ 
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              width: "100%",
              minHeight: { xs: "70vh", sm: "75vh", md: "85vh" },
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
        <Box
          component="img"
          src="/assets/professor-zahoor-web.png"
          alt="CEO of Professor Academy"
          sx={{
            width: { xs: "80%", sm: "60%", md: "40%" },
            borderRadius: "12px",
            boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)",
            mb: { xs: 3, md: 0 },
            maxWidth: "100%",
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

      {/* Mission Section */}
      <Box sx={{
        width: "100%",
        minHeight: { xs: "70vh", sm: "75vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: { xs:"column", md:"row-reverse"},
        px: { xs: 3, sm: 5, md: 10 },
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 6, sm: 8, md: 10 },
        backgroundImage: "url('/background-home-2.png')", // Add the path to your image
        backgroundSize: "cover", // Ensures the image covers the entire section
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        borderBottom:"5px solid #fddc88",
      }} >
        <Box
          component="img"
          src="/mission.svg"
          alt="Mission"
          sx={{
            width: { xs: "80%", sm: "60%", md: "40%" },
            borderRadius: "12px",
            boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)",
            mb: { xs: 3, md: 0 },
            maxWidth: "100%",
          }}
        />
        <Box sx={{ width: { xs: "100%", md: "60%" }, padding: "20px" }}>
          <Typography variant="h5" sx={{ color: "#004aad", fontWeight: 600, mb: 1 }}>
            Shaping Brighter Futures
          </Typography>
          <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6 }}>
            Our mission is simple yet powerful — to make learning accessible, effective, and personalized. Our experienced tutors provide one-on-one attention to help students improve grades and build lifelong learning habits.
          </Typography>
        </Box>
      </Box>

      {/* Vision Section */}
      <Box sx={{
        width: "100%",
        minHeight: { xs: "70vh", sm: "75vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: { xs:"column", md:"row"},
        px: { xs: 3, sm: 5, md: 10 },
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 6, sm: 8, md: 10 },
        backgroundImage: "url('/background-home-2.png')", // Add the path to your image
        backgroundSize: "cover", // Ensures the image covers the entire section
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        borderBottom:"5px solid #fddc88",
      }}>
        <Box
          component="img"
          src="/vision.svg"
          alt="Vision"
          sx={{
            width: { xs: "80%", sm: "60%", md: "40%" },
            borderRadius: "12px",
            boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)",
            mb: { xs: 3, md: 0 },
            maxWidth: "100%",
          }}
        />
        <Box sx={{ width: { xs: "100%", md: "60%" }, padding: "20px" }}>
          <Typography variant="h4" sx={{ color: "#004aad", fontWeight: 600, mb: 1 }}>
            Pakistan’s Leading Home Tuition Network
          </Typography>
          <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6 }}>
            › Offering expert, passionate tutors with experience and training. <br />
            › Connecting parents and students to reliable educators across Pakistan. <br />
            › Empowering students through personalized, concept-based learning. <br />
            › Using technology (Zoom, Skype, etc.) for flexible learning.
          </Typography>
        </Box>
      </Box>
    
      <Box sx={{
        width: "100%",
        minHeight: { xs: "70vh", sm: "75vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        px: { xs: 3, sm: 5, md: 10 },
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 6, sm: 8, md: 10 },
        backgroundImage: "url('/background-home-2.png')", // Add the path to your image
        backgroundSize: "cover", // Ensures the image covers the entire section
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        borderBottom:"5px solid #fddc88",
      }}>
  {/* Title */}
  <Typography 
    variant="h2" 
    sx={{
          fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3.2rem" },
          fontWeight: 800,
          lineHeight: 1.2,
          color: "#02539b", // Vivid Azure
          mb: 6,

          borderBottom: "1px solid transparent",
          borderTop: "1px solid transparent",
          padding:"15px",
          "&:hover": {
            borderBottom: "1px solid #fddc88", 
            borderTop:"1px solid #fddc88"// Pastel Orange on hover
          },
        }}
  >
    Our Services
  </Typography>

  {/* Services Grid */}
  <Grid container spacing={4} justifyContent="center">
    {services.map((service, index) => (
      <Grid item xs={12} sm={6} md={3} key={index} sx={{maxWidth:"300px"}}> 
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)",
            mb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderTop: "2px solid blue",
            borderBottom: "2px solid blue",
          }}
        >
          <Box
            component="img"
            src={service.image}
            alt={service.title}
            sx={{
              width: "80%",
              borderRadius: "12px",
              boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.1)",
              mb: 2,
              maxWidth: "100%",
            }}
          />
          <Typography variant="h6" sx={{ color: "#004aad", fontWeight: 600, mb: 1 }}>
            {service.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6 }}>
            {service.description}
          </Typography>
        </Box>
      </Grid>
    ))}
  </Grid>
</Box>


      {/* Contact Form */}
      <Box sx={{
        width: "100%",
        minHeight: { xs: "70vh", sm: "75vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        px: { xs: 3, sm: 5, md: 10 },
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 6, sm: 8, md: 10 },
        backgroundImage: "url('/background-home-2.png')", // Add the path to your image
        backgroundSize: "cover", // Ensures the image covers the entire section
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        borderBottom:"5px solid #fddc88",
      }}>
        <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "2.2rem", sm: "2.6rem", md: "3rem" },
                  fontWeight: 800,
                  color: "#02539b", // Vivid Azure
                  mb: 4,
                  textAlign: "center",
                  padding:"15px",
                  borderBottom: "1px solid transparent",
                  borderTop:"1px solid transparent",
                  "&:hover": {
                    borderBottom: "1px solid #fddc88", 
                    borderTop:"1px solid #fddc88", 
                  },
                }}
              >
          Contact Us
        </Typography>
        <Box
          component="form"
          action="https://formspree.io/f/mwkykyyz"
          method="POST"
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", width:"100%" }}
        >
          <TextField label="Name" name="name" variant="outlined" sx={{ mb: 2, width: "100%", maxWidth: 500 }} />
          <TextField label="Email" name="email" variant="outlined" sx={{ mb: 2, width: "100%", maxWidth: 500 }} />
          <TextField label="Phone" name="phone" variant="outlined" sx={{ mb: 2, width: "100%", maxWidth: 500 }} />
          <TextField label="Message" name="message" multiline rows={4} variant="outlined" sx={{ mb: 2, width: "100%", maxWidth: 500 }} />
          <Button
            type="submit"
            variant="contained"
            sx={{
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "#004aad",
              "&:hover": { backgroundColor: "#003f88" },
              width: "100%",
              maxWidth: 500,
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AboutUs;
