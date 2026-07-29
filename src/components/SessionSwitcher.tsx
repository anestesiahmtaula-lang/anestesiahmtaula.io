import type { UserSession } from "../types";

interface SessionSwitcherProps {
  sessions: UserSession[];
  activeSessionId: string;
  onChange: (sessionId: string) => void;
}

export function SessionSwitcher({
  sessions,
  activeSessionId,
  onChange
}: SessionSwitcherProps) {
  return (
    <label className="session-switcher">
      <span className="session-switcher__label">Perfil</span>
      <select
        className="session-switcher__select"
        value={activeSessionId}
        onChange={(event) => onChange(event.target.value)}
      >
        {sessions.map((session) => (
          <option key={session.id} value={session.id}>
            {session.label}
          </option>
        ))}
      </select>
    </label>
  );
}

