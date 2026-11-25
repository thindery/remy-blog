import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.remylobster.com',
  integrations: [tailwind()],
  output: 'static',
  adapter: undefined,
});
