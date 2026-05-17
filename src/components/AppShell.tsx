import { copy } from '../lib/i18n';
import { SearchBar } from './SearchBar';
import { NotesList } from './NotesList';
import { EmptyState } from './EmptyState';
import { Note } from '../types/note';

interface AppShellProps {
  notes: Note[];
  totalNotes: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectNote: (note: Note) => void;
  onCreateNote: () => void;
}

export const AppShell = ({
  notes,
  totalNotes,
  searchQuery,
  onSearchChange,
  onSelectNote,
  onCreateNote,
}: AppShellProps) => {
  const hasNotes = totalNotes > 0;
  const hasSearchQuery = searchQuery.trim().length > 0;
  const noResults = hasNotes && hasSearchQuery && notes.length === 0;

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
        {noResults ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] px-21">
            <div className="text-center space-y-13">
              <p className="text-base text-ink">
                言葉は見つかりませんでした。
              </p>
              <p className="text-sm text-ink/70">
                No words found.
              </p>
            </div>
          </div>
        ) : notes.length === 0 ? (
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
