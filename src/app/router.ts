import { getAppRelativePath, withBasePath } from "./base-path";
import { areaBySlug } from "../config/areas";
import type { AreaSlug, RouteMatch } from "../types";

export function resolveRoute(pathname: string): RouteMatch {
  const appPath = getAppRelativePath(pathname);

  if (appPath === "/" || appPath === "") {
    return { kind: "home" };
  }

  const match = appPath.match(/^\/(?:areas|gestao)\/([^/]+)$/);
  const areaSlug = match?.[1] as AreaSlug | undefined;

  if (areaSlug && areaBySlug[areaSlug]) {
    return { kind: "area", areaSlug };
  }

  return { kind: "home" };
}

export function navigateTo(path: string) {
  window.history.pushState({}, "", withBasePath(path));
  window.dispatchEvent(new PopStateEvent("popstate"));
}
