const glob = require('glob');
const path = require('path');

const webpack = require('webpack');
const _ = require('lodash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pages = require('./pages');

const mode = process.env.NODE_ENV = 'development';

const generateHtmlPlugins = function() {
  return glob.sync('./src/**/*.html')
      .map(
          (dir) => {
            let pageConfig = pages[dir];

            if (!pageConfig) {
              pageConfig = {};
            }

            return new HtmlWebpackPlugin(_.merge({
              filename: path.basename(dir),
              template: dir,
            }, pageConfig));
          });
};

module.exports = {
  mode: mode,
  entry: {
    app: './src/index.js',
    styles: './src/sass/main.sass',
    registration: './src/js/registration.js'
  },
  devServer: {
    contentBase: './dist',
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    // new ExtractTextPlugin('styles.css'),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/static/',
        to: './static',
      },
    ]),
    ...generateHtmlPlugins(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['eslint-loader'],
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: process.env.NODE_ENV !== 'production'
                ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
