module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {

    //
    'no-console': 'off',

    //
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // recommended by Vetur
    'vue/html-self-closing': 'off',

    // Disable max-len
    'max-len': 'off',

    // Disable dot-notation
    'dot-notation': 0,

    // Disable quote prop errors for contract json abi
    'quote-props': 0,

    //
    'object-curly-newline': 0,

    //
    'no-underscore-dangle': 'off',

    //
    'no-plusplus': 'off',

    // 
    'object-shorthand': 'off',

    //
    'vue/attribute-hyphenation': 'off',
  
    // we don't want it
    semi: ['error', 'never'],

    // add parens ony when required in arrow function
    'arrow-parens': ['error', 'as-needed'],

    //
    'prefer-destructuring': ['error', { 'object': true, 'array': false }],

    //
    'linebreak-style': 'off',

    // add new line above comment
    'newline-before-return': 'error',

    // add new line below import
    'import/newline-after-import': ['error', { count: 1 }],

    //
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    //
    'global-require': 'off',

    //
    'arrow-body-style': 'off',
  },
}
