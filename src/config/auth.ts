import type { AreaSlug, UserSession } from "../types";

const allOperationalAreas: AreaSlug[] = [
  "coordenacao-administrativa",
  "coordenacao-clinica",
  "gestao-da-qualidade",
  "gestao-de-pessoas",
  "gestao-de-equipamentos",
  "gestao-de-conduta-etica",
  "gestao-financeira",
  "gestao-operacional",
  "gestao-de-prontuario",
  "ambulatorio-pre-anestesico",
  "extra-bloco"
];

export const demoSessions: UserSession[] = [
  {
    id: "sess-admin",
    name: "Francisco Tadeu",
    role: "coordenador_administrativo",
    label: "Coordenador Administrativo",
    visibleAreaSlugs: allOperationalAreas,
    permissions: {
      canViewReports: true,
      canValidateDeliveries: false,
      canScorePerformance: false,
      canOpenDrive: true,
      canViewSensitiveAreas: true
    }
  },
  {
    id: "sess-quality",
    name: "Comissao da Qualidade",
    role: "qualidade",
    label: "Gestao da Qualidade",
    visibleAreaSlugs: allOperationalAreas,
    permissions: {
      canViewReports: true,
      canValidateDeliveries: true,
      canScorePerformance: true,
      canOpenDrive: true,
      canViewSensitiveAreas: true
    }
  },
  {
    id: "sess-clinica",
    name: "Lider da Coordenacao Clinica",
    role: "lider_area",
    label: "Lider da Clinica",
    primaryAreaSlug: "coordenacao-clinica",
    visibleAreaSlugs: ["coordenacao-clinica"],
    permissions: {
      canViewReports: true,
      canValidateDeliveries: false,
      canScorePerformance: false,
      canOpenDrive: true,
      canViewSensitiveAreas: false
    }
  },
  {
    id: "sess-equipe",
    name: "Equipe SAHMT",
    role: "equipe",
    label: "Equipe",
    visibleAreaSlugs: ["coordenacao-administrativa", "gestao-da-qualidade"],
    permissions: {
      canViewReports: false,
      canValidateDeliveries: false,
      canScorePerformance: false,
      canOpenDrive: false,
      canViewSensitiveAreas: false
    }
  }
];

export function getSessionById(sessionId: string | null | undefined): UserSession {
  return demoSessions.find((session) => session.id === sessionId) ?? demoSessions[0];
}

export function canAccessArea(session: UserSession, areaSlug: AreaSlug) {
  return session.visibleAreaSlugs.includes(areaSlug);
}

