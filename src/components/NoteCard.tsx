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
      className="group w-full text-left p-21 bg-paper/80 backdrop-blur-sm border-l-[3px] border-sumi/15 hover:border-gold/70 hover:bg-paper shadow-sm hover:shadow-md transition-calm active:scale-[0.98] relative overflow-hidden"
      aria-label={`メモを開く: ${displayTitle}`}
      style={{ borderRadius: '4px' }}
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-calm" />

      <div className="relative">
        <div className="flex items-start justify-between gap-13 mb-8">
          <h3 className="flex-1 text-base font-serif text-sumi line-clamp-2 leading-relaxed">
            {displayTitle}
          </h3>
          {note.isFavorite && (
            <span className="text-gold text-lg flex-shrink-0 drop-shadow-sm" aria-label="お気に入り">
              ★
            </span>
          )}
        </div>

        {bodyPreview && (
          <p className="text-sm text-ink/80 line-clamp-3 mb-8 leading-relaxed">
            {bodyPreview}
          </p>
        )}

        <div className="text-xs text-ink/60 font-serif italic">
          {formatDate(note.updatedAt)}
        </div>
      </div>
    </button>
  );
};
