import { useEffect, useState } from "react";
import { loadAreaSyncSnapshot } from "../services/google-sync";
import type { AreaSlug, AreaSyncSnapshot } from "../types";

interface GoogleAreaSyncState {
  loading: boolean;
  snapshot: AreaSyncSnapshot | null;
}

const initialState: GoogleAreaSyncState = {
  loading: true,
  snapshot: null
};

export function useGoogleAreaSync(areaSlug: AreaSlug) {
  const [state, setState] = useState<GoogleAreaSyncState>(initialState);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const snapshot = await loadAreaSyncSnapshot(areaSlug);

      if (cancelled) {
        return;
      }

      setState({
        loading: false,
        snapshot
      });
    }

    setState(initialState);
    load().catch(() => {
      if (cancelled) {
        return;
      }

      setState({
        loading: false,
        snapshot: null
      });
    });

    return () => {
      cancelled = true;
    };
  }, [areaSlug]);

  return state;
}
