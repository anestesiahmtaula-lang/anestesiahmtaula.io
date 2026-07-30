import { activeAreas } from "../config/areas";
import { areaIntegrationStrategies, googleIntegrationConfig } from "../config/google-integration";
import { buildDemoDashboardSnapshot, deliveryRecords, evidenceRecords } from "../data/governance-dataset";
import type {
  AreaRemoteDelivery,
  AreaRemoteEvidence,
  AreaSlug,
  AreaSyncSnapshot,
  DashboardSyncSnapshot,
  IntegrationAreaBinding,
  IntegrationManifest
} from "../types";

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
      formUrl: strategy.formUrl,
      spreadsheetUrl: strategy.spreadsheetUrl,
      intakeSheetName: strategy.intakeSheetName,
      reportSheetName: strategy.reportSheetName,
      evidenceSheetName: strategy.evidenceSheetName,
      status: "conectada",
      note: strategy.note
    };
  });
}

function mergeBindingWithLocal(binding: IntegrationAreaBinding): IntegrationAreaBinding {
  const localBinding = buildLocalBindings().find((item) => item.areaSlug === binding.areaSlug);

  if (!localBinding) {
    return binding;
  }

  return {
    ...localBinding,
    ...binding,
    driveFolderUrl: binding.driveFolderUrl || localBinding.driveFolderUrl,
    formUrl: binding.formUrl || localBinding.formUrl,
    spreadsheetUrl: binding.spreadsheetUrl || localBinding.spreadsheetUrl,
    status: binding.status || localBinding.status,
    note: binding.note || localBinding.note
  };
}

function mergeManifestWithLocal(manifest: IntegrationManifest): IntegrationManifest {
  const localBindings = buildLocalBindings();
  const remoteAreaSlugs = new Set(manifest.areaBindings.map((item) => item.areaSlug));
  const mergedAreaBindings = [
    ...manifest.areaBindings.map((item) => mergeBindingWithLocal(item)),
    ...localBindings.filter((item) => !remoteAreaSlugs.has(item.areaSlug))
  ];
  const formsConfigured = mergedAreaBindings.filter((item) => item.intakeTool !== "google_sheets").length;
  const sheetsConfigured = mergedAreaBindings.filter((item) => item.intakeTool === "google_sheets").length;

  return {
    ...manifest,
    areaBindings: mergedAreaBindings,
    dashboard: {
      ...manifest.dashboard,
      trackedAreas: Math.max(manifest.dashboard.trackedAreas, mergedAreaBindings.length),
      formsConfigured,
      sheetsConfigured
    }
  };
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
  return fetchAppsScriptJsonWithParams<T>(action);
}

async function fetchAppsScriptJsonWithParams<T>(
  action: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(googleIntegrationConfig.appsScriptWebAppUrl);
  url.searchParams.set("action", action);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
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

function buildLocalAreaSnapshot(areaSlug: AreaSlug): AreaSyncSnapshot {
  const binding = buildLocalBindings().find((item) => item.areaSlug === areaSlug);
  const localDeliveries: AreaRemoteDelivery[] = deliveryRecords
    .filter((item) => item.areaSlug === areaSlug)
    .map((item) => ({
      registro_id: item.id,
      timestamp: item.dueLabel,
      area_slug: item.areaSlug,
      competencia: item.competence,
      tipo_registro: "entrega_pwa",
      titulo: item.title,
      descricao: item.title,
      responsavel: item.owner,
      status: item.status,
      prazo: item.dueLabel,
      origem: "pwa_local",
      fonte_nome: item.owner,
      drive_url: binding?.driveFolderUrl ?? "",
      evidence_count: item.evidenceCount,
      restrito: "nao",
      ultima_atualizacao: item.dueLabel
    }));

  const deliveryIds = new Set(localDeliveries.map((item) => item.registro_id));
  const localEvidences: AreaRemoteEvidence[] = evidenceRecords
    .filter((item) => deliveryIds.has(item.deliveryId))
    .map((item) => ({
      evidencia_id: item.id,
      registro_id: item.deliveryId,
      area_slug: areaSlug,
      titulo: item.title,
      tipo_evidencia: item.kind,
      drive_url: binding?.driveFolderUrl ?? "",
      status: item.status,
      data_registro: item.dateLabel,
      observacao: item.source
    }));

  return {
    source: "local_bootstrap",
    mode: "erro",
    areaSlug,
    binding,
    deliveries: localDeliveries,
    evidences: localEvidences,
    fetchedAt: new Date().toISOString(),
    note: "Leitura remota indisponivel no momento; a area foi mantida com um espelho local seguro."
  };
}

export async function loadIntegrationManifest(): Promise<IntegrationManifest> {
  if (!isAppsScriptConfigured()) {
    return buildLocalManifest();
  }

  try {
    const remoteManifest = await fetchAppsScriptJson<IntegrationManifest>(googleIntegrationConfig.manifestAction);
    return mergeManifestWithLocal(remoteManifest);
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
    const [dashboard, manifest] = await Promise.all([
      fetchAppsScriptJson<DashboardSyncSnapshot>(googleIntegrationConfig.dashboardAction),
      loadIntegrationManifest()
    ]);

    return {
      ...dashboard,
      trackedAreas: Math.max(dashboard.trackedAreas, manifest.areaBindings.length),
      formsConfigured: manifest.areaBindings.filter((item) => item.intakeTool !== "google_sheets").length,
      sheetsConfigured: manifest.areaBindings.filter((item) => item.intakeTool === "google_sheets").length
    };
  } catch {
    return {
      ...buildLocalManifest().dashboard,
      mode: "erro",
      note: "Nao foi possivel ler o painel remoto publicado; o PWA permaneceu com a base local preparada."
    };
  }
}

export async function loadAreaSyncSnapshot(areaSlug: AreaSlug): Promise<AreaSyncSnapshot> {
  if (!isAppsScriptConfigured()) {
    return {
      ...buildLocalAreaSnapshot(areaSlug),
      mode: "preparado_para_vinculo",
      note: "A area esta preparada para vinculo e segue operando com dados locais enquanto a leitura remota nao e exigida."
    };
  }

  try {
    const manifest = await loadIntegrationManifest();
    const response = await fetchAppsScriptJsonWithParams<{
      source: "apps_script";
      mode: "conectado" | "erro";
      areaSlug: AreaSlug;
      deliveries: AreaRemoteDelivery[];
      evidences: AreaRemoteEvidence[];
      fetchedAt: string;
    }>(googleIntegrationConfig.areaAction, { areaSlug });

    return {
      source: response.source,
      mode: response.mode,
      areaSlug: response.areaSlug,
      binding: manifest.areaBindings.find((item) => item.areaSlug === areaSlug),
      deliveries: response.deliveries ?? [],
      evidences: response.evidences ?? [],
      fetchedAt: response.fetchedAt,
      note:
        response.deliveries?.length || response.evidences?.length
          ? "Leitura remota da area ativa pela planilha mestra."
          : "Leitura remota da area ativa, aguardando novos lancamentos ou evidencias."
    };
  } catch {
    return buildLocalAreaSnapshot(areaSlug);
  }
}
