import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";


export default [
  {files: ["**/*.{js,mjs,cjs,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  env :{
    browser: true,
    es6: true,
    mocha: true,
    'cypress/globals': true
  },

  plugins: [
    'mocha', 
    'cypress' 
  ],
  extends: [
      'plugin:mocha/recommended', 
      'plugin:cypress/recommended' 
  ],
  rules: {
      // Your additional rules can go here
      'no-undef': 'off', // Disable no-undef for testing files
  }
];