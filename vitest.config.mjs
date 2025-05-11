import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
// vitest.config.mjs
import { defineConfig } from "vitest/config"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "happy-dom",
		globals: true,
		include: ["**/*.test.{ts,tsx}"],
		setupFiles: ["./src/tests/setup.ts"],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"#": path.resolve(__dirname, "./"),
		},
	},
})
