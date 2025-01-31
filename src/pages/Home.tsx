import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import NoteCard from '../components/NoteCard';
import AddNoteModal from '../components/AddNoteModal';
import SearchBar from '../components/SearchBar';
import styles from './Home.module.css';
import Footer from '../components/Footer'; 

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
};
const Home = () => {
  const { theme } = useTheme(); 
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Note 1',
      content: 'This is the content of Note 1.',
      date: '2023-09-01',
    },
    {
      id: 2,
      title: 'Note 2',
      content: 'This is the content of Note 2.',
      date: '2023-09-02',
    },
    
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState(null); 

  const handleAddNote = (title: string, content: string) => {
    if (editingNote) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNote.id ? { ...note, title, content } : note
        )
      );
      setEditingNote(null); 
    } else {
      const newNote = {
        id: notes.length + 1,
        title,
        content,
        date: new Date().toISOString().split('T')[0],
      };
      setNotes([...notes, newNote]);
    }
    setIsModalOpen(false); 
  };

  const handleEditNote = (note: any) => {
    setEditingNote(note); 
    setIsModalOpen(true); 
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDeleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); 
  };

  const handleUpdateNote = (id: number, title: string, content: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, title, content } : note
      )
    );
    console.log("Updated Notes List:", notes);
    setEditingNote(null);
    setIsModalOpen(false);
  };
  

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${styles.home} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.searchAndAddContainer}>
        <SearchBar onSearch={handleSearch} />
        <button className={styles.addNoteButton} onClick={() => setIsModalOpen(true)}>
          Add Note
        </button>
      </div>

      {filteredNotes.length === 0 && (
        <div className={styles.noNotesMessage}>No notes available!</div>
      )}

      <div className={styles.notesList}>
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} onEdit={handleEditNote} />
        ))}
      </div>

      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null); 
        }}
        onAddNote={handleAddNote}
        onUpdateNote={handleUpdateNote}
        editingNote={editingNote} 
      />

      <Footer />
    </div>
  );
};

export default Home;
