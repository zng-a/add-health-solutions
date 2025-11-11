// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'

export default defineCloudflareConfig({
  // Exclude unnecessary directories from processing
  exclude: [
    'astro-frontend/**',
    'tests/**',
    'node_modules/**/.cache/**',
    '**/*.test.ts',
    '**/*.spec.ts',
  ],
})
