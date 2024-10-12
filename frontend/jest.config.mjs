export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
