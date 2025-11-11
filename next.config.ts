import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Your Next.js config here
  output: 'standalone',
  outputFileTracingIncludes: {
    '/': ['./public/**/*'],
  },
  outputFileTracingExcludes: {
    '/': ['./astro-frontend/**/*', './node_modules/@swc/**/*'],
  },
  webpack: (webpackConfig: any, { isServer }: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Optimize build performance - disable server-side minification
    if (isServer) {
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        minimize: false,
      }
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
