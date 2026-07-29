interface FilterChipsProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

export function FilterChips({ label, value, options, onChange }: FilterChipsProps) {
  return (
    <div className="filter-group" aria-label={label}>
      <span className="filter-group__label">{label}</span>
      <div className="filter-group__chips">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`filter-chip${option.value === value ? " filter-chip--active" : ""}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

