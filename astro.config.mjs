import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hanpars.com',
  output: 'static',
  trailingSlash: 'never',
  server: { host: '0.0.0.0', port: 3000 },
  vite: { server: { allowedHosts: true } },
});
