import React from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from './NoteCard.module.css';

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
};

type NoteCardProps = {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
};

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onEdit }) => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.noteCard} ${theme === 'dark' ? styles.dark : ''}`}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <small>{note.date}</small>
      <div className={styles.buttonContainer}>
        <button className={styles.editButton} onClick={() => onEdit(note)}>Edit</button>
        <button className={styles.deleteButton} onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
