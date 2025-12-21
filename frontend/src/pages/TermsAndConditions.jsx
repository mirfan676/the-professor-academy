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
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
        Terms and Conditions
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Welcome to <strong>The Professor Academy</strong>. By accessing or using our
        website and services, you agree to be bound by the following terms and
        conditions. Please read them carefully.
      </Typography>

      <Box>
        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1">
          By using our website or services, you confirm that you have read,
          understood, and agreed to these terms. If you do not agree, please do
          not use our services.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          2. Services Offered
        </Typography>
        <Typography variant="body1">
          The Professor Academy provides qualified home and online tutors across
          Pakistan for O/A Levels, school subjects, test preparation, and Quran
          education.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          3. User Responsibilities
        </Typography>
        <Typography variant="body1">
          Users must provide accurate information and maintain respectful
          behavior with tutors and staff. Any misuse of services may result in
          termination.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          4. Fees & Payments
        </Typography>
        <Typography variant="body1">
          Tuition fees, registration charges, and payment schedules are
          communicated clearly before confirmation. Fees are generally
          non-refundable unless stated otherwise.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          5. Privacy
        </Typography>
        <Typography variant="body1">
          Your personal data is handled according to our Privacy Policy. By using
          our services, you consent to data collection and usage as described
          there.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          6. Intellectual Property
        </Typography>
        <Typography variant="body1">
          All website content, branding, and materials belong to The Professor
          Academy unless otherwise stated and may not be reproduced without
          permission.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          7. Termination of Services
        </Typography>
        <Typography variant="body1">
          We reserve the right to suspend or terminate services in cases of
          misconduct, policy violations, or non-payment.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          8. Limitation of Liability
        </Typography>
        <Typography variant="body1">
          The Professor Academy shall not be liable for indirect, incidental, or
          consequential damages arising from use of our services.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          9. Modifications
        </Typography>
        <Typography variant="body1">
          These terms may be updated at any time. Continued use of the website
          constitutes acceptance of revised terms.
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
          10. Contact Information
        </Typography>
        <Typography variant="body1">
          For any questions, contact us at{" "}
          <strong>theprofessoracademy@gmail.com</strong> or via WhatsApp at{" "}
          <strong>+92 301 503 7768</strong>.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;
