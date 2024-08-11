import React from 'react';
import { Note } from '@/app/typescript/Interfaces';
import styles from './NoteCard.module.css';
import { format } from 'date-fns';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "EEEE, MMMM do 'at' h:mmaaa");
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.noteCard}>
        <div className={styles.header}>
          <h2 className={styles.clinician}>Clinician: {note.author}</h2>
          <p className={styles.date}> {formatDate(note.createdAt)}</p>
        </div>
        <div className={styles.body}>
          {note.content.map((content: string, index: number) => (
            <p key={index}>{content}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
