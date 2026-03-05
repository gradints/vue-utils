import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import ts from 'typescript-eslint'

export default [
  { ignores: ['node_modules', 'dist'] },

  // Js
  js.configs.recommended,
  // {
  //   rules: {
  //     'no-undef': 'off',
  //   },
  // },

  // Stylistic
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['warn', 2],
      '@stylistic/comma-dangle': ['warn', 'always-multiline'],
      '@stylistic/function-call-spacing': 'warn',
      '@stylistic/space-in-parens': ['warn', 'never'],
      '@stylistic/space-infix-ops': 'warn',
      '@stylistic/no-multi-spaces': 'warn',
      '@stylistic/key-spacing': 'warn',
      '@stylistic/no-whitespace-before-property': 'warn',
      '@stylistic/computed-property-spacing': ['warn', 'never'],
      '@stylistic/arrow-spacing': 'warn',
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/keyword-spacing': 'warn',
      '@stylistic/space-before-blocks': 'warn',
      '@stylistic/comma-spacing': 'warn',
      '@stylistic/type-generic-spacing': 'warn',
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
