interface StatusBadgeProps {
  label: string;
  tone: "active" | "pilot" | "planned";
}

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${tone}`}>{label}</span>;
}

