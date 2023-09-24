import { useSyncExternalStore } from "react";

const getSnapshot = () => {
  return window.innerWidth;
};

const getServerSnapshot = () => {
  return 0; // Always return 0 for server-generated HTML
};

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);

  return () => {
    window.removeEventListener("resize", callback);
  };
};

export const useWindowWidth = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
