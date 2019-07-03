'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const express = require('express')
const app = express()
var channelsData = require('../data/channel.json')
var yaoming = require('../data/yaoming.json')
var toutiao = require('../data/toutiao.json')
var xinwen = require('../data/xinwen.json')
var guonei = require('../data/guonei.json')
var guoji = require('../data/guoji.json')
var zhengzhi = require('../data/zhengzhi.json')
var caijing = require('../data/caijing.json')
var tiyu = require('../data/tiyu.json')
var yule = require('../data/yule.json')
var junshi = require('../data/junshi.json')
var jiaoyu = require('../data/jiaoyu.json')
var keji = require('../data/keji.json')
var NBA = require('../data/NBA.json')
var gupiao = require('../data/gupiao.json')
var xingzuo = require('../data/xingzuo.json')
var nvxing = require('../data/nvxing.json')
var jiankang = require('../data/jiankang.json')
var yuer = require('../data/yuer.json')
var apiRoutes = express.Router()

app.use('/api', apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    before(app) {
      app.get('/api/channels', (req, res) => {
          res.json({
            errno: 0,
            data: channelsData
          })
        }),
        app.get('/api/yaoming', (req, res) => {
          res.json({
            errno: 0,
            data: yaoming
          })
        }),
        app.get('/api/0', (req, res) => {
          res.json({
            errno: 0,
            data: toutiao
          })
        }),
        app.get('/api/1', (req, res) => {
          res.json({
            errno: 0,
            data: xinwen
          })
        }),
        app.get('/api/2', (req, res) => {
          res.json({
            errno: 0,
            data: guonei
          })
        }),
        app.get('/api/3', (req, res) => {
          res.json({
            errno: 0,
            data: guoji
          })
        }),
        app.get('/api/4', (req, res) => {
          res.json({
            errno: 0,
            data: zhengzhi
          })
        }),
        app.get('/api/5', (req, res) => {
          res.json({
            errno: 0,
            data: caijing
          })
        }),
        app.get('/api/6', (req, res) => {
          res.json({
            errno: 0,
            data: tiyu
          })
        }),
        app.get('/api/7', (req, res) => {
          res.json({
            errno: 0,
            data: yule
          })
        }),
        app.get('/api/8', (req, res) => {
          res.json({
            errno: 0,
            data: junshi
          })
        }),
        app.get('/api/9', (req, res) => {
          res.json({
            errno: 0,
            data: jiaoyu
          })
        }),
        app.get('/api/10', (req, res) => {
          res.json({
            errno: 0,
            data: keji
          })
        }),
        app.get('/api/11', (req, res) => {
          res.json({
            errno: 0,
            data: NBA
          })
        }),
        app.get('/api/12', (req, res) => {
          res.json({
            errno: 0,
            data: gupiao
          })
        }),
        app.get('/api/13', (req, res) => {
          res.json({
            errno: 0,
            data: xinzuo
          })
        }),
        app.get('/api/14', (req, res) => {
          res.json({
            errno: 0,
            data: nvxing
          })
        }),
        app.get('/api/15', (req, res) => {
          res.json({
            errno: 0,
            data: jiankang
          })
        }),
        app.get('/api/16', (req, res) => {
          res.json({
            errno: 0,
            data: yuer
          })
        })
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    disableHostCheck: true, //添加该项
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
