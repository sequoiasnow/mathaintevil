const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = (env, argv) => {
  const mode = argv.mode 
  
  return {
    entry: './src/index.jsx',
    watch: mode == 'production' ? false : true,
    output: {
      filename: 'evil.js',
      publicPath: '/',
      path: path.resolve(__dirname, 'docs')
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'] 
    },
    devServer: {
      contentBase: path.join(__dirname, "docs"), 
      port: 3000,
      historyApiFallback: true,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [ 'env'
                       , 'react'
                       , 'stage-2' ]
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            mode == 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')(),
                  require('cssnano')()
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(__dirname, './src/styles')
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      // Automatically provide react in every file.
      new webpack.ProvidePlugin({
        React: 'react'
      }),
      // Bundle css
      new MiniCssExtractPlugin({
        filename: "evil.css",
      })
    ]
    
  }
}
