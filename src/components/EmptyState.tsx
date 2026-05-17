interface EmptyStateProps {
  onCreateNote: () => void;
}

export const EmptyState = ({ onCreateNote }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-21">
      <div className="text-center space-y-21">
        {/* Enso circle motif */}
        <div className="mx-auto w-89 h-89 relative opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="251"
              strokeDashoffset="20"
              className="text-ink"
            />
          </svg>
        </div>

        <div className="space-y-8">
          <h2 className="text-xl font-serif text-sumi">
            まだ、言葉は置かれていません。
          </h2>
          <p className="text-sm text-ink">
            No words have settled yet.
          </p>
        </div>

        <button
          onClick={onCreateNote}
          className="mt-34 px-34 py-13 text-sm font-serif text-sumi border border-sumi/20 rounded hover:bg-sumi hover:text-washi transition-calm"
          aria-label="新しい余白をひらく"
        >
          新しい余白をひらく
        </button>
      </div>
    </div>
  );
};
