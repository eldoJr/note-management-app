import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // Adjust the import path as needed
import NoteCard from '../components/NoteCard';
import AddNoteModal from '../components/AddNoteModal';
import SearchBar from '../components/SearchBar';
import styles from './Home.module.css';

const Home = () => {
  const { theme } = useTheme(); // Get the current theme
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1', content: 'Content 1', date: '2023-10-01' },
    { id: 2, title: 'Note 2', content: 'Content 2', date: '2023-10-02' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNote = (title: string, content: string) => {
    const newNote = {
      id: notes.length + 1,
      title,
      content,
      date: new Date().toISOString().split('T')[0],
    };
    setNotes([...notes, newNote]);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${styles.home} ${theme === 'dark' ? styles.dark : ''}`}>
      <button className={styles.addNoteButton} onClick={() => setIsModalOpen(true)}>
        Add Note
      </button>
      <div className={styles.searchContainer}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.notesList}>
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={(id) => console.log(`Delete note ${id}`)} />
        ))}
      </div>
      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddNote={handleAddNote}
      />
    </div>
  );
};

export default Home;