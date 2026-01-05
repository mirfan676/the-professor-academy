// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api";
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await adminLogin(username, password);
      console.log("Token received:", data.token);
      navigate("/admin/dashboard"); // Redirect to the admin dashboard
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ paddingTop: 8 }}>
      <Paper sx={{ padding: 4, borderRadius: 3, backgroundColor: "#121212" }}>
        <Typography variant="h4" component="h1" color="primary" align="center">
          Admin Login
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
          <Grid container spacing={2} sx={{ marginTop: 3 }}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={{
                  input: {
                    color: "white",
                  },
                  label: {
                    color: "#BDBDBD",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  input: {
                    color: "white",
                  },
                  label: {
                    color: "#BDBDBD",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ padding: "10px 20px", fontWeight: 600 }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
