import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from './AddNoteModal.module.css';

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
};

type AddNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (title: string, content: string) => void;
  onUpdateNote: (id: number, title: string, content: string) => void;
  editingNote: Note | null;
};

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  onAddNote,
  onUpdateNote,
  editingNote
}) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      if (editingNote) {
        console.log("Updating note:", { id: editingNote.id, title, content });
        onUpdateNote(editingNote.id, title, content);
      } else {
        console.log("Adding new note:", { title, content });
        onAddNote(title, content);
      }
      setTitle('');
      setContent('');
      onClose();
    } else {
      console.log("Error: Title or content is empty.");
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${theme === 'dark' ? styles.dark : ''}`}>
        <h2>{editingNote ? 'Edit Note' : 'Add New Note'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        />
        <div className={styles.buttonContainer}>
          <button onClick={handleSubmit} className={styles.saveButton}>
            {editingNote ? 'Save' : 'Add Note'}
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
