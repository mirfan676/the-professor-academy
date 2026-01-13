import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function JobFilters({
  city,
  setCity,
  subject,
  setSubject,
  gender,
  setGender,
  grade,
  setGrade,
  cities = [],
  grades = [],
  onReset,
  darkTheme = true,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  const safeCities = Array.from(new Set(cities.map(String))).filter(Boolean);
  const safeGrades = Array.from(new Set(grades.map(String))).filter(Boolean);

  const filterContent = (
    <Box sx={{ p: 2 }}>
      {isMobile && (
        <Box textAlign="right">
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#ffd700" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Grid container spacing={2} direction="column">
        <Grid item>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#fff" }}>City</InputLabel>
            <Select value={city} label="City" onChange={(e) => setCity(e.target.value)}>
              <MenuItem value="">All Cities</MenuItem>
              {safeCities.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <TextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#fff" }}>Gender</InputLabel>
            <Select value={gender} label="Gender" onChange={(e) => setGender(e.target.value)}>
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Both">Both</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#fff" }}>Grade</InputLabel>
            <Select value={grade} label="Grade" onChange={(e) => setGrade(e.target.value)}>
              <MenuItem value="">All Grades</MenuItem>
              {safeGrades.map((g) => (
                <MenuItem key={g} value={g}>{g}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item textAlign="center">
          <Button onClick={onReset} variant="contained">
            Reset Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Button startIcon={<FilterListIcon />} onClick={() => setDrawerOpen(true)}>
            Filters
          </Button>
          <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            {filterContent}
          </Drawer>
        </>
      ) : (
        <Paper sx={{ p: 3 }}>{filterContent}</Paper>
      )}
    </>
  );
}
