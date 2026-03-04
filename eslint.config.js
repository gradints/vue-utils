import js from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import ts from 'typescript-eslint'

export default [
  { ignores: ['node_modules', 'dist'] },

  // Js
  js.configs.recommended,
  {
    rules: {
      'no-undef': 'off',
      'indent': ['warn', 2],
      'comma-dangle': ['warn', 'always-multiline'],
      'func-call-spacing': 'warn',
      'space-in-parens': ['warn', 'never'],
      'space-infix-ops': 'warn',
      'no-multi-spaces': 'warn',
      'key-spacing': 'warn',
      'no-whitespace-before-property': 'warn',
      'computed-property-spacing': ['warn', 'never'],
      'arrow-spacing': 'warn',
      'object-curly-spacing': ['warn', 'always'],
      'keyword-spacing': 'warn',
      'space-before-blocks': 'warn',
      'comma-spacing': 'warn',
    },
  },

  // Ts
  ...ts.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error', // https://typescript-eslint.io/rules/no-explicit-any/
      '@typescript-eslint/no-unused-vars': 'warn', // https://typescript-eslint.io/rules/no-unused-vars/
    },
  },

  // Simple import sort
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': ['warn', {
        'groups': [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']], // Remove blank lines between import group
      }],
      'simple-import-sort/exports': 'error',
    },
  },
]
