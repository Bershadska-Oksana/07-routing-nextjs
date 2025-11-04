import { Note } from "@/types/note";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (params?: {
  query?: string;
  page?: number;
}) => {
  const { data } = await api.get<{ notes: Note[] }>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: Omit<Note, "id">) => {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
