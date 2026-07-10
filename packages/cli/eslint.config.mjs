import config from "@lootvm/eslint-config";

export default [
  ...config,
  {
    ignores: ["dist/", "registry/", "node_modules/"],
  },
];
