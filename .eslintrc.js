module.exports = {
  extends: ["airbnb-base", "prettier"],
  env: {
    node: true
  },
  rules: {
    "no-mixed-operators": 0,
    "import/no-extraneous-dependencies": 0,
    quotes: ["error", "double"],
    "linebreak-style": 0,
    "no-console": 0,
    "comma-dangle": 0,
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."
      },
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
      }
    ]
  }
};
