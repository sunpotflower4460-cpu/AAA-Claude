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
    <div className="space-y-13 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
      {notes.map((note, index) => (
        <div
          key={note.id}
          className="animate-fade-in"
          style={{
            animationDelay: `${300 + index * 50}ms`,
            animationFillMode: 'backwards'
          }}
        >
          <NoteCard
            note={note}
            onClick={() => onSelectNote(note)}
          />
        </div>
      ))}

      {/* FAB - Floating Action Button */}
      <button
        onClick={onCreateNote}
        className="group fixed bottom-21 right-21 w-55 h-55 bg-sumi text-washi rounded-full shadow-xl hover:shadow-2xl hover:bg-indigo hover:scale-110 transition-slow flex items-center justify-center text-2xl font-light active:scale-95"
        aria-label="新しいメモを作成"
        style={{
          boxShadow: '0 8px 24px rgba(31, 27, 24, 0.2), 0 4px 8px rgba(31, 27, 24, 0.15)'
        }}
      >
        <span className="group-hover:rotate-90 transition-slow inline-block">+</span>
      </button>
    </div>
  );
};
