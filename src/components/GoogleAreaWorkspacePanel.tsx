import { SectionCard } from "./SectionCard";
import { googleIntegrationConfig } from "../config/google-integration";
import { useGoogleAreaSync } from "../hooks/use-google-area-sync";
import type { AreaDefinition, UserSession } from "../types";

interface GoogleAreaWorkspacePanelProps {
  area: AreaDefinition;
  activeSession: UserSession;
}

function formatStatusLabel(value: string) {
  return value.split("_").join(" ");
}

function formatIntakeToolLabel(value?: string) {
  if (value === "google_forms") {
    return "Google Forms";
  }

  if (value === "google_forms_sigilo") {
    return "Google Forms sigiloso";
  }

  if (value === "google_sheets") {
    return "Google Sheets";
  }

  return "Nao definido";
}

export function GoogleAreaWorkspacePanel({
  area,
  activeSession
}: GoogleAreaWorkspacePanelProps) {
  const { loading, snapshot } = useGoogleAreaSync(area.slug);
  const binding = snapshot?.binding;
  const recentDeliveries = snapshot?.deliveries.slice(0, 4) ?? [];
  const recentEvidences = snapshot?.evidences.slice(0, 4) ?? [];
  const competenceMap = new Map<string, number>();

  snapshot?.deliveries.forEach((item) => {
    const competence = item.competencia || "Sem competencia";
    competenceMap.set(competence, (competenceMap.get(competence) ?? 0) + 1);
  });

  const competenceSummary = Array.from(competenceMap.entries()).slice(0, 3);
  const modeLabel =
    snapshot?.mode === "conectado"
      ? "Conectado"
      : snapshot?.mode === "erro"
        ? "Com espelho local"
        : snapshot?.mode === "preparado_para_vinculo"
          ? "Pronto para vincular"
          : "Aguardando";

  return (
    <SectionCard
      title="Workspace Google da area"
      eyebrow="Pasta, planilha operativa, consolidacao e leitura remota"
    >
      <div className="status-grid">
        <article className="status-panel">
          <strong>Estado remoto</strong>
          <p>
            {loading
              ? "Lendo a planilha mestra e o espelho da area..."
              : `${modeLabel}. ${snapshot?.note ?? "Sem retorno da camada remota."}`}
          </p>
          <div className="inline-meta">
            <span
              className={`tone-chip ${
                snapshot?.mode === "conectado" ? "tone-chip--concluida" : "tone-chip--atencao"
              }`}
            >
              {modeLabel}
            </span>
          </div>
        </article>

        <article className="status-panel">
          <strong>Entradas e evidencias</strong>
          <p>
            {loading
              ? "Conferindo os ultimos registros..."
              : `${snapshot?.deliveries.length ?? 0} lancamento(s) e ${
                  snapshot?.evidences.length ?? 0
                } evidencia(s) visiveis nesta area.`}
          </p>
          <div className="report-card__metrics">
            <div>
              <span>Lancamentos</span>
              <strong>{snapshot?.deliveries.length ?? 0}</strong>
            </div>
            <div>
              <span>Evidencias</span>
              <strong>{snapshot?.evidences.length ?? 0}</strong>
            </div>
            <div>
              <span>Ultima leitura</span>
              <strong>
                {snapshot?.fetchedAt
                  ? new Date(snapshot.fetchedAt).toLocaleDateString("pt-BR")
                  : "--"}
              </strong>
            </div>
          </div>
        </article>

        <article className="status-panel">
          <strong>Acessos diretos</strong>
          <p>
            A operacao da area pode abrir a pasta oficial, o canal de entrada configurado e a
            planilha mestra sem depender de menus externos.
          </p>
          <p>Canal atual: {formatIntakeToolLabel(binding?.intakeTool)}</p>
          <div className="workspace-links">
            {activeSession.permissions.canOpenDrive && area.driveUrl ? (
              <a className="button button--ghost" href={area.driveUrl} target="_blank" rel="noreferrer">
                Pasta da area
              </a>
            ) : null}
            {binding?.formUrl ? (
              <a className="button button--ghost" href={binding.formUrl} target="_blank" rel="noreferrer">
                Formulario da area
              </a>
            ) : null}
            {binding?.spreadsheetUrl ? (
              <a
                className="button button--ghost"
                href={binding.spreadsheetUrl}
                target="_blank"
                rel="noreferrer"
              >
                Planilha da area
              </a>
            ) : null}
            <a
              className="button button--ghost"
              href={googleIntegrationConfig.masterSpreadsheetUrl}
              target="_blank"
              rel="noreferrer"
            >
              Planilha mestra
            </a>
          </div>
        </article>

        <article className="status-panel">
          <strong>Fechamento mensal</strong>
          <p>
            {competenceSummary.length
              ? competenceSummary.map(([competence, total]) => `${competence}: ${total}`).join(" | ")
              : "Aguardando registros com competencia mensal nesta area."}
          </p>
          <p>
            O Web App oficial segue publicado em{" "}
            <a href={googleIntegrationConfig.appsScriptWebAppUrl} target="_blank" rel="noreferrer">
              Apps Script
            </a>
            .
          </p>
        </article>
      </div>

      <div className="content-grid">
        <SectionCard title="Lancamentos recentes" eyebrow="Leitura remota por area">
          {recentDeliveries.length ? (
            <div className="executive-list">
              {recentDeliveries.map((item) => (
                <article key={item.registro_id} className="list-row list-row--stacked">
                  <div>
                    <strong>{item.titulo || item.tipo_registro || item.registro_id}</strong>
                    <p>
                      {item.competencia || "Sem competencia"} |{" "}
                      {item.responsavel || "Responsavel nao informado"}
                    </p>
                  </div>
                  <div className="inline-meta">
                    <span className={`tone-chip tone-chip--${item.status || "atencao"}`}>
                      {formatStatusLabel(item.status || "sem status")}
                    </span>
                  </div>
                  <p className="muted-block">{item.descricao || "Sem descricao registrada."}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="report-card report-card--empty">
              <strong>Sem lancamentos remotos nesta area</strong>
              <p>
                Assim que a equipe registrar novas acoes no formulario ou na planilha oficial,
                elas aparecerao aqui automaticamente.
              </p>
            </div>
          )}
        </SectionCard>

        <SectionCard title="Evidencias recentes" eyebrow="Links e anexos vinculados">
          {recentEvidences.length ? (
            <div className="executive-list">
              {recentEvidences.map((item) => (
                <article key={item.evidencia_id} className="list-row list-row--stacked">
                  <div>
                    <strong>{item.titulo || item.evidencia_id}</strong>
                    <p>
                      {item.tipo_evidencia || "Evidencia"} |{" "}
                      {item.data_registro || "Data nao informada"}
                    </p>
                  </div>
                  <div className="inline-meta">
                    <span className={`tone-chip tone-chip--${item.status || "pendente"}`}>
                      {formatStatusLabel(item.status || "pendente")}
                    </span>
                  </div>
                  <p className="muted-block">{item.observacao || "Sem observacao adicional."}</p>
                  {item.drive_url ? (
                    <a className="button button--ghost" href={item.drive_url} target="_blank" rel="noreferrer">
                      Abrir evidencia
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="report-card report-card--empty">
              <strong>Sem evidencias recentes nesta area</strong>
              <p>As evidencias publicadas na planilha ou na pasta oficial passarao a compor esta trilha.</p>
            </div>
          )}
        </SectionCard>
      </div>
    </SectionCard>
  );
}
