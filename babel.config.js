/**
 * Babel configuration
 *
 * @see https://babeljs.io/docs/en/options
 * @copyright 2016-present Kriasoft (https://git.io/Jt7GM)
 *
 * @param {import("@babel/core").ConfigAPI} api
 * @returns {import("@babel/core").TransformOptions}
 */

module.exports = function config(api) {
  return {
    presets: [
      [
        "@babel/preset-env",
        api.caller((x) => !x || x.target === "node" || x.target === undefined)
          ? {
              targets: { node: "14" },
              useBuiltIns: "usage",
              corejs: { version: 3, proposals: true },
            }
          : {},
      ],
    ],

    plugins: [
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
    ],

    ignore: api.env() === "test" ? [] : ["**/__tests__/**", "**/*.test.ts"],
    sourceMaps: api.env() === "production",

    overrides: [
      {
        test: /\.tsx?$/,
        presets: ["@babel/preset-typescript"],
      },

      {
        test: /\.tsx$/,
        presets: [
          [
            "@babel/preset-react",
            {
              development: api.env() === "development",
              useBuiltIns: true,
              runtime: "automatic",
              importSource: "@emotion/react",
            },
          ],
        ],
        plugins: ["@emotion/babel-plugin"],
      },

      {
        test: "**/*.d.ts",
        presets: [["@babel/preset-env", { targets: { esmodules: true } }]],
      },
    ],
  };
};
