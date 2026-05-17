import { copy } from '../lib/i18n';
import { SearchBar } from './SearchBar';
import { NotesList } from './NotesList';
import { EmptyState } from './EmptyState';
import { Note } from '../types/note';

interface AppShellProps {
  notes: Note[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectNote: (note: Note) => void;
  onCreateNote: () => void;
}

export const AppShell = ({
  notes,
  searchQuery,
  onSearchChange,
  onSelectNote,
  onCreateNote,
}: AppShellProps) => {
  return (
    <div className="min-h-screen bg-washi">
      <div className="max-w-2xl mx-auto px-21 py-34">
        {/* Header */}
        <header className="mb-34 text-center space-y-8">
          <h1 className="text-2xl font-serif text-sumi">
            {copy.appName}
          </h1>
          <p className="text-sm text-ink">
            {copy.appSubtitle}
          </p>
          <p className="text-xs text-ink/70 max-w-md mx-auto">
            {copy.tagline}
          </p>
        </header>

        {/* Search */}
        <div className="mb-34">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        {/* Content */}
        {notes.length === 0 ? (
          <EmptyState onCreateNote={onCreateNote} />
        ) : (
          <NotesList
            notes={notes}
            onSelectNote={onSelectNote}
            onCreateNote={onCreateNote}
          />
        )}
      </div>
    </div>
  );
};
