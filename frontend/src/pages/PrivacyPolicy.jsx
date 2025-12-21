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
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        At <strong>The Professor Academy</strong>, your privacy is important to us.
        This policy explains how we collect, use, and protect your personal
        information.
      </Typography>

      <Box>
        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          1. Information We Collect
        </Typography>
        <Typography variant="body1">
          We may collect your name, phone number, email address, location,
          academic details, and tutoring requirements when you contact or
          register with us.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1">
          Your information is used to match you with tutors, communicate service
          updates, process requests, improve our platform, and provide customer
          support.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          3. Cookies & Analytics
        </Typography>
        <Typography variant="body1">
          We use cookies, Google Analytics, and similar tools to analyze traffic
          and improve user experience. You can manage cookies through your
          browser settings.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          4. Data Security
        </Typography>
        <Typography variant="body1">
          We implement technical and organizational security measures to protect
          your data from unauthorized access or misuse.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          5. Third-Party Services
        </Typography>
        <Typography variant="body1">
          We may use trusted third-party services (e.g. analytics, communication
          tools) that comply with applicable data protection standards.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          6. Your Rights
        </Typography>
        <Typography variant="body1">
          You may request access, correction, or deletion of your personal data
          by contacting us.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          7. Policy Updates
        </Typography>
        <Typography variant="body1">
          This privacy policy may be updated periodically. Continued use of our
          services indicates acceptance of the updated policy.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          8. Contact Us
        </Typography>
        <Typography variant="body1">
          For privacy-related questions, email us at{" "}
          <strong>theprofessoracademy@gmail.com</strong> or WhatsApp{" "}
          <strong>+92 301 503 7768</strong>.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
