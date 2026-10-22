import { defineConfig } from 'astro/config';
import persianDigits from './integrations/persian-digits.mjs';
import seo from './integrations/seo.mjs';

export default defineConfig({
  site: 'https://hanpars.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  server: { host: '0.0.0.0', port: 3000 },
  vite: { server: { allowedHosts: true } },
  integrations: [persianDigits(), seo({ site: 'https://hanpars.com' })],
});
