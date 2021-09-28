const path = require('path');
const glob = require('glob');
const webpack = require('webpack')

const paths = {
  src: path.resolve(__dirname, 'src'),
  html: path.resolve(__dirname, 'src', 'assets', 'html'),
  scss: path.resolve(__dirname, 'src', 'assets', 'scss'),
  assets: path.resolve(__dirname, 'src', 'assets'),
  build: path.resolve(__dirname, 'build'),
  public: path.resolve(__dirname, 'public'),
  vue: path.resolve(__dirname, 'src', 'components', 'vue'),
};

const { NODE_ENV, HOST, PORT } = process.env;
const isDev = NODE_ENV === 'development';
const mode = isDev ? 'development' : 'production';
const host = HOST || 'localhost';
const port = PORT || 3000;

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const PurgecssPlugin = require('purgecss-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode,
  devtool: 'inline-source-map',
  performance: { hints: false },
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].bundle.js',
  },
  stats: {
    children: true,
  },
  devServer: {
    historyApiFallback: true,
    static: paths.public,
    open: true,
    compress: true,
    hot: true,
    host,
    port,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]
            }
          }
        ],
      },
      {
        test: /\.s?css$/i,
        use: [
          isDev
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        use: ['svg-sprite-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack title',
      template: path.resolve(paths.html, 'index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    require('autoprefixer'),
    require('postcss-nested'),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      emitWarning: true,
    }),
    new StylelintPlugin({
      emitWarning: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "" },
      ],
    }),
    new VueLoaderPlugin(),
    isDev ?
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      }) :
      new PurgecssPlugin({
        paths: glob.sync(`${paths.src}/**/*`, { nodir: true }),
      }),
  ],
  resolve: {
    alias: {
      '@': paths.assets,
      '~': paths.scss,
      'src': paths.src,
      '@vue': paths.vue,
    },
  },
  optimization: {
    emitOnErrors: true,
  },
}