import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: 'standalone',
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./public/**/*'],
    },
    outputFileTracingExcludes: {
      '/': ['./astro-frontend/**/*', './node_modules/@swc/**/*'],
    },
  },
  webpack: (webpackConfig: any, { isServer }: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Optimize build performance
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
