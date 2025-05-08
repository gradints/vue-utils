import js from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import ts from 'typescript-eslint'

export default [
  { ignores: ['node_modules', 'dist'] },

  // js
  js.configs.recommended,
  {
    rules: {
      'no-undef': 'off',
    },
  },

  // ts
  ...ts.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error', // https://typescript-eslint.io/rules/no-explicit-any/
      '@typescript-eslint/no-unused-vars': 'warn', // https://typescript-eslint.io/rules/no-unused-vars/
    },
  },

  // simple import sort
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': ['warn', {
        'groups': [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']], // remove blank lines between import group
      }],
      'simple-import-sort/exports': 'error',
    },
  },
]
