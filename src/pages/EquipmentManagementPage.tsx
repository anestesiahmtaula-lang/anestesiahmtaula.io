import { GoogleAreaWorkspacePanel } from "../components/GoogleAreaWorkspacePanel";
import { SectionCard } from "../components/SectionCard";
import { MonthlyReportSection } from "../components/MonthlyReportSection";
import { WorkflowBoard } from "../components/WorkflowBoard";
import {
  deliveryRecords,
  equipmentChecklistRecords,
  equipmentEventRecords,
  equipmentMaintenanceRecords,
  evidenceRecords,
  monthlyPerformanceRecords,
  scienceRecords,
  validationRecords
} from "../data/governance-dataset";
import type { AreaDefinition, RiskLevel, UserSession } from "../types";

interface EquipmentManagementPageProps {
  area: AreaDefinition;
  onBack: () => void;
  activeSession: UserSession;
}

const riskLabels: Record<RiskLevel, string> = {
  baixo: "Baixo",
  moderado: "Moderado",
  alto: "Alto",
  critico: "Critico"
};

const maintenanceLabels: Record<(typeof equipmentMaintenanceRecords)[number]["status"], string> = {
  em_dia: "Em dia",
  atrasada: "Atrasada",
  programada: "Programada"
};

const checklistLabels: Record<(typeof equipmentChecklistRecords)[number]["status"], string> = {
  conforme: "Conforme",
  atencao: "Atencao",
  pendente: "Pendente"
};

export function EquipmentManagementPage({
  area,
  onBack,
  activeSession
}: EquipmentManagementPageProps) {
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
    checklistOpen: equipmentChecklistRecords.filter((item) => item.status !== "conforme").length,
    maintenanceTracked: equipmentMaintenanceRecords.length,
    openDeliveries: areaDeliveries.filter((item) => item.status !== "validada").length,
    riskEvents: equipmentEventRecords.length
  };

  return (
    <div className="page page--area">
      <section className="area-hero area-hero--equipment">
        <div>
          <button className="back-link" onClick={onBack}>
            {"<- "}Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">Fase 2 • equipamentos, manutencao e seguranca</p>
          <h1>{area.title}</h1>
          <p className="hero__lead">
            Painel para checklist critico, manutencoes, eventos tecnicos e melhorias sem duplicar
            documentos do Drive nem perder a rastreabilidade do ciclo.
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
            Painel tecnico no PWA
          </span>
        </div>
      </section>

      <div className="tabs-row" aria-label="Abas essenciais da Gestao de Equipamentos">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <GoogleAreaWorkspacePanel area={area} activeSession={activeSession} />

      <section className="executive-metrics">
        <article className="executive-metric">
          <span>Checklists em atencao</span>
          <strong>{snapshot.checklistOpen}</strong>
          <small>itens que ainda exigem ajuste ou inicio do ciclo</small>
        </article>
        <article className="executive-metric">
          <span>Frentes de manutencao</span>
          <strong>{snapshot.maintenanceTracked}</strong>
          <small>com parceiro tecnico e periodo de referencia</small>
        </article>
        <article className="executive-metric">
          <span>Entregas abertas</span>
          <strong>{snapshot.openDeliveries}</strong>
          <small>sem pontuacao liberada ate validacao</small>
        </article>
        <article className="executive-metric">
          <span>Eventos tecnicos</span>
          <strong>{snapshot.riskEvents}</strong>
          <small>com acao de resposta rastreavel</small>
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

        <SectionCard title="Checklist critico" eyebrow="Revisao e adesao">
          <div className="executive-list">
            {equipmentChecklistRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    {item.scope} • proxima revisao {item.nextReview}
                  </p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {checklistLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Manutencoes preventivas" eyebrow="Conciliacao com engenharia clinica">
          <div className="executive-list">
            {equipmentMaintenanceRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.assetGroup}</strong>
                  <p>
                    {item.partner} • {item.referencePeriod}
                  </p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {maintenanceLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Eventos e resposta" eyebrow="Sem perder o historico tecnico">
          <div className="executive-list">
            {equipmentEventRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>Responsavel: {item.owner}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.impact}`}>
                    {riskLabels[item.impact]}
                  </span>
                </div>
                <p className="muted-block">{item.action}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Interfaces obrigatorias" eyebrow="Clinica, Operacional e Qualidade">
          <div className="executive-list">
            {[
              {
                title: "Coordenacao Clinica",
                note: "Valida impacto assistencial, protocolos e prioridade dos equipamentos criticos."
              },
              {
                title: "Gestao Operacional",
                note: "Alinha contingencias, disponibilidade e janela segura para manutencoes."
              },
              {
                title: "Gestao da Qualidade",
                note: "Valida evidencias, registra conformidade e acompanha os ciclos trimestrais."
              }
            ].map((item) => (
              <article key={item.title} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>Interface obrigatoria do fluxo de equipamentos</p>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        {monthlyRecord ? (
          <SectionCard title="Relatorio mensal" eyebrow="Base para fechamento do ciclo">
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
