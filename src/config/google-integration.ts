import type { AreaSlug, IntakeTool } from "../types";

export interface AreaIntegrationStrategy {
  intakeTool: IntakeTool;
  intakeSheetName: string;
  reportSheetName: string;
  evidenceSheetName: string;
  note: string;
}

export const googleIntegrationConfig = {
  rootDriveUrl: "https://drive.google.com/drive/u/0/folders/1GFGNVG_x8OOZ9beuzm1wAa2mkeTQaSpV",
  masterFolderUrl: "https://drive.google.com/drive/folders/1TrhFBka0uT2IahbWwhY-CjPBuKEYpauC",
  masterSpreadsheetId: "1jiaHXLaR9p0dTh42MZ-pJbAPgt-DYfvLRHhwLR7tFy4",
  masterSpreadsheetUrl: "https://docs.google.com/spreadsheets/d/1jiaHXLaR9p0dTh42MZ-pJbAPgt-DYfvLRHhwLR7tFy4/edit?usp=drivesdk",
  appsScriptWebAppUrl: "https://script.google.com/macros/s/AKfycbxDyAyWrYyR_76pI7hsabuCm4E_2jffQZRfwDh8uT997roNErDlgOf-R7NevDwVnBAC/exec",
  dashboardAction: "readDashboard",
  manifestAction: "readManifest",
  areaAction: "readArea"
} as const;

export const areaIntegrationStrategies: Record<AreaSlug, AreaIntegrationStrategy> = {
  "coordenacao-administrativa": {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Planilha de area ja criada e vinculada a consolidacao central."
  },
  "coordenacao-clinica": {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Planilha de area ja criada e vinculada a consolidacao central."
  },
  "gestao-da-qualidade": {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Planilha de area ja criada e vinculada a consolidacao central."
  },
  "gestao-de-pessoas": {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Planilha de area ja criada e pronta para registro de pessoas e treinamentos."
  },
  "gestao-de-equipamentos": {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Planilha de area ja criada e pronta para checklists, eventos e manutencoes."
  },
  "gestao-de-conduta-etica": {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Planilha de area ja criada com controle de uso protegido no fluxo etico."
  },
  "gestao-financeira": {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Planilha de area ja criada e vinculada a consolidacao central."
  },
  "gestao-operacional": {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Planilha de area ja criada e pronta para ocorrencias, cobertura e contingencias."
  },
  "gestao-de-prontuario": {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Planilha de area ja criada e pronta para auditorias e melhoria documental."
  },
  "ambulatorio-pre-anestesico": {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Planilha de area ja criada e pronta para barreiras, auditorias e riscos do ambulatorio."
  },
  "extra-bloco": {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Planilha de area ja criada e pronta para devolutiva setorial e risco de cobertura."
  },
  esg: {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos_ESG",
    reportSheetName: "Resumo_ESG",
    evidenceSheetName: "Evidencias_ESG",
    note: "Frente estrategica prevista para ativacao posterior."
  },
  inovacao: {
    intakeTool: "google_sheets",
    intakeSheetName: "Lancamentos_Inovacao",
    reportSheetName: "Resumo_Inovacao",
    evidenceSheetName: "Evidencias_Inovacao",
    note: "Frente estrategica prevista para ativacao posterior."
  }
};
