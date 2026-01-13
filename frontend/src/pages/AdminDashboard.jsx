import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Stack,
  Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  fetchTutors,
  updateTutor,
  verifyTutor,
  fetchAdminJobs
} from "../api";

export default function AdminDashboard() {
  const [tutors, setTutors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedTab, setSelectedTab] = useState("tutors");
  const navigate = useNavigate();

  // ------------------ Load Tutors ------------------
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

  // ------------------ Load Jobs ------------------
  const loadJobs = async () => {
    try {
      const raw = await fetchAdminJobs(); // returns array of jobs
      const normalized = raw.map((j, idx) => ({
        id: j.id || idx,
        title: j.Title || j.title || "",
        grade: j.Grade || j.grade || "",
        subjects: j.Subjects || j.subjects || "",
        city: j.City || j.city || "",
        gender: j.Gender || j.gender || "",
        fee: j.Fee || j.fee || 0,
        timing: j.Timing || j.timing || "",
        location: j.Location || j.location || "",
        contact: j.Contact || j.contact || "",
        status: (j.Status || j.status || "").toLowerCase(),
      }));
      setJobs(normalized);
      console.log("Normalized Jobs:", normalized);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
      alert("Failed to load jobs data.");
    }
  };

  // ------------------ useEffect ------------------
  useEffect(() => {
    if (selectedTab === "tutors") loadTutors();
    if (selectedTab === "jobs") loadJobs();
  }, [selectedTab]);

  // ------------------ Tab Switch ------------------
  const handleTabSwitch = (tab) => {
    setSelectedTab(tab);
  };

  // ------------------ Edit Tutor ------------------
  const handleEdit = async (index, data) => {
    try {
      const tutorId = tutors[index]["Profile ID"];
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
        Verified: data.Verified || "No",
      };
      const updatedData = await updateTutor(tutorId, tutorData);
      setTutors(prev => prev.map((item, i) => i === index ? updatedData : item));
    } catch (err) {
      console.error("Error editing tutor:", err);
      alert("Failed to update tutor.");
    }
  };

  // ------------------ Verify Tutor ------------------
  const handleVerify = async (index, value) => {
    try {
      const tutorId = tutors[index]["Profile ID"];
      await verifyTutor(tutorId, value);
      setTutors(prev => prev.map((t, i) => i === index ? { ...t, Verified: value ? "Yes" : "No" } : t));
    } catch (err) {
      console.error("Error verifying tutor:", err);
      alert("Failed to verify tutor.");
    }
  };

  // ------------------ Logout ------------------
  const handleLogout = () => {
    navigate("/");
  };

  // ------------------ Render ------------------
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, backgroundColor: "#121212", padding: 2 }}>
        <Typography variant="h6" color="white">Admin Dashboard</Typography>
        <Button
          fullWidth
          sx={{ mt: 2, backgroundColor: selectedTab === "tutors" ? "#3f51b5" : "transparent", color: selectedTab === "tutors" ? "white" : "inherit" }}
          onClick={() => handleTabSwitch("tutors")}
          variant="outlined"
        >
          Tutors
        </Button>
        <Button
          fullWidth
          sx={{ mt: 2, backgroundColor: selectedTab === "jobs" ? "#3f51b5" : "transparent", color: selectedTab === "jobs" ? "white" : "inherit" }}
          onClick={() => handleTabSwitch("jobs")}
          variant="outlined"
        >
          Jobs
        </Button>
        <Button fullWidth sx={{ mt: 2 }} onClick={handleLogout} variant="outlined" color="secondary">
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Container sx={{ flexGrow: 1, paddingLeft: 4, paddingTop: 2 }}>
        {/* Tutors Tab */}
        {selectedTab === "tutors" && (
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h4" color="white" mb={2}>Tutors</Typography>
            <Grid container spacing={2}>
              {[
                "Full Name","ID Card Number","Qualification","Primary Subject","Major Subjects","Experience",
                "Phone","Bio","Province","District","Tehsil","City","Latitude","Longitude","Image URL","Verified"
              ].map((heading, idx) => (
                <Grid item xs={2} key={idx}><Typography variant="h6" color="white">{heading}</Typography></Grid>
              ))}
              <Grid item xs={2}></Grid>

              {tutors.map((tutor, idx) => (
                <Grid container spacing={2} key={idx}>
                  {[
                    "Full Name","ID Card Number","Qualification","Primary Subject","Major Subjects","Experience",
                    "Phone","Bio","Province","District","Tehsil","City","Latitude","Longitude","Image URL","Verified"
                  ].map((field, i) => (
                    <Grid item xs={2} key={i}>
                      <TextField
                        label={field}
                        value={tutor[field] || ""}
                        onChange={(e) => {
                          const updatedTutor = { ...tutor, [field]: e.target.value };
                          setTutors(prev => prev.map((item, j) => j === idx ? updatedTutor : item));
                        }}
                        fullWidth
                      />
                    </Grid>
                  ))}
                  <Grid item xs={2}>
                    <Stack spacing={1}>
                      <Button variant="contained" color="primary" onClick={() => handleEdit(idx, tutor)}>Save</Button>
                      <Button
                        variant="outlined"
                        color={tutor.Verified === "Yes" ? "success" : "warning"}
                        onClick={() => handleVerify(idx, tutor.Verified !== "Yes")}
                      >
                        {tutor.Verified === "Yes" ? "Verified" : "Verify"}
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Jobs Tab */}
        {selectedTab === "jobs" && (
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h4" color="white" mb={2}>Jobs</Typography>
            <Grid container spacing={2}>
              {["Title","Grade","Subjects","City","Gender","Fee","Timing","Location","Contact","Status"].map((heading, idx) => (
                <Grid item xs={2} key={idx}><Typography variant="h6" color="white">{heading}</Typography></Grid>
              ))}
              <Grid item xs={2}></Grid>

              {jobs.map((job, idx) => (
                <Grid container spacing={2} key={idx}>
                  {["title","grade","subjects","city","gender","fee","timing","location","contact","status"].map((field, i) => (
                    <Grid item xs={2} key={i}>
                      <TextField
                        label={field}
                        value={job[field] || ""}
                        fullWidth
                      />
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
