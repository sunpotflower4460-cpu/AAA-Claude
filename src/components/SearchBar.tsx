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
        className="w-full px-21 py-13 text-base bg-paper border border-sumi/10 rounded focus:outline-none focus:border-sumi/30 transition-calm"
        aria-label="検索"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-13 top-1/2 -translate-y-1/2 text-ink hover:text-sumi transition-calm"
          aria-label="クリア"
        >
          ✕
        </button>
      )}
    </div>
  );
};
