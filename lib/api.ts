import { Note } from "@/types/note";
import axios from "axios";

// === КОНСТАНТИ ===
export const PER_PAGE = 12;

// === НАЛАШТУВАННЯ AXIOS ===
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// === ОТРИМАННЯ СПИСКУ НОТАТОК ===
export const fetchNotes = async (
  query: string = "",
  tag: string | undefined = undefined,
  page: number = 1,
  perPage: number = PER_PAGE
) => {
  const params: Record<string, any> = {
    query,
    page,
    perPage,
  };

  if (tag) {
    params.tag = tag;
  }

  const { data } = await api.get<{ notes: Note[]; totalPages: number }>(
    "/notes",
    { params }
  );

  return data;
};

// === ОТРИМАННЯ НОТАТКИ ЗА ID ===
export const fetchNoteById = async (id: string) => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

// === СТВОРЕННЯ НОТАТКИ ===
export const createNote = async (noteData: Omit<Note, "id">) => {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
};

// === ВИДАЛЕННЯ НОТАТКИ ===
export const deleteNote = async (id: string) => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
