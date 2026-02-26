const path = require('path');
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
