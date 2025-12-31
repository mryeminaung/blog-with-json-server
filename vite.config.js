import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 3000,
		open: true,
	},
	resolve: {
		alias: {
			// This maps the "@" symbol to the "src" folder
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@layouts": path.resolve(__dirname, "./src/layouts"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@types": path.resolve(__dirname, "./src/types"),
		},
	},
});
