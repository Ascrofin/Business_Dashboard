function banImportExtension(extension) {
  const message = `Unexpected use of file extension (.${extension}) in import`;
  const literalAttributeMatcher = `Literal[value=/\\.${extension}$/]`;
  return [
    {
      // import foo from 'bar.js';
      selector: `ImportDeclaration > ${literalAttributeMatcher}.source`,
      message,
    },
    {
      // const foo = import('bar.js');
      selector: `ImportExpression > ${literalAttributeMatcher}.source`,
      message,
    },
    {
      // type Foo = typeof import('bar.js');
      selector: `TSImportType > TSLiteralType > ${literalAttributeMatcher}`,
      message,
    },
    {
      // const foo = require('foo.js');
      selector: `CallExpression[callee.name = "require"] > ${literalAttributeMatcher}.arguments`,
      message,
    },
  ];
}

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    // Add any other custom rules or overrides here
    'no-restricted-syntax': [
      'error',
      ...banImportExtension('js'),
      ...banImportExtension('jsx'),
      ...banImportExtension('ts'),
      ...banImportExtension('tsx'),
    ],
    'import/named': 'off', // Disable this rule (only use it at CI/push time)
    'import/namespace': 'off', // Disable this rule (only use it at CI/push time)
    'import/default': 'off', // Disable this rule (only use it at CI/push time)
    'import/no-named-as-default-member': 'off', // Disable this rule (only use it at CI/push time)
    'import/no-named-as-default': 'off', // Disable this rule (only use it at CI/push time)
    'import/no-cycle': 'off', // Disable this rule (only use it at CI/push time)
    'import/no-unused-modules': 'off', // Disable this rule (only use it at CI/push time)
    'import/no-deprecated': 'off', // Disable this rule (only use it at CI/push time)
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};