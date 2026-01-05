import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., "http://127.0.0.1:8000"
});

// Interceptor to automatically add token for admin routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// -------------------------
// Admin API
// -------------------------

// Admin login
export const adminLogin = async (username, password) => {
  const response = await api.post("/api/admin/login", { username, password });
  // Save token to localStorage for future requests
  if (response.data.token) {
    localStorage.setItem("adminToken", response.data.token);
  }
  return response.data;
};

// Get all tutors
export const fetchTutors = async () => {
  const response = await api.get("/api/admin/tutors");
  return response.data;
};

// Update a tutor
export const updateTutor = async (tutorId, data) => {
  try {
    console.log("Updating tutor with Profile ID:", tutorId);  // Log the tutor ID
    console.log("Data being sent to the backend:", data);  // Log the data being passed

    // Ensure the data has the expected fields
    const updatedData = {
      DateAdded: data.DateAdded || new Date().toISOString(), // Default to current date if missing
      ProfileID: tutorId,  // Ensure ProfileID is always sent
      ProfileURL: data.ProfileURL || `https://theprofessoracademy.com/tutor/${tutorId}`,  // Default URL if not provided
      FullName: data.FullName,
      IDCardNumber: data.IDCardNumber,
      Qualification: data.Qualification,
      PrimarySubject: data.PrimarySubject,
      MajorSubjects: data.MajorSubjects,
      Experience: data.Experience,
      Phone: data.Phone,
      Bio: data.Bio,
      Province: data.Province,
      District: data.District,
      Tehsil: data.Tehsil,
      City: data.City,
      Latitude: data.Latitude,
      Longitude: data.Longitude,
      ImageURL: data.ImageURL,
      Verified: data.Verified || "No", // Default to "No" if not provided
    };

    // Send the data to the backend
    const response = await api.put(`/api/admin/tutors/${tutorId}`, updatedData);
    console.log("Tutor Updated:", response.data);  // Log the response to verify
    return response.data;
  } catch (error) {
    console.error("Error updating tutor:", error);
    throw new Error("Unable to update tutor.");
  }
};

// Verify a tutor
export const verifyTutor = async (tutorId, verified) => {
  const response = await api.put(`/api/admin/tutors/${tutorId}/verify`, { verified });
  return response.data;
};

// -------------------------
// Jobs API
// -------------------------

// Fetch all jobs
export const fetchJobs = async () => {
  const response = await api.get("/api/admin/jobs");
  return response.data;
};

// Update a job
export const updateJob = async (jobId, data) => {
  const response = await api.put(`/api/admin/jobs/${jobId}`, data);
  return response.data;
};

export default api;
