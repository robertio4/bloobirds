import { ManifestV3Export, crx } from '@bloobirds-it/vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { resolve } from 'path';
import { defineConfig, loadEnv, UserConfig, ConfigEnv, PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

import manifest from './manifest.json';
import pkg from './package.json';

const outDir = resolve(__dirname, 'dist');

const isDev = process.env.NODE_ENV === 'development';
const isProduction = !isDev;

const extensionManifest = {
  ...manifest,
  name: isDev ? `DEV: ${manifest.name}` : manifest.name,
  version: pkg.version,
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
