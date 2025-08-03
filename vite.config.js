import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	base: "/five/",
	resolve: {
		alias: {
			"@components": "/src/components",
		},
	},
	server: {
		open: true,
		host: "0.0.0.0",
		port: 8080,
	},
});
