import { useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FilterChips } from "../components/FilterChips";
import { SectionCard } from "../components/SectionCard";
import { WorkflowBoard } from "../components/WorkflowBoard";
import { areaBySlug } from "../config/areas";
import {
  clinicalIndicators,
  clinicalRisks,
  deliveryRecords,
  educationRecords,
  evidenceRecords,
  indicatorSyncPreview,
  indicatorSyncRuns,
  protocolRecords,
  scienceRecords,
  validationRecords
} from "../data/governance-demo";
import type {
  AreaDefinition,
  DeliveryStatus,
  UserSession,
  ValidationDecision
} from "../types";

interface ClinicalCoordinationPageProps {
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

const validationDecisionLabels: Record<ValidationDecision, string> = {
  aprovada: "Aprovada",
  devolvida: "Devolvida",
  rejeitada: "Rejeitada",
  dispensada: "Dispensada"
};

export function ClinicalCoordinationPage({
  area,
  onBack,
  activeSession
}: ClinicalCoordinationPageProps) {
  const [selectedIndicatorState, setSelectedIndicatorState] = useState<string>("todos");
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState<string>("todos");

  const clinicalDeliveries = useMemo(
    () => deliveryRecords.filter((item) => item.areaSlug === "coordenacao-clinica"),
    []
  );

  const filteredClinicalDeliveries = useMemo(
    () =>
      clinicalDeliveries.filter((item) =>
        selectedDeliveryStatus === "todos" ? true : item.status === selectedDeliveryStatus
      ),
    [clinicalDeliveries, selectedDeliveryStatus]
  );

  const filteredEvidence = useMemo(
    () =>
      evidenceRecords.filter((item) =>
        filteredClinicalDeliveries.some((delivery) => delivery.id === item.deliveryId)
      ),
    [filteredClinicalDeliveries]
  );

  const filteredValidations = useMemo(
    () =>
      validationRecords.filter((item) =>
        filteredClinicalDeliveries.some((delivery) => delivery.id === item.deliveryId)
      ),
    [filteredClinicalDeliveries]
  );

  const filteredSciences = useMemo(
    () =>
      scienceRecords.filter(
        (item) =>
          item.deliveryId &&
          filteredClinicalDeliveries.some((delivery) => delivery.id === item.deliveryId)
      ),
    [filteredClinicalDeliveries]
  );

  const filteredIndicators = useMemo(
    () =>
      clinicalIndicators.filter((indicator) =>
        selectedIndicatorState === "todos" ? true : indicator.situation === selectedIndicatorState
      ),
    [selectedIndicatorState]
  );

  const snapshot = {
    indicatorsOutOfTarget: clinicalIndicators.filter((item) => item.situation === "fora_meta").length,
    indicatorsWithoutData: clinicalIndicators.filter((item) => item.situation === "sem_dado" || item.situation === "erro").length,
    protocolsNearReview: protocolRecords.length,
    risksHigh: clinicalRisks.filter((item) => item.level === "alto" || item.level === "critico").length
  };

  const canRunSync =
    activeSession.role === "lider_area" ||
    activeSession.role === "qualidade" ||
    activeSession.role === "coordenador_administrativo";

  return (
    <div className="page page--area">
      <section className="area-hero area-hero--clinical">
        <div>
          <button className="back-link" onClick={onBack}>
            {"<- "}Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">MVP • clinica e indicadores em leitura inicial</p>
          <h1>{area.title}</h1>
          <p className="hero__lead">
            Painel para conduzir indicadores clinicos, protocolos, ROPs, riscos assistenciais e
            educacao continuada sem alterar a planilha de origem nesta fase.
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
          <a
            className="button button--ghost"
            href="https://docs.google.com/spreadsheets/d/15Ggyw33Hr4p3_p74vBxk_xpvTEpfG-L0HY6Q8bvtdFo/edit"
            target="_blank"
            rel="noreferrer"
          >
            Abrir planilha de referencia
          </a>
          {canRunSync ? (
            <span className="button button--disabled" aria-disabled="true">
              Sincronizacao em leitura
            </span>
          ) : null}
        </div>
      </section>

      <div className="tabs-row" aria-label="Abas da Coordenacao Clinica">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <section className="executive-metrics">
        <article className="executive-metric">
          <span>Fora da meta</span>
          <strong>{snapshot.indicatorsOutOfTarget}</strong>
          <small>indicadores clinicos exigindo plano de acao</small>
        </article>
        <article className="executive-metric">
          <span>Sem dado / inconsistencias</span>
          <strong>{snapshot.indicatorsWithoutData}</strong>
          <small>preservando vazio, erro e nao aplicavel sem virar zero</small>
        </article>
        <article className="executive-metric">
          <span>Protocolos e ROPs</span>
          <strong>{snapshot.protocolsNearReview}</strong>
          <small>itens catalogados para revisao e ciencia</small>
        </article>
        <article className="executive-metric">
          <span>Riscos altos</span>
          <strong>{snapshot.risksHigh}</strong>
          <small>recebidos de areas assistenciais para consolidacao</small>
        </article>
      </section>

      <div className="content-grid content-grid--executive">
        <SectionCard title="Indicadores clinicos" eyebrow="Planilha INDICADORES QMENTUM como referencia">
          <div className="filters-panel">
            <FilterChips
              label="Situacao"
              value={selectedIndicatorState}
              options={[
                { value: "todos", label: "Todos" },
                { value: "na_meta", label: "Na meta" },
                { value: "fora_meta", label: "Fora da meta" },
                { value: "sem_dado", label: "Sem dado" },
                { value: "erro", label: "Com erro" }
              ]}
              onChange={setSelectedIndicatorState}
            />
          </div>

          {filteredIndicators.length > 0 ? (
            <div className="executive-list">
              {filteredIndicators.map((indicator) => (
                <article key={indicator.id} className="list-row list-row--stacked">
                  <div>
                    <strong>{indicator.name}</strong>
                    <p>
                      Origem: {indicator.source === "planilha_referencia" ? "Planilha de referencia" : "App"} •
                      Periodo: {indicator.period}
                    </p>
                  </div>
                  <div className="inline-meta">
                    <span className={`tone-chip tone-chip--${indicator.situation}`}>{indicator.currentValue}</span>
                    <small>{indicator.originSheet} • {indicator.originCell}</small>
                  </div>
                  <p className="muted-block">Analise critica: {indicator.analysis}</p>
                  <p className="muted-block">Plano de acao: {indicator.planAction}</p>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Nenhum indicador encontrado"
              description="A situacao escolhida nao retornou indicadores clinicos para esta visualizacao."
            />
          )}
        </SectionCard>

        <SectionCard title="Previa e historico de sincronizacao" eyebrow="Somente leitura nesta fase">
          <div className="executive-list">
            {indicatorSyncRuns.map((run) => (
              <article key={run.id} className="list-row">
                <div>
                  <strong>{run.performedAt}</strong>
                  <p>{run.performedBy}</p>
                </div>
                <div className="list-row__meta">
                  <span className={`tone-chip tone-chip--${run.status}`}>{run.status}</span>
                  <small>
                    {run.newItems} novos • {run.changedItems} alterados • {run.errors} erros
                  </small>
                </div>
              </article>
            ))}
          </div>

          <div className="executive-list">
            {indicatorSyncPreview.map((preview) => (
              <article key={preview.id} className="list-row list-row--stacked">
                <div>
                  <strong>{preview.indicatorName}</strong>
                  <p>
                    {preview.competence} • {preview.sourceCell}
                  </p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${preview.result}`}>{preview.result}</span>
                </div>
                <p className="muted-block">{preview.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Protocolos e ROPs" eyebrow="Revisao, treinamento e ciencia">
          <div className="executive-list">
            {protocolRecords.map((protocol) => (
              <article key={protocol.id} className="list-row">
                <div>
                  <strong>{protocol.title}</strong>
                  <p>
                    {protocol.type} • {protocol.code} • {protocol.version}
                  </p>
                </div>
                <div className="list-row__meta">
                  <span className="tone-chip tone-chip--proxima_revisao">{protocol.reviewDate}</span>
                  <small>{protocol.scienceStatus}</small>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Mapa de risco consolidado" eyebrow="Recebendo riscos das areas assistenciais">
          <div className="executive-list">
            {clinicalRisks.map((risk) => (
              <article key={risk.id} className="list-row list-row--stacked">
                <div>
                  <strong>{risk.title}</strong>
                  <p>{areaBySlug[risk.sourceArea]?.title}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${risk.level}`}>{risk.level}</span>
                  <small>Responsavel: {risk.owner}</small>
                </div>
                <p className="muted-block">Resposta proposta: {risk.response}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Educacao continuada" eyebrow="Protocolos, eventos e aprendizado">
          <div className="executive-list">
            {educationRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.theme}</strong>
                  <p>
                    {item.origin} • {item.audience}
                  </p>
                </div>
                <div className="inline-meta">
                  <span className="tone-chip tone-chip--em_andamento">{item.dateLabel}</span>
                  <small>{item.participation}</small>
                </div>
                <p className="muted-block">{item.result}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Entregas clinicas" eyebrow="Trilha compartilhada do MVP">
          <div className="filters-panel">
            <FilterChips
              label="Status"
              value={selectedDeliveryStatus}
              options={[
                { value: "todos", label: "Todos" },
                { value: "em_andamento", label: "Em andamento" },
                { value: "aguardando_validacao", label: "Aguardando validacao" },
                { value: "validada", label: "Validadas" }
              ]}
              onChange={setSelectedDeliveryStatus}
            />
          </div>

          <WorkflowBoard
            deliveries={filteredClinicalDeliveries}
            evidences={filteredEvidence}
            validations={filteredValidations}
            sciences={filteredSciences}
          />
        </SectionCard>

        <SectionCard title="Validacao e consolidacao" eyebrow="Sem editar silenciosamente o conteudo clinico">
          {filteredClinicalDeliveries.length > 0 ? (
            <div className="executive-list">
              {filteredClinicalDeliveries.map((delivery) => {
                const validation = validationRecords.find((item) => item.deliveryId === delivery.id);
                return (
                  <article key={delivery.id} className="list-row">
                    <div>
                      <strong>{delivery.title}</strong>
                      <p>{delivery.competence}</p>
                    </div>
                    <div className="list-row__meta">
                      <span className={`tone-chip tone-chip--${delivery.status}`}>
                        {deliveryStatusLabels[delivery.status]}
                      </span>
                      <small>
                        {validation ? validationDecisionLabels[validation.decision] : "Sem decisao"}
                      </small>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="Nenhuma entrega clinica encontrada"
              description="O filtro atual nao retornou entregas clinicas para validacao e consolidacao."
            />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
