'use client'

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
// UI
import NoteCard from "@/app/ui/noteCard/NoteCard";
import AlertCard from "@/app/ui/alertCard/AlertCard";
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
  const [currentPatient, setCurrentPatient] = useState<PatientType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    setPatientId(id);
  }, [searchParams]);

  const handleAddNote = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateNote = async (clinicianName: string, noteContent: string) => {
    try {
      const encodedPatientId = encodeURIComponent(`Patient#${patientId}`);
      const response = await axios.post(`${apiUrl}/patients/${encodedPatientId}/notes`, {
        author: clinicianName,
        content: noteContent,
      });

      if (response.data) {
        // Introduce a delay before fetching the updated notes
        setTimeout(async () => {
          const updatedResponse = await axios.get(`${apiUrl}/patients/${encodedPatientId}`);
          if (updatedResponse.data && updatedResponse.data.notes) {
            setNotes(updatedResponse.data.notes);
          }
        }, 1000); // 1 second delay
      }
    } catch (error) {
      console.error('Error creating note:', error);
      setError('Error creating note. Please try again.');
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
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
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      fetchNotes();
    }
  }, [patientId]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <section id="patientInfo" className={styles.patientInfo}>
            {currentPatient ? (
              <h1 className={styles.patientName}>Profile: {currentPatient.name}</h1>
            ) : (
              <div>
                {/* No Patient Name */}
              </div>
            )}
          </section>
          <section id="patientNotes" className={styles.patientNotes}>
            {notes.length > 0 ? (
              <div className={styles.notesContainer}>
                {notes
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((note: Note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
              </div>
            ) : (
              error && <AlertCard message={error} />
            )}
          </section>
          <div className={styles.buttonContainer}>
            <Button mode="primary" onClick={handleAddNote}>Add Note</Button>
          </div>
          <NewNoteFormModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onCreate={handleCreateNote}
          />
        </>
      )}
    </div>
  );
};

export default Patient;
