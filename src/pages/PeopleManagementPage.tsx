import { SectionCard } from "../components/SectionCard";
import { MonthlyReportSection } from "../components/MonthlyReportSection";
import { WorkflowBoard } from "../components/WorkflowBoard";
import {
  deliveryRecords,
  evidenceRecords,
  monthlyPerformanceRecords,
  peoplePolicyRecords,
  scienceRecords,
  teamCompositionRecords,
  trainingRecords,
  validationRecords
} from "../data/governance-dataset";
import type { AreaDefinition, DocumentStatus, UserSession } from "../types";

interface PeopleManagementPageProps {
  area: AreaDefinition;
  onBack: () => void;
  activeSession: UserSession;
}

const documentStatusLabels: Record<DocumentStatus, string> = {
  vigente: "Vigente",
  em_revisao: "Em revisao",
  proxima_revisao: "Proxima revisao",
  vencido: "Vencido"
};

const compositionStatusLabels: Record<(typeof teamCompositionRecords)[number]["status"], string> = {
  coberta: "Coberta",
  ajuste_necessario: "Ajuste necessario",
  pendente_aprovacao: "Pendente aprovacao"
};

const trainingStatusLabels: Record<(typeof trainingRecords)[number]["status"], string> = {
  programado: "Programado",
  em_execucao: "Em execucao",
  concluido: "Concluido"
};

export function PeopleManagementPage({
  area,
  onBack,
  activeSession
}: PeopleManagementPageProps) {
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
    activePolicies: peoplePolicyRecords.filter((item) => item.status !== "vencido").length,
    pendingDeliveries: areaDeliveries.filter((item) => item.status !== "validada").length,
    trainingsPlanned: trainingRecords.filter((item) => item.status !== "concluido").length,
    decisionsBlocked: teamCompositionRecords.filter((item) => item.status !== "coberta").length
  };

  return (
    <div className="page page--area">
      <section className="area-hero area-hero--people">
        <div>
          <button className="back-link" onClick={onBack}>
            {"<- "}Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">MVP • pessoas, politicas e desenvolvimento</p>
          <h1>{area.title}</h1>
          <p className="hero__lead">
            Painel de composicao da equipe, politicas, treinamentos e desempenho sem duplicar
            avaliacoes nem misturar governanca com efeitos administrativos automaticos.
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
          {activeSession.permissions.canViewReports ? (
            <span className="button button--disabled" aria-disabled="true">
              Ciclo semestral no PWA
            </span>
          ) : null}
        </div>
      </section>

      <div className="tabs-row" aria-label="Abas essenciais da Gestao de Pessoas">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <section className="executive-metrics">
        <article className="executive-metric">
          <span>Politicas ativas</span>
          <strong>{snapshot.activePolicies}</strong>
          <small>com versao e proxima revisao visiveis</small>
        </article>
        <article className="executive-metric">
          <span>Entregas em andamento</span>
          <strong>{snapshot.pendingDeliveries}</strong>
          <small>sem liberar pontuacao antes da validacao</small>
        </article>
        <article className="executive-metric">
          <span>Capacitacoes abertas</span>
          <strong>{snapshot.trainingsPlanned}</strong>
          <small>com evidencia minima e participacao rastreavel</small>
        </article>
        <article className="executive-metric">
          <span>Decisoes pendentes</span>
          <strong>{snapshot.decisionsBlocked}</strong>
          <small>dependencias com Operacional e Qualidade</small>
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

        <SectionCard title="Politicas e documentos" eyebrow="Sem copia paralela do Drive">
          <div className="executive-list">
            {peoplePolicyRecords.map((item) => (
              <article key={item.id} className="list-row">
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    {item.cycle} • responsavel: {item.owner} • versao {item.version}
                  </p>
                </div>
                <div className="list-row__meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {documentStatusLabels[item.status]}
                  </span>
                  <small>{item.nextReview}</small>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Composicao e cobertura" eyebrow="Equipe, substituicoes e ausencias">
          <div className="executive-list">
            {teamCompositionRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.focus}</strong>
                  <p>
                    {item.referencePeriod} • responsavel: {item.owner}
                  </p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {compositionStatusLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Treinamentos e desenvolvimento" eyebrow="Com participacao e devolutiva">
          <div className="executive-list">
            {trainingRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    {item.audience} • {item.dateLabel}
                  </p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {trainingStatusLabels[item.status]}
                  </span>
                  <small>{item.participation}</small>
                </div>
                <p className="muted-block">{item.evidence}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Interfaces obrigatorias" eyebrow="Sem sobrepor responsabilidade">
          <div className="executive-list">
            {[
              {
                title: "Gestao Operacional",
                note: "Valida cobertura, ausencias e impacto na escala antes de aprovar mudancas."
              },
              {
                title: "Gestao da Qualidade",
                note: "Valida evidencias, consolida relatorio mensal e preserva independencia da avaliacao."
              },
              {
                title: "Coordenacao Administrativa",
                note: "Delibera prioridades e aprovadores finais sem editar o conteudo originado na area."
              }
            ].map((item) => (
              <article key={item.title} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>Interface obrigatoria do fluxo de pessoas</p>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        {monthlyRecord ? (
          <SectionCard title="Relatorio mensal" eyebrow="Sem penalizar o que nao vence no mes">
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
