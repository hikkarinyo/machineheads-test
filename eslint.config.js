import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default tseslint.config(
    {ignores: ['dist']},
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'semi': ['error', 'never'],
            'quotes': ['error', 'single'],
            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},
            ],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // Packages `react` related packages come first.
                        ['^react'],
                        // External packages.
                        ['^@?\\w'],
                        // Internal packages.
                        ['^(@|components)(/.*|$)'],
                        // Side effect imports.
                        ['^\\u0000'],
                        // Parent imports. Put `..` last. And aliases
                        [
                            '^(components|common|models|store|routes|services|utils|enums|hooks)(/.*|$)',
                            '^\\.\\.(?!/?$)',
                            '^\\.\\./?$'
                        ],
                        // Other relative imports. Put same-folder imports and `.` last.
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        // Style imports.
                        ['^(ui|styles|img)(/.*|$)', '^.+\\.?(svg)$', '^.+\\.?(css)$']
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
            'import/no-unresolved': 'off',
            'eol-last': ['error', 'always'],
            'comma-dangle': ['error', {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline'
            }],
        },
    },
)
