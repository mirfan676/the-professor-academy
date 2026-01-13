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
  const updatedData = {
    DateAdded: data.DateAdded || new Date().toISOString(),
    ProfileID: tutorId,
    ProfileURL: data.ProfileURL || `https://theprofessoracademy.com/tutor/${tutorId}`,
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
    Verified: data.Verified || "No",
  };

  const response = await api.put(`/api/admin/tutors/${tutorId}`, updatedData);
  return response.data;
};

// Verify a tutor
export const verifyTutor = async (tutorId, verified) => {
  const response = await api.put(`/api/admin/tutors/${tutorId}/verify`, { verified });
  return response.data;
};

// -------------------------
// Admin Jobs API
// -------------------------

// Fetch all jobs (admin view, protected)
export const fetchAdminJobs = async () => {
  const response = await api.get("/jobs/"); // calls protected jobs route
  return response.data.jobs ?? []; // always return array
};

// Update a job
export const updateJob = async (jobId, data) => {
  const response = await api.put(`/api/admin/jobs/${jobId}`, data);
  return response.data;
};

// -------------------------
// Public Jobs API (Website)
// -------------------------

// Fetch jobs for website/public view
export const fetchPublicJobs = async () => {
  const response = await api.get("/jobs/public"); // public endpoint
  return response.data ?? [];
};

export default api;
