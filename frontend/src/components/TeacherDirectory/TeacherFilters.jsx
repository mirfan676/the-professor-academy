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

export default function TeacherFilters({
  selectedCity,
  setSelectedCity,
  selectedSubject,
  setSelectedSubject,
  cities = [],
  subjects = [],
  onReset,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  const safeCities = Array.from(new Set(cities.map((c) => (c != null ? String(c) : "")))).filter(Boolean);
  const safeSubjects = Array.from(new Set(subjects.map((s) => (s != null ? String(s) : "")))).filter(Boolean);

  const filterContent = (
    <Box sx={{ p: 1, width: "100%" }}>
      {isMobile && (
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Grid container spacing={2} direction="column">
        {/* CITY */}
        <Grid item>
          <FormControl fullWidth sx={{ background: "#121212", borderRadius: 2 }}>
            <InputLabel sx={{ color: "#fff" }}>Select City</InputLabel>
            <Select
              value={selectedCity}
              label="Select City"
              onChange={(e) => setSelectedCity(e.target.value)}
              sx={{
                color: "#fff",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#00ff8f" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#00ff8f" },
              }}
            >
              <MenuItem value="">All Cities</MenuItem>
              {safeCities.map((c, i) => (
                <MenuItem key={c || i} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* SUBJECT */}
        <Grid item>
          <TextField
            label="Search Subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            fullWidth
            sx={{
              input: { color: "#fff" },
              label: { color: "#fff", opacity: 0.8 },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#121212",
                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                "&:hover fieldset": { borderColor: "#00ff8f" },
                "&.Mui-focused fieldset": { borderColor: "#00ff8f" },
              },
            }}
          />
        </Grid>

        {/* RESET BUTTON */}
        <Grid item sx={{ textAlign: "center", mt: 1 }}>
          <Button
            onClick={onReset}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #00a6ff, #00ff8f)",
              color: "#000",
              fontWeight: 700,
              px: 4,
              textTransform: "none",
              "&:hover": { background: "linear-gradient(135deg, #00ff8f, #00a6ff)" },
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
              background: "linear-gradient(135deg, #00a6ff, #00ff8f)",
              color: "#000",
              textTransform: "none",
              borderRadius: "12px",
              px: 3,
              "&:hover": { background: "linear-gradient(135deg, #00ff8f, #00a6ff)" },
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
            background: "rgba(18,18,18,0.85)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
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
          sx: { borderTopLeftRadius: "22px", borderTopRightRadius: "22px", p: 2, background: "#0b1020" },
        }}
      >
        {filterContent}
      </Drawer>
    </>
  );
}
