import axios from "axios";

const API = axios.create({
  // Use the Vercel environment variable, but fallback to localhost for local testing
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
});

export const checkSymptoms = (symptoms) =>
  API.post("/api/symptoms/check", { symptoms });
// ... (rest of the code)