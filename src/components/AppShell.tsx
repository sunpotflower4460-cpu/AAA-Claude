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
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-21 py-55">
        {/* Header */}
        <header className="mb-55 text-center space-y-13 animate-fade-in">
          <h1 className="text-4xl font-serif text-sumi tracking-wide" style={{ letterSpacing: '0.1em' }}>
            {copy.appName}
          </h1>
          <p className="text-sm text-ink/80 font-serif italic">
            {copy.appSubtitle}
          </p>
          <div className="pt-8">
            <p className="text-xs text-ink/60 max-w-md mx-auto leading-relaxed">
              {copy.tagline}
            </p>
          </div>
        </header>

        {/* Search */}
        <div className="mb-34 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        {/* Content */}
        {noResults ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] px-21 animate-fade-in">
            <div className="text-center space-y-13">
              <p className="text-base text-ink font-serif">
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
