import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchTutors, updateTutor } from "../api";

export default function AdminDashboard() {
  const [tutors, setTutors] = useState([]);
  const [selectedTab, setSelectedTab] = useState("tutors");
  const navigate = useNavigate();

  // Fetch Tutors from Google Sheets
  const loadTutors = async () => {
    try {
      const data = await fetchTutors();
      console.log("Fetched Tutors:", data);
      setTutors(data);
    } catch (err) {
      console.error("Failed to fetch tutors", err);
      alert("Failed to load tutors data.");
    }
  };

  useEffect(() => {
    loadTutors();
  }, []);

  // Handle tab switch (Tutors / Jobs)
  const handleTabSwitch = (tab) => {
    setSelectedTab(tab);
  };

  // Handle editing tutor details and saving
  const handleEdit = async (index, data) => {
    try {
      const tutorId = tutors[index]["Profile ID"];
      console.log("Updating tutor with Profile ID:", tutorId);

      const tutorData = {
        DateAdded: new Date().toISOString(),
        ProfileID: tutorId,
        ProfileURL: `https://theprofessoracademy.com/tutor/${tutorId}`,
        FullName: data["Full Name"] || "",
        IDCardNumber: data["ID Card Number"] || "",
        Qualification: data.Qualification || "",
        PrimarySubject: data.PrimarySubject || "",
        MajorSubjects: data.MajorSubjects || "",
        Experience: data.Experience || "",
        Phone: data.Phone || "",
        Bio: data.Bio || "",
        Province: data.Province || "",
        District: data.District || "",
        Tehsil: data.Tehsil || "",
        City: data.City || "",
        Latitude: data.Latitude || "",
        Longitude: data.Longitude || "",
        ImageURL: data.ImageURL || "",
        Verified: data.Verified || "No", // Default to "No" if missing
      };

      console.log("Data being sent:", tutorData);
      const updatedData = await updateTutor(tutorId, tutorData);
      setTutors(prevData => prevData.map((item, idx) => idx === index ? updatedData : item));
    } catch (err) {
      console.error("Error editing data", err);
      alert("Failed to update tutor.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    navigate("/"); // Redirect to home page
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, backgroundColor: "#121212", padding: 2 }}>
        <Typography variant="h6" color="white">Admin Dashboard</Typography>
        <Button
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: selectedTab === "tutors" ? "#3f51b5" : "transparent",
            color: selectedTab === "tutors" ? "white" : "inherit",
          }}
          onClick={() => handleTabSwitch("tutors")}
          variant="outlined"
        >
          Tutors
        </Button>
        <Button
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: selectedTab === "jobs" ? "#3f51b5" : "transparent",
            color: selectedTab === "jobs" ? "white" : "inherit",
          }}
          onClick={() => handleTabSwitch("jobs")}
          variant="outlined"
        >
          Jobs
        </Button>
        <Button
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleLogout}
          variant="outlined"
          color="secondary"
        >
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Container sx={{ flexGrow: 1, paddingLeft: 4, paddingTop: 2 }}>
        <Grid container spacing={3}>
          {/* Tutors Section */}
          {selectedTab === "tutors" && (
            <Grid item xs={12}>
              <Paper sx={{ padding: 3 }}>
                <Typography variant="h4" color="white">Tutors</Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  {/* Table Heading */}
                  {["Full Name", "ID Card Number", "Qualification", "Primary Subject", "Major Subjects", "Experience", "Phone", "Bio", "Province", "District", "Tehsil", "City", "Latitude", "Longitude", "Image URL", "Verified"].map((heading, idx) => (
                    <Grid item xs={2} key={idx}><Typography variant="h6" color="white">{heading}</Typography></Grid>
                  ))}
                  <Grid item xs={2}></Grid> {/* Empty for Save button */}

                  {/* Display each tutor's details */}
                  {tutors.map((tutor, idx) => (
                    <Grid container spacing={2} key={idx}>
                      {["Full Name", "ID Card Number", "Qualification", "Primary Subject", "Major Subjects", "Experience", "Phone", "Bio", "Province", "District", "Tehsil", "City", "Latitude", "Longitude", "Image URL", "Verified"].map((field, i) => (
                        <Grid item xs={2} key={i}>
                          <TextField
                            label={field}
                            value={tutor[field] || ""}
                            onChange={(e) => {
                              const updatedTutor = { ...tutor, [field]: e.target.value };
                              setTutors(prevState => prevState.map((item, i) => i === idx ? updatedTutor : item));
                            }}
                            fullWidth
                          />
                        </Grid>
                      ))}
                      <Grid item xs={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(idx, tutor)} // Pass index and data
                        >
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
