import axios from "axios";

export const entryAPI = {
  // Entry AJAX requests
  getAll: () => axios.get("/api/entries"),
  create: (entryData) => axios.post("/api/entries", entryData),

  getById: (id) => axios.get(`/api/entries/${id}`),
  update: (id, entryData) => axios.put(`/api/entries/${id}`, entryData),
  delete: (id) => axios.delete(`/api/entries/${id}`),
};
