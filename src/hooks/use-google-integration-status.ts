import { useEffect, useState } from "react";
import { loadDashboardSyncSnapshot, loadIntegrationManifest } from "../services/google-sync";
import type { DashboardSyncSnapshot, IntegrationManifest } from "../types";

interface GoogleIntegrationStatusState {
  loading: boolean;
  manifest: IntegrationManifest | null;
  dashboard: DashboardSyncSnapshot | null;
}

const initialState: GoogleIntegrationStatusState = {
  loading: true,
  manifest: null,
  dashboard: null
};

export function useGoogleIntegrationStatus() {
  const [state, setState] = useState<GoogleIntegrationStatusState>(initialState);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [manifest, dashboard] = await Promise.all([
        loadIntegrationManifest(),
        loadDashboardSyncSnapshot()
      ]);

      if (cancelled) {
        return;
      }

      setState({
        loading: false,
        manifest,
        dashboard
      });
    }

    load().catch(() => {
      if (cancelled) {
        return;
      }

      setState({
        loading: false,
        manifest: null,
        dashboard: null
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
