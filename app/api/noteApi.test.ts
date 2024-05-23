import { fetchNotes, getAllNotes, postNewNote, putNote } from './noteApi';
import axios from 'axios';

jest.mock('axios');

describe('notesApi', () => {
  const notes = [
    {
      id: '1',
      patientId: '123',
      author: 'John Doe',
      createdAt: '2022-01-01T00:00:00.000Z',
      type: 'note',
      content: [{ text: 'Note 1' }],
    },
    {
      id: '2',
      patientId: '123',
      author: 'Jane Doe',
      createdAt: '2022-01-02T00:00:00.000Z',
      type: 'note',
      content: [{ text: 'Note 2' }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchNotes', () => {
    const patientId = '123';

    it('should make a GET request to the correct URL', async () => {
      await fetchNotes(patientId);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/notes/byPatient/${patientId}`);
    });

    it('should return the data from the response', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: notes });
      const result = await fetchNotes(patientId);
      expect(result).toEqual(notes);
    });
  });

  describe('getAllNotes', () => {
    it('should make a GET request to the correct URL', async () => {
      await getAllNotes();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
    });

    it('should return the data from the response', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: notes });
      const result = await getAllNotes();
      expect(result).toEqual(notes);
    });
  });

  describe('postNewNote', () => {
    const newNote = {
      id: '3',
      patientId: '123',
      author: 'John Doe',
      createdAt: '2022-01-03T00:00:00.000Z',
      type: 'note',
      content: [{ text: 'New Note' }],
    };

    it('should make a POST request to the correct URL', async () => {
      await postNewNote(newNote);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/notes`, newNote);
    });

    it('should return the data from the response', async () => {
      (axios.post as jest.Mock).mockResolvedValue({ data: newNote });
      const result = await postNewNote(newNote);
      expect(result).toEqual(newNote);
    });
  });

  describe('putNote', () => {
    const updatedNote = {
      id: '1',
      patientId: '123',
      author: 'John Doe',
      createdAt: '2022-01-01T00:00:00.000Z',
      type: 'note',
      content: [{ text: 'Updated Note' }],
    };

    it('should make a PUT request to the correct URL', async () => {
      await putNote(updatedNote);
      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(axios.put).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/notes/${updatedNote.id}`, updatedNote);
    });

    it('should return the data from the response', async () => {
      (axios.put as jest.Mock).mockResolvedValue({ data: updatedNote });
      const result = await putNote(updatedNote);
      expect(result).toEqual(updatedNote);
    });
  });
});