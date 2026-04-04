import { defineConfig } from "orval";

const commonConfig = {
  client: "react-query" as const,
  httpClient: "fetch" as const,
  override: {
    mutator: {
      path: "./src/shared/api/fetchData.ts",
      name: "fetchData",
    },
  },
};

export default defineConfig({
  health: {
    input: "../../api/health.yaml",
    output: {
      ...commonConfig,
      mode: "tags-split",
      target: "./src/func/health/api/generated/endpoints.ts",
      schemas: "./src/func/health/api/generated/model",
    },
  },
  contact: {
    input: "../../api/contact.yaml",
    output: {
      ...commonConfig,
      mode: "tags-split",
      target: "./src/func/contact/api/generated/endpoints.ts",
      schemas: "./src/func/contact/api/generated/model",
    },
  },
});
