import { SectionCard } from "../components/SectionCard";
import { MonthlyReportSection } from "../components/MonthlyReportSection";
import { WorkflowBoard } from "../components/WorkflowBoard";
import {
  deliveryRecords,
  evidenceRecords,
  monthlyPerformanceRecords,
  operationalCapacityRecords,
  operationalConflictRecords,
  operationalFlowRecords,
  scienceRecords,
  validationRecords
} from "../data/governance-demo";
import type { AreaDefinition, RiskLevel, UserSession } from "../types";

interface OperationalManagementPageProps {
  area: AreaDefinition;
  onBack: () => void;
  activeSession: UserSession;
}

const flowLabels: Record<(typeof operationalFlowRecords)[number]["status"], string> = {
  estavel: "Estavel",
  atencao: "Atencao",
  critico: "Critico"
};

const capacityLabels: Record<(typeof operationalCapacityRecords)[number]["status"], string> = {
  adequada: "Adequada",
  ajuste_necessario: "Ajuste necessario",
  restrita: "Restrita"
};

const riskLabels: Record<RiskLevel, string> = {
  baixo: "Baixo",
  moderado: "Moderado",
  alto: "Alto",
  critico: "Critico"
};

export function OperationalManagementPage({
  area,
  onBack,
  activeSession
}: OperationalManagementPageProps) {
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
    criticalFlows: operationalFlowRecords.filter((item) => item.status !== "estavel").length,
    openDeliveries: areaDeliveries.filter((item) => item.status !== "validada").length,
    capacityAlerts: operationalCapacityRecords.filter((item) => item.status !== "adequada").length,
    activeConflicts: operationalConflictRecords.length
  };

  return (
    <div className="page page--area">
      <section className="area-hero area-hero--operational">
        <div>
          <button className="back-link" onClick={onBack}>
            {"<- "}Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">Fase 2 • fluxo, capacidade e contingencias</p>
          <h1>{area.title}</h1>
          <p className="hero__lead">
            Painel para fluidez assistencial, distribuicao diaria, gargalos e contingencias sem
            poluir a experiencia do PWA nem duplicar evidencias das outras areas.
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
            Panorama diario no PWA
          </span>
        </div>
      </section>

      <div className="tabs-row" aria-label="Abas essenciais da Gestao Operacional">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <section className="executive-metrics">
        <article className="executive-metric">
          <span>Fluxos em atencao</span>
          <strong>{snapshot.criticalFlows}</strong>
          <small>itens com instabilidade ou contingencia aberta</small>
        </article>
        <article className="executive-metric">
          <span>Entregas abertas</span>
          <strong>{snapshot.openDeliveries}</strong>
          <small>com rastreabilidade ate validacao final</small>
        </article>
        <article className="executive-metric">
          <span>Avisos de capacidade</span>
          <strong>{snapshot.capacityAlerts}</strong>
          <small>janelas com ajuste necessario ou restricao</small>
        </article>
        <article className="executive-metric">
          <span>Conflitos ativos</span>
          <strong>{snapshot.activeConflicts}</strong>
          <small>com dono e acao de resposta definidos</small>
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

        <SectionCard title="Fluxos operacionais" eyebrow="Visao diaria e mensal">
          <div className="executive-list">
            {operationalFlowRecords.map((item) => (
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

        <SectionCard title="Capacidade e expansao" eyebrow="Sem superestimar cobertura">
          <div className="executive-list">
            {operationalCapacityRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.horizon}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {capacityLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Conflitos e barreiras" eyebrow="Com tratamento formal">
          <div className="executive-list">
            {operationalConflictRecords.map((item) => (
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

        <SectionCard title="Interfaces obrigatorias" eyebrow="Pessoas, Clinica e Qualidade">
          <div className="executive-list">
            {[
              {
                title: "Gestao de Pessoas",
                note: "Alinha cobertura, ausencias, substituicoes e impacto da escala."
              },
              {
                title: "Coordenacao Clinica",
                note: "Prioriza seguranca assistencial e ajusta distribuicao conforme risco clinico."
              },
              {
                title: "Gestao da Qualidade",
                note: "Valida evidencias, acompanha atrasos e preserva a trilha do fechamento mensal."
              }
            ].map((item) => (
              <article key={item.title} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>Interface obrigatoria do fluxo operacional</p>
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
