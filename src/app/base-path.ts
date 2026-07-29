const rawBasePath = import.meta.env.BASE_URL || "/";

export function getBasePath() {
  if (!rawBasePath || rawBasePath === "./") {
    return "/";
  }

  return rawBasePath.endsWith("/") ? rawBasePath : `${rawBasePath}/`;
}

export function withBasePath(path: string) {
  const basePath = getBasePath();
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  if (!normalizedPath) {
    return basePath;
  }

  if (basePath === "/") {
    return `/${normalizedPath}`;
  }

  return `${basePath}${normalizedPath}`;
}

export function getAppRelativePath(pathname: string) {
  const basePath = getBasePath();

  if (basePath !== "/" && pathname.startsWith(basePath.slice(0, -1))) {
    const nextPath = pathname.slice(basePath.length - 1);
    return nextPath || "/";
  }

  return pathname || "/";
}
