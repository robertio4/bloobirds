import { ManifestV3Export, crx } from '@bloobirds-it/vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { resolve } from 'path';
import semver from 'semver';
import { defineConfig, loadEnv, UserConfig, ConfigEnv, PluginOption } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import tsconfigPaths from 'vite-tsconfig-paths';

import betaManifest from './manifest.beta.json';
import manifest from './manifest.json';
import pkg from './package.json';

const outDir = resolve(__dirname, 'dist');

const isDev = process.env.ENV === 'development';
const isBeta = process.env.BUILD_ENV === 'beta';
const isProduction = !isDev;

function transformVersion(version: string, isBeta: boolean): string {
  const parsedVersion = semver.parse(version);
  if (!parsedVersion) {
    throw new Error(`Invalid version: ${version}`);
  }
  if (isBeta) {
    return `${parsedVersion.major}.${parsedVersion.minor}.${parsedVersion.patch}.${
      parsedVersion.prerelease.length ? 0 : ''
    }`;
  } else {
    return `${parsedVersion.major}.${parsedVersion.minor}.${parsedVersion.patch}`;
  }
}

const extensionManifest = {
  ...manifest,
  ...(isBeta ? betaManifest : ({} as ManifestV3Export)),
  name: isBeta ? betaManifest.name : isDev ? `DEV: ${manifest.name}` : manifest.name,
  version: transformVersion(pkg.version, isBeta),
  version_name: pkg.version,
};

function base64Loader() {
  return {
    name: 'base64-loader',
    transform(_: any, id: string) {
      const [path, query] = id.split('?');
      if (query != 'base64') return null;

      const data = fs.readFileSync(path);
      const base64 = data.toString('base64');

      return `export default 'data:image/png;base64, ${base64}';`;
    },
  };
}

export default defineConfig(
  ({ mode }: ConfigEnv): UserConfig => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
      define: {
        'process.env': env,
      },
      resolve: {
        alias: {
          '@bloobirds-it/internationalization': resolve(
            __dirname,
            '../../internationalization/src/index.tsx',
          ),
        },
      },
      plugins: [
        base64Loader(),
        react(),
        crx({
          manifest: extensionManifest as ManifestV3Export,
          contentScripts: {
            injectCss: true,
          },
        }),
        tsconfigPaths(),
        cssInjectedByJsPlugin({
          styleId: 'bb-style-id',
          jsAssetsFilterFunction: function customJsAssetsfilterFunction(outputChunk) {
            return (
              outputChunk.fileName.includes('core') || outputChunk.fileName.includes('index.html')
            );
          },
        }),
      ] as PluginOption[],
      build: {
        outDir,
        sourcemap: isDev,
        minify: isProduction,
        emptyOutDir: isProduction,
        modulePreload: false,
        reportCompressedSize: isProduction,
      },
    };
  },
);
