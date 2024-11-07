import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@helpers": path.resolve(__dirname, "./src/helpers"),
			"@state": path.resolve(__dirname, "./src/state"),
			"@type": path.resolve(__dirname, "./src/types"),
		},
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
	},
	server: {
		host: true,
		port: 8080,
	},
});
