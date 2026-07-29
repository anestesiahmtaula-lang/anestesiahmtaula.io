import { SectionCard } from "../components/SectionCard";
import { MonthlyReportSection } from "../components/MonthlyReportSection";
import { WorkflowBoard } from "../components/WorkflowBoard";
import {
  ambulatoryAuditRecords,
  ambulatoryFlowRecords,
  ambulatoryRiskRecords,
  deliveryRecords,
  evidenceRecords,
  monthlyPerformanceRecords,
  scienceRecords,
  validationRecords
} from "../data/governance-dataset";
import type { AreaDefinition, RiskLevel, UserSession } from "../types";

interface AmbulatoryManagementPageProps {
  area: AreaDefinition;
  onBack: () => void;
  activeSession: UserSession;
}

const flowLabels: Record<(typeof ambulatoryFlowRecords)[number]["status"], string> = {
  estavel: "Estavel",
  atencao: "Atencao",
  critico: "Critico"
};

const auditLabels: Record<(typeof ambulatoryAuditRecords)[number]["status"], string> = {
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

export function AmbulatoryManagementPage({
  area,
  onBack,
  activeSession
}: AmbulatoryManagementPageProps) {
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
    flowsAttention: ambulatoryFlowRecords.filter((item) => item.status !== "estavel").length,
    openDeliveries: areaDeliveries.filter((item) => item.status !== "validada").length,
    auditAlerts: ambulatoryAuditRecords.filter((item) => item.status !== "conforme").length,
    activeRisks: ambulatoryRiskRecords.length
  };

  return (
    <div className="page page--area">
      <section className="area-hero area-hero--ambulatory">
        <div>
          <button className="back-link" onClick={onBack}>
            {"<- "}Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">Fase 2 • fluxo do paciente, auditoria e barreiras</p>
          <h1>{area.title}</h1>
          <p className="hero__lead">
            Painel para acompanhar fluxo do paciente, estrutura do atendimento e auditorias do
            pre-anestesico sem duplicar informacoes de Prontuario ou Clinica no PWA.
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
            Mapa do fluxo no PWA
          </span>
        </div>
      </section>

      <div className="tabs-row" aria-label="Abas essenciais do Ambulatorio Pre-anestesico">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <section className="executive-metrics">
        <article className="executive-metric">
          <span>Fluxos em atencao</span>
          <strong>{snapshot.flowsAttention}</strong>
          <small>barreiras e contingencias do atendimento pre-anestesico</small>
        </article>
        <article className="executive-metric">
          <span>Entregas abertas</span>
          <strong>{snapshot.openDeliveries}</strong>
          <small>com trilha completa ate validacao final</small>
        </article>
        <article className="executive-metric">
          <span>Auditorias com alerta</span>
          <strong>{snapshot.auditAlerts}</strong>
          <small>registros ou TCLE exigindo correcao</small>
        </article>
        <article className="executive-metric">
          <span>Riscos ativos</span>
          <strong>{snapshot.activeRisks}</strong>
          <small>com dono e plano de resposta definidos</small>
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

        <SectionCard title="Fluxo do paciente" eyebrow="Triagem, acesso e preparo">
          <div className="executive-list">
            {ambulatoryFlowRecords.map((item) => (
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

        <SectionCard title="Auditorias do ambulatorio" eyebrow="Registros, conciliacao e TCLE">
          <div className="executive-list">
            {ambulatoryAuditRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.horizon}</p>
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

        <SectionCard title="Riscos e barreiras" eyebrow="Sem perder continuidade assistencial">
          <div className="executive-list">
            {ambulatoryRiskRecords.map((item) => (
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

        <SectionCard title="Interfaces obrigatorias" eyebrow="Prontuario, Clinica e Qualidade">
          <div className="executive-list">
            {[
              {
                title: "Gestao de Prontuario",
                note: "Alinha completude documental e prepara a reauditoria dos registros."
              },
              {
                title: "Coordenacao Clinica",
                note: "Prioriza seguranca assistencial e revisa barreiras de estratificacao e preparo."
              },
              {
                title: "Gestao da Qualidade",
                note: "Valida evidencias, acompanha o ciclo mensal e consolida os pontos de melhoria."
              }
            ].map((item) => (
              <article key={item.title} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>Interface obrigatoria do fluxo ambulatorial</p>
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
