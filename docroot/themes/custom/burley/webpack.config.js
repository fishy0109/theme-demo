const path = require('path')
const webpack = require('webpack')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {

  const isProduction = env.NODE_ENV === 'production'
  const assetPath = env.NODE_ENV === 'production' ? 'dist' : 'dev'

  // Helper to resolve paths
  const resolve = file => path.resolve(__dirname, file)

  let config = {

    mode: env.NODE_ENV,

    devtool: isProduction ? false : 'source-map',

    // Helpful alias
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': resolve('assets/src'),
        '~': resolve('node_modules')
      }
    },

    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/chunk/[name]-[chunkhash].js',
      path: resolve('assets/' + assetPath),
      publicPath: '/themes/custom/burley/assets/' + assetPath + '/'
    },

    entry: {
      app: [resolve('node_modules/@babel/polyfill'), resolve('assets/src/js/app.js')],
      vendors: resolve('assets/src/scss/vendors.scss'),
      editor: resolve('assets/src/scss/editor.scss'),
    },

    target: 'web',

    externals: {
      'jquery': 'jQuery',
      'drupal': 'Drupal',
    },

    module: {
      rules: [
        // Standalone SCSS
        {
          test: /\.(scss)$/,
          use: [
            MiniCSSExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: isProduction ? {minimize:{discardComments:{removeAll:true}}} : {sourceMap: true}
            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProduction,
              }
            }, {
              loader: 'sass-loader',
              options: {
                precision: 10,
                sourceMap: !isProduction
              }
            }
          ]
        },
        // Standalone JS
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        // Embed or load static assets
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]'
            }
          }
        },
        // Move fonts
        {
          test: /\.(ttf|eot|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]"
          }
        }
      ]
    },

    plugins: [
      // Extract CSS to new file
      new MiniCSSExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/chunks/[name]-[hash:16].css',
      }),

      // Fix some junk with webpack 4
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      }),

      // For lib bindings
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Drupal: 'drupal',
      }),

      // Copy from NPM to vendors in dist so we dont have to compile jquery
      new CopyWebpackPlugin([
        { from: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', to: 'js/bootstrap.bundle.min.js' },
      ]),
    ]
  }


  config.plugins = (config.plugins || []).concat([
    new CleanWebpackPlugin([config.output.path]),
  ])

  if (isProduction) {
    config.optimization = {
      minimizer: [
        new UglifyWebpackPlugin({
          uglifyOptions: {
            compress: {
              collapse_vars: false
            }
          }
        })
      ]
    }
  }

  return config
}
