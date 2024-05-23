'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import NoteCard from '@/app/ui/noteCard/NoteCard';
import Button from '@/app/ui/button/Button';
import NewNoteFormModal from '@/app/modals/NewNoteFormModal/NewNoteFormModal';

import styles from './Patient.module.css';
import type { Note } from '@/app/typescript/Interfaces';
import {fetchNotes, postNewNote} from '@/app/api/noteApi'

const Patient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const searchParams = useSearchParams();
  const patientId = searchParams.get('id');

  useEffect(() => {
    if (!patientId) return;

    fetchNotes(patientId).then((data) => {
      setNotes(data);
    });
  }, [patientId]);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleCreateNote = async (clinician: string, content: string) => {
    if (!patientId) return;

    try {
      const newNoteRequest = {
        patientId,
        author: clinician,
        type: 'note', // Replace with the actual type of note
        content: [{ text: content }] // Assuming NoteContent has a text property
      };
      await postNewNote(newNoteRequest);
      const updatedNotes = await fetchNotes(patientId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
      <Button mode="primary" onClick={handleModalToggle}>Add Note</Button>
      <NewNoteFormModal isOpen={isModalOpen} onClose={handleModalToggle} onCreate={handleCreateNote} />
      <div>Current Patient ID: {patientId}</div>
    </div>
  );
};

export default Patient;