require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var fs = require('fs')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // 为了改写CSS的一段代码，在把图片都压缩到20k左右之后发现不需要了
    //
    // fs.readFile(config.build.assetsRoot + '/static/css/app.css', function (err, data) {
    //   if (err)
    //     throw err;
    //   else {
    //     data = data.toString();
    //     data = data.replace(/static\//g, '../');
    //     fs.writeFile(config.build.assetsRoot + '/static/css/app.css', data, function () {
    //       console.log(chalk.cyan('  Rewrite CSS successfully!\n'))
    //     })
    //   }
    // })
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
