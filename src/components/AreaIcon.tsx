import type { CSSProperties } from "react";

const strokeStyle: CSSProperties = {
  vectorEffect: "non-scaling-stroke"
};

interface AreaIconProps {
  name: string;
}

export function AreaIcon({ name }: AreaIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className="area-icon">
      <rect x="6" y="6" width="52" height="52" rx="18" className="area-icon__plate" />
      {name === "administrativa" && (
        <>
          <path d="M20 42h24M20 32h24M20 22h16" className="area-icon__line" style={strokeStyle} />
          <path d="M45 19h-7v7h7z" className="area-icon__solid" />
        </>
      )}
      {name === "clinica" && (
        <>
          <path d="M32 18v28M18 32h28" className="area-icon__line" style={strokeStyle} />
          <circle cx="32" cy="32" r="15" className="area-icon__ring" />
        </>
      )}
      {name === "qualidade" && (
        <>
          <path d="M21 33l8 8 15-19" className="area-icon__line" style={strokeStyle} />
          <circle cx="32" cy="32" r="17" className="area-icon__ring" />
        </>
      )}
      {name === "pessoas" && (
        <>
          <circle cx="24" cy="26" r="6" className="area-icon__ring" />
          <circle cx="40" cy="24" r="5" className="area-icon__ring" />
          <path d="M16 44c2-6 8-9 15-9s13 3 15 9" className="area-icon__line" style={strokeStyle} />
        </>
      )}
      {name === "equipamentos" && (
        <>
          <path d="M24 19v10M40 19v10M20 28h24l-3 17H23z" className="area-icon__line" style={strokeStyle} />
        </>
      )}
      {name === "etica" && (
        <>
          <path d="M32 18l12 7v10c0 8-5 14-12 17-7-3-12-9-12-17V25z" className="area-icon__line" style={strokeStyle} />
          <path d="M26 33h12" className="area-icon__line" style={strokeStyle} />
        </>
      )}
      {name === "financeira" && (
        <>
          <path d="M22 42h20M24 42V26l8-6 8 6v16" className="area-icon__line" style={strokeStyle} />
          <path d="M32 27v10" className="area-icon__line" style={strokeStyle} />
        </>
      )}
      {name === "operacional" && (
        <>
          <path d="M21 36l6-13 6 7 10-12" className="area-icon__line" style={strokeStyle} />
          <circle cx="21" cy="36" r="3" className="area-icon__solid" />
          <circle cx="33" cy="30" r="3" className="area-icon__solid" />
          <circle cx="43" cy="18" r="3" className="area-icon__solid" />
        </>
      )}
      {name === "prontuario" && (
        <>
          <path d="M24 20h16a4 4 0 0 1 4 4v20H20V24a4 4 0 0 1 4-4Z" className="area-icon__line" style={strokeStyle} />
          <path d="M26 18h12v6H26z" className="area-icon__solid" />
          <path d="M25 31h14M25 37h10" className="area-icon__line" style={strokeStyle} />
        </>
      )}
      {name === "ambulatorio" && (
        <>
          <path d="M20 42V24h24v18M18 42h28" className="area-icon__line" style={strokeStyle} />
          <path d="M29 24v-4h6v4" className="area-icon__line" style={strokeStyle} />
        </>
      )}
      {name === "extra-bloco" && (
        <>
          <path d="M20 20h10v10H20zM34 20h10v10H34zM27 34h10v10H27z" className="area-icon__line" style={strokeStyle} />
        </>
      )}
      {name === "esg" && (
        <>
          <path d="M32 44c-8-5-13-12-13-20 0-4 3-8 7-8 3 0 5 2 6 5 1-3 3-5 6-5 4 0 7 4 7 8 0 8-5 15-13 20Z" className="area-icon__line" style={strokeStyle} />
        </>
      )}
      {name === "inovacao" && (
        <>
          <path d="M32 18c7 0 12 5 12 12 0 5-3 8-6 10v6H26v-6c-4-2-6-5-6-10 0-7 5-12 12-12Z" className="area-icon__line" style={strokeStyle} />
          <path d="M27 50h10" className="area-icon__line" style={strokeStyle} />
        </>
      )}
    </svg>
  );
}

