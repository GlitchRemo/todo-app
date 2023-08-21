module.exports = {
  env: {
    es2022: true,
  },

  rules: {
    "semi": ["error"],
    "max-depth": ["error", 1],
    "comma-spacing": ["error"],
    "key-spacing": ["error"],
    "prefer-const": ["error"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "max-statements": ["error", { max: 12 }, { ignoreTopLevelFunctions: true }],
    "use-isnan": ["error"],
    "complexity": ["error", { max: 4 }],
    "max-params": ["warn", { max: 3 }],
    "eqeqeq": ["error"],
    "no-multi-spaces": ["error", { ignoreEOLComments: true }],
    "no-multi-assign": ["warn"],
    "indent": ["error", 2],
    "camelcase": ["error"],
  },
};
