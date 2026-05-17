import { useState, useEffect, useRef } from 'react';
import { Note } from '../types/note';
import { copy } from '../lib/i18n';

interface NoteEditorProps {
  note: Note;
  onSave: (note: Note) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export const NoteEditor = ({
  note,
  onSave,
  onDelete,
  onBack,
}: NoteEditorProps) => {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [isFavorite, setIsFavorite] = useState(note.isFavorite);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveTimeoutRef = useRef<number>();

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setSaveStatus('saving');

    saveTimeoutRef.current = window.setTimeout(() => {
      const updatedNote: Note = {
        ...note,
        title,
        body,
        isFavorite,
        updatedAt: new Date().toISOString(),
      };
      onSave(updatedNote);
      setSaveStatus('saved');

      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }, 500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [title, body, isFavorite]);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `${copy.deleteConfirm}\n${copy.deleteConfirmEn}`
    );
    if (confirmed) {
      onDelete(note.id);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-washi pb-89">
      {/* Header */}
      <div className="sticky top-0 bg-washi/95 backdrop-blur-sm border-b border-sumi/10 px-21 py-13">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="text-sumi hover:text-indigo transition-calm"
            aria-label="戻る"
          >
            ← 戻る
          </button>

          <div className="flex items-center gap-13">
            {/* Save status */}
            {saveStatus === 'saved' && (
              <span className="text-xs text-ink animate-fade-in">
                {copy.saved}
              </span>
            )}

            {/* Favorite button */}
            <button
              onClick={toggleFavorite}
              className={`text-2xl transition-calm ${
                isFavorite ? 'text-gold' : 'text-ink/30'
              }`}
              aria-label={isFavorite ? 'お気に入りを解除' : 'お気に入りに追加'}
            >
              {isFavorite ? '★' : '☆'}
            </button>

            {/* Delete button */}
            <button
              onClick={handleDelete}
              className="text-vermilion hover:text-vermilion/70 transition-calm text-sm"
              aria-label="削除"
            >
              削除
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-2xl mx-auto px-21 pt-34">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={copy.titlePlaceholder}
          className="w-full text-xl font-serif bg-transparent border-none outline-none mb-21 text-sumi placeholder:text-ink/40"
          aria-label="タイトル"
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={copy.bodyPlaceholder}
          className="w-full min-h-[60vh] text-base bg-transparent border-none outline-none resize-none text-sumi placeholder:text-ink/40 leading-relaxed"
          aria-label="本文"
        />
      </div>
    </div>
  );
};
