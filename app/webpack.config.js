const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const exec = require('child_process').exec;


const docsFolder = path.resolve(__dirname, '..', 'docs')
const postsFolder = path.resolve(__dirname, '..', 'posts')

module.exports = (env, argv) => {
  const mode = argv.mode 
  
  return {
    entry: './src/index.jsx',
    watch: mode == 'production' ? false : true,
    output: {
      filename: 'evil.js',
      publicPath: '/',
      path: path.resolve(__dirname, '..', 'docs')
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'] 
    },
    devServer: {
      contentBase: path.join(__dirname, '..', "docs"), 
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
          test: /\.svg$/,
          loader: 'svg-url-loader'
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
      }),
      // Make an html file
      new HtmlWebpackPlugin({
        template: 'index.html.ejs',
        inject: 'body',
      }),
      
      {
        apply: (compiler) =>
          compiler.hooks.entryOption.tap('OnEntryPlugin', (compilation) => {
            exec(`find ../posts -name '*.tex' -exec pdflatex -output-directory=../docs {} \\;`, (err, stdout, stderr) => {
              if (stderr) process.stderr.write(stderr)
            })
            exec(`find ../docs -name '*.pdf' -exec pdf2htmlex --dest-dir ../docs --data-dir ../posts/pdf2html-custom {} \\;`, (err, stdout, stderr) => {
              if (stdout) process.stdout.write(stdout)
              if (stderr) process.stderr.write(stderr)
            })
            exec(`find ../docs -name '*.aux' -exec rm {} \\;`)
            exec(`find ../docs -name '*.log' -exec rm {} \\;`)
          })
      }
    ]
  }
}
