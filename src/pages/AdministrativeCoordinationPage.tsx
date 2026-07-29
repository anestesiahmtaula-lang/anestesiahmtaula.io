import { useMemo, useState } from "react";
import { FilterChips } from "../components/FilterChips";
import { GoogleAreaWorkspacePanel } from "../components/GoogleAreaWorkspacePanel";
import { SectionCard } from "../components/SectionCard";
import { WorkflowBoard } from "../components/WorkflowBoard";
import { areaBySlug } from "../config/areas";
import {
  decisionEntries,
  deliveryRecords,
  evidenceRecords,
  documentRecords,
  governancePlan,
  leadershipEntries,
  meetingRecords,
  scienceRecords,
  strategicRisks,
  validationRecords
} from "../data/governance-dataset";
import type {
  AreaDefinition,
  DecisionStatus,
  DeliveryStatus,
  DocumentStatus,
  GovernancePlanStatus,
  RiskLevel,
  UserSession
} from "../types";

interface AdministrativeCoordinationPageProps {
  area: AreaDefinition;
  onBack: () => void;
  activeSession: UserSession;
}

const deliveryStatusLabels: Record<DeliveryStatus, string> = {
  nao_iniciada: "Nao iniciada",
  em_andamento: "Em andamento",
  aguardando_validacao: "Aguardando validacao",
  devolvida: "Devolvida",
  validada: "Validada",
  atrasada: "Atrasada",
  reprogramada: "Reprogramada"
};

const planStatusLabels: Record<GovernancePlanStatus, string> = {
  em_dia: "Em dia",
  atencao: "Atencao",
  deliberacao: "Deliberacao"
};

const decisionStatusLabels: Record<DecisionStatus, string> = {
  aguardando: "Aguardando",
  comunicada: "Comunicada",
  em_acompanhamento: "Em acompanhamento",
  concluida: "Concluida"
};

const documentStatusLabels: Record<DocumentStatus, string> = {
  vigente: "Vigente",
  em_revisao: "Em revisao",
  proxima_revisao: "Proxima revisao",
  vencido: "Vencido"
};

const riskLevelLabels: Record<RiskLevel, string> = {
  baixo: "Baixo",
  moderado: "Moderado",
  alto: "Alto",
  critico: "Critico"
};

