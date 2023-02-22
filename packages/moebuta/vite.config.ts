import { defineConfig, loadEnv } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import serveStatic from "serve-static";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      {
        name: "static-folder",
        configureServer(server) {
          const mountPoint = env.MOEBUTA_MOUNT_POINT;
          if (!mountPoint) {
            throw new Error("Mount Point not specified");
          }
          server.middlewares.use(
            "/source",
            serveStatic(mountPoint, { immutable: true, maxAge: "1y" })
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
