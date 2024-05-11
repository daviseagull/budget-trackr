import pluginJs from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    ignores: [
      'coverage',
      'public',
      'build',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml'
    ]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
]
