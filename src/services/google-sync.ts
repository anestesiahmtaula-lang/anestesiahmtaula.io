import { activeAreas } from "../config/areas";
import { areaIntegrationStrategies, googleIntegrationConfig } from "../config/google-integration";
import { buildDemoDashboardSnapshot } from "../data/governance-dataset";
import type { DashboardSyncSnapshot, IntegrationAreaBinding, IntegrationManifest } from "../types";

function isAppsScriptConfigured() {
  return googleIntegrationConfig.appsScriptWebAppUrl.startsWith("https://script.google.com/");
}

function buildLocalBindings(): IntegrationAreaBinding[] {
  return activeAreas.map((area) => {
    const strategy = areaIntegrationStrategies[area.slug];

    return {
      areaSlug: area.slug,
      areaTitle: area.title,
      intakeTool: strategy.intakeTool,
      driveFolderUrl: area.driveUrl,
      intakeSheetName: strategy.intakeSheetName,
      reportSheetName: strategy.reportSheetName,
      evidenceSheetName: strategy.evidenceSheetName,
      status: "conectada",
      note: strategy.note
    };
  });
}

function buildLocalManifest(): IntegrationManifest {
  const areaBindings = buildLocalBindings();
  const formsConfigured = areaBindings.filter((item) => item.intakeTool !== "google_sheets").length;
  const sheetsConfigured = areaBindings.filter((item) => item.intakeTool === "google_sheets").length;
  const dashboard = buildDemoDashboardSnapshot();

  return {
    source: "local_bootstrap",
    mode: "preparado_para_vinculo",
    rootDriveUrl: googleIntegrationConfig.rootDriveUrl,
    appsScriptUrl: googleIntegrationConfig.appsScriptWebAppUrl || undefined,
    generatedAt: "2026-07-29T18:10:00-03:00",
    lastSyncLabel: "29 jul 2026, 18:10",
    note: "As planilhas de area, a planilha mestra e o Apps Script ja foram estruturados; este modo local preserva a operacao enquanto a leitura remota nao responde.",
    dashboard: {
      ...dashboard,
      formsConfigured,
      sheetsConfigured,
      pendingBindings: 0,
      lastSyncLabel: "29 jul 2026, 18:10",
      note: "A base Google ja esta montada e consolidando pela planilha mestra. Quando a leitura remota falha, o PWA assume este espelho local de seguranca."
    },
    areaBindings
  };
}

async function fetchAppsScriptJson<T>(action: string): Promise<T> {
  const url = new URL(googleIntegrationConfig.appsScriptWebAppUrl);
  url.searchParams.set("action", action);
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Falha ao consultar integracao Google (${response.status})`);
    }

    return (await response.json()) as T;
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function loadIntegrationManifest(): Promise<IntegrationManifest> {
  if (!isAppsScriptConfigured()) {
    return buildLocalManifest();
  }

  try {
    return await fetchAppsScriptJson<IntegrationManifest>(googleIntegrationConfig.manifestAction);
  } catch {
    return {
      ...buildLocalManifest(),
      source: "local_bootstrap",
      mode: "erro",
      note: "O endpoint Google publicado foi informado, mas nao respondeu como esperado nesta leitura. O app manteve o modo seguro local."
    };
  }
}

export async function loadDashboardSyncSnapshot(): Promise<DashboardSyncSnapshot> {
  if (!isAppsScriptConfigured()) {
    return buildLocalManifest().dashboard;
  }

  try {
    return await fetchAppsScriptJson<DashboardSyncSnapshot>(googleIntegrationConfig.dashboardAction);
  } catch {
    return {
      ...buildLocalManifest().dashboard,
      mode: "erro",
      note: "Nao foi possivel ler o painel remoto publicado; o PWA permaneceu com a base local preparada."
    };
  }
}
