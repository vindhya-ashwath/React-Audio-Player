const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 3000;
const DEBUG = process.env.NODE_ENV !== 'production';

const config = {
  devtool: DEBUG ? 'eval' : false,
  entry: [
    path.join(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.[hash].js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './src'),
    ],
    extensions: ['.scss', '.css', '.js', '.json', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '/public/index.html')
    }),
  ],
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /(\.js|\.jsx)$/,
        exclude: path.resolve(__dirname, './node_modules'),
        use: [
          'eslint-loader',
        ]
      },
      {
        test: /(\.js|\.jsx)$/,
        exclude: path.resolve(__dirname, './node_modules'),
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'images/',
              limit: 8000,
              mimetype: 'image/png',
            },
          },
        ],
      },
      {
        test: /(\.jpg|\.jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'images/',
              limit: 8000,
              mimetype: 'image/jpeg',
            },
          },
        ],
      },
      {
        test: /\.woff$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              limit: 8000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              limit: 8000,
              mimetype: 'application/font-ttf',
            },
          },
        ],
      },
      {
        test: /\.eot$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              limit: 8000,
              mimetype: 'application/font-eot',
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: [
          'json-loader',
        ],
      },
    ],
  },
};

if (DEBUG) {
  config.entry.unshift(
    `webpack-dev-server/client?http://${ip}:${port}/`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  );

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]);
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        unused: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ]);
}

module.exports = config;
