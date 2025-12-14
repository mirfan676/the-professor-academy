import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

const faqList = [
  { q: "Do you offer trial classes?", a: "Yes, we provide a 2-day free trial so you can evaluate the tutor before committing." },
  { q: "Are tutors verified?", a: "All tutors undergo strict verification including academic screening and background checks." },
  { q: "What are your fees?", a: "Fees depend on class, subject, and tutor experience. We offer transparent and affordable pricing." },
  { q: "How do I book a class?", a: "You can book a class directly through our website by selecting your preferred tutor and schedule." },
  { q: "Can I change my tutor?", a: "Yes, if you're not satisfied with your tutor, you can request a change at any time." },
  { q: "Do you offer group classes?", a: "Yes, we offer group classes for various subjects and levels. You can find more details on our website." },
];

const FAQSection = () => {
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, backgroundColor: "#f0f4f8", borderBottom:"5px solid #030303ff", }}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          mb: 6,
          textAlign: "center",
          color: "#02539b",
          fontSize: { xs: "1.6rem", md: "2.2rem" },
          
        }}
      >
        Frequently Asked Questions
      </Typography>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {faqList.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Accordion
              sx={{
                mb: 3,
                borderRadius: "20px",
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(15px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#fddc88" }} />}
                sx={{
                  px: 4,
                  py: 2,
                  "& .MuiTypography-root": { fontWeight: 600, color: "#02539b" },
                }}
              >
                <Typography>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 4, py: 2, color: "#0b1b39", fontSize: "0.95rem" }}>
                {item.a}
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
};

export default FAQSection;
