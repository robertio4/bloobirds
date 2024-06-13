const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PostCSSModules = require('postcss-modules-values');
const { DefinePlugin } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const IS_DEVELOP = process.env.NODE_ENV !== 'production';
const NODE_ENV = process.env.NODE_ENV || 'development';
const REACT_APP_VERSION = process.env.REACT_APP_VERSION || 'unversioned';
const ENV = process.env.ENV || null;

module.exports = {
  mode: IS_DEVELOP ? 'development' : 'production',
  devtool: IS_DEVELOP ? 'eval-source-map' : 'source-map',
  context: __dirname,
  entry: './src/index.js',
  target: 'web',
  devServer: {
    compress: true,
    host: HOST,
    allowedHosts: [HOST],
    port: DEFAULT_PORT,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  optimization: {
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          name: 'react_vendor',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        },
        bloobirdsVendor: {
          name: 'bloobirds_vendor',
          test: /[\\/]node_modules[\\/](@bloobirds-it)[\\/]/,
        },
        materialUIVendor: {
          name: 'materialUI_vendor',
          test: /[\\/]node_modules[\\/](@material-ui|material-ui-picker)[\\/]/,
        },
        lodashVendor: {
          name: 'lodash_vendor',
          test: /[\\/]node_modules[\\/](lodash)[\\/]/,
        },
        xlsxVendor: {
          name: 'xlsx_vendor',
          test: /[\\/]node_modules[\\/](xlsx)[\\/]/,
        },
        othervendor: {
          name: 'other_vendor',
          test: /[\\/]node_modules[\\/](!@bloobirds-it)(!lodash)(!react)(!react-dom)(!@material-ui)(!material-ui-picker)[\\/]/,
          maxSize: 20000,
        },
      },
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      util: require.resolve('util/'),
      events: require.resolve('events/'),
    },
    alias: {
      '@bloobirds-it/internationalization': path.resolve(
        __dirname,
        '../../internationalization/src/index.tsx',
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        //exclude: /node_modules/,
        use: ['source-map-loader'],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        include: path.resolve('src'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react'],
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        include: path.resolve('src'),
        test: /\.(png|jpe?g|gif)$/,
        use: 'url-loader',
      },
      {
        include: path.resolve('src'),
        test: /\.svg$/,
        use: ['@svgr/webpack', 'svg-url-loader'],
      },
      {
        include: path.resolve('src'),
        test: /\.mp3$/,
        loader: 'file-loader',
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
  plugins: [
    new TsconfigPathsPlugin(),
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        REACT_APP_VERSION: JSON.stringify(REACT_APP_VERSION),
        ENV: JSON.stringify(ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      filename: 'index.html',
    }),
    PostCSSModules,
    IS_DEVELOP ? new ReactRefreshWebpackPlugin({ overlay: false }) : null,
  ].filter(Boolean),
};
