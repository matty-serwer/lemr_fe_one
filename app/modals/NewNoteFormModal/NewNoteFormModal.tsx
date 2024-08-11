
import React, { useState } from 'react';
import Button from '@/app/ui/button/Button';
import styles from './NewNoteFormModal.module.css';

interface NewNoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (clinicianName: string, noteContent: string) => void;
}

const NewNoteFormModal: React.FC<NewNoteFormModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [clinicianName, setClinicianName] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleCreate = () => {
    onCreate(clinicianName, noteContent);
    setClinicianName('');
    setNoteContent('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h3 className="header3">Add A New Note</h3>
        </div>
        <label className={styles.label}>
          Clinician&apos;s Name
        </label>
        <input type="text"
               value={clinicianName}
               onChange={(e) => setClinicianName(e.target.value)}
               className={styles.textInput}/>
        <label className={styles.label}>
          Note Content
        </label>
        <textarea value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className={styles.textArea}
                  rows={8}/>
        <div className={styles.buttonGroup}>
          <Button mode="secondary" onClick={handleCreate}>Create</Button>
          <Button mode="warning" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default NewNoteFormModal;
