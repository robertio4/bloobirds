import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
//import globals from 'rollup-plugin-node-globals';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import includePaths from 'rollup-plugin-includepaths';
import builtins from 'rollup-plugin-node-builtins';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE_PATH = path.join(PACKAGE_ROOT_PATH, 'src/index.ts');
const INPUT_FILE = fs.existsSync(INPUT_FILE_PATH)
  ? INPUT_FILE_PATH
  : path.join(PACKAGE_ROOT_PATH, 'src/index.tsx');
const PKG_JSON = require(path.join(PACKAGE_ROOT_PATH, 'package.json'));

const env = process.env.NODE_ENV;
const isDevelopment = env === `development`;

const includePathOptions = {
  include: {},
  paths: [path.join(PACKAGE_ROOT_PATH, 'src')],
  external: [],
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
};

const onwarn = (warning, warn) => {
  // Silence circular dependency warning for twilio package
  if (
    ['CIRCULAR_DEPENDENCY'].includes(warning.code) &&
    warning.message.includes('node_modules/@twilio')
  ) {
    return;
  }

  if (['THIS_IS_UNDEFINED'].includes(warning.code)) return;

  if (['EVAL'].includes(warning.code)) return;

  warn(warning);
};

const plugins = [
  // Automatically externalize peerDependencies
  external(),

  // Let you use relative paths in your import directives
  includePaths(includePathOptions),

  // Allow Rollup to resolve modules from `node_modules`, since it only
  // resolves local modules by default.
  resolve({
    browser: true,
    preferBuiltins: true,
    // modulesOnly: true,
  }),

  // Replace occurrences of a set of strings
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify(isDevelopment ? `development` : `production`),
  }),

  postcss({
    plugins: [autoprefixer()],
  }),

  // Allow Rollup to resolve CommonJS modules, since it only resolves ES2015
  // modules by default.
  commonjs({
    include: /\/node_modules\//,
  }),

  // Convert JSON imports to ES6 modules.
  json(),

  // Register Node.js builtins for browserify compatibility.
  builtins(),

  // Use Babel to transpile the result, limiting it to the source code.
  babel({
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
    env: {
      test: {
        presets: [
          ['@babel/preset-react', { modules: '../../../../commonjs' }],
          ['@babel/preset-env', { modules: '../../../../commonjs' }],
        ],
      },
    },
    extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
    exclude: `node_modules/**`,
    babelHelpers: 'inline',
  }),

  // Register Node.js globals for browserify compatibility.
  //globals(),

  // Show build progress in the console.
  //progress({
  //  clearLine: false,
  //}),

  // Import JPG, PNG, GIF and SVG images.
  image(),

  !isDevelopment && terser(),
];

const defaultExternal = id => {
  /*   if (id.includes('clsx.m.js')) {
    console.log('------------------------------------------------------------------------');
    return true;
  } */

  return (
    !id.startsWith(`\0`) &&
    !id.startsWith(`~`) &&
    !id.startsWith(`.`) &&
    !id.startsWith(process.platform === `win32` ? process.cwd() : `/`)
  );
};

export default [
  {
    input: INPUT_FILE,
    external: defaultExternal,
    output: {
      file: PKG_JSON.main,
      format: 'es',
      name: PKG_JSON.name,
      sourcemap: true,
    },
    plugins,
    onwarn,
  },
];
