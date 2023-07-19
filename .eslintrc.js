module.exports = {
  env: {
    es2016: true,
  },

  rules: {
    "semi": ["error"],
    "max-depth": ["error", 1],
    "comma-spacing": ["error"],
    "key-spacing": ["error"],
    "prefer-const": ["error"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "max-lines-per-function": ["error", { max: 12 }],
    "max-statements": ["error", { max: 10 }, { ignoreTopLevelFunctions: true }],
    "no-magic-numbers": ["error"],
    "use-isnan": ["error"],
    "complexity": ["error", { max: 2 }],
    "max-params": ["error", { max: 3 }],
    "eqeqeq": ["error"],
    "no-multi-spaces": ["error", { ignoreEOLComments: true }],
    "no-multi-assign": ["warn"],
    "indent": ["error", 2],
    "camelcase": ["error"],
  },
};
