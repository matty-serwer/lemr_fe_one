'use client'

import React, {useEffect, useState} from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
// UI
import NoteCard from "@/app/ui/noteCard/NoteCard";
import Button from "@/app/ui/button/Button" // Assuming your Button component is in the same directory
// Styles
import styles from "./Patient.module.css";
// Data
import { notes1 } from "../data/dummyData";
// Types
import { Note } from '@/app/typescript/Interfaces';
import NewNoteFormModal from "@/app/modals/NewNoteFormModal/NewNoteFormModal";

const Patient: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const searchParams = useSearchParams();
  const patientId = searchParams.get('id');

  const handleAddNote = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(`/api/notes?patientId=${patientId}`)
      .then(response => response.json())
      .then(data => setNotes(data));
  }, [patientId]);

  return (
    <div className={styles.container}>
      {notes.map((note: Note) => (
        <NoteCard key={note.id} note={note} />
      ))}

      <Button mode="primary" onClick={handleAddNote}>Add Note</Button>

      <NewNoteFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={(clinician, content) => {
          // Handle adding the new note to notes1
        }}
      />
      <div>Current Patient ID: </div>
      <div>{patientId}</div>
    </div>
  );
};

export default Patient;