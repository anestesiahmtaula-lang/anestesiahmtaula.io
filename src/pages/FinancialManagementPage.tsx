import { GoogleAreaWorkspacePanel } from "../components/GoogleAreaWorkspacePanel";
import { SectionCard } from "../components/SectionCard";
import { MonthlyReportSection } from "../components/MonthlyReportSection";
import { WorkflowBoard } from "../components/WorkflowBoard";
import {
  deliveryRecords,
  evidenceRecords,
  financialControlRecords,
  financialDocumentRecords,
  financialOverviewRecords,
  monthlyPerformanceRecords,
  scienceRecords,
  validationRecords
} from "../data/governance-dataset";
import type { AreaDefinition, RiskLevel, UserSession } from "../types";

interface FinancialManagementPageProps {
  area: AreaDefinition;
  onBack: () => void;
  activeSession: UserSession;
}

const flowLabels: Record<(typeof financialOverviewRecords)[number]["status"], string> = {
  estavel: "Estavel",
  atencao: "Atencao",
  critico: "Critico"
};

const documentLabels: Record<(typeof financialDocumentRecords)[number]["status"], string> = {
  conforme: "Conforme",
  ajuste_necessario: "Ajuste necessario",
  critico: "Critico"
};

const riskLabels: Record<RiskLevel, string> = {
  baixo: "Baixo",
  moderado: "Moderado",
  alto: "Alto",
  critico: "Critico"
};

