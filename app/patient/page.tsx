'use client'

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
// UI
import NoteCard from "@/app/ui/noteCard/NoteCard";
import Button from "@/app/ui/button/Button";
// Styles
import styles from "./Patient.module.css";
// Types
import { Patient as PatientType, Note } from '@/app/typescript/Interfaces';
import NewNoteFormModal from "@/app/modals/NewNoteFormModal/NewNoteFormModal";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Patient: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const[currentPatient, setCurrentPatient] = useState<PatientType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const patientId = searchParams.get('id');

  const handleAddNote = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // URL encode the patient ID to handle any special characters
        const encodedPatientId = encodeURIComponent(`Patient#${patientId}`);
        const response = await axios.get(`${apiUrl}/patients/${encodedPatientId}`);
        console.log('response', response);

        if (response.data) {
          setCurrentPatient(response.data);
          console.log("response.data", response.data);
          if (response.data.notes && response.data.notes.length > 0) {
            setNotes(response.data.notes);
          } else {
            setError('No notes found for this patient.');
          }
        } else {
          setError('Patient not found.');
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
        setError('Patient not found. Please try again.');
      }
    };

    if (patientId) {
      fetchNotes();
    }
  }, [patientId]);

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}
      {notes.length > 0 ? (
        notes.map((note: Note) => (
          <NoteCard key={note.id} note={note} />
        ))
      ) : (
        !error && <div>No notes available.</div>
      )}

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
