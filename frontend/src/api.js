import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

// Named export
export const fetchJobs = async () => {
  const response = await api.get("/jobs");
  console.log("Jobs API response", response.data);
  return response.data;
};

export default api;
