import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import serveStatic from "serve-static";

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      {
        name: "static-folder",
        configureServer(server) {
          server.middlewares.use(
            "/source",
            serveStatic('/var/railgun', { immutable: true, maxAge: "1y" })
          );
        },
      },
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
