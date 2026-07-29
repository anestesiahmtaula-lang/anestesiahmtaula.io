import type { ReactNode } from "react";
import { getAppRelativePath } from "../app/base-path";
import { appConfig } from "../config/app-config";
import { SessionSwitcher } from "./SessionSwitcher";
import type { UserSession } from "../types";

interface AppShellProps {
  currentPath: string;
  installReady: boolean;
  onInstall: () => void;
  onGoHome: () => void;
  activeSession: UserSession;
  sessions: UserSession[];
  onSessionChange: (sessionId: string) => void;
  children: ReactNode;
}

export function AppShell({
  currentPath,
  installReady,
  onInstall,
  onGoHome,
  activeSession,
  sessions,
  onSessionChange,
  children
}: AppShellProps) {
  const relativePath = getAppRelativePath(currentPath);

  return (
    <div className="app-shell">
      <div className="app-shell__ambient app-shell__ambient--top" />
      <div className="app-shell__ambient app-shell__ambient--bottom" />

      <header className="topbar">
        <button className="brand" onClick={onGoHome}>
          <span className="brand__mark" aria-hidden="true">
            SG
          </span>
          <span className="brand__text">
            <strong>{appConfig.title}</strong>
            <small>Nucleo de governanca descentralizada</small>
          </span>
        </button>

        <div className="topbar__actions">
          <SessionSwitcher
            sessions={sessions}
            activeSessionId={activeSession.id}
            onChange={onSessionChange}
          />
          <span className="topbar__path">{relativePath === "/" ? "Frontpage" : relativePath}</span>
          <span className="topbar__session">PWA {appConfig.pwaVersion}</span>
          <span className="topbar__session">
            {activeSession.name} | {activeSession.label}
          </span>
          {installReady ? (
            <button className="button button--secondary" onClick={onInstall}>
              Instalar app
            </button>
          ) : (
            <span className="install-hint">PWA pronto para smartphone e desktop</span>
          )}
        </div>
      </header>

      <main className="app-shell__main">{children}</main>
    </div>
  );
}
