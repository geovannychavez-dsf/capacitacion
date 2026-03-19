// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-call': 'error', // Asegúrate de que esta regla esté habilitada
      '@typescript-eslint/naming-convention': [
        'warn',
        // 1. PascalCase: Clases, interfaces, tipos (typeLike)
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        // 2. camelCase: Funciones y Métodos
        {
          selector: ['function', 'method'],
          format: ['camelCase'],
        },
        // 3. UPPER_CASE: Constantes (variables con modificador 'const')
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['UPPER_CASE'],
        },
        // 4. UPPER_CASE: Enums y sus miembros
        {
          selector: ['enum', 'enumMember'],
          format: ['UPPER_CASE'],
        },
        // 5. camelCase: Variables (que no sean constantes)
        {
          selector: 'variable',
          format: ['camelCase'],
          // Excluimos las que ya capturamos como constantes arriba
          filter: {
            regex: '^[A-Z_]+$',
            match: false,
          },
        },
      ],
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      'prettier/prettier': ['off', { endOfLine: 'auto' }],
    },
  },
);
