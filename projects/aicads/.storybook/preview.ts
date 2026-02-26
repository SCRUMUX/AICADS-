import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '@ai-ds/core/tokens';
import './storybook.css';

const preview: Preview = {
  tags: ['autodocs'],
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
