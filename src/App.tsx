import { useState, useEffect } from 'react';
import { Note } from './types/note';
import { loadNotes, saveNotes } from './lib/storage';
import { AppShell } from './components/AppShell';
import { NoteEditor } from './components/NoteEditor';

type View = 'list' | 'editor';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [view, setView] = useState<View>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Load notes on mount
  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);
  }, []);

  // Save notes whenever they change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Create new note
  const handleCreateNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: '',
      body: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
    };
    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
    setView('editor');
  };

  // Select existing note
  const handleSelectNote = (note: Note) => {
    setCurrentNote(note);
    setView('editor');
  };

  // Save note
  const handleSaveNote = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
    setCurrentNote(updatedNote);
  };

  // Delete note
  const handleDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
    setView('list');
    setCurrentNote(null);
  };

  // Go back to list
  const handleBack = () => {
    setView('list');
    setCurrentNote(null);
  };

  // Filter and sort notes
  const filteredNotes = notes.filter((note) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.body.toLowerCase().includes(query)
    );
  });

  // Sort: favorites first, then by updatedAt
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  if (view === 'editor' && currentNote) {
    return (
      <NoteEditor
        note={currentNote}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
        onBack={handleBack}
      />
    );
  }

  return (
    <AppShell
      notes={sortedNotes}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onSelectNote={handleSelectNote}
      onCreateNote={handleCreateNote}
    />
  );
}

export default App;
