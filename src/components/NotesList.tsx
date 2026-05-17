import { Note } from '../types/note';
import { NoteCard } from './NoteCard';

interface NotesListProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  onCreateNote: () => void;
}

export const NotesList = ({
  notes,
  onSelectNote,
  onCreateNote,
}: NotesListProps) => {
  return (
    <div className="space-y-13">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onClick={() => onSelectNote(note)}
        />
      ))}

      {/* FAB - Floating Action Button */}
      <button
        onClick={onCreateNote}
        className="fixed bottom-21 right-21 w-55 h-55 bg-sumi text-washi rounded-full shadow-lg hover:bg-indigo transition-calm flex items-center justify-center text-2xl"
        aria-label="新しいメモを作成"
      >
        +
      </button>
    </div>
  );
};
