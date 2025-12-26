import React from "react";
import { Container, Typography, Box } from "@mui/material";
import useSEO from "../hooks/useSEO";

const TermsAndConditions = () => {
  useSEO({
    title: "Terms and Conditions — The Professor Academy Pakistan",
    description:
      "Read the terms and conditions for using The Professor Academy, Pakistan’s trusted home and online tutoring platform.",
    canonical: "https://theprofessoracademy.com/terms",
    ogImage: "https://theprofessoracademy.com/og-twitter-card.png",
    ogUrl: "https://theprofessoracademy.com/terms",
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
          Terms and Conditions
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, color: "#e0e0e0" }}>
          Welcome to <strong>The Professor Academy</strong>. By accessing or using our
          website and services, you agree to be bound by the following terms and
          conditions. Please read them carefully.
        </Typography>

        <Box sx={{ mt: 3 }}>
          {[
            {
              title: "1. Acceptance of Terms",
              content:
                "By using our website or services, you confirm that you have read, understood, and agreed to these terms. If you do not agree, please do not use our services.",
            },
            {
              title: "2. Services Offered",
              content:
                "The Professor Academy provides qualified home and online tutors across Pakistan for O/A Levels, school subjects, test preparation, and Quran education.",
            },
            {
              title: "3. User Responsibilities",
              content:
                "Users must provide accurate information and maintain respectful behavior with tutors and staff. Any misuse of services may result in termination.",
            },
            {
              title: "4. Fees & Payments",
              content:
                "Tuition fees, registration charges, and payment schedules are communicated clearly before confirmation. Fees are generally non-refundable unless stated otherwise.",
            },
            {
              title: "5. Privacy",
              content:
                "Your personal data is handled according to our Privacy Policy. By using our services, you consent to data collection and usage as described there.",
            },
            {
              title: "6. Intellectual Property",
              content:
                "All website content, branding, and materials belong to The Professor Academy unless otherwise stated and may not be reproduced without permission.",
            },
            {
              title: "7. Termination of Services",
              content:
                "We reserve the right to suspend or terminate services in cases of misconduct, policy violations, or non-payment.",
            },
            {
              title: "8. Limitation of Liability",
              content:
                "The Professor Academy shall not be liable for indirect, incidental, or consequential damages arising from use of our services.",
            },
            {
              title: "9. Modifications",
              content:
                "These terms may be updated at any time. Continued use of the website constitutes acceptance of revised terms.",
            },
            {
              title: "10. Contact Information",
              content:
                "For any questions, contact us at <strong>theprofessoracademy@gmail.com</strong> or via WhatsApp at <strong>+92 301 503 7768</strong>.",
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

export default TermsAndConditions;
