/**
 * scaffold-project.ts
 * Creates a new project in the monorepo with all necessary configuration
 * to use the @ai-ds/core design system.
 *
 * Usage: npx tsx packages/core/scripts/scaffold-project.ts <project-name>
 */

import { mkdirSync, writeFileSync, copyFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CORE_ROOT = join(__dirname, '..');
const REPO_ROOT = join(CORE_ROOT, '..', '..');
const RULES_SRC = join(CORE_ROOT, 'cursor-rules');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Usage: npx tsx packages/core/scripts/scaffold-project.ts <project-name>');
  process.exit(1);
}

const PROJECT_DIR = join(REPO_ROOT, 'projects', projectName);

if (existsSync(PROJECT_DIR)) {
  console.error(`Project "${projectName}" already exists at ${PROJECT_DIR}`);
  process.exit(1);
}

console.log(`Creating project: ${projectName}`);

const dirs = [
  '',
  'pages',
  '.storybook',
  '.cursor',
  '.cursor/rules',
];

for (const d of dirs) {
  mkdirSync(join(PROJECT_DIR, d), { recursive: true });
}

const pkgName = projectName.replace(/[^a-z0-9-]/gi, '-').toLowerCase();

writeFileSync(join(PROJECT_DIR, 'package.json'), JSON.stringify({
  name: `@ai-ds/${pkgName}`,
  version: '1.0.0',
  private: true,
  description: `${projectName} — built on @ai-ds/core design system`,
  type: 'module',
  scripts: {
    'setup': 'cd ../.. && npm install && npm run core:build && cd - && storybook dev -p 6006',
    'prestorybook': 'npm run tokens:build -w @ai-ds/core && npm run contracts:generate -w @ai-ds/core',
    'storybook': 'storybook dev -p 6006',
    'storybook:alt': 'storybook dev -p 6010',
    'storybook:build': 'storybook build',
  },
  dependencies: {
    '@ai-ds/core': '*',
  },
  devDependencies: {
    '@storybook/addon-essentials': '^8.6.14',
    '@storybook/addon-themes': '^8.6.17',
    '@storybook/blocks': '^8.6.14',
    '@storybook/react': '^8.6.17',
    '@storybook/react-vite': '^8.6.17',
    '@types/react': '^18.0.0',
    'autoprefixer': '^10.4.24',
    'postcss': '^8.5.6',
    'react': '^19.2.4',
    'react-dom': '^19.2.4',
    'storybook': '^8.6.17',
    'tailwindcss': '^3.4.19',
    'typescript': '^5.0.0',
    'vite': '^6.4.1',
  },
}, null, 2) + '\n', 'utf-8');

writeFileSync(join(PROJECT_DIR, 'tsconfig.json'), JSON.stringify({
  compilerOptions: {
    target: 'ES2020',
    module: 'ESNext',
    moduleResolution: 'bundler',
    jsx: 'react-jsx',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    baseUrl: '.',
    paths: {
      '@ai-ds/core': ['../../packages/core/src/index.ts'],
      '@ai-ds/core/components': ['../../packages/core/components/index.ts'],
      '@ai-ds/core/components/*': ['../../packages/core/components/primitives/*/index.ts'],
      '@ai-ds/core/icons': ['../../packages/core/components/icons/index.tsx'],
      '@ai-ds/core/hooks': ['../../packages/core/hooks/index.ts'],
      '@ai-ds/core/hooks/*': ['../../packages/core/hooks/*.ts'],
      '@ai-ds/core/shared': ['../../packages/core/components/primitives/_shared/index.ts'],
      '@ai-ds/core/layout': ['../../packages/core/layout/index.ts'],
      '@ai-ds/core/behaviors': ['../../packages/core/behaviors/index.ts'],
      '@ai-ds/core/utils': ['../../packages/core/utils/token-resolver.ts'],
    },
  },
  include: [
    'pages/**/*.ts',
    'pages/**/*.tsx',
    '.storybook/**/*.ts',
    '.storybook/**/*.tsx',
  ],
  exclude: ['node_modules', 'dist'],
}, null, 2) + '\n', 'utf-8');

writeFileSync(join(PROJECT_DIR, 'postcss.config.cjs'), `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`, 'utf-8');

writeFileSync(join(PROJECT_DIR, 'tailwind.config.cjs'), `const path = require('path');
const coreDir = path.dirname(require.resolve('@ai-ds/core/package.json'));
const coreConfig = require(path.join(coreDir, 'config/tailwind/tailwind.config.cjs'));

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...coreConfig,
  content: [
    path.join(coreDir, 'components/**/*.{js,ts,jsx,tsx}'),
    path.join(coreDir, 'dist/components/**/*.{js,jsx}'),
    path.join(coreDir, 'contracts/components/*.contract.json'),
    './pages/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
};
`, 'utf-8');

const sbMain = `import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: [
    '../node_modules/@ai-ds/core/components/**/*.stories.tsx',
    '../../../node_modules/@ai-ds/core/components/**/*.stories.tsx',
    '../pages/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
  ],
  typescript: {
    reactDocgen: 'react-docgen',
  },
  viteFinal: (config) => {
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      '@ai-ds/core',
    ];
    return config;
  },
};

export default config;
`;

writeFileSync(join(PROJECT_DIR, '.storybook', 'main.ts'), sbMain, 'utf-8');

const sbPreview = `import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '@ai-ds/core/tokens';
import './storybook.css';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      parentSelector: 'body',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    layout: 'centered',
    backgrounds: { disable: true },
  },
};

export default preview;
`;

writeFileSync(join(PROJECT_DIR, '.storybook', 'preview.ts'), sbPreview, 'utf-8');

const sbCss = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: var(--color-bg-base, #fff);
  color: var(--color-text-primary, #1a1a1a);
  transition: background-color 0.2s, color 0.2s;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-surface-3, #9CA3AF) transparent;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--color-surface-3, #9CA3AF);
  border-radius: 999px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-muted, #6B7280);
}

#storybook-root {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

writeFileSync(join(PROJECT_DIR, '.storybook', 'storybook.css'), sbCss, 'utf-8');

if (existsSync(RULES_SRC)) {
  const ruleFiles = readdirSync(RULES_SRC).filter(f => f.endsWith('.mdc'));
  for (const file of ruleFiles) {
    copyFileSync(join(RULES_SRC, file), join(PROJECT_DIR, '.cursor', 'rules', file));
  }
  console.log(`Copied ${ruleFiles.length} cursor rules`);
}

console.log('');
console.log(`Project "${projectName}" created successfully at projects/${projectName}/`);
console.log('');
console.log('Next steps:');
console.log(`  1. npm install                          # install workspace deps`);
console.log(`  2. npm run core:build                   # build tokens & contracts`);
console.log(`  3. npm run storybook -w @ai-ds/${pkgName}  # launch storybook`);
console.log('');
