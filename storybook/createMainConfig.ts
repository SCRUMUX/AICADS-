import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { createRequire } from 'node:module';

export type StorybookMode = 'monorepo' | 'consumer';

export interface CreateMainConfigOptions {
  /** monorepo = AICADS repo playground; consumer = npm-installed @ai-ds/core */
  mode: StorybookMode;
  /** Absolute path to the `.storybook` directory */
  storybookDir: string;
  /** Absolute path to the Storybook project root (parent of `.storybook`) */
  projectRoot: string;
  /** Optional extra story globs relative to projectRoot */
  extraStories?: string[];
}

function storyGlobs(opts: CreateMainConfigOptions): string[] {
  const { mode, extraStories = [] } = opts;

  if (mode === 'monorepo') {
    return [
      '../../components/**/*.stories.@(ts|tsx)',
      '../../layout/**/*.stories.@(ts|tsx)',
      '../../blocks/**/*.stories.@(ts|tsx)',
      '../src/**/*.stories.@(ts|tsx)',
      ...extraStories,
    ];
  }

  return [
    '../node_modules/@ai-ds/core/components/**/*.stories.@(ts|tsx)',
    '../node_modules/@ai-ds/core/layout/**/*.stories.@(ts|tsx)',
    '../node_modules/@ai-ds/core/blocks/**/*.stories.@(ts|tsx)',
    '../src/**/*.stories.@(ts|tsx)',
    ...extraStories,
  ];
}

export function createMainConfig(opts: CreateMainConfigOptions): StorybookConfig {
  const { storybookDir, projectRoot, mode } = opts;
  const nodeModules = path.join(projectRoot, 'node_modules');

  return {
    framework: {
      name: '@storybook/react-vite',
      options: {},
    },

    stories: storyGlobs(opts),

    addons: ['@storybook/addon-essentials'],

    docs: {
      autodocs: false,
    },

    typescript: {
      check: false,
      reactDocgen: false,
    },

    viteFinal: async (cfg) => {
      cfg.resolve = cfg.resolve ?? {};
      cfg.resolve.dedupe = ['react', 'react-dom'];
      cfg.resolve.alias = {
        ...(cfg.resolve.alias as Record<string, string> | undefined),
        react: path.join(nodeModules, 'react'),
        'react-dom': path.join(nodeModules, 'react-dom'),
      };

      const vaulRoots = [
        projectRoot,
        path.join(projectRoot, 'node_modules/@ai-ds/core'),
      ];
      for (const root of vaulRoots) {
        try {
          const rootReq = createRequire(path.join(root, 'package.json'));
          const vaulPkg = rootReq.resolve('vaul/package.json');
          cfg.resolve.alias['vaul/style.css'] = path.join(path.dirname(vaulPkg), 'style.css');
          break;
        } catch {
          // try next root
        }
      }

      if (mode === 'monorepo') {
        const repoRoot = path.resolve(storybookDir, '../..');
        cfg.server = cfg.server ?? {};
        cfg.server.fs = cfg.server.fs ?? {};
        cfg.server.fs.allow = [
          ...(cfg.server.fs.allow ?? []),
          path.join(projectRoot, '..'),
          repoRoot,
        ];
      }

      return cfg;
    },
  };
}