export function AdministrativeCoordinationPage({
  area,
  onBack,
  activeSession
}: AdministrativeCoordinationPageProps) {
  const [selectedArea, setSelectedArea] = useState<string>("todas");
  const [selectedStatus, setSelectedStatus] = useState<string>("todos");

  const snapshot = {
    deliveries: deliveryRecords.length,
    critical: deliveryRecords.filter((item) => item.status === "atrasada").length,
    pendingValidation: deliveryRecords.filter((item) => item.validationPending).length,
    docsAttention: documentRecords.filter((item) => item.status !== "vigente").length
  };

  const majorRisks = strategicRisks.filter(
    (item) => item.level === "alto" || item.level === "critico"
  );

  const areaOptions = [
    { value: "todas", label: "Todas" },
    ...leadershipEntries.map((entry) => ({
      value: entry.areaSlug,
      label: areaBySlug[entry.areaSlug]?.shortTitle ?? entry.areaSlug
    }))
  ];

  const statusOptions = [
    { value: "todos", label: "Todos" },
    { value: "em_andamento", label: "Em andamento" },
    { value: "aguardando_validacao", label: "Aguardando validacao" },
    { value: "atrasada", label: "Atrasadas" },
    { value: "validada", label: "Validadas" }
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

  return (
    <div className="page page--area">
      <section className="area-hero area-hero--executive">
        <div>
          <button className="back-link" onClick={onBack}>
            ← Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">MVP • area piloto</p>
          <h1>{area.title}</h1>
          <p className="hero__lead">
            Nucleo de supervisao, decisao, comunicacao e acompanhamento estrategico sem assumir a
            execucao das areas responsaveis.
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
              Relatorio anual em consolidacao
            </span>
          ) : null}
        </div>
      </section>

      <div className="tabs-row" aria-label="Abas essenciais da Coordenacao Administrativa">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <GoogleAreaWorkspacePanel area={area} activeSession={activeSession} />

      <section className="executive-metrics">
        <article className="executive-metric">
          <span>Entregas acompanhadas</span>
          <strong>{snapshot.deliveries}</strong>
          <small>visao consolidada sem assumir a edicao das areas</small>
        </article>
        <article className="executive-metric">
          <span>Pendencias criticas</span>
          <strong>{snapshot.critical}</strong>
          <small>itens atrasados exigindo decisao</small>
        </article>
        <article className="executive-metric">
          <span>Aguardando validacao</span>
          <strong>{snapshot.pendingValidation}</strong>
          <small>apenas acompanhamento, sem duplicar a fila da Qualidade</small>
        </article>
        <article className="executive-metric">
          <span>Documentos em atencao</span>
          <strong>{snapshot.docsAttention}</strong>
          <small>em revisao, proximos da revisao ou vencidos</small>
        </article>
      </section>

      <div className="content-grid content-grid--executive">
        <SectionCard title="Fluxo mensal rastreavel" eyebrow="Entrega → evidencia → validacao → ciencia">
          <div className="filters-panel">
            <FilterChips label="Area" value={selectedArea} options={areaOptions} onChange={setSelectedArea} />
            <FilterChips label="Status" value={selectedStatus} options={statusOptions} onChange={setSelectedStatus} />
          </div>

          <WorkflowBoard
            deliveries={filteredDeliveries}
            evidences={filteredEvidence}
            validations={filteredValidations}
            sciences={filteredSciences}
          />
        </SectionCard>

        <SectionCard title="Visao executiva" eyebrow="Resumo orientado a decisao">
          <div className="executive-list">
            {deliveryRecords.slice(0, 5).map((item) => (
              <article key={item.id} className="list-row">
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    {areaBySlug[item.areaSlug]?.title} • {item.owner}
                  </p>
                </div>
                <div className="list-row__meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {deliveryStatusLabels[item.status]}
                  </span>
                  <small>{item.dueLabel}</small>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Plano de governanca" eyebrow="Marcos e dependencias">
          <div className="executive-list">
            {governancePlan.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.strategicGoal}</strong>
                  <p>{item.delivery}</p>
                </div>
                <p className="muted-block">
                  Marco: {item.milestone}. Indicador: {item.indicator}. Dependencia:{" "}
                  {item.dependency}.
                </p>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {planStatusLabels[item.status]}
                  </span>
                  <small>{item.dueLabel} • decisao: {item.decisionRequired}</small>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Areas e liderancas" eyebrow="Cobertura e conflitos">
          <div className="executive-list">
            {leadershipEntries.map((item) => (
              <article key={item.areaSlug} className="list-row list-row--stacked">
                <div>
                  <strong>{areaBySlug[item.areaSlug]?.title}</strong>
                  <p>
                    Lider: {item.leader} • Substituto: {item.substitute}
                  </p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {item.status === "coberta" ? "Coberta" : "Atencao"}
                  </span>
                  <small>{item.members} integrantes • {item.pactDeliveries} entregas pactuadas</small>
                </div>
                <p className="muted-block">
                  Escopo: {item.scope}
                  {item.conflictNote ? ` • ${item.conflictNote}` : ""}
                </p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Deliberacoes" eyebrow="Rastreaveis">
          <div className="executive-list">
            {decisionEntries.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.subject}</strong>
                  <p>{item.origin}</p>
                </div>
                <p className="muted-block">
                  Recomendacao: {item.recommendation}. Decisao: {item.decision}.
                </p>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {decisionStatusLabels[item.status]}
                  </span>
                  <small>{item.responsible} • prazo {item.dueLabel}</small>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Documentos administrativos" eyebrow="Cadastro inicial">
          <div className="executive-list">
            {documentRecords.map((item) => (
              <article key={item.id} className="list-row">
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    Proprietario: {areaBySlug[item.ownerArea]?.shortTitle} • versao {item.version}
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

        <SectionCard title="Riscos estrategicos" eyebrow="Encaminhamento de resposta">
          <div className="executive-list">
            {majorRisks.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>{areaBySlug[item.areaSlug]?.title}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.level}`}>
                    {riskLevelLabels[item.level]}
                  </span>
                  <small>{item.dueLabel}</small>
                </div>
                <p className="muted-block">Resposta proposta: {item.response}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Reunioes" eyebrow="Proximos marcos">
          <div className="executive-list">
            {meetingRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    {item.dateLabel} • {item.audience}
                  </p>
                </div>
                <p className="muted-block">{item.outcome}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Validacao e ciencia" eyebrow="Acompanhamento sem duplicacao">
          <div className="executive-list">
            {validationRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.validator}</strong>
                  <p>{item.submittedAt}</p>
                </div>
                <p className="muted-block">{item.comment}</p>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.decision}`}>{item.decision}</span>
                </div>
              </article>
            ))}
            {scienceRecords.map((item) => (
              <article key={item.id} className="list-row">
                <div>
                  <strong>{item.entityTitle}</strong>
                  <p>{item.audience}</p>
                </div>
                <div className="list-row__meta">
                  <span className="tone-chip tone-chip--validada">{item.signedCount} cientes</span>
                  <small>{item.pendingCount} pendentes</small>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
