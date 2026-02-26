import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: [
    '../../../packages/core/components/**/*.stories.tsx',
    '../pages/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
  ],
  staticDirs: [
    { from: '../../../packages/core/images', to: '/images' },
  ],
  typescript: {
    reactDocgen: 'react-docgen',
  },
};

export default config;
