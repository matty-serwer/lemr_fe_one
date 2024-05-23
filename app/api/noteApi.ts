import axios from 'axios';
import { Note, NewNote } from "@/app/typescript/Interfaces";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchNotes = async (patientId: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/notes/byPatient/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllNotes = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/notes`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postNewNote = async (note: NewNote) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/notes`, note);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putNote = async (note: Note) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/notes/${note.id}`, note);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};