import { create } from 'zustand';

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
};

type NotesStore = {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  deleteNote: (id: number) => void;
};

const loadNotes = (): Note[] => {
  const savedNotes = localStorage.getItem('notes');
  return savedNotes ? JSON.parse(savedNotes) : [];
};

export const useNotesStore = create<NotesStore>((set) => ({
  notes: loadNotes(),
  addNote: (title, content) =>
    set((state) => {
      const newNotes = [
        ...state.notes,
        {
          id: Date.now(),
          title,
          content,
          date: new Date().toLocaleDateString(),
        },
      ];
      localStorage.setItem('notes', JSON.stringify(newNotes));
      return { notes: newNotes };
    }),
  deleteNote: (id) =>
    set((state) => {
      const newNotes = state.notes.filter((note) => note.id !== id);
      localStorage.setItem('notes', JSON.stringify(newNotes));
      return { notes: newNotes };
    }),
}));