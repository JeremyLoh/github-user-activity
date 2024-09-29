import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    setupFiles: ["./mocks/server.js"],
    reporters: "verbose",
    testTimeout: 5000,
  },
})
