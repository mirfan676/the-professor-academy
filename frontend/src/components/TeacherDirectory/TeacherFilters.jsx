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

export default function TeacherFilters({
  selectedCity,
  setSelectedCity,
  selectedSubject,
  setSelectedSubject,
  cities = [],
  subjects = [],
  onReset
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  // Safe unique options
  const safeCities = Array.from(new Set(cities.map(c => c != null ? String(c) : ""))).filter(Boolean);
  const safeSubjects = Array.from(new Set(subjects.map(s => s != null ? String(s) : ""))).filter(Boolean);

  const filterContent = (
    <Box sx={{ p: 1, width: "100%" }}>
      {isMobile && (
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Grid container spacing={2} direction="column">
        {/* CITY */}
        <Grid>
          <FormControl fullWidth>
            <InputLabel>Select City</InputLabel>
            <Select
              value={selectedCity}
              label="Select City"
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <MenuItem value="">All Cities</MenuItem>
              {safeCities.map((c, i) => (
                <MenuItem key={c || i} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* SUBJECT */}
        <Grid>
          <TextField
            label="Search Subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* RESET BUTTON */}
        <Grid sx={{ textAlign: "center", mt: 1 }}>
          <Button
            onClick={onReset}
            variant="contained"
            sx={{ background: "#004aad", px: 4, textTransform: "none" }}
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
            sx={{ background: "#004aad", textTransform: "none", borderRadius: "12px", px: 3 }}
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
            background: "rgba(255,255,255,0.90)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
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
        PaperProps={{ sx: { borderTopLeftRadius: "22px", borderTopRightRadius: "22px", p: 2 } }}
      >
        {filterContent}
      </Drawer>
    </>
  );
}
