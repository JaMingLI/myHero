interface SkillSliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function SkillSlider({ id, label, value, onChange }: SkillSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label and value display */}
      <div className="flex justify-between items-center">
        <span className="text-[var(--color-text-primary)] text-sm font-medium">{label}</span>
        <span className="text-[var(--color-accent)] text-sm font-semibold">{value}</span>
      </div>

      {/* Progress bar with overlay slider */}
      <div className="relative h-[6px]">
        {/* Background track */}
        <div className="absolute inset-0 bg-[var(--color-border)] rounded-full" />

        {/* Filled progress */}
        <div
          className="absolute h-full bg-[var(--color-accent)] rounded-full transition-all duration-75"
          style={{ width: `${value}%` }}
        />

        {/* Invisible range input for interaction */}
        <input
          type="range"
          id={`skill-slider-${id}`}
          name={id}
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
      </div>
    </div>
  );
}
