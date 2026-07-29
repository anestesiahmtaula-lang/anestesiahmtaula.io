import { SectionCard } from "../components/SectionCard";
import { MonthlyReportSection } from "../components/MonthlyReportSection";
import { WorkflowBoard } from "../components/WorkflowBoard";
import {
  deliveryRecords,
  evidenceRecords,
  monthlyPerformanceRecords,
  recordAuditRecords,
  recordImprovementRecords,
  recordTrainingRecords,
  scienceRecords,
  validationRecords
} from "../data/governance-demo";
import type { AreaDefinition, UserSession } from "../types";

interface RecordsManagementPageProps {
  area: AreaDefinition;
  onBack: () => void;
  activeSession: UserSession;
}

const auditLabels: Record<(typeof recordAuditRecords)[number]["status"], string> = {
  conforme: "Conforme",
  atencao: "Atencao",
  critico: "Critico"
};

const improvementLabels: Record<(typeof recordImprovementRecords)[number]["status"], string> = {
  em_dia: "Em dia",
  ajuste_necessario: "Ajuste necessario",
  atrasada: "Atrasada"
};

const trainingLabels: Record<(typeof recordTrainingRecords)[number]["status"], string> = {
  programado: "Programado",
  em_execucao: "Em execucao",
  concluido: "Concluido"
};

export function RecordsManagementPage({
  area,
  onBack,
  activeSession
}: RecordsManagementPageProps) {
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
    auditsOpen: recordAuditRecords.filter((item) => item.status !== "conforme").length,
    openDeliveries: areaDeliveries.filter((item) => item.status !== "validada").length,
    plansOpen: recordImprovementRecords.filter((item) => item.status !== "em_dia").length,
    trainingsTracked: recordTrainingRecords.length
  };

  return (
    <div className="page page--area">
      <section className="area-hero area-hero--records">
        <div>
          <button className="back-link" onClick={onBack}>
            {"<- "}Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">Fase 2 • auditoria, melhoria e rastreio documental</p>
          <h1>{area.title}</h1>
          <p className="hero__lead">
            Painel para auditorias de registros anestesiologicos, reauditoria e treinamentos por
            nao conformidade, sem expor dados identificaveis no PWA.
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
            Mapa de auditoria no PWA
          </span>
        </div>
      </section>

      <div className="tabs-row" aria-label="Abas essenciais da Gestao de Prontuario">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <section className="executive-metrics">
        <article className="executive-metric">
          <span>Auditorias em atencao</span>
          <strong>{snapshot.auditsOpen}</strong>
          <small>amostras com desvio, criticidade ou contingencia aberta</small>
        </article>
        <article className="executive-metric">
          <span>Entregas abertas</span>
          <strong>{snapshot.openDeliveries}</strong>
          <small>com evidencia e trilha ate validacao final</small>
        </article>
        <article className="executive-metric">
          <span>Planos de melhoria</span>
          <strong>{snapshot.plansOpen}</strong>
          <small>com reauditoria ou ajuste documental pendente</small>
        </article>
        <article className="executive-metric">
          <span>Treinamentos rastreados</span>
          <strong>{snapshot.trainingsTracked}</strong>
          <small>com evidencia de presenca e reaprendizagem</small>
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

        <SectionCard title="Auditorias documentais" eyebrow="Sem expor dados sensiveis">
          <div className="executive-list">
            {recordAuditRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.referencePeriod}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {auditLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Planos de melhoria" eyebrow="Reauditoria e efetividade">
          <div className="executive-list">
            {recordImprovementRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.horizon}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {improvementLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Treinamentos por nao conformidade" eyebrow="Com reaprendizagem documentada">
          <div className="executive-list">
            {recordTrainingRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.audience}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {trainingLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.evidence}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Interfaces obrigatorias" eyebrow="Clinica, Ambulatorio e Qualidade">
          <div className="executive-list">
            {[
              {
                title: "Coordenacao Clinica",
                note: "Fecha criticidade assistencial, prioriza correcao e orienta reauditoria."
              },
              {
                title: "Ambulatorio Pre-anestesico",
                note: "Alinha completude da consulta, conciliacao e consistencia do pre-atendimento."
              },
              {
                title: "Gestao da Qualidade",
                note: "Valida evidencias, registra conformidade e acompanha a reabertura quando necessaria."
              }
            ].map((item) => (
              <article key={item.title} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>Interface obrigatoria do fluxo documental</p>
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
