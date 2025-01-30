import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // Adjust the import path as needed
import styles from './AddNoteModal.module.css'; // Import CSS Module

type AddNoteModalProps = {
  isOpen: boolean; // Controls whether the modal is visible
  onClose: () => void; // Function to close the modal
  onAddNote: (title: string, content: string) => void; // Function to add a new note
};

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, onAddNote }) => {
  const { theme } = useTheme(); // Get the current theme
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      onAddNote(title, content); // Call the onAddNote function
      setTitle(''); // Reset title
      setContent(''); // Reset content
      onClose(); // Close the modal
    }
  };

  // If the modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${theme === 'dark' ? styles.dark : ''}`}>
        <h2>Add New Note</h2>
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
            Add Note
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