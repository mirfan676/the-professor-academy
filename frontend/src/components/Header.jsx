import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Header = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Register", path: "/register" },
    { label: "Tutors", path: "/teachers" },
    { label: "Jobs", path: "/jobs" },
    { label: "About Us", path: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeGold = "#D4AF37";
  const royalBlue = "#4C8DFF";

  return (
    <>
      {/* Top Contact Bar */}
      <Box
        sx={{
          backgroundColor: "#003C80",
          color: "#fff",
          textAlign: "center",
          py: "5px",
        }}
      >
        <Typography variant="body2">
          <a
            href="tel:+923015037768"
            style={{ textDecoration: "none", color: "inherit", marginRight: "15px" }}
          >
            +92 301 5037768
          </a>
          |
          <a
            href="mailto:zahoorahmed6692@gmail.com"
            style={{ textDecoration: "none", color: "inherit", marginLeft: "15px" }}
          >
            zahoorahmed6692@gmail.com
          </a>
        </Typography>
      </Box>

      {/* Main Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: scrolled
            ? "rgba(10,10,10,0.95)"
            : "linear-gradient(180deg, rgba(10,10,10,0.95), rgba(10,10,10,0.70))",
          backdropFilter: "blur(15px)",
          transition: "0.3s",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <Box
              component="img"
              src="/logo-nav.svg"
              alt="The-Professor-Academy"
              sx={{
                height: 48,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          </Box>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "#fff",
                      px: 2,
                      py: 1,
                      borderRadius: "10px",
                      position: "relative",
                      transition: "0.3s",
                      borderBottom: isActive
                        ? `2px solid ${activeGold}`
                        : "2px solid transparent",
                      "&:hover": {
                        color: royalBlue,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          )}

          {/* Quick Inquiry */}
          <Button
            startIcon={<WhatsAppIcon />}
            href="https://wa.me/923015037768"
            target="_blank"
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              px: 2,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              "&:hover": {
                background: "linear-gradient(135deg, #128C7E, #25D366)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Quick Inquiry
          </Button>

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ "&:hover": { color: royalBlue } }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            bgcolor: "#121212",
            color: "#fff",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  textAlign: "center",
                  borderRadius: "10px",
                  mb: 1,
                  border: isActive
                    ? `1px solid ${activeGold}`
                    : "1px solid rgba(255,255,255,0.08)",
                  "&:hover": {
                    borderColor: royalBlue,
                    background: "rgba(76,141,255,0.08)",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Contact Now
          </Typography>

          <Button
            startIcon={<WhatsAppIcon />}
            href="https://wa.me/923015037768"
            target="_blank"
            fullWidth
            variant="outlined"
            sx={{
              mt: 1,
              color: "#fff",
              borderColor: royalBlue,
              "&:hover": {
                borderColor: "#fff",
                background: "rgba(76,141,255,0.1)",
              },
            }}
          >
            +92 301 5037768
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
