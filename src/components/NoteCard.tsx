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
};

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.noteCard} ${theme === 'dark' ? styles.dark : ''}`}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <small>{note.date}</small>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default NoteCard;