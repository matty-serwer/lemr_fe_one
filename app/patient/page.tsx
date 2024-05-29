'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import NoteCard from '@/app/ui/noteCard/NoteCard';
import Button from '@/app/ui/button/Button';
import NewNoteFormModal from '@/app/modals/NewNoteFormModal/NewNoteFormModal';

import styles from './Patient.module.css';
import type { Note } from '@/app/typescript/Interfaces';
import {fetchNotes, postNewNote} from '@/app/api/noteApi'
import Loading from "@/app/ui/loading/Loading";

const Patient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const searchParams = useSearchParams();
  const patientId = searchParams.get('id');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;

    setIsLoading(true);
    fetchNotes(patientId)
      .then((data) => {
        setNotes(data);
      })
      .finally(() => setIsLoading(false));
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
      {isLoading ? ( // Conditional rendering
        <Loading />
      ) : (
        <>
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
          <section className={styles.buttons}>
            <Button
              mode="warning"
              onClick={handleModalToggle}
              outline={true}
              shadow={true}
            >
              Add Note
            </Button>
          </section>
          <NewNoteFormModal
            isOpen={isModalOpen}
            onClose={handleModalToggle}
            onCreate={handleCreateNote}
          />
        </>
      )}
    </div>
  );
};

export default Patient;