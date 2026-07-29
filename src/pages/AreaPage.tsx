import { GoogleAreaWorkspacePanel } from "../components/GoogleAreaWorkspacePanel";
import { SectionCard } from "../components/SectionCard";
import type { AreaDefinition, UserSession } from "../types";

interface AreaPageProps {
  area: AreaDefinition;
  onBack: () => void;
  activeSession: UserSession;
}

export function AreaPage({ area, onBack, activeSession }: AreaPageProps) {
  return (
    <div className="page page--area">
      <section className="area-hero">
        <div>
          <button className="back-link" onClick={onBack}>
            {"<- "}Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">
            {area.phase}
            {area.pilot ? " | area piloto" : ""}
          </p>
          <h1>{area.title}</h1>
          <p className="hero__lead">{area.purpose}</p>
        </div>

        <div className="area-hero__actions">
          {area.driveUrl ? (
            <a className="button button--secondary" href={area.driveUrl} target="_blank" rel="noreferrer">
              Abrir pasta no Drive
            </a>
          ) : (
            <span className="button button--disabled" aria-disabled="true">
              Drive em configuracao
            </span>
          )}
        </div>
      </section>

      <div className="tabs-row" aria-label="Secoes previstas da area">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <GoogleAreaWorkspacePanel area={area} activeSession={activeSession} />

      <div className="content-grid">
        <SectionCard title="Visao do incremento" eyebrow="Estado atual">
          <p>
            Esta area ja tem rota, apresentacao, acesso ao Drive e estrutura visual preparada para
            receber entidades compartilhadas, permissoes e integracoes em marcos curtos.
          </p>
        </SectionCard>

        <SectionCard title="Focos da area" eyebrow="Primeiros blocos">
          <ul className="feature-list">
            {area.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Proxima implementacao" eyebrow="Sem duplicar dados">
          <ul className="feature-list">
            <li>Conectar esta rota as entidades compartilhadas de entregas e evidencias.</li>
            <li>Aplicar RBAC no servidor e na interface conforme o perfil.</li>
            <li>Vincular referencias de Drive sem criar copias paralelas de documentos.</li>
          </ul>
        </SectionCard>

        <SectionCard title="Regras PWA deste estagio" eyebrow="Conectividade responsavel">
          <ul className="feature-list">
            <li>Navegacao basica permanece disponivel offline.</li>
            <li>Sincronizacoes externas exigirao conexao e autenticacao validas.</li>
            <li>Validacoes nao devem ser confirmadas enquanto o app estiver offline.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
