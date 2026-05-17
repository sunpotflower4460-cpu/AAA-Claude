import { Note } from '../types/note';
import { formatDate } from '../lib/date';
import { copy } from '../lib/i18n';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

export const NoteCard = ({ note, onClick }: NoteCardProps) => {
  const displayTitle = note.title.trim() || copy.untitled;
  const bodyPreview = note.body.trim().slice(0, 100);

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-21 bg-paper border-l-2 border-sumi/10 hover:border-gold/50 rounded transition-calm active:scale-[0.98]"
      aria-label={`メモを開く: ${displayTitle}`}
    >
      <div className="flex items-start justify-between gap-13 mb-8">
        <h3 className="flex-1 text-base font-serif text-sumi line-clamp-2">
          {displayTitle}
        </h3>
        {note.isFavorite && (
          <span className="text-gold text-lg flex-shrink-0" aria-label="お気に入り">
            ★
          </span>
        )}
      </div>

      {bodyPreview && (
        <p className="text-sm text-ink line-clamp-3 mb-8">
          {bodyPreview}
        </p>
      )}

      <div className="text-xs text-ink/70">
        {formatDate(note.updatedAt)}
      </div>
    </button>
  );
};
