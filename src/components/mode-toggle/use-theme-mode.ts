import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface themeMode {
  mode: "dark" | "light";
  setMode: (mode: "dark" | "light") => void;
  setSystem: () => void;
}

const getDefaultMode = (): "dark" | "light" => {
  if (typeof window == "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const useThemeMode = create<themeMode>((set) => ({
  mode: getDefaultMode(),
  setMode: (mode) => set({ mode }),
  setSystem: () => set(() => ({ mode: getDefaultMode() })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Theme Mode", useThemeMode);

export default useThemeMode;
