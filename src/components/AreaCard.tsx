import { AreaIcon } from "./AreaIcon";
import { StatusBadge } from "./StatusBadge";
import type { AreaDefinition } from "../types";

interface AreaCardProps {
  area: AreaDefinition;
  onOpen: (route: string) => void;
  canOpenDrive: boolean;
}

export function AreaCard({ area, onOpen, canOpenDrive }: AreaCardProps) {
  const tone = area.pilot ? "pilot" : area.phase === "MVP" ? "active" : "planned";
  const label = area.pilot ? "Piloto" : area.phase;

  return (
    <article className="area-card">
      <div className="area-card__head">
        <AreaIcon name={area.icon} />
        <StatusBadge label={label} tone={tone} />
      </div>
      <div className="area-card__body">
        <h3>{area.title}</h3>
        <p>{area.description}</p>
      </div>
      <div className="area-card__footer">
        <button className="button button--primary" onClick={() => onOpen(area.route)}>
          Abrir area
        </button>
        {area.driveUrl && canOpenDrive ? (
          <a
            className="button button--ghost"
            href={area.driveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir pasta da ${area.title} no Google Drive`}
          >
            Drive
          </a>
        ) : (
          <span className="button button--disabled" aria-disabled="true">
            {canOpenDrive ? "Drive" : "Drive restrito"}
          </span>
        )}
      </div>
    </article>
  );
}
