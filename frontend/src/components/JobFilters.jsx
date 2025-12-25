// JobFilters.jsx
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
  useMediaQuery
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
  darkTheme = true // New prop for dark styling
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  // Safe options
  const safeCities = Array.from(new Set(cities.map(c => c != null ? String(c) : ""))).filter(Boolean);
  const safeGrades = Array.from(new Set(grades.map(g => g != null ? String(g) : ""))).filter(Boolean);

  const filterContent = (
    <Box sx={{ p: 2, width: "100%" }}>
      {isMobile && (
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: darkTheme ? "#ffd700" : undefined }}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Grid container spacing={2} direction="column">
        {/* CITY */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: darkTheme ? "#fff" : undefined }}>Select City</InputLabel>
            <Select
              value={city}
              label="Select City"
              onChange={(e) => setCity(e.target.value)}
              sx={{
                color: darkTheme ? "#fff" : undefined,
                "& .MuiOutlinedInput-notchedOutline": { borderColor: darkTheme ? "rgba(255,255,255,0.2)" : undefined },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: darkTheme ? "#ffd700" : undefined },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: darkTheme ? "#ffd700" : undefined },
              }}
            >
              <MenuItem value="">All Cities</MenuItem>
              {safeCities.map((c, i) => (
                <MenuItem key={i} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* SUBJECT */}
        <Grid item xs={12}>
          <TextField
            label="Search Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
            sx={{
              input: { color: darkTheme ? "#fff" : undefined },
              label: { color: darkTheme ? "#fff" : undefined },
              "& .MuiOutlinedInput-root": {
                backgroundColor: darkTheme ? "#121212" : undefined,
                "& fieldset": { borderColor: darkTheme ? "rgba(255,255,255,0.15)" : undefined },
                "&:hover fieldset": { borderColor: darkTheme ? "#ffd700" : undefined },
                "&.Mui-focused fieldset": { borderColor: darkTheme ? "#ffd700" : undefined },
              },
            }}
          />
        </Grid>

        {/* GENDER */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: darkTheme ? "#fff" : undefined }}>Gender</InputLabel>
            <Select
              value={gender}
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
              sx={{
                color: darkTheme ? "#fff" : undefined,
                "& .MuiOutlinedInput-notchedOutline": { borderColor: darkTheme ? "rgba(255,255,255,0.2)" : undefined },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: darkTheme ? "#ffd700" : undefined },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: darkTheme ? "#ffd700" : undefined },
              }}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Both">Both</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* GRADE */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: darkTheme ? "#fff" : undefined }}>Grade</InputLabel>
            <Select
              value={grade}
              label="Grade"
              onChange={(e) => setGrade(e.target.value)}
              sx={{
                color: darkTheme ? "#fff" : undefined,
                "& .MuiOutlinedInput-notchedOutline": { borderColor: darkTheme ? "rgba(255,255,255,0.2)" : undefined },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: darkTheme ? "#ffd700" : undefined },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: darkTheme ? "#ffd700" : undefined },
              }}
            >
              <MenuItem value="">All Grades</MenuItem>
              {safeGrades.map((g, i) => (
                <MenuItem key={i} value={g}>{g}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* RESET BUTTON */}
        <Grid item xs={12} sx={{ textAlign: "center", mt: 1 }}>
          <Button
            onClick={onReset}
            variant="contained"
            sx={{
              background: darkTheme ? "linear-gradient(135deg, #a8862b, #ffd700)" : "#004aad",
              color: darkTheme ? "#000" : "#fff",
              px: 4,
              textTransform: "none",
              "&:hover": {
                background: darkTheme ? "linear-gradient(135deg, #ffd700, #a8862b)" : undefined,
              },
            }}
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      {/* MOBILE FILTER BUTTON */}
      {isMobile && (
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setDrawerOpen(true)}
            startIcon={<FilterListIcon />}
            sx={{
              background: darkTheme ? "linear-gradient(135deg, #a8862b, #ffd700)" : "#004aad",
              textTransform: "none",
              borderRadius: "12px",
              px: 3,
              color: darkTheme ? "#000" : "#fff",
            }}
          >
            Filters
          </Button>
        </Box>
      )}

      {/* DESKTOP FILTER BAR */}
      {!isMobile && (
        <Paper
          sx={{
            p: 3,
            mb: 4,
            borderRadius: "22px",
            background: darkTheme ? "rgba(18,18,18,0.9)" : "rgba(255,255,255,0.9)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
          }}
        >
          {filterContent}
        </Paper>
      )}

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "22px",
            borderTopRightRadius: "22px",
            p: 2,
            background: darkTheme ? "#121212" : "#fff",
          },
        }}
      >
        {filterContent}
      </Drawer>
    </>
  );
}
