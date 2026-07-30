import type { AreaSlug, IntakeTool } from "../types";

export interface AreaIntegrationStrategy {
  intakeTool: IntakeTool;
  formUrl?: string;
  spreadsheetUrl?: string;
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
  appsScriptWebAppUrl: "https://script.google.com/macros/s/AKfycbw-dXiyr9sHjCR325dtJz4Q-_3tg1jifPms9srNRt1WQupC-BkN_e0Eb_dIa6EThws/exec",
  dashboardAction: "readDashboard",
  manifestAction: "readManifest",
  areaAction: "readArea"
} as const;

export const areaIntegrationStrategies: Record<AreaSlug, AreaIntegrationStrategy> = {
  "coordenacao-administrativa": {
    intakeTool: "google_forms",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd41zGAgJrSiACENKdK9wX-rqCJhmY8uhHsyZE86yTqFv7LhQ/viewform?usp=header",
    spreadsheetUrl:
      "https://docs.google.com/spreadsheets/d/1YKeQMry14-UrAmWTjq0uRIiZSj0krmA00lrJ-JV94pY/edit?usp=drivesdk",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Formulario gerencial criado para a area, com planilha operacional ja vinculada a consolidacao central."
  },
  "coordenacao-clinica": {
    intakeTool: "google_forms",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdRzicjKuapnuq-9cHcZ_Inp3nOeb_F6YdNPzZhetZoGCAC2A/viewform?usp=header",
    spreadsheetUrl:
      "https://docs.google.com/spreadsheets/d/1-KZEOUyeeLYTN7vm2VCwZlOvTO2CtgbmF3K8VGjPXpg/edit?usp=drivesdk",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Formulario gerencial criado para a area, com planilha operacional ja vinculada a consolidacao central."
  },
  "gestao-da-qualidade": {
    intakeTool: "google_forms",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSe9KtPT5yTyxXpaUInOb_ob7-nlErloGWAlCfVzU5vBkmch5w/viewform?usp=header",
    spreadsheetUrl:
      "https://docs.google.com/spreadsheets/d/1xXCZnDvzlVF99PCco4WTtwE1kEyShCI5mOY_UREKwyo/edit?usp=drivesdk",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Formulario gerencial criado para a area, com planilha operacional ja vinculada a consolidacao central."
  },
  "gestao-de-pessoas": {
    intakeTool: "google_forms",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSeGFzYxKOaUYFhi-MiT0rtcmIdZf4lMP0qZfU2aKbvGq2B8Nw/viewform?usp=header",
    spreadsheetUrl:
      "https://docs.google.com/spreadsheets/d/1xL1snSOqSOHirVkAW6tGWpcxhNJ9OX2mbj4JWHwD0bI/edit?usp=drivesdk",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Formulario gerencial criado para a area, mantendo a planilha operacional de pessoas e treinamentos."
  },
  "gestao-de-equipamentos": {
    intakeTool: "google_forms",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSc0RLPK0J6LdlRf3-o6wfZ_RQEixdv32DPLD-Jl-ISTFaxKFA/viewform?usp=header",
    spreadsheetUrl:
      "https://docs.google.com/spreadsheets/d/1fIBNnXri1JXOQOcyupSJNWBmD8iIMoqFp8qzvA9dt-E/edit?usp=drivesdk",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Formulario gerencial criado para a area, mantendo a planilha operacional de checklists, eventos e manutencoes."
  },
  "gestao-de-conduta-etica": {
    intakeTool: "google_forms_sigilo",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSc30X-pI6XfsLUow0UBuRY3hUuznJnkYhv3uoa-lx0zshEUSQ/viewform?usp=header",
    spreadsheetUrl:
      "https://docs.google.com/spreadsheets/d/1SgzRaN-0JiaWAcDmD7Hd8Cp-GaPRcFwF9qYgwNvAE1E/edit?usp=drivesdk",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Formulario sigiloso criado para a area, mantendo a planilha operacional protegida do fluxo etico."
  },
  "gestao-financeira": {
    intakeTool: "google_forms",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScH4s6Tc2vUxy7dWvUjTsnl4yCozVNzonW8ZaqTFmPqNhI51g/viewform?usp=header",
    spreadsheetUrl:
      "https://docs.google.com/spreadsheets/d/18tSyE36O0ZtBmJqFK59DZzoeKJwyS8Zg45s7y2lOJr0/edit?usp=drivesdk",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Formulario gerencial criado para a area, com planilha operacional ja vinculada a consolidacao central."
  },
  "gestao-operacional": {
    intakeTool: "google_forms",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSe_t-cqcTboxoN2an13zKEZwFwMoCxD14debKv7SILkRj_sgQ/viewform?usp=header",
    spreadsheetUrl:
      "https://docs.google.com/spreadsheets/d/1bfMUJaVlZ9KQB4TslZ3dbob9KL116uDbgbY_m8dLDN0/edit?usp=drivesdk",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Formulario gerencial criado para a area, mantendo a planilha operacional de ocorrencias, cobertura e contingencias."
  },
  "gestao-de-prontuario": {
    intakeTool: "google_forms",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSeUPMiefZg8fhFVxDI1RzuOLtmIqMEzp2_TnOEzGm9cNff3Cw/viewform?usp=header",
    spreadsheetUrl:
      "https://docs.google.com/spreadsheets/d/1mjxE6pxX6aSJbXKKFMqrmlOIzguoMBeNPioNjdj9GVU/edit?usp=drivesdk",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Formulario gerencial criado para a area, mantendo a planilha operacional de auditorias e melhoria documental."
  },
  "ambulatorio-pre-anestesico": {
    intakeTool: "google_forms",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSe1Of1p8K9RDEezUUeUzSUJZUaPIZJ1dTRbFplI3YaENzMGgA/viewform?usp=header",
    spreadsheetUrl:
      "https://docs.google.com/spreadsheets/d/1XTnY__wMT7VgwhFd4bu6Z_K3lBymvea1sD25FZcX4uE/edit?usp=drivesdk",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Formulario gerencial criado para a area, mantendo a planilha operacional de barreiras, auditorias e riscos do ambulatorio."
  },
  "extra-bloco": {
    intakeTool: "google_forms",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd_Hl7IfIy7VP6UyGlDUWcP-3KiXggrDF7aiZb0L3PIGJOENg/viewform?usp=header",
    spreadsheetUrl:
      "https://docs.google.com/spreadsheets/d/1DEYcuJf8PEhflG_HRMvCpG5DkqORsFLUn4Rv8wWzQRo/edit?usp=drivesdk",
    intakeSheetName: "Lancamentos",
    reportSheetName: "Resumo",
    evidenceSheetName: "Evidencias",
    note: "Formulario gerencial criado para a area, mantendo a planilha operacional de devolutiva setorial e risco de cobertura."
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
