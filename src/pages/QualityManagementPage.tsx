import { useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FilterChips } from "../components/FilterChips";
import { SectionCard } from "../components/SectionCard";
import { WorkflowBoard } from "../components/WorkflowBoard";
import { areaBySlug } from "../config/areas";
import {
  deliveryRecords,
  evidenceRecords,
  monthlyPerformanceRecords,
  scienceRecords,
  strategicRisks,
  validationRecords
} from "../data/governance-demo";
import type {
  AreaDefinition,
  DeliveryStatus,
  MonthlyPerformanceRecord,
  UserSession,
  ValidationDecision
} from "../types";

interface QualityManagementPageProps {
  area: AreaDefinition;
  onBack: () => void;
  activeSession: UserSession;
}

const validationDecisionLabels: Record<ValidationDecision, string> = {
  aprovada: "Aprovada",
  devolvida: "Devolvida",
  rejeitada: "Rejeitada",
  dispensada: "Dispensada"
};

const deliveryStatusLabels: Record<DeliveryStatus, string> = {
  nao_iniciada: "Nao iniciada",
  em_andamento: "Em andamento",
  aguardando_validacao: "Aguardando validacao",
  devolvida: "Devolvida",
  validada: "Validada",
  atrasada: "Atrasada",
  reprogramada: "Reprogramada"
};

const performanceStatusLabels: Record<MonthlyPerformanceRecord["evaluationStatus"], string> = {
  rascunho: "Rascunho",
  aguardando_avaliacao: "Aguardando avaliacao",
  avaliado: "Avaliado",
  publicado: "Publicado"
};

