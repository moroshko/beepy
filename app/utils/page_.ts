export const isPublicPage = (pathname: string | null): boolean => {
  return (
    pathname === null || ["/", "/authenticated"].includes(pathname) === false
  );
};
