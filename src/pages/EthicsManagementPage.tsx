import { SectionCard } from "../components/SectionCard";
import { MonthlyReportSection } from "../components/MonthlyReportSection";
import { WorkflowBoard } from "../components/WorkflowBoard";
import {
  deliveryRecords,
  ethicsDeliberationRecords,
  ethicsFlowRecords,
  ethicsSafeguardRecords,
  evidenceRecords,
  monthlyPerformanceRecords,
  scienceRecords,
  validationRecords
} from "../data/governance-dataset";
import type { AreaDefinition, RiskLevel, UserSession } from "../types";

interface EthicsManagementPageProps {
  area: AreaDefinition;
  onBack: () => void;
  activeSession: UserSession;
}

const flowLabels: Record<(typeof ethicsFlowRecords)[number]["status"], string> = {
  estavel: "Estavel",
  atencao: "Atencao",
  critico: "Critico"
};

const deliberationLabels: Record<(typeof ethicsDeliberationRecords)[number]["status"], string> = {
  programado: "Programado",
  em_execucao: "Em execucao",
  concluido: "Concluido"
};

const riskLabels: Record<RiskLevel, string> = {
  baixo: "Baixo",
  moderado: "Moderado",
  alto: "Alto",
  critico: "Critico"
};

export function EthicsManagementPage({
  area,
  onBack,
  activeSession
}: EthicsManagementPageProps) {
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
  const canViewSensitiveDetails = activeSession.permissions.canViewSensitiveAreas;

  const snapshot = {
    flowsAttention: ethicsFlowRecords.filter((item) => item.status !== "estavel").length,
    openDeliveries: areaDeliveries.filter((item) => item.status !== "validada").length,
    deliberationsTracked: ethicsDeliberationRecords.length,
    safeguardsOpen: ethicsSafeguardRecords.length
  };

  return (
    <div className="page page--area">
      <section className="area-hero area-hero--ethics">
        <div>
          <button className="back-link" onClick={onBack}>
            {"<- "}Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">Fase 2 • fluxo protegido, deliberacao e salvaguardas</p>
          <h1>{area.title}</h1>
          <p className="hero__lead">
            Painel para governanca do acolhimento etico, trilha de deliberacao e controles de
            acesso, sem expor conteudo sensivel de casos no PWA.
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
            Painel protegido no PWA
          </span>
        </div>
      </section>

      <div className="tabs-row" aria-label="Abas essenciais da Gestao de Conduta Etica">
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
          <small>com prazos sensiveis ou rastreio documental reforcado</small>
        </article>
        <article className="executive-metric">
          <span>Entregas abertas</span>
          <strong>{snapshot.openDeliveries}</strong>
          <small>com evidencia protegida e trilha ate validacao final</small>
        </article>
        <article className="executive-metric">
          <span>Ritos acompanhados</span>
          <strong>{snapshot.deliberationsTracked}</strong>
          <small>com classificacao, ciencia dirigida e encerramento formal</small>
        </article>
        <article className="executive-metric">
          <span>Salvaguardas ativas</span>
          <strong>{snapshot.safeguardsOpen}</strong>
          <small>com foco em acesso, cadeia de custodia e comunicacao permitida</small>
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

        <SectionCard title="Fluxo protegido" eyebrow="Sem expor dados de casos">
          <div className="executive-list">
            {ethicsFlowRecords.map((item) => (
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

        <SectionCard title="Ritos de deliberacao" eyebrow="Triagem, ciencia dirigida e encerramento">
          <div className="executive-list">
            {ethicsDeliberationRecords.map((item) => (
              <article key={item.id} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.horizon}</p>
                </div>
                <div className="inline-meta">
                  <span className={`tone-chip tone-chip--${item.status}`}>
                    {deliberationLabels[item.status]}
                  </span>
                </div>
                <p className="muted-block">{item.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Salvaguardas e riscos" eyebrow="Acesso, custodia e comunicacao">
          <div className="executive-list">
            {ethicsSafeguardRecords.map((item) => (
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

        <SectionCard title="Camada de visualizacao" eyebrow="Controle no smartphone e no desktop">
          <div className="executive-list">
            {canViewSensitiveDetails
              ? [
                  {
                    title: "Perfil autorizado",
                    note: "A sessao atual pode acompanhar fluxo, ritos e salvaguardas sem abrir conteudo nominal de casos."
                  },
                  {
                    title: "Registro protegido",
                    note: "As evidencias do PWA ficam restritas a metadados e rastreabilidade institucional."
                  }
                ].map((item) => (
                  <article key={item.title} className="list-row list-row--stacked">
                    <div>
                      <strong>{item.title}</strong>
                      <p>Resumo seguro habilitado</p>
                    </div>
                    <p className="muted-block">{item.note}</p>
                  </article>
                ))
              : [
                  {
                    title: "Visualizacao resumida",
                    note: "O perfil atual ve apenas andamento, prazos e controles gerais do fluxo etico."
                  }
                ].map((item) => (
                  <article key={item.title} className="list-row list-row--stacked">
                    <div>
                      <strong>{item.title}</strong>
                      <p>Sem detalhe sensivel no PWA</p>
                    </div>
                    <p className="muted-block">{item.note}</p>
                  </article>
                ))}
          </div>
        </SectionCard>

        <SectionCard title="Interfaces obrigatorias" eyebrow="Administrativa, Pessoas e Qualidade">
          <div className="executive-list">
            {[
              {
                title: "Coordenacao Administrativa",
                note: "Formaliza comunicacoes institucionais e garante o rito de encaminhamento permitido."
              },
              {
                title: "Gestao de Pessoas",
                note: "Apoia revisoes de codigo de conduta, ciencia dirigida e trilhas educativas."
              },
              {
                title: "Gestao da Qualidade",
                note: "Valida evidencias formais do processo sem assumir o conteudo sensivel da apuracao."
              }
            ].map((item) => (
              <article key={item.title} className="list-row list-row--stacked">
                <div>
                  <strong>{item.title}</strong>
                  <p>Interface obrigatoria da governanca etica</p>
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
