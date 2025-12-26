import React from "react";
import { Container, Typography, Box } from "@mui/material";
import useSEO from "../hooks/useSEO";

const PrivacyPolicy = () => {
  useSEO({
    title: "Privacy Policy — The Professor Academy Pakistan",
    description:
      "Learn how The Professor Academy collects, uses, and protects your personal data for safe home and online tutoring across Pakistan.",
    canonical: "https://theprofessoracademy.com/privacy",
    ogImage: "https://theprofessoracademy.com/og-twitter-card.png",
    ogUrl: "https://theprofessoracademy.com/privacy",
  });

  return (
    <Box sx={{ backgroundColor: "#0a0a0a", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(135deg, #ffd700, #bfa12f)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 4,
          }}
        >
          Privacy Policy
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, color: "#e0e0e0" }}>
          At <strong>The Professor Academy</strong>, your privacy is important to us.
          This policy explains how we collect, use, and protect your personal
          information.
        </Typography>

        <Box sx={{ mt: 3 }}>
          {[
            {
              title: "1. Information We Collect",
              content:
                "We may collect your name, phone number, email address, location, academic details, and tutoring requirements when you contact or register with us.",
            },
            {
              title: "2. How We Use Your Information",
              content:
                "Your information is used to match you with tutors, communicate service updates, process requests, improve our platform, and provide customer support.",
            },
            {
              title: "3. Cookies & Analytics",
              content:
                "We use cookies, Google Analytics, and similar tools to analyze traffic and improve user experience. You can manage cookies through your browser settings.",
            },
            {
              title: "4. Data Security",
              content:
                "We implement technical and organizational security measures to protect your data from unauthorized access or misuse.",
            },
            {
              title: "5. Third-Party Services",
              content:
                "We may use trusted third-party services (e.g. analytics, communication tools) that comply with applicable data protection standards.",
            },
            {
              title: "6. Your Rights",
              content:
                "You may request access, correction, or deletion of your personal data by contacting us.",
            },
            {
              title: "7. Policy Updates",
              content:
                "This privacy policy may be updated periodically. Continued use of our services indicates acceptance of the updated policy.",
            },
            {
              title: "8. Contact Us",
              content:
                "For privacy-related questions, email us at " +
                "<strong>theprofessoracademy@gmail.com</strong> or WhatsApp " +
                "<strong>+92 301 503 7768</strong>.",
            },
          ].map((section, idx) => (
            <Box key={idx} sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#ffd700",
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#e0e0e0", lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
