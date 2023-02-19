import type { StorybookViteConfig } from '@storybook/builder-vite'

const config: StorybookViteConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, _options) {
    return config;
  }
}

export default config