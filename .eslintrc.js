module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
      ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "rules": {
      "@typescript-eslint/no-inferrable-types": [0],
      "valid-jsdoc": "off",
      "semi": [2, "always"],
      "eqeqeq": [2, "smart"],
      "space-before-blocks": "error",
      "no-extra-boolean-cast": "off",
      '@typescript-eslint/no-var-requires': 0,
    }
};
