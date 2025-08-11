import axios from "axios";
import type { Note, NewNoteData } from "../types/note";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface NoteResponse {
  notes: Note[];
  page?: number;
  perPage?: number;
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number,
  perPage = 12,
  tag?: string
): Promise<NoteResponse> {
  const options = {
    params: {
      ...(query.trim() !== "" && { search: query }),
      page,
      perPage,
      tag,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };

  const response = await axios.get<NoteResponse>("/notes", options);

  return response.data;
}

export async function createNote(noteData: NewNoteData): Promise<Note> {
  const options = {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };
  const response = await axios.post<Note>("/notes", noteData, options);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const options = {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };
  const response = await axios.delete<Note>(`/notes/${noteId}`, options);
  return response.data;
}

export const fetchNoteById = async (id: string) => {
  const options = {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };
  const res = await axios.get<Note>(`/notes/${id}`, options);
  return res.data;
};