export function FinancialManagementPage({
  area,
  onBack,
  activeSession
}: FinancialManagementPageProps) {
  const areaDeliveries = deliveryRecords.filter((item) => item.areaSlug === area.slug);
  const areaEvidence = evidenceRecords.filter((item) =>
    areaDeliveries.some((delivery) => delivery.id === item.deliveryId)
  );
  const areaValidations = validationRecords.filter((item) =>
    areaDeliveries.some((delivery) => delivery.id === item.deliveryId)
  );
  const areaSciences = scienceRecords.filter(
    (item) => item.deliveryId && areaDeliveries.some((delivery) => delivery.id === item.deliveryId)
  );
  const monthlyRecord = monthlyPerformanceRecords.find((item) => item.areaSlug === area.slug);

  const snapshot = {
    overviewAlerts: financialOverviewRecords.filter((item) => item.status !== "estavel").length,
    openDeliveries: areaDeliveries.filter((item) => item.status !== "validada").length,
    documentAlerts: financialDocumentRecords.filter((item) => item.status !== "conforme").length,
    controlAlerts: financialControlRecords.length
  };

  return (
    <div className="page page--area">
      <section className="area-hero area-hero--financial">
        <div>
          <button className="back-link" onClick={onBack}>
            {"<- "}Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">Fase 2 • consolidacao autorizada, documentos e controles</p>
          <h1>{area.title}</h1>
          <p className="hero__lead">
            Painel para leitura de dados financeiros autorizados, documentos oficiais e controles
            de acesso, sem automatizar efeitos societarios nem expor conteudo indevido no PWA.
          </p>
        </div>

        <div className="area-hero__actions">
          {activeSession.permissions.canOpenDrive ? (
            <a className="button button--secondary" href={area.driveUrl} target="_blank" rel="noreferrer">
              Abrir pasta no Drive
            </a>
          ) : (
            <span className="button button--disabled" aria-disabled="true">
              Drive restrito
            </span>
          )}
          <span className="button button--disabled" aria-disabled="true">
            Consolidado oficial no PWA
          </span>
        </div>
      </section>

      <div className="tabs-row" aria-label="Abas essenciais da Gestao Financeira">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <GoogleAreaWorkspacePanel area={area} activeSession={activeSession} />

      <section className="executive-metrics">
        <article className="executive-metric">
          <span>Alertas do consolidado</span>
          <strong>{snapshot.overviewAlerts}</strong>
          <small>frentes que exigem ajuste antes da leitura institucional</small>
        </article>
        <article className="executive-metric">
          <span>Entregas abertas</span>
          <strong>{snapshot.openDeliveries}</strong>
          <small>com evidencia oficial e trilha ate validacao final</small>
        </article>
        <article className="executive-metric">
          <span>Documentos em atencao</span>
          <strong>{snapshot.documentAlerts}</strong>
          <small>memoriais e checklists ainda sem conformidade plena</small>
        </article>
        <article className="executive-metric">
          <span>Controles ativos</span>
          <strong>{snapshot.controlAlerts}</strong>
          <small>com foco em acesso, versao e publicacao autorizada</small>
        </article>
      </section>

      <div className="content-grid content-grid--executive">
        <SectionCard title="Fluxo minimo da area" eyebrow="Entrega -> evidencia -> validacao -> ciencia">
          <WorkflowBoard
            deliveries={areaDeliveries}
            evidences={areaEvidence}
            validations={areaValidations}
            sciences={areaSciences}
          />
        </SectionCard>

        <SectionCard title="Consolidado autorizado" eyebrow="Somente leitura institucional">
          <div className="executive-list">
            {financialOverviewRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.referencePeriod}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {flowLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Documentacao oficial" eyebrow="Conciliacao, checklist e publicacao">
          <div className="executive-list">
            {financialDocumentRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.horizon}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {documentLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Controles e riscos" eyebrow="Acesso, versao e liberacao">
          <div className="executive-list">
            {financialControlRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>Responsavel: {item.owner}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.level}`}>
                    {riskLabels[item.level]}
                  </span>
                </div>
                <p className="muted-block">{item.action}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Interfaces obrigatorias" eyebrow="Administrativa, Qualidade e Conselho">
          <div className="executive-list">
            {[
              {
                title: "Coordenacao Administrativa",
                note: "Mantem a trilha institucional, aprovacao de acesso e rito de publicacao permitido."
              },
              {
                title: "Gestao da Qualidade",
                note: "Valida evidencias do ciclo e acompanha conformidade do fechamento mensal."
              },
              {
                title: "Conselho Diretor",
                note: "Recebe apenas leituras oficiais e homologadas, sem operacao automatica dentro do PWA."
              }
            ].map((item) => (
              <article key={item.title} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>Interface obrigatoria da governanca financeira</p>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        {monthlyRecord ? (
          <SectionCard title="Relatorio mensal" eyebrow="Base para leitura do periodo">
            <div className="report-card">
              <div className="report-card__header">
                <div>
                  <strong>
                    {monthlyRecord.month}/{monthlyRecord.year} • {area.title}
                  </strong>
                  <p>
                    Avaliador: {monthlyRecord.evaluator} • status: {monthlyRecord.evaluationStatus}
                  </p>
                </div>
                <div className="report-card__actions">
                  <button className="button button--ghost">Salvar rascunho</button>
                  {activeSession.permissions.canViewReports ? (
                    <button className="button button--primary">Fechar competencia</button>
                  ) : null}
                </div>
              </div>

              <div className="report-card__metrics">
                <div>
                  <span>Previstas</span>
                  <strong>{monthlyRecord.plannedDeliveries}</strong>
                </div>
                <div>
                  <span>Pendentes</span>
                  <strong>{monthlyRecord.pendingDeliveries}</strong>
                </div>
                <div>
                  <span>Pontuacao</span>
                  <strong>
                    {monthlyRecord.scoreObtained}/{monthlyRecord.scorePossible}
                  </strong>
                </div>
              </div>

              <p className="muted-block">Recomendacao: {monthlyRecord.recommendation}</p>
              <p className="muted-block">Justificativa: {monthlyRecord.justification}</p>
            </div>
          </SectionCard>
        ) : (
          <MonthlyReportSection
            areaTitle={area.title}
            monthlyRecord={monthlyRecord}
            canClose={activeSession.permissions.canViewReports}
          />
        )}
      </div>
    </div>
  );
}
