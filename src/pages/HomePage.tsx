import { AreaCard } from "../components/AreaCard";
import { SectionCard } from "../components/SectionCard";
import { areaBySlug } from "../config/areas";
import { appConfig } from "../config/app-config";
import { deliveryRecords, documentRecords, strategicRisks } from "../data/governance-demo";
import type { AreaDefinition, UserSession } from "../types";

interface HomePageProps {
  onOpenArea: (route: string) => void;
  visibleAreas: AreaDefinition[];
  activeSession: UserSession;
}

export function HomePage({
  onOpenArea,
  visibleAreas,
  activeSession
}: HomePageProps) {
  const mvpAreas = visibleAreas.filter((area) => area.phase === "MVP");
  const plannedAreas = visibleAreas.filter((area) => area.phase !== "MVP");
  const strategicModules = [
    { key: "esg", label: "ESG", enabled: appConfig.strategicModules.esg },
    { key: "inovacao", label: "Inovacao", enabled: appConfig.strategicModules.inovacao }
  ];
  const adminArea = areaBySlug["coordenacao-administrativa"];
  const executiveSnapshot = {
    deliveries: deliveryRecords.length,
    attentionDocs: documentRecords.filter((item) => item.status !== "vigente").length,
    highRisks: strategicRisks.filter((item) => item.level === "alto" || item.level === "critico").length,
    visibleAreas: visibleAreas.length,
    phaseTwoAreas: plannedAreas.length
  };

  return (
    <div className="page page--home">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">PWA SAHMT • governanca descentralizada por area</p>
          <h1>SAHMT - GESTAO</h1>
          <p className="hero__lead">
            PWA institucional com acesso filtrado por perfil, modulos especializados por area e
            fluxo rastreavel de entrega, evidencia, validacao, relatorio e ciencia.
          </p>
          <div className="hero__actions">
            <button className="button button--primary" onClick={() => onOpenArea(adminArea?.route ?? "/")}>
              Abrir piloto administrativo
            </button>
            <a className="button button--ghost" href={appConfig.rootDriveUrl} target="_blank" rel="noreferrer">
              Pasta raiz no Drive
            </a>
          </div>
        </div>

        <aside className="hero__summary">
          <div className="metric-card">
            <strong>Fluxo minimo</strong>
            <span>{"entrega -> evidencia -> validacao -> relatorio mensal -> ciencia"}</span>
          </div>
          <div className="metric-card">
            <strong>Painel executivo</strong>
            <span>
              {executiveSnapshot.deliveries} entregas rastreadas, {executiveSnapshot.attentionDocs}{" "}
              documentos em atencao e {executiveSnapshot.highRisks} riscos altos/criticos.
            </span>
          </div>
          <div className="metric-card">
            <strong>Perfil ativo</strong>
            <span>
              {activeSession.label} com {executiveSnapshot.visibleAreas} area(s) visivel(is) nesta sessao.
            </span>
          </div>
          <div className="metric-card">
            <strong>Cobertura atual</strong>
            <span>
              {mvpAreas.length} modulo(s) MVP e {executiveSnapshot.phaseTwoAreas} frente(s) de Fase 2
              ativas no PWA.
            </span>
          </div>
        </aside>
      </section>

      <SectionCard title="Areas do MVP" eyebrow="Entrega inicial">
        <div className="area-grid">
          {mvpAreas.map((area) => (
            <AreaCard
              key={area.slug}
              area={area}
              onOpen={onOpenArea}
              canOpenDrive={activeSession.permissions.canOpenDrive}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Modulos operacionais ativos" eyebrow="Fase 2 ja disponivel">
        <div className="area-grid">
          {plannedAreas.map((area) => (
            <AreaCard
              key={area.slug}
              area={area}
              onOpen={onOpenArea}
              canOpenDrive={activeSession.permissions.canOpenDrive}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Estado do PWA" eyebrow="Smartphone, acesso e operacao">
        <div className="status-grid">
          <article className="status-panel">
            <strong>Uso em smartphone</strong>
            <p>Navegacao principal, leitura das areas e abertura do app seguem prontas para instalacao em PWA.</p>
          </article>
          <article className="status-panel">
            <strong>Drive e evidencias</strong>
            <p>As areas operam com links de Drive e metadados no app sem duplicar os documentos oficiais.</p>
          </article>
          <article className="status-panel">
            <strong>Perfis e acesso</strong>
            <p>As sessoes continuam filtrando visualizacao, drive e leitura sensivel conforme o perfil ativo.</p>
          </article>
        </div>
      </SectionCard>

      <SectionCard title="Camada ja funcional neste piloto" eyebrow="Coordenacao, Qualidade e areas conectadas">
        <ul className="feature-list">
          <li>Plano de governanca com marcos, dependencias e decisoes necessarias.</li>
          <li>Deliberacoes rastreaveis sem duplicar a fila da Qualidade.</li>
          <li>Fila de validacao, grade mensal e relatorio mensal no nucleo da Qualidade.</li>
          <li>Areas de Fase 2 especializadas com leitura propria e trilha compartilhada.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Modulos estrategicos" eyebrow="Ativacao administrativa futura">
        <div className="status-grid">
          {strategicModules.map((module) => (
            <article key={module.key} className="status-panel status-panel--muted">
              <div className="status-panel__head">
                <strong>{module.label}</strong>
                <span className={`tone-chip ${module.enabled ? "tone-chip--conforme" : "tone-chip--pendente"}`}>
                  {module.enabled ? "Ativo" : "Oculto"}
                </span>
              </div>
              <p>
                {module.enabled
                  ? "Modulo estrategico liberado para exibicao e detalhamento no PWA."
                  : "Mantido fora da navegacao ate existir lideranca, escopo e ativacao administrativa validos."}
              </p>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
