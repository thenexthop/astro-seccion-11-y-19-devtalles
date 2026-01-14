// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), sitemap(), vue()],

  adapter: node({
    mode: 'standalone',
  }),
});