interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="言葉を探す"
        className="w-full px-21 py-13 text-base bg-paper/60 backdrop-blur-sm border border-sumi/10 focus:outline-none focus:border-gold/40 focus:bg-paper transition-calm font-serif"
        style={{ borderRadius: '4px' }}
        aria-label="検索"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-13 top-1/2 -translate-y-1/2 text-ink/50 hover:text-sumi transition-calm text-sm"
          aria-label="クリア"
        >
          ✕
        </button>
      )}
    </div>
  );
};
