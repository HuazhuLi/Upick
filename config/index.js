// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    // assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    hostname: '127.0.0.1',
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/comments/images': 'http://127.0.0.1:5050/',
      '/comments/images': 'http://202.114.18.13/',
      '/login': 'http://202.114.18.13/',
      '/index': 'http://202.114.18.13/',
      '/comment_data': 'http://202.114.18.13/',
      '/store_detail': 'http://202.114.18.13/',
      '/comments_list': 'http://202.114.18.13/',
      '/comment': 'http://202.114.18.13/',
      '/add_store': 'http://202.114.18.13/',
      '/store_list_data': 'http://202.114.18.13/',
      '/store_list_search_data': 'http://202.114.18.13/',
      '/upload_store_data': 'http://202.114.18.13/',
      '/store_form_data': 'http://202.114.18.13/',
      '/changeLikeStatus': 'http://202.114.18.13/',
      '/small_store_image': 'http://202.114.18.13/',
      '/store_image': 'http://202.114.18.13/',
      '/is_commented': 'http://202.114.18.13/',
      '/classes': 'http://202.114.18.13/',
      '/jsapi': 'http://202.114.18.13/',
      '/pages_info': 'http://202.114.18.13/'
      // '/is_commented': 'http://118.89.54.28:8087/'
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
