// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://sascha.github.io",
  base: "/bip-explainer",
  vite: {
    plugins: [tailwindcss()],
  },
});
