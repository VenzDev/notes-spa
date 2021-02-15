import axios from "axios";

let api = axios.create({
  baseURL: "https://notes-rest-api1.herokuapp.com/api",
});

export const getNotes = async () => {
  const fetchedData = await api.get("/notes");
  return fetchedData.data;
};

export const createNote = async (data) => {
  await api.post("/create-note", data);
};

export const deleteNote = async (id) => {
  await api.delete(`delete-note/${id}`);
};

export const getNote = async (id) => {
  const fetchedData = await api.get(`/note/${id}`);
  return fetchedData.data;
};

export const updateNote = async (data) => {
  await api.put("/update-note", data);
};

export const getHistory = async (id) => {
  const fetchedData = await api.get(`/get-note-history/${id}`);
  return fetchedData.data;
};