export function QualityManagementPage({
  area,
  onBack,
  activeSession
}: QualityManagementPageProps) {
  const [selectedArea, setSelectedArea] = useState<string>("todas");
  const [selectedStatus, setSelectedStatus] = useState<string>("todos");
  const [selectedReportId, setSelectedReportId] = useState<string>(monthlyPerformanceRecords[0]?.id ?? "");

  const areaOptions = [
    { value: "todas", label: "Todas" },
    ...monthlyPerformanceRecords
      .map((record) => ({
        value: record.areaSlug,
        label: areaBySlug[record.areaSlug]?.shortTitle ?? record.areaSlug
      }))
      .filter((value, index, self) => self.findIndex((item) => item.value === value.value) === index)
  ];

  const statusOptions = [
    { value: "todos", label: "Todos" },
    { value: "aguardando_validacao", label: "Aguardando validacao" },
    { value: "devolvida", label: "Devolvidas" },
    { value: "validada", label: "Validadas" },
    { value: "atrasada", label: "Atrasadas" }
  ];

  const filteredDeliveries = useMemo(() => {
    return deliveryRecords.filter((item) => {
      const areaMatch = selectedArea === "todas" || item.areaSlug === selectedArea;
      const statusMatch = selectedStatus === "todos" || item.status === selectedStatus;
      return areaMatch && statusMatch;
    });
  }, [selectedArea, selectedStatus]);

  const filteredEvidence = useMemo(
    () =>
      evidenceRecords.filter((item) =>
        filteredDeliveries.some((delivery) => delivery.id === item.deliveryId)
      ),
    [filteredDeliveries]
  );

  const filteredValidations = useMemo(
    () =>
      validationRecords.filter((item) =>
        filteredDeliveries.some((delivery) => delivery.id === item.deliveryId)
      ),
    [filteredDeliveries]
  );

  const filteredSciences = useMemo(
    () =>
      scienceRecords.filter(
        (item) =>
          item.deliveryId &&
          filteredDeliveries.some((delivery) => delivery.id === item.deliveryId)
      ),
    [filteredDeliveries]
  );

  const report =
    monthlyPerformanceRecords.find((item) => item.id === selectedReportId) ??
    monthlyPerformanceRecords[0];
  const reportArea = report ? areaBySlug[report.areaSlug] : undefined;

  const snapshot = {
    pendingValidation:
      validationRecords.filter((item) => item.decision === "devolvida").length +
      deliveryRecords.filter((item) => item.status === "aguardando_validacao").length,
    validated: deliveryRecords.filter((item) => item.status === "validada").length,
    overdue: deliveryRecords.filter((item) => item.status === "atrasada").length,
    highRisks: strategicRisks.filter((item) => item.level === "alto" || item.level === "critico").length
  };

  return (
    <div className="page page--area">
      <section className="area-hero area-hero--quality">
        <div>
          <button className="back-link" onClick={onBack}>
            {"<- "}Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">MVP • validacao independente</p>
          <h1>{area.title}</h1>
          <p className="hero__lead">
            Painel consolidado para verificar entregas, evidencias, versoes submetidas e avaliacao
            mensal sem duplicar os registros das areas.
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
              Relatorio mensal no painel
            </span>
          ) : null}
        </div>
      </section>

      <div className="tabs-row" aria-label="Abas da Gestao da Qualidade">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <section className="executive-metrics">
        <article className="executive-metric">
          <span>Fila em atencao</span>
          <strong>{snapshot.pendingValidation}</strong>
          <small>itens aguardando decisao ou devolvidos para correcao</small>
        </article>
        <article className="executive-metric">
          <span>Entregas validadas</span>
          <strong>{snapshot.validated}</strong>
          <small>com confirmacao registrada apos submissao</small>
        </article>
        <article className="executive-metric">
          <span>Pendencias e atrasos</span>
          <strong>{snapshot.overdue}</strong>
          <small>sem penalidade automatica fora de regra aprovada</small>
        </article>
        <article className="executive-metric">
          <span>Riscos altos/criticos</span>
          <strong>{snapshot.highRisks}</strong>
          <small>visao consolidada para decisao e deliberacao</small>
        </article>
      </section>

      <div className="content-grid content-grid--executive">
        <SectionCard title="Fila de validacao" eyebrow="Com trilha e fundamento">
          <div className="filters-panel">
            <FilterChips label="Area" value={selectedArea} options={areaOptions} onChange={setSelectedArea} />
            <FilterChips label="Status" value={selectedStatus} options={statusOptions} onChange={setSelectedStatus} />
          </div>

          {filteredDeliveries.length > 0 ? (
            <div className="executive-list">
              {filteredDeliveries.map((delivery) => {
                const validation = validationRecords.find((item) => item.deliveryId === delivery.id);
                const evidences = evidenceRecords.filter((item) => item.deliveryId === delivery.id);
                return (
                  <article key={delivery.id} className="list-row list-row--stacked">
                    <div>
                      <strong>{delivery.title}</strong>
                      <p>
                        {areaBySlug[delivery.areaSlug]?.title} • {delivery.owner} • {delivery.competence}
                      </p>
                    </div>
                    <div className="inline-meta">
                      <span className={`tone-chip tone-chip--${delivery.status}`}>
                        {deliveryStatusLabels[delivery.status]}
                      </span>
                      {validation && activeSession.permissions.canValidateDeliveries ? (
                        <span className={`tone-chip tone-chip--${validation.decision}`}>
                          {validationDecisionLabels[validation.decision]}
                        </span>
                      ) : (
                        <span className="tone-chip tone-chip--aguardando">Sem decisao</span>
                      )}
                      <small>{delivery.dueLabel}</small>
                    </div>
                    <p className="muted-block">
                      Evidencias: {evidences.length}. Comentario da validacao:{" "}
                      {validation?.comment ?? "Aguardando analise da Qualidade."}
                    </p>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="Nenhuma entrega encontrada"
              description="A combinacao atual de filtros nao retornou entregas para a fila de validacao."
            />
          )}
        </SectionCard>

        <SectionCard title="Grade mensal" eyebrow="Registros originais por competencia">
          {filteredDeliveries.length > 0 ? (
            <div className="quality-grid">
              <div className="quality-grid__head">Area</div>
              <div className="quality-grid__head">Competencia</div>
              <div className="quality-grid__head">Entrega</div>
              <div className="quality-grid__head">Status</div>
              <div className="quality-grid__head">Validacao</div>

              {filteredDeliveries.map((delivery) => {
                const validation = validationRecords.find((item) => item.deliveryId === delivery.id);
                return (
                  <div key={delivery.id} className="quality-grid__row">
                    <span>{areaBySlug[delivery.areaSlug]?.shortTitle}</span>
                    <span>{delivery.competence}</span>
                    <span>{delivery.title}</span>
                    <span className={`quality-grid__status quality-grid__status--${delivery.status}`}>
                      {deliveryStatusLabels[delivery.status]}
                    </span>
                    <span>{validation ? validationDecisionLabels[validation.decision] : "Pendente"}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="Grade mensal sem linhas"
              description="Nao ha entregas para exibir na grade com os filtros atualmente selecionados."
            />
          )}
        </SectionCard>

        <SectionCard title="Fluxo consolidado" eyebrow="Sem duplicar os registros das areas">
          <WorkflowBoard
            deliveries={filteredDeliveries}
            evidences={filteredEvidence}
            validations={filteredValidations}
            sciences={filteredSciences}
          />
        </SectionCard>

        <SectionCard title="Relatorio mensal" eyebrow="Mes, ano e area obrigatorios">
          <div className="filters-panel">
            <FilterChips
              label="Area do relatorio"
              value={report?.areaSlug ?? ""}
              options={areaOptions.filter((item) => item.value !== "todas")}
              onChange={(value) => {
                const next = monthlyPerformanceRecords.find((item) => item.areaSlug === value);
                if (next) {
                  setSelectedReportId(next.id);
                }
              }}
            />
          </div>

          {report ? (
            <div className="report-card">
              <div className="report-card__header">
                <div>
                  <strong>
                    {reportArea?.title} • {report.month}/{report.year}
                  </strong>
                  <p>
                    Avaliador: {report.evaluator} • Status: {performanceStatusLabels[report.evaluationStatus]}
                  </p>
                </div>
                <div className="report-card__actions">
                  <span className="button button--disabled" aria-disabled="true">
                    Rascunho controlado
                  </span>
                  {activeSession.permissions.canScorePerformance ? (
                    <span className="button button--disabled" aria-disabled="true">
                      Avaliacao guiada
                    </span>
                  ) : null}
                  {activeSession.permissions.canViewReports ? (
                    <span className="button button--disabled" aria-disabled="true">
                      Publicacao controlada
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="report-card__metrics">
                <div>
                  <span>Entregas previstas</span>
                  <strong>{report.plannedDeliveries}</strong>
                </div>
                <div>
                  <span>Validadas no prazo</span>
                  <strong>{report.validatedOnTime}</strong>
                </div>
                <div>
                  <span>Pontuacao</span>
                  <strong>
                    {report.scoreObtained}/{report.scorePossible}
                  </strong>
                </div>
              </div>

              <p className="muted-block">Recomendacao: {report.recommendation}</p>
              <p className="muted-block">Justificativa obrigatoria: {report.justification}</p>
            </div>
          ) : (
            <EmptyState
              title="Relatorio mensal indisponivel"
              description="Ainda nao existe um registro mensal disponivel para a area selecionada."
            />
          )}
        </SectionCard>

        <SectionCard title="Painel executivo" eyebrow="Consolidado da Qualidade">
          <div className="executive-list">
            {monthlyPerformanceRecords.map((record) => (
              <article key={record.id} className="list-row list-row--stacked">
                <div>
                  <strong>{areaBySlug[record.areaSlug]?.title}</strong>
                  <p>
                    {record.month}/{record.year} • {performanceStatusLabels[record.evaluationStatus]}
                  </p>
                </div>
                <div className="inline-meta">
                  <span className="tone-chip tone-chip--validada">
                    {record.scoreObtained}/{record.scorePossible}
                  </span>
                  <small>
                    {record.pendingDeliveries} pendentes • {record.returnedDeliveries} devolvidas
                  </small>
                </div>
                <p className="muted-block">{record.recommendation}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
