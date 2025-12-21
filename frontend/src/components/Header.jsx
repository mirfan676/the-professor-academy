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
    { label: "Tutors", path: "#" },
    { label: "Jobs", path: "#" },
    { label: "About Us", path: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeBorderColor = "#feec13"; // Bright yellow for active border
  const hoverBorderColor = "#feec13"; // Bright yellow for hover borders

  return (
    <>
      {/* Top Contact Info Bar */}
      <Box sx={{ backgroundColor: "#003366", color: "#fff", textAlign: "center", padding: "5px 0" }}>
        <Typography variant="body2">
          <a href="tel:+923015037768" style={{ textDecoration: "none", color: "inherit", marginRight: "15px" }}>
            +92 301 5037768
          </a>
          |
          <a href="mailto:zahoorahmed6692@gmail.com" style={{ textDecoration: "none", color: "inherit", marginLeft: "15px" }}>
            zahoorahmed6692@gmail.com
          </a>
        </Typography>
      </Box>

      {/* Main Header */}
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          backdropFilter: "blur(14px)",
          background: "rgba(255,255,255,0.55)", // glass-morphism
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "0 6px 20px rgba(0,0,0,0.12)" : "0 0 0 rgba(0,0,0,0)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Box
              component="img"
              src="/logo-nav.svg"
              alt="The-Professor-Academy"
              sx={{ height: 48, transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.08)" } }}
            />
          </Box>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Box key={item.path}>
                    <Button
                      component={Link}
                      to={item.path}
                      color="primary"
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "16px",
                        px: 2,
                        py: 1,
                        borderRadius: "8px",
                        position: "relative",
                        transition: "all 0.3s ease",
                        background: "transparent",
                        borderBottom: isActive ? `2px solid ${activeBorderColor}` : "none", // Active border bottom
                        "&:hover": {
                          borderTop: `1px solid ${hoverBorderColor}`, // Hover border top
                          borderBottom: `1px solid ${hoverBorderColor}`, // Hover border bottom
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* ONLINE ADMISSIONS Button */}
          <Button
            startIcon={<WhatsAppIcon />}
            href="https://wa.me/923015037768"
            target="_blank"
            variant="contained"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "15px",
              px: 1.5,
              py: 1,
              color: "#fff",
              borderRadius: "8px",
              backgroundColor: "#25D366",
              "&:hover": { backgroundColor: "#075E54" },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Quick Inquiry
          </Button>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="primary"
              edge="end"
              onClick={() => setDrawerOpen(true)}
              sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.15)" } }}
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
            bgcolor: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(15px)",
            p: 2,
          },
        }}
      >
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Box key={item.path}>
                <ListItem
                  component={Link}
                  to={item.path}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    mb: 1,
                    py: 1.3,
                    borderRadius: 1,
                    textAlign: "center",
                    fontWeight: 600,
                    background: "transparent",
                    borderBottom: isActive ? `2px solid ${activeBorderColor}` : "none", // Active border bottom
                    color: isActive ? "#2f3ad3" : "black",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      borderTop: `1px solid ${hoverBorderColor}`, // Hover border top
                      borderBottom: `1px solid ${hoverBorderColor}`, // Hover border bottom
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItem>
              </Box>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Contact Section */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Contact Now
          </Typography>

          <Button
            startIcon={<WhatsAppIcon />}
            href="https://wa.me/923015037768"
            target="_blank"
            variant="outlined"
            fullWidth
            sx={{
              mb: 1,
              textTransform: "none",
              backdropFilter: "blur(10px)",
            }}
          >
            +92-3066762289
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
