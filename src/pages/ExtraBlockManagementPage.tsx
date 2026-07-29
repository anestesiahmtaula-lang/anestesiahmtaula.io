import { SectionCard } from "../components/SectionCard";
import { MonthlyReportSection } from "../components/MonthlyReportSection";
import { WorkflowBoard } from "../components/WorkflowBoard";
import {
  deliveryRecords,
  evidenceRecords,
  extraDimensionRecords,
  extraRiskRecords,
  extraSectorRecords,
  monthlyPerformanceRecords,
  scienceRecords,
  validationRecords
} from "../data/governance-dataset";
import type { AreaDefinition, RiskLevel, UserSession } from "../types";

interface ExtraBlockManagementPageProps {
  area: AreaDefinition;
  onBack: () => void;
  activeSession: UserSession;
}

const sectorLabels: Record<(typeof extraSectorRecords)[number]["status"], string> = {
  estavel: "Estavel",
  atencao: "Atencao",
  critico: "Critico"
};

const dimensionLabels: Record<(typeof extraDimensionRecords)[number]["status"], string> = {
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

export function ExtraBlockManagementPage({
  area,
  onBack,
  activeSession
}: ExtraBlockManagementPageProps) {
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
    sectorsAttention: extraSectorRecords.filter((item) => item.status !== "estavel").length,
    openDeliveries: areaDeliveries.filter((item) => item.status !== "validada").length,
    dimensionAlerts: extraDimensionRecords.filter((item) => item.status !== "adequada").length,
    activeRisks: extraRiskRecords.length
  };

  return (
    <div className="page page--area">
      <section className="area-hero area-hero--extra-block">
        <div>
          <button className="back-link" onClick={onBack}>
            {"<- "}Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">Fase 2 • setores, dimensionamento e riscos assistenciais</p>
          <h1>{area.title}</h1>
          <p className="hero__lead">
            Painel para leitura por setor assistencial, cobertura e riscos que alimentam a
            Coordenacao Clinica, sem exigir mudanca de codigo a cada nova frente extra bloco.
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
            Consolidado setorial no PWA
          </span>
        </div>
      </section>

      <div className="tabs-row" aria-label="Abas essenciais das Areas Assistenciais Extra Bloco">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <section className="executive-metrics">
        <article className="executive-metric">
          <span>Setores em atencao</span>
          <strong>{snapshot.sectorsAttention}</strong>
          <small>com barreiras, variacao de cobertura ou devolutiva critica</small>
        </article>
        <article className="executive-metric">
          <span>Entregas abertas</span>
          <strong>{snapshot.openDeliveries}</strong>
          <small>com evidencia setorial e trilha ate validacao final</small>
        </article>
        <article className="executive-metric">
          <span>Avisos de dimensionamento</span>
          <strong>{snapshot.dimensionAlerts}</strong>
          <small>frentes que exigem ajuste ou contingencia de cobertura</small>
        </article>
        <article className="executive-metric">
          <span>Riscos ativos</span>
          <strong>{snapshot.activeRisks}</strong>
          <small>com destino claro para Clinica e Operacional</small>
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

        <SectionCard title="Setores assistenciais" eyebrow="Leitura consolidada por frente">
          <div className="executive-list">
            {extraSectorRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.sector}</strong>
                  <p>{item.referencePeriod}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {sectorLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Dimensionamento e cobertura" eyebrow="Sem superestimar capacidade setorial">
          <div className="executive-list">
            {extraDimensionRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.horizon}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {dimensionLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Riscos e escalonamento" eyebrow="Subindo riscos para Clinica e Operacional">
          <div className="executive-list">
            {extraRiskRecords.map((item) => (
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

        <SectionCard title="Interfaces obrigatorias" eyebrow="Clinica, Operacional e Pessoas">
          <div className="executive-list">
            {[
              {
                title: "Coordenacao Clinica",
                note: "Recebe o consolidado dos setores, fecha mapa assistencial e prioriza os riscos maiores."
              },
              {
                title: "Gestao Operacional",
                note: "Ajusta distribuicao, contingencia e cobertura conforme a leitura de cada setor."
              },
              {
                title: "Gestao de Pessoas",
                note: "Apoia revisoes de cobertura, ausencias e redistribuicao quando houver restricao de capacidade."
              }
            ].map((item) => (
              <article key={item.title} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>Interface obrigatoria do fluxo extra bloco</p>
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
