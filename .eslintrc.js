module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:security/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended'
  ],
  plugins: ['security', 'import', 'promise'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json']
      }
    }
  },
  rules: {
    // Code style
    'indent': ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    
    // Best practices
    'no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'caughtErrorsIgnorePattern': '^_'
    }],
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',
    'no-duplicate-imports': 'error',
    
    // Security
    'security/detect-object-injection': 'warn',
    'security/detect-non-literal-regexp': 'warn',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'warn',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-non-literal-fs-filename': 'warn',
    'security/detect-non-literal-require': 'warn',
    'security/detect-possible-timing-attacks': 'warn',
    'security/detect-pseudoRandomBytes': 'error',
    
    // Import rules
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always'
    }],
    'import/no-unresolved': 'error',
    'import/no-cycle': 'error',
    
    // Promise rules
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn'
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      env: {
        jest: true
      },
      rules: {
        'security/detect-object-injection': 'off',
        'no-unused-expressions': 'off'
      }
    }
  ]
};
