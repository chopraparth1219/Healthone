import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const checkSymptoms = (symptoms) =>
  API.post("/api/symptoms/check", { symptoms });

export const summarizeReport = (formData) =>
  API.post("/api/reports/summarize", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getRecommendations = (profile) =>
  API.post("/api/recommendations/generate", profile);