import React from 'react';
import { Note, NoteContent } from '@/app/typescript/Interfaces';
import styles from './NoteCard.module.css';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.noteCard}>
        <div className={styles.header}>
          <h2 className={styles.clinician}>Clinician: {note.author}</h2>
          <p className={styles.date}>Date: {note.createdAt}</p>
        </div>
        <div className={styles.body}>
          {note.content.map((content: NoteContent, index: number) => (
            <p key={index}>{content.text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;