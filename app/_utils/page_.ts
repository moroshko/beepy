const authenticatedPages = ["/", "/history", "/profile", "/authenticated"];

export const isPublicPage = (pathname: string | null): boolean => {
  return pathname === null || authenticatedPages.includes(pathname) === false;
};
