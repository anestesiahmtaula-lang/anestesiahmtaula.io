import { SectionCard } from "../components/SectionCard";
import type { AreaDefinition } from "../types";

interface AreaPageProps {
  area: AreaDefinition;
  onBack: () => void;
}

export function AreaPage({ area, onBack }: AreaPageProps) {
  return (
    <div className="page page--area">
      <section className="area-hero">
        <div>
          <button className="back-link" onClick={onBack}>
            ← Voltar para a frontpage
          </button>
          <p className="hero__eyebrow">
            {area.phase}
            {area.pilot ? " • área piloto" : ""}
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
              Drive em configuração
            </span>
          )}
        </div>
      </section>

      <div className="tabs-row" aria-label="Seções previstas da área">
        {area.tabs.map((tab) => (
          <span key={tab} className="tab-pill">
            {tab}
          </span>
        ))}
      </div>

      <div className="content-grid">
        <SectionCard title="Visão do incremento" eyebrow="Estado atual">
          <p>
            Esta área já tem rota, apresentação, acesso ao Drive e estrutura visual preparada para
            receber entidades compartilhadas, permissões e integrações em marcos curtos.
          </p>
        </SectionCard>

        <SectionCard title="Focos da área" eyebrow="Primeiros blocos">
          <ul className="feature-list">
            {area.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Próxima implementação" eyebrow="Sem duplicar dados">
          <ul className="feature-list">
            <li>Conectar esta rota às entidades compartilhadas de entregas e evidências.</li>
            <li>Aplicar RBAC no servidor e na interface conforme o perfil.</li>
            <li>Vincular referências de Drive sem criar cópias paralelas de documentos.</li>
          </ul>
        </SectionCard>

        <SectionCard title="Regras PWA deste estágio" eyebrow="Conectividade responsável">
          <ul className="feature-list">
            <li>Navegação básica permanece disponível offline.</li>
            <li>Sincronizações externas exigirão conexão e autenticação válidas.</li>
            <li>Validações não devem ser confirmadas enquanto o app estiver offline.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
