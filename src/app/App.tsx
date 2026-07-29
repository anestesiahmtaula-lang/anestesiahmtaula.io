import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { canAccessArea, demoSessions, getSessionById } from "../config/auth";
import { activeAreas, areaBySlug } from "../config/areas";
import { HomePage } from "../pages/HomePage";
import { AreaPage } from "../pages/AreaPage";
import { AdministrativeCoordinationPage } from "../pages/AdministrativeCoordinationPage";
import { ClinicalCoordinationPage } from "../pages/ClinicalCoordinationPage";
import { EquipmentManagementPage } from "../pages/EquipmentManagementPage";
import { OperationalManagementPage } from "../pages/OperationalManagementPage";
import { PeopleManagementPage } from "../pages/PeopleManagementPage";
import { QualityManagementPage } from "../pages/QualityManagementPage";
import { RecordsManagementPage } from "../pages/RecordsManagementPage";
import { AmbulatoryManagementPage } from "../pages/AmbulatoryManagementPage";
import { EthicsManagementPage } from "../pages/EthicsManagementPage";
import { FinancialManagementPage } from "../pages/FinancialManagementPage";
import { ExtraBlockManagementPage } from "../pages/ExtraBlockManagementPage";
import { navigateTo, resolveRoute } from "./router";
import type { BeforeInstallPromptEvent } from "../types";

export function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [sessionId, setSessionId] = useState(() => window.localStorage.getItem("sahmt-session-id"));

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    if (sessionId) {
      window.localStorage.setItem("sahmt-session-id", sessionId);
    }
  }, [sessionId]);

  const routeMatch = useMemo(() => resolveRoute(pathname), [pathname]);
  const activeSession = useMemo(() => getSessionById(sessionId), [sessionId]);
  const visibleAreas = useMemo(
    () => activeAreas.filter((area) => canAccessArea(activeSession, area.slug)),
    [activeSession]
  );
  const area = routeMatch.kind === "area" && routeMatch.areaSlug ? areaBySlug[routeMatch.areaSlug] : undefined;
  const isAllowedArea = area ? canAccessArea(activeSession, area.slug) : false;

  async function handleInstall() {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  return (
    <AppShell
      currentPath={pathname}
      installReady={Boolean(installPrompt)}
      onInstall={handleInstall}
      onGoHome={() => navigateTo("/")}
      activeSession={activeSession}
      sessions={demoSessions}
      onSessionChange={(nextSessionId) => {
        setSessionId(nextSessionId);
        const nextSession = getSessionById(nextSessionId);
        if (routeMatch.kind === "area" && routeMatch.areaSlug && !canAccessArea(nextSession, routeMatch.areaSlug)) {
          navigateTo("/");
        }
      }}
    >
      {routeMatch.kind === "area" && area && isAllowedArea ? (
        area.slug === "coordenacao-administrativa" ? (
          <AdministrativeCoordinationPage
            area={area}
            onBack={() => navigateTo("/")}
            activeSession={activeSession}
          />
        ) : area.slug === "coordenacao-clinica" ? (
          <ClinicalCoordinationPage
            area={area}
            onBack={() => navigateTo("/")}
            activeSession={activeSession}
          />
        ) : area.slug === "gestao-da-qualidade" ? (
          <QualityManagementPage
            area={area}
            onBack={() => navigateTo("/")}
            activeSession={activeSession}
          />
        ) : area.slug === "gestao-de-pessoas" ? (
          <PeopleManagementPage
            area={area}
            onBack={() => navigateTo("/")}
            activeSession={activeSession}
          />
        ) : area.slug === "gestao-de-equipamentos" ? (
          <EquipmentManagementPage
            area={area}
            onBack={() => navigateTo("/")}
            activeSession={activeSession}
          />
        ) : area.slug === "gestao-operacional" ? (
          <OperationalManagementPage
            area={area}
            onBack={() => navigateTo("/")}
            activeSession={activeSession}
          />
        ) : area.slug === "gestao-de-prontuario" ? (
          <RecordsManagementPage
            area={area}
            onBack={() => navigateTo("/")}
            activeSession={activeSession}
          />
        ) : area.slug === "ambulatorio-pre-anestesico" ? (
          <AmbulatoryManagementPage
            area={area}
            onBack={() => navigateTo("/")}
            activeSession={activeSession}
          />
        ) : area.slug === "gestao-de-conduta-etica" ? (
          <EthicsManagementPage
            area={area}
            onBack={() => navigateTo("/")}
            activeSession={activeSession}
          />
        ) : area.slug === "gestao-financeira" ? (
          <FinancialManagementPage
            area={area}
            onBack={() => navigateTo("/")}
            activeSession={activeSession}
          />
        ) : area.slug === "extra-bloco" ? (
          <ExtraBlockManagementPage
            area={area}
            onBack={() => navigateTo("/")}
            activeSession={activeSession}
          />
        ) : (
          <AreaPage area={area} onBack={() => navigateTo("/")} />
        )
      ) : routeMatch.kind === "area" && area && !isAllowedArea ? (
        <div className="page page--area">
          <section className="area-hero">
            <div>
              <button className="back-link" onClick={() => navigateTo("/")}>
                {"<- Voltar para a frontpage"}
              </button>
              <p className="hero__eyebrow">Acesso restrito</p>
              <h1>Permissao insuficiente</h1>
              <p className="hero__lead">
                O perfil atual nao possui acesso a esta area. Troque o perfil no topo para continuar.
              </p>
            </div>
          </section>
        </div>
      ) : (
        <HomePage
          visibleAreas={visibleAreas}
          activeSession={activeSession}
          onOpenArea={(route) => {
            if (visibleAreas.some((currentArea) => currentArea.route === route || currentArea.legacyRoute === route)) {
              navigateTo(route);
            }
          }}
        />
      )}
    </AppShell>
  );
}
